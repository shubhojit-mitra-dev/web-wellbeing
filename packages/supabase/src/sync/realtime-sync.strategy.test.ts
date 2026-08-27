import type { ActivityRecord } from '@web-wellbeing/shared';
import { describe, expect, it, vi } from 'vitest';
import type { IActivityRepository } from '../repositories/activity.repository';
import { RealtimeSyncStrategy } from './realtime-sync.strategy';

describe('RealtimeSyncStrategy', () => {
  it('should insert activity records immediately one by one', async () => {
    const mockRepo: IActivityRepository = {
      getActivitiesByUserId: vi.fn(),
      insertActivity: vi.fn().mockImplementation(async (item) => item),
      bulkInsertActivities: vi.fn(),
    };

    const strategy = new RealtimeSyncStrategy(mockRepo);
    const mockActivity: ActivityRecord = {
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
    };

    const result = await strategy.sync([mockActivity]);
    expect(result.success).toBe(true);
    expect(result.syncedCount).toBe(1);
    expect(mockRepo.insertActivity).toHaveBeenCalledWith(mockActivity);
  });
});
