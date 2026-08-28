import { describe, expect, it, vi } from 'vitest';
import { NetworkMonitor } from './network-monitor';

describe('NetworkMonitor suite', () => {
  it('initializes and reports boolean online status safely across Node and browser runtimes', () => {
    const monitor = new NetworkMonitor();
    expect(typeof monitor.isOnline()).toBe('boolean');
  });

  it('handles status change listeners and unsubscribes correctly', () => {
    const monitor = new NetworkMonitor();
    const listener = vi.fn();

    const unsubscribe = monitor.onStatusChange(listener);

    // Simulate status change
    (monitor as unknown as { handleStatusChange: (status: boolean) => void }).handleStatusChange(
      false,
    );
    expect(listener).toHaveBeenCalledWith(false);
    expect(monitor.isOnline()).toBe(false);

    unsubscribe();
    (monitor as unknown as { handleStatusChange: (status: boolean) => void }).handleStatusChange(
      true,
    );
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('safely falls back to isOnlineState when navigator exists without onLine boolean property (Node 22 runtime)', () => {
    const originalNavigator = globalThis.navigator;

    try {
      // Simulate Node 22 environment where navigator exists but onLine is undefined
      Object.defineProperty(globalThis, 'navigator', {
        value: {},
        writable: true,
        configurable: true,
      });

      const monitor = new NetworkMonitor();
      expect(typeof monitor.isOnline()).toBe('boolean');
      expect(monitor.isOnline()).toBe(true);
    } finally {
      Object.defineProperty(globalThis, 'navigator', {
        value: originalNavigator,
        writable: true,
        configurable: true,
      });
    }
  });
});
