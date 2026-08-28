import type { ActivityRecord } from '@web-wellbeing/shared';

export interface SyncResult {
  readonly success: boolean;
  readonly syncedCount: number;
  readonly failedCount: number;
  readonly errors: readonly Error[];
  readonly retryable: boolean;
}

export interface ISyncStrategy {
  readonly name: string;
  sync(activities: readonly ActivityRecord[]): Promise<SyncResult>;
}
