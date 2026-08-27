import { describe, expect, it } from 'vitest';
import { SupabaseGoalRepository } from './goal.repository';

describe('SupabaseGoalRepository', () => {
  it('should instantiate goal repository properly', () => {
    const repo = new SupabaseGoalRepository();
    expect(repo).toBeDefined();
    expect(typeof repo.getUserGoals).toBe('function');
  });
});
