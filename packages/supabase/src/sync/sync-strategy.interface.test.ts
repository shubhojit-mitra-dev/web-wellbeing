import { describe, expect, it } from 'vitest';
import type { ISyncStrategy, SyncResult } from './sync-strategy.interface';

describe('ISyncStrategy Contract', () => {
  it('should allow valid implementation of ISyncStrategy', async () => {
    class DummyStrategy implements ISyncStrategy {
      readonly name = 'dummy';
      async sync(): Promise<SyncResult> {
        return {
          success: true,
          syncedCount: 1,
          failedCount: 0,
          errors: [],
          retryable: false,
        };
      }
    }

    const strategy = new DummyStrategy();
    expect(strategy.name).toBe('dummy');
    const result = await strategy.sync();
    expect(result.success).toBe(true);
    expect(result.syncedCount).toBe(1);
  });
});
