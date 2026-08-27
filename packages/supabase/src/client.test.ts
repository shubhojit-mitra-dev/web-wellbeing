import { describe, expect, it } from 'vitest';
import { getSupabaseClient } from './client';

describe('Supabase Client Configuration', () => {
  it('should initialize and return a singleton SupabaseClient', () => {
    const client1 = getSupabaseClient('https://example.supabase.co', 'anon-key');
    const client2 = getSupabaseClient('https://example.supabase.co', 'anon-key');

    expect(client1).toBeDefined();
    expect(client1).toBe(client2);
  });
});
