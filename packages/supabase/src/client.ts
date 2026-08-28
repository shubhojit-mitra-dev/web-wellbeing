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
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }
  return clientInstance;
}
