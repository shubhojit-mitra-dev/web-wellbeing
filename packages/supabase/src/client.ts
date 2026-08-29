import { createClient, type SupabaseClient } from '@supabase/supabase-js';

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

const SUPABASE_URL = getEnvVar('VITE_SUPABASE_URL', 'https://placeholder-url.supabase.co');
const SUPABASE_ANON_KEY = getEnvVar('VITE_SUPABASE_ANON_KEY', 'placeholder-anon-key');

let clientInstance: SupabaseClient | null = null;

/**
 * Detect whether we are running inside a Chrome Extension Service Worker.
 * Service workers have no `window` or `document` globals, so Supabase's
 * default cookie-based session storage would crash. We use a no-op in-memory
 * storage instead so the client can be safely instantiated in that context.
 */
const isServiceWorker =
  typeof window === 'undefined' &&
  typeof document === 'undefined' &&
  typeof self !== 'undefined' &&
  typeof (self as unknown as Record<string, unknown>).ServiceWorkerGlobalScope !== 'undefined';

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
        persistSession: !isServiceWorker,
        autoRefreshToken: !isServiceWorker,
        detectSessionInUrl: false,
        ...(isServiceWorker ? { storage: memoryStorage } : {}),
      },
    });
  }
  return clientInstance;
}
