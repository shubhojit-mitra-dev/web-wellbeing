import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? 'https://placeholder-url.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY ?? 'placeholder-anon-key';

let clientInstance: SupabaseClient | null = null;

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
