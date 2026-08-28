import type { ActivityRecord } from '@web-wellbeing/shared';
import { describe, expect, it, vi } from 'vitest';
import type { IActivityRepository } from '../repositories/activity.repository';
import { BatchSyncStrategy } from './batch-sync.strategy';

describe('BatchSyncStrategy', () => {
  it('should bulk insert activities in configured batch sizes', async () => {
    const mockRepo: IActivityRepository = {
      getByDateRange: vi.fn(),
      insertBatch: vi.fn().mockResolvedValue(undefined),
    };

    const strategy = new BatchSyncStrategy(mockRepo, 2);
    const mockActivities: ActivityRecord[] = [
      {
        domain: 'github.com',
        startedAt: Date.now() - 60000,
        endedAt: Date.now(),
        isIdle: false,
      },
      {
        domain: 'google.com',
        startedAt: Date.now() - 120000,
        endedAt: Date.now(),
        isIdle: false,
      },
      {
        domain: 'youtube.com',
        startedAt: Date.now() - 180000,
        endedAt: Date.now(),
        isIdle: false,
      },
    ];

    const result = await strategy.sync(mockActivities);
    expect(result.success).toBe(true);
    expect(result.syncedCount).toBe(3);
    expect(mockRepo.insertBatch).toHaveBeenCalledTimes(2);
  });
});
