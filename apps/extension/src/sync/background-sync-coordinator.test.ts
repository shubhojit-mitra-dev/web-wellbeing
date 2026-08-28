import { describe, expect, it, vi, beforeEach } from 'vitest';
import { BackgroundSyncCoordinator } from './background-sync-coordinator';
import type { ActivityRecord } from '@web-wellbeing/shared';

describe('BackgroundSyncCoordinator suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const sampleActivity: ActivityRecord = {
    domain: 'github.com',
    url: 'https://github.com',
    title: 'GitHub',
    startedAt: 1772092800000,
    endedAt: 1772092920000,
    isIdle: false,
  };

  it('enqueues activity item into persistent offline sync queue', async () => {
    const coordinator = new BackgroundSyncCoordinator();
    await coordinator.enqueueActivity(sampleActivity);

    const queuedItems = await coordinator.getQueuedActivities();
    expect(queuedItems).toHaveLength(1);
    expect(queuedItems[0]).toEqual(sampleActivity);
  });

  it('flushes queued activities via repository and clears offline queue on success', async () => {
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
  });

  it('retains queued items in offline queue when sync repository throws error', async () => {
    const coordinator = new BackgroundSyncCoordinator();
    await coordinator.enqueueActivity(sampleActivity);

    const failingRepositoryMock = {
      insertBatch: vi.fn().mockRejectedValue(new Error('Network error')),
      getByDateRange: vi.fn(),
    };

    await expect(coordinator.flushQueue(failingRepositoryMock)).rejects.toThrow('Network error');

    const remainingQueue = await coordinator.getQueuedActivities();
    expect(remainingQueue).toHaveLength(1);
  });
});
