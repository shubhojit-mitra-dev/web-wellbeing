import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Safe environment variable accessor.
 * Reads from Vite's import.meta.env (browser/extension context) or process.env
 * (Node/test context). Does NOT reference document or window — safe for use in
 * Chrome Extension Service Workers.
 */
const getEnvVar = (key: string, defaultValue: string): string => {
  const meta = import.meta as unknown as { env?: Record<string, string> };
  if (meta && meta.env && meta.env[key]) {
    return meta.env[key];
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  return defaultValue;
};

const DEFAULT_URL = 'https://wzqmneutvtkdylvelmqc.supabase.co';
const DEFAULT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6cW1uZXV0dnRrZHlsdmVsbXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5OTMyNjIsImV4cCI6MjEwMzU2OTI2Mn0.2csz1LHPYnVIxb8ZN3Is6c6ZMh8frTAWJCg1N-M-6Fo';

const SUPABASE_URL = getEnvVar('VITE_SUPABASE_URL', DEFAULT_URL);
const SUPABASE_ANON_KEY = getEnvVar('VITE_SUPABASE_ANON_KEY', DEFAULT_ANON_KEY);

let clientInstance: SupabaseClient | null = null;

/**
 * Detect whether we are running inside a Chrome Extension Service Worker.
 * Service workers have no `window` or `document` globals, so Supabase's
 * default cookie-based session storage would crash. We use a no-op in-memory
 * storage instead so the client can be safely instantiated in that context.
 */
const isServiceWorkerContext = typeof window === 'undefined' && typeof document === 'undefined';

/** Minimal in-memory storage that satisfies the Supabase Storage interface. */
const memoryStorage = (() => {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
  };
})();

if (typeof globalThis.WebSocket === 'undefined') {
  class DummyWebSocket {
    static readonly CONNECTING = 0;
    static readonly OPEN = 1;
    static readonly CLOSING = 2;
    static readonly CLOSED = 3;
    close(): void {}
  }
  (globalThis as unknown as Record<string, unknown>).WebSocket = DummyWebSocket;
}

export function getSupabaseClient(url = SUPABASE_URL, anonKey = SUPABASE_ANON_KEY): SupabaseClient {
  if (!clientInstance) {
    clientInstance = createClient(url, anonKey, {
      auth: {
        persistSession: !isServiceWorkerContext,
        autoRefreshToken: !isServiceWorkerContext,
        detectSessionInUrl: false,
        ...(isServiceWorkerContext ? { storage: memoryStorage } : {}),
      },
    });
  }
  return clientInstance;
}
