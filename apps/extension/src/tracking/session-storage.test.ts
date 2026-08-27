import { describe, expect, it } from 'vitest';
import { clearUnsyncedActivities, getUnsyncedActivities } from './session-storage';

describe('session-storage', () => {
  it('should return empty list when chrome storage is not set', async () => {
    const list = await getUnsyncedActivities();
    expect(list).toEqual([]);
  });

  it('should clear activities safely', async () => {
    await expect(clearUnsyncedActivities()).resolves.not.toThrow();
  });
});
