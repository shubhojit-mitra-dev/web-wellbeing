export const ALARM_NAMES = {
  HEARTBEAT: 'web-wellbeing-heartbeat',
  SYNC_BATCH: 'web-wellbeing-sync-batch',
  POMODORO_TICK: 'web-wellbeing-pomodoro-tick',
} as const;

/**
 * Set up Chrome alarms for the background service worker.
 *
 * Sync is intentionally NOT performed directly here — the service worker has no
 * DOM and cannot safely load @supabase/supabase-js. Instead, a SYNC_TRIGGER
 * message is broadcast to the extension frontend (newtab / popup) which carries
 * out the actual Supabase network call within a page context that has full DOM.
 */
export function setupAlarms(): void {
  if (typeof chrome === 'undefined' || !chrome.alarms) {
    return;
  }

  chrome.alarms.create(ALARM_NAMES.HEARTBEAT, { periodInMinutes: 0.5 });
  chrome.alarms.create(ALARM_NAMES.SYNC_BATCH, { periodInMinutes: 5.0 });

  chrome.alarms.onAlarm.addListener((alarm) => {
    switch (alarm.name) {
      case ALARM_NAMES.HEARTBEAT:
        console.log('[Alarms] Heartbeat tick');
        break;

      case ALARM_NAMES.SYNC_BATCH:
        console.log('[Alarms] Sync batch tick — broadcasting sync trigger');
        // Broadcast to all extension pages; the newtab / popup page performs
        // the actual Supabase flush so the SW never touches the DOM.
        chrome.runtime.sendMessage({ type: 'SYNC_TRIGGER' }).catch(() => {
          // No listeners open — extension page is not active, safe to ignore.
        });
        break;

      case ALARM_NAMES.POMODORO_TICK:
        console.log('[Alarms] Pomodoro tick');
        break;

      default:
        console.warn('[Alarms] Unknown alarm triggered', alarm.name);
    }
  });
}
