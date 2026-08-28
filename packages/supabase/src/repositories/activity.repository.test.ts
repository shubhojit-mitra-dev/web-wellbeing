import { describe, expect, it, vi, beforeEach } from 'vitest';
import { SupabaseActivityRepository } from './activity.repository';
import * as clientModule from '../client';
import type { ActivityRecord } from '@web-wellbeing/shared';

describe('SupabaseActivityRepository suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const sampleRecord: ActivityRecord = {
    domain: 'github.com',
    url: 'https://github.com',
    title: 'GitHub',
    startedAt: 1772092800000,
    endedAt: 1772092920000,
    isIdle: false,
  };

  it('handles empty batch insert cleanly without invoking network', async () => {
    const repo = new SupabaseActivityRepository();
    await expect(repo.insertBatch([])).resolves.not.toThrow();
  });

  it('inserts batch of activities into Supabase table', async () => {
    const insertMock = vi.fn().mockResolvedValue({ error: null });
    const fromMock = vi.fn().mockReturnValue({ insert: insertMock });

    vi.spyOn(clientModule, 'getSupabaseClient').mockReturnValue({
      from: fromMock,
    } as unknown as ReturnType<typeof clientModule.getSupabaseClient>);

    const repo = new SupabaseActivityRepository();
    await repo.insertBatch([sampleRecord]);

    expect(fromMock).toHaveBeenCalledWith('activities');
    expect(insertMock).toHaveBeenCalledWith([sampleRecord]);
  });

  it('throws error when Supabase insert fails', async () => {
    const insertMock = vi.fn().mockResolvedValue({ error: { message: 'DB connection error' } });
    const fromMock = vi.fn().mockReturnValue({ insert: insertMock });

    vi.spyOn(clientModule, 'getSupabaseClient').mockReturnValue({
      from: fromMock,
    } as unknown as ReturnType<typeof clientModule.getSupabaseClient>);

    const repo = new SupabaseActivityRepository();
    await expect(repo.insertBatch([sampleRecord])).rejects.toThrow(
      'Failed to insert activities: DB connection error',
    );
  });

  it('fetches activities by date range from Supabase table', async () => {
    const lteMock = vi.fn().mockResolvedValue({ data: [sampleRecord], error: null });
    const gteMock = vi.fn().mockReturnValue({ lte: lteMock });
    const selectMock = vi.fn().mockReturnValue({ gte: gteMock });
    const fromMock = vi.fn().mockReturnValue({ select: selectMock });

    vi.spyOn(clientModule, 'getSupabaseClient').mockReturnValue({
      from: fromMock,
    } as unknown as ReturnType<typeof clientModule.getSupabaseClient>);

    const repo = new SupabaseActivityRepository();
    const result = await repo.getByDateRange('2026-08-28T00:00:00Z', '2026-08-28T23:59:59Z');

    expect(fromMock).toHaveBeenCalledWith('activities');
    expect(selectMock).toHaveBeenCalledWith('*');
    expect(gteMock).toHaveBeenCalledWith('started_at', '2026-08-28T00:00:00Z');
    expect(lteMock).toHaveBeenCalledWith('ended_at', '2026-08-28T23:59:59Z');
    expect(result).toEqual([sampleRecord]);
  });
});
