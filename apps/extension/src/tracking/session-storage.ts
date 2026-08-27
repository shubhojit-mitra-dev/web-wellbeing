import type { ActivityRecord } from '@web-wellbeing/shared';

const STORAGE_KEY_ACTIVITIES = 'wellbeing_un-synced_activities';

export async function saveActivityRecord(record: ActivityRecord): Promise<void> {
  if (typeof chrome === 'undefined' || !chrome.storage) {
    return;
  }

  const result = await chrome.storage.local.get([STORAGE_KEY_ACTIVITIES]);
  const existing: ActivityRecord[] = (result[STORAGE_KEY_ACTIVITIES] as ActivityRecord[]) ?? [];
  existing.push(record);
  await chrome.storage.local.set({ [STORAGE_KEY_ACTIVITIES]: existing });
}

export async function getUnsyncedActivities(): Promise<ActivityRecord[]> {
  if (typeof chrome === 'undefined' || !chrome.storage) {
    return [];
  }

  const result = await chrome.storage.local.get([STORAGE_KEY_ACTIVITIES]);
  return (result[STORAGE_KEY_ACTIVITIES] as ActivityRecord[]) ?? [];
}

export async function clearUnsyncedActivities(): Promise<void> {
  if (typeof chrome === 'undefined' || !chrome.storage) {
    return;
  }

  await chrome.storage.local.remove(STORAGE_KEY_ACTIVITIES);
}
