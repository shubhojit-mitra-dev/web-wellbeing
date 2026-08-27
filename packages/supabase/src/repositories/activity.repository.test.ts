import { describe, expect, it } from 'vitest';
import { SupabaseActivityRepository } from './activity.repository';

describe('SupabaseActivityRepository', () => {
  it('should handle empty batch insert without errors', async () => {
    const repo = new SupabaseActivityRepository();
    await expect(repo.insertBatch([])).resolves.not.toThrow();
  });
});
