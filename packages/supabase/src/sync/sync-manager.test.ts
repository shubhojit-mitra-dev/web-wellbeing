import { describe, expect, it, vi } from 'vitest';
import { NetworkMonitor } from './network-monitor';
import { OfflineSyncQueue } from './offline-queue';
import { ExponentialBackoffManager } from './retry-backoff';
import { SyncManager } from './sync-manager';
import type { ISyncStrategy } from './sync-strategy.interface';

describe('SyncManager', () => {
  it('should return offline error when network is offline', async () => {
    const mockStrategy: ISyncStrategy = {
      name: 'mock',
      sync: vi.fn(),
    };
    const queue = new OfflineSyncQueue();
    const network = new NetworkMonitor();
    vi.spyOn(network, 'isOnline').mockReturnValue(false);
    const backoff = new ExponentialBackoffManager();

    const manager = new SyncManager(mockStrategy, queue, network, backoff);
    const result = await manager.syncPending();

    expect(result.success).toBe(false);
    expect(result.errors[0]?.message).toBe('Device is offline');
  });

  it('should swap strategies dynamically via setStrategy', () => {
    const strat1: ISyncStrategy = { name: 's1', sync: vi.fn() };
    const strat2: ISyncStrategy = { name: 's2', sync: vi.fn() };
    const queue = new OfflineSyncQueue();
    const network = new NetworkMonitor();
    const backoff = new ExponentialBackoffManager();

    const manager = new SyncManager(strat1, queue, network, backoff);
    expect(manager.getStrategy().name).toBe('s1');

    manager.setStrategy(strat2);
    expect(manager.getStrategy().name).toBe('s2');
  });
});
