import type { ActivityRecord } from '@web-wellbeing/shared';
import { describe, expect, it } from 'vitest';
import { ConflictResolver } from './conflict-resolver';

describe('ConflictResolver', () => {
  it('should resolve conflicts using last write wins', () => {
    const resolver = new ConflictResolver();
    const older: ActivityRecord = {
      id: '1',
      userId: 'u1',
      deviceId: 'd1',
      domain: 'github.com',
      categoryId: 1,
      startedAt: '2026-08-27T10:00:00.000Z',
      endedAt: '2026-08-27T10:05:00.000Z',
      durationSeconds: 300,
      isIdle: false,
      tabCount: 1,
      windowCount: 1,
    };

    const newer: ActivityRecord = {
      ...older,
      endedAt: '2026-08-27T10:10:00.000Z',
      durationSeconds: 600,
    };

    const resolved = resolver.resolveLastWriteWins(newer, older);
    expect(resolved.durationSeconds).toBe(600);
  });
});
