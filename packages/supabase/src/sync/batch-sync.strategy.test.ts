import type { ActivityRecord } from '@web-wellbeing/shared';
import { describe, expect, it, vi } from 'vitest';
import type { IActivityRepository } from '../repositories/activity.repository';
import { BatchSyncStrategy } from './batch-sync.strategy';

describe('BatchSyncStrategy', () => {
  it('should bulk insert activities in configured batch sizes', async () => {
    const mockRepo: IActivityRepository = {
      getActivitiesByUserId: vi.fn(),
      insertActivity: vi.fn(),
      bulkInsertActivities: vi.fn().mockImplementation(async (items) => items),
    };

    const strategy = new BatchSyncStrategy(mockRepo, 2);
    const mockActivities: ActivityRecord[] = [
      {
        id: '1',
        userId: 'u1',
        deviceId: 'd1',
        domain: 'github.com',
        categoryId: 1,
        startedAt: new Date().toISOString(),
        endedAt: new Date().toISOString(),
        durationSeconds: 60,
        isIdle: false,
        tabCount: 1,
        windowCount: 1,
      },
      {
        id: '2',
        userId: 'u1',
        deviceId: 'd1',
        domain: 'google.com',
        categoryId: 2,
        startedAt: new Date().toISOString(),
        endedAt: new Date().toISOString(),
        durationSeconds: 120,
        isIdle: false,
        tabCount: 1,
        windowCount: 1,
      },
      {
        id: '3',
        userId: 'u1',
        deviceId: 'd1',
        domain: 'youtube.com',
        categoryId: 3,
        startedAt: new Date().toISOString(),
        endedAt: new Date().toISOString(),
        durationSeconds: 180,
        isIdle: false,
        tabCount: 1,
        windowCount: 1,
      },
    ];

    const result = await strategy.sync(mockActivities);
    expect(result.success).toBe(true);
    expect(result.syncedCount).toBe(3);
    expect(mockRepo.bulkInsertActivities).toHaveBeenCalledTimes(2);
  });
});
