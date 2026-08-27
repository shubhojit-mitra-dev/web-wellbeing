import { describe, expect, it, vi } from 'vitest';
import { HeartbeatManager } from './heartbeat';

describe('HeartbeatManager', () => {
  it('should trigger callback on tick', async () => {
    const manager = new HeartbeatManager();
    const callback = vi.fn();
    manager.setup(callback);

    await manager.triggerTick();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
