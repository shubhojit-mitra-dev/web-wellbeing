import type { ActivityRecord } from '@web-wellbeing/shared';
import { describe, expect, it, vi } from 'vitest';
import type { IActivityRepository } from '../repositories/activity.repository';
import { EmergencyFlushStrategy } from './emergency-flush.strategy';

describe('EmergencyFlushStrategy', () => {
  it('should immediately attempt to flush all items in bulk', async () => {
    const mockRepo: IActivityRepository = {
      getByDateRange: vi.fn(),
      insertBatch: vi.fn().mockResolvedValue(undefined),
    };

    const strategy = new EmergencyFlushStrategy(mockRepo);
    const mockActivity: ActivityRecord = {
      domain: 'github.com',
      startedAt: Date.now() - 60000,
      endedAt: Date.now(),
      isIdle: false,
    };

    const result = await strategy.sync([mockActivity]);
    expect(result.success).toBe(true);
    expect(result.syncedCount).toBe(1);
    expect(result.retryable).toBe(false);
  });
});
