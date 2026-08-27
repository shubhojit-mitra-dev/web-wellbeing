import type { ActivityRecord } from '@web-wellbeing/shared';

const STORAGE_KEY_SYNC_QUEUE = 'wellbeing_offline_sync_queue';

export class OfflineSyncQueue {
  async enqueue(records: readonly ActivityRecord[]): Promise<void> {
    if (typeof chrome === 'undefined' || !chrome.storage) {
      return;
    }
    const current = await this.peek();
    const updated = [...current, ...records];
    await chrome.storage.local.set({ [STORAGE_KEY_SYNC_QUEUE]: updated });
  }

  async peek(): Promise<ActivityRecord[]> {
    if (typeof chrome === 'undefined' || !chrome.storage) {
      return [];
    }
    const result = await chrome.storage.local.get([STORAGE_KEY_SYNC_QUEUE]);
    return (result?.[STORAGE_KEY_SYNC_QUEUE] as ActivityRecord[]) ?? [];
  }

  async dequeue(count: number): Promise<ActivityRecord[]> {
    if (typeof chrome === 'undefined' || !chrome.storage) {
      return [];
    }
    const current = await this.peek();
    const dequeued = current.slice(0, count);
    const remaining = current.slice(count);
    await chrome.storage.local.set({ [STORAGE_KEY_SYNC_QUEUE]: remaining });
    return dequeued;
  }

  async clear(): Promise<void> {
    if (typeof chrome === 'undefined' || !chrome.storage) {
      return;
    }
    await chrome.storage.local.remove(STORAGE_KEY_SYNC_QUEUE);
  }

  async size(): Promise<number> {
    const items = await this.peek();
    return items.length;
  }
}
