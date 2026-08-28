export const SYNC_ALARM_NAME = 'wellbeing_periodic_sync_alarm';
export const DEFAULT_SYNC_INTERVAL_MINUTES = 5;

export function registerSyncAlarm(intervalMinutes = DEFAULT_SYNC_INTERVAL_MINUTES): void {
  if (typeof chrome === 'undefined' || !chrome.alarms) {
    return;
  }

  chrome.alarms.create(SYNC_ALARM_NAME, {
    periodInMinutes: intervalMinutes,
  });
}

export function unregisterSyncAlarm(): void {
  if (typeof chrome === 'undefined' || !chrome.alarms) {
    return;
  }

  chrome.alarms.clear(SYNC_ALARM_NAME);
}
