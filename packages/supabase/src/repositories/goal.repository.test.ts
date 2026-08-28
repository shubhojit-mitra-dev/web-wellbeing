import { describe, expect, it, vi, beforeEach } from 'vitest';
import { SupabaseGoalRepository } from './goal.repository';
import * as clientModule from '../client';
import type { Goal } from '@web-wellbeing/shared';

describe('SupabaseGoalRepository suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const sampleGoal: Goal = {
    id: 'goal-1',
    userId: 'user-1',
    type: 'max_category_time',
    targetMinutes: 120,
    categoryId: 1,
    createdAt: '2026-08-28T10:00:00.000Z',
    isActive: true,
  };

  it('saves user goal into Supabase user_goals table', async () => {
    const insertMock = vi.fn().mockResolvedValue({ error: null });
    const fromMock = vi.fn().mockReturnValue({ insert: insertMock });

    vi.spyOn(clientModule, 'getSupabaseClient').mockReturnValue({
      from: fromMock,
    } as unknown as ReturnType<typeof clientModule.getSupabaseClient>);

    const repo = new SupabaseGoalRepository();
    await repo.createGoal(sampleGoal);

    expect(fromMock).toHaveBeenCalledWith('user_goals');
    expect(insertMock).toHaveBeenCalledWith(sampleGoal);
  });

  it('throws error when goal creation fails', async () => {
    const insertMock = vi.fn().mockResolvedValue({ error: { message: 'DB error' } });
    const fromMock = vi.fn().mockReturnValue({ insert: insertMock });

    vi.spyOn(clientModule, 'getSupabaseClient').mockReturnValue({
      from: fromMock,
    } as unknown as ReturnType<typeof clientModule.getSupabaseClient>);

    const repo = new SupabaseGoalRepository();
    await expect(repo.createGoal(sampleGoal)).rejects.toThrow('Failed to save goal: DB error');
  });

  it('fetches active user goals from Supabase table', async () => {
    const eqActiveMock = vi.fn().mockResolvedValue({ data: [sampleGoal], error: null });
    const eqUserMock = vi.fn().mockReturnValue({ eq: eqActiveMock });
    const selectMock = vi.fn().mockReturnValue({ eq: eqUserMock });
    const fromMock = vi.fn().mockReturnValue({ select: selectMock });

    vi.spyOn(clientModule, 'getSupabaseClient').mockReturnValue({
      from: fromMock,
    } as unknown as ReturnType<typeof clientModule.getSupabaseClient>);

    const repo = new SupabaseGoalRepository();
    const result = await repo.getUserGoals('user-1');

    expect(fromMock).toHaveBeenCalledWith('user_goals');
    expect(selectMock).toHaveBeenCalledWith('*');
    expect(eqUserMock).toHaveBeenCalledWith('user_id', 'user-1');
    expect(eqActiveMock).toHaveBeenCalledWith('is_active', true);
    expect(result).toEqual([sampleGoal]);
  });
});
