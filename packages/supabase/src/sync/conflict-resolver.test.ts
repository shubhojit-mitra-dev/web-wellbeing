import type { ActivityRecord } from '@web-wellbeing/shared';
import { describe, expect, it } from 'vitest';
import { ConflictResolver } from './conflict-resolver';

describe('ConflictResolver', () => {
  it('should resolve conflicts using last write wins', () => {
    const resolver = new ConflictResolver();
    const now = Date.now();
    const older: ActivityRecord = {
      domain: 'github.com',
      startedAt: now - 300000,
      endedAt: now - 60000,
      isIdle: false,
    };

    const newer: ActivityRecord = {
      domain: 'github.com',
      startedAt: now - 300000,
      endedAt: now,
      isIdle: false,
    };

    const resolved = resolver.resolveLastWriteWins(newer, older);
    expect(resolved.endedAt).toBe(now);
  });
});
