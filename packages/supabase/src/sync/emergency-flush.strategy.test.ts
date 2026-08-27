import type { ActivityRecord } from '@web-wellbeing/shared';
import { describe, expect, it, vi } from 'vitest';
import type { IActivityRepository } from '../repositories/activity.repository';
import { EmergencyFlushStrategy } from './emergency-flush.strategy';

describe('EmergencyFlushStrategy', () => {
  it('should immediately attempt to flush all items in bulk', async () => {
    const mockRepo: IActivityRepository = {
      getActivitiesByUserId: vi.fn(),
      insertActivity: vi.fn(),
      bulkInsertActivities: vi.fn().mockImplementation(async (items) => items),
    };

    const strategy = new EmergencyFlushStrategy(mockRepo);
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
    expect(result.retryable).toBe(false);
  });
});
