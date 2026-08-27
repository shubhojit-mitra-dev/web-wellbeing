import { describe, expect, it } from 'vitest';
import { SupabaseFocusRepository } from './focus.repository';

describe('SupabaseFocusRepository', () => {
  it('should instantiate repository properly', () => {
    const repo = new SupabaseFocusRepository();
    expect(repo).toBeDefined();
    expect(typeof repo.createSession).toBe('function');
  });
});
