import type { ActivityRecord } from '@web-wellbeing/shared';
import type { IActivityRepository } from '../repositories/activity.repository';
import type { ISyncStrategy, SyncResult } from './sync-strategy.interface';

export class RealtimeSyncStrategy implements ISyncStrategy {
  readonly name = 'realtime';

  constructor(private readonly activityRepo: IActivityRepository) {}

  async sync(activities: readonly ActivityRecord[]): Promise<SyncResult> {
    let syncedCount = 0;
    const errors: Error[] = [];

    for (const activity of activities) {
      try {
        await this.activityRepo.insertBatch([activity]);
        syncedCount++;
      } catch (err) {
        errors.push(err instanceof Error ? err : new Error(String(err)));
      }
    }

    const failedCount = activities.length - syncedCount;

    return {
      success: failedCount === 0,
      syncedCount,
      failedCount,
      errors,
      retryable: failedCount > 0,
    };
  }
}
