import type { ActivityRecord } from '@web-wellbeing/shared';

const STORAGE_KEY_ACTIVITIES = 'wellbeing_un-synced_activities';

export async function saveActivityRecord(record: ActivityRecord): Promise<void> {
  if (typeof chrome === 'undefined' || !chrome.storage || !record) {
    return;
  }

  try {
    const result = await chrome.storage.local.get([STORAGE_KEY_ACTIVITIES]);
    const existing: ActivityRecord[] = (result?.[STORAGE_KEY_ACTIVITIES] as ActivityRecord[]) ?? [];
    existing.push(record);
    await chrome.storage.local.set({ [STORAGE_KEY_ACTIVITIES]: existing });
  } catch (error) {
    console.error('Failed to save activity record to storage:', error);
  }
}

export async function getUnsyncedActivities(): Promise<ActivityRecord[]> {
  if (typeof chrome === 'undefined' || !chrome.storage) {
    return [];
  }

  try {
    const result = await chrome.storage.local.get([STORAGE_KEY_ACTIVITIES]);
    return (result?.[STORAGE_KEY_ACTIVITIES] as ActivityRecord[]) ?? [];
  } catch (error) {
    console.error('Failed to retrieve unsynced activities:', error);
    return [];
  }
}

export async function clearUnsyncedActivities(): Promise<void> {
  if (typeof chrome === 'undefined' || !chrome.storage) {
    return;
  }

  try {
    await chrome.storage.local.remove(STORAGE_KEY_ACTIVITIES);
  } catch (error) {
    console.error('Failed to clear unsynced activities:', error);
  }
}
