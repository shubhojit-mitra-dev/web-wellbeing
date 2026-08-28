import { describe, expect, it, vi, beforeEach } from 'vitest';
import { BackgroundSyncCoordinator } from './background-sync-coordinator';
import type { ActivityRecord } from '@web-wellbeing/shared';

describe('BackgroundSyncCoordinator suite', () => {
  let mockStorage: Record<string, unknown> = {};

  beforeEach(() => {
    vi.restoreAllMocks();
    mockStorage = {};

    vi.stubGlobal('chrome', {
      storage: {
        local: {
          get: vi.fn((key: string) => Promise.resolve({ [key]: mockStorage[key] })),
          set: vi.fn((data: Record<string, unknown>) => {
            Object.assign(mockStorage, data);
            return Promise.resolve();
          }),
        },
      },
    });
  });

  const sampleActivity: ActivityRecord = {
    domain: 'github.com',
    url: 'https://github.com',
    title: 'GitHub',
    startedAt: 1772092800000,
    endedAt: 1772092920000,
    isIdle: false,
  };

  it('enqueues activity item, loading existing storage items first to prevent data loss', async () => {
    mockStorage['wellbeing_offline_sync_queue'] = [
      { domain: 'existing.com', startedAt: 1, endedAt: 2, isIdle: false },
    ];

    const coordinator = new BackgroundSyncCoordinator();
    await coordinator.enqueueActivity(sampleActivity);

    const queuedItems = await coordinator.getQueuedActivities();
    expect(queuedItems).toHaveLength(2);
    expect(queuedItems[1]).toEqual(sampleActivity);
    expect(chrome.storage.local.set).toHaveBeenCalledWith({
      wellbeing_offline_sync_queue: [
        { domain: 'existing.com', startedAt: 1, endedAt: 2, isIdle: false },
        sampleActivity,
      ],
    });
  });

  it('flushes queued activities via repository and clears chrome.storage.local on success', async () => {
    const coordinator = new BackgroundSyncCoordinator();
    await coordinator.enqueueActivity(sampleActivity);

    const repositoryMock = {
      insertBatch: vi.fn().mockResolvedValue(undefined),
      getByDateRange: vi.fn(),
    };

    const count = await coordinator.flushQueue(repositoryMock);

    expect(count).toBe(1);
    expect(repositoryMock.insertBatch).toHaveBeenCalledWith([sampleActivity]);

    const remainingQueue = await coordinator.getQueuedActivities();
    expect(remainingQueue).toHaveLength(0);
    expect(mockStorage['wellbeing_offline_sync_queue']).toEqual([]);
  });

  it('retains queued items in chrome.storage.local when sync repository throws error', async () => {
    const coordinator = new BackgroundSyncCoordinator();
    await coordinator.enqueueActivity(sampleActivity);

    const failingRepositoryMock = {
      insertBatch: vi.fn().mockRejectedValue(new Error('Network error')),
      getByDateRange: vi.fn(),
    };

    await expect(coordinator.flushQueue(failingRepositoryMock)).rejects.toThrow('Network error');

    const remainingQueue = await coordinator.getQueuedActivities();
    expect(remainingQueue).toHaveLength(1);
    expect(mockStorage['wellbeing_offline_sync_queue']).toEqual([sampleActivity]);
  });
});
