import { describe, expect, it } from 'vitest';
import { getSupabaseClient } from './client';

describe('Supabase Client Configuration', () => {
  it('initializes and returns a singleton SupabaseClient', () => {
    const client1 = getSupabaseClient('https://example.supabase.co', 'anon-key');
    const client2 = getSupabaseClient('https://example.supabase.co', 'anon-key');

    expect(client1).toBeDefined();
    expect(client1).toBe(client2);
  });

  it('does not throw when initialized in a non-browser (node/service-worker-like) environment', () => {
    expect(() => {
      getSupabaseClient('https://example.supabase.co', 'test-key');
    }).not.toThrow();
  });
});
