import { describe, expect, it, vi, beforeEach } from 'vitest';
import { SupabaseFocusRepository } from './focus.repository';
import * as clientModule from '../client';
import type { FocusSession } from '@web-wellbeing/shared';

describe('SupabaseFocusRepository suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const sampleSession: FocusSession = {
    id: 'foc-1',
    userId: 'user-1',
    startedAt: '2026-08-28T10:00:00.000Z',
    endedAt: '2026-08-28T10:25:00.000Z',
    plannedDurationMinutes: 25,
    actualDurationSeconds: 1500,
    mode: 'focus',
    completed: true,
    blockedDomains: ['facebook.com'],
    interruptionCount: 2,
  };

  it('saves focus session into Supabase focus_sessions table', async () => {
    const insertMock = vi.fn().mockResolvedValue({ error: null });
    const fromMock = vi.fn().mockReturnValue({ insert: insertMock });

    vi.spyOn(clientModule, 'getSupabaseClient').mockReturnValue({
      from: fromMock,
    } as unknown as ReturnType<typeof clientModule.getSupabaseClient>);

    const repo = new SupabaseFocusRepository();
    await repo.createSession(sampleSession);

    expect(fromMock).toHaveBeenCalledWith('focus_sessions');
    expect(insertMock).toHaveBeenCalledWith(sampleSession);
  });

  it('throws error when focus session creation fails', async () => {
    const insertMock = vi.fn().mockResolvedValue({ error: { message: 'Insert failed' } });
    const fromMock = vi.fn().mockReturnValue({ insert: insertMock });

    vi.spyOn(clientModule, 'getSupabaseClient').mockReturnValue({
      from: fromMock,
    } as unknown as ReturnType<typeof clientModule.getSupabaseClient>);

    const repo = new SupabaseFocusRepository();
    await expect(repo.createSession(sampleSession)).rejects.toThrow(
      'Failed to save focus session: Insert failed',
    );
  });

  it('fetches user focus sessions from Supabase table', async () => {
    const orderMock = vi.fn().mockResolvedValue({ data: [sampleSession], error: null });
    const eqMock = vi.fn().mockReturnValue({ order: orderMock });
    const selectMock = vi.fn().mockReturnValue({ eq: eqMock });
    const fromMock = vi.fn().mockReturnValue({ select: selectMock });

    vi.spyOn(clientModule, 'getSupabaseClient').mockReturnValue({
      from: fromMock,
    } as unknown as ReturnType<typeof clientModule.getSupabaseClient>);

    const repo = new SupabaseFocusRepository();
    const result = await repo.getUserSessions('user-1');

    expect(fromMock).toHaveBeenCalledWith('focus_sessions');
    expect(selectMock).toHaveBeenCalledWith('*');
    expect(eqMock).toHaveBeenCalledWith('user_id', 'user-1');
    expect(orderMock).toHaveBeenCalledWith('started_at', { ascending: false });
    expect(result).toEqual([sampleSession]);
  });
});
