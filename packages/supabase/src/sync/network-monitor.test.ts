import { describe, expect, it } from 'vitest';
import { NetworkMonitor } from './network-monitor';

describe('NetworkMonitor', () => {
  it('should initialize and report boolean status', () => {
    const monitor = new NetworkMonitor();
    expect(typeof monitor.isOnline()).toBe('boolean');
  });
});
