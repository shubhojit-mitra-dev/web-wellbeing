import type { ActivityRecord } from '@web-wellbeing/shared';
import type { IActivityRepository } from '../repositories/activity.repository';
import type { ISyncStrategy, SyncResult } from './sync-strategy.interface';

export class EmergencyFlushStrategy implements ISyncStrategy {
  readonly name = 'emergency_flush';

  constructor(private readonly activityRepo: IActivityRepository) {}

  async sync(activities: readonly ActivityRecord[]): Promise<SyncResult> {
    if (activities.length === 0) {
      return {
        success: true,
        syncedCount: 0,
        failedCount: 0,
        errors: [],
        retryable: false,
      };
    }

    try {
      await this.activityRepo.insertBatch(activities);
      const syncedCount = activities.length;

      return {
        success: true,
        syncedCount,
        failedCount: 0,
        errors: [],
        retryable: false,
      };
    } catch (err) {
      return {
        success: false,
        syncedCount: 0,
        failedCount: activities.length,
        errors: [err instanceof Error ? err : new Error(String(err))],
        retryable: false,
      };
    }
  }
}
