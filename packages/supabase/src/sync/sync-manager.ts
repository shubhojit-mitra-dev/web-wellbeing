import type { ActivityRecord } from '@web-wellbeing/shared';
import type { NetworkMonitor } from './network-monitor';
import type { OfflineSyncQueue } from './offline-queue';
import type { ExponentialBackoffManager } from './retry-backoff';
import type { ISyncStrategy, SyncResult } from './sync-strategy.interface';

export class SyncManager {
  private currentStrategy: ISyncStrategy;

  constructor(
    defaultStrategy: ISyncStrategy,
    private readonly queue: OfflineSyncQueue,
    private readonly networkMonitor: NetworkMonitor,
    private readonly backoffManager: ExponentialBackoffManager,
  ) {
    this.currentStrategy = defaultStrategy;
  }

  setStrategy(strategy: ISyncStrategy): void {
    this.currentStrategy = strategy;
  }

  getStrategy(): ISyncStrategy {
    return this.currentStrategy;
  }

  async syncPending(): Promise<SyncResult> {
    if (!this.networkMonitor.isOnline()) {
      return {
        success: false,
        syncedCount: 0,
        failedCount: 0,
        errors: [new Error('Device is offline')],
        retryable: true,
      };
    }

    const pendingRecords = await this.queue.peek();
    if (pendingRecords.length === 0) {
      return {
        success: true,
        syncedCount: 0,
        failedCount: 0,
        errors: [],
        retryable: false,
      };
    }

    const result = await this.currentStrategy.sync(pendingRecords);
    if (result.success) {
      await this.queue.dequeue(result.syncedCount);
      this.backoffManager.reset();
    } else if (result.retryable) {
      this.backoffManager.recordAttempt();
    }

    return result;
  }

  async enqueueAndSync(records: readonly ActivityRecord[]): Promise<SyncResult> {
    await this.queue.enqueue(records);
    return this.syncPending();
  }
}
