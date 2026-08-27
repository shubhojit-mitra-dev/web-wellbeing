import type { ActivityRecord } from '@web-wellbeing/shared';
import type { IActivityRepository } from '../repositories/activity.repository';
import type { ISyncStrategy, SyncResult } from './sync-strategy.interface';

export class BatchSyncStrategy implements ISyncStrategy {
  readonly name = 'batch';

  constructor(
    private readonly activityRepo: IActivityRepository,
    private readonly batchSize = 50,
  ) {}

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

    let syncedCount = 0;
    const errors: Error[] = [];

    for (let i = 0; i < activities.length; i += this.batchSize) {
      const batch = activities.slice(i, i + this.batchSize);
      try {
        const result = await this.activityRepo.bulkInsertActivities(batch);
        syncedCount += result.length;
      } catch (err) {
        errors.push(err instanceof Error ? err : new Error(String(err)));
      }
    }

    const failedCount = activities.length - syncedCount;
    const success = failedCount === 0;

    return {
      success,
      syncedCount,
      failedCount,
      errors,
      retryable: failedCount > 0,
    };
  }
}
