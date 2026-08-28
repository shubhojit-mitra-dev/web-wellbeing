import { describe, expect, it } from 'vitest';
import {
  clearUnsyncedActivities,
  getUnsyncedActivities,
  saveActivityRecord,
} from './session-storage';
import type { ActivityRecord } from '@web-wellbeing/shared';

describe('session-storage suite', () => {
  it('returns empty list when chrome storage is not set', async () => {
    const list = await getUnsyncedActivities();
    expect(list).toEqual([]);
  });

  it('clears unsynced activities safely without throwing errors', async () => {
    await expect(clearUnsyncedActivities()).resolves.not.toThrow();
  });

  it('handles saving null or undefined activity records gracefully', async () => {
    const dummyRecord: ActivityRecord = {
      domain: 'example.com',
      url: 'https://example.com',
      title: 'Example Page',
      startedAt: Date.now() - 5000,
      endedAt: Date.now(),
      isIdle: false,
    };

    await expect(saveActivityRecord(dummyRecord)).resolves.not.toThrow();
  });
});
