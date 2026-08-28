import type { ActivityRecord } from '@web-wellbeing/shared';
import type { IActivityRepository } from '@web-wellbeing/supabase';

const STORAGE_KEY = 'wellbeing_offline_sync_queue';

export class BackgroundSyncCoordinator {
  private inMemoryQueue: ActivityRecord[] = [];

  public async enqueueActivity(activity: ActivityRecord): Promise<void> {
    this.inMemoryQueue.push(activity);
    await this.persistQueue();
  }

  public async getQueuedActivities(): Promise<readonly ActivityRecord[]> {
    await this.loadQueue();
    return this.inMemoryQueue;
  }

  public async flushQueue(repository: IActivityRepository): Promise<number> {
    await this.loadQueue();

    if (this.inMemoryQueue.length === 0) {
      return 0;
    }

    const itemsToSync = [...this.inMemoryQueue];
    await repository.insertBatch(itemsToSync);

    this.inMemoryQueue = [];
    await this.persistQueue();

    return itemsToSync.length;
  }

  private async loadQueue(): Promise<void> {
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      try {
        const result = await chrome.storage.local.get(STORAGE_KEY);
        if (Array.isArray(result[STORAGE_KEY])) {
          this.inMemoryQueue = result[STORAGE_KEY] as ActivityRecord[];
        }
      } catch (error) {
        console.error('Failed to load offline sync queue from chrome.storage:', error);
      }
    }
  }

  private async persistQueue(): Promise<void> {
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      try {
        await chrome.storage.local.set({ [STORAGE_KEY]: this.inMemoryQueue });
      } catch (error) {
        console.error('Failed to persist offline sync queue to chrome.storage:', error);
      }
    }
  }
}
