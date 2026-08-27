import { describe, expect, it } from 'vitest';
import { OfflineSyncQueue } from './offline-queue';

describe('OfflineSyncQueue', () => {
  it('should return empty list when chrome.storage is undefined in non-extension environments', async () => {
    const queue = new OfflineSyncQueue();
    expect(await queue.peek()).toEqual([]);
    expect(await queue.size()).toBe(0);
  });
});
