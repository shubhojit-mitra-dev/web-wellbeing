export const ALARM_NAMES = {
  HEARTBEAT: 'web-wellbeing-heartbeat',
  SYNC_BATCH: 'web-wellbeing-sync-batch',
  POMODORO_TICK: 'web-wellbeing-pomodoro-tick',
} as const;

export function setupAlarms(): void {
  chrome.alarms.create(ALARM_NAMES.HEARTBEAT, { periodInMinutes: 0.5 });
  chrome.alarms.create(ALARM_NAMES.SYNC_BATCH, { periodInMinutes: 5.0 });

  chrome.alarms.onAlarm.addListener((alarm) => {
    switch (alarm.name) {
      case ALARM_NAMES.HEARTBEAT:
        console.log('[Alarms] Heartbeat tick');
        break;
      case ALARM_NAMES.SYNC_BATCH:
        console.log('[Alarms] Sync batch tick');
        break;
      case ALARM_NAMES.POMODORO_TICK:
        console.log('[Alarms] Pomodoro tick');
        break;
      default:
        console.warn('[Alarms] Unknown alarm triggered', alarm.name);
    }
  });
}
