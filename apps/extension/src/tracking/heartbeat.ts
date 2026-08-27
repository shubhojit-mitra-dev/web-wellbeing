export type HeartbeatCallback = () => void | Promise<void>;

export class HeartbeatManager {
  private alarmName = 'tracking_heartbeat_alarm';
  private callback: HeartbeatCallback | null = null;

  public setup(callback: HeartbeatCallback, intervalMinutes = 1): void {
    this.callback = callback;
    if (typeof chrome !== 'undefined' && chrome.alarms) {
      chrome.alarms.create(this.alarmName, {
        periodInMinutes: intervalMinutes,
      });

      chrome.alarms.onAlarm.addListener((alarm) => {
        if (alarm.name === this.alarmName && this.callback) {
          void this.callback();
        }
      });
    }
  }

  public async triggerTick(): Promise<void> {
    if (this.callback) {
      await this.callback();
    }
  }

  public clear(): void {
    if (typeof chrome !== 'undefined' && chrome.alarms) {
      void chrome.alarms.clear(this.alarmName);
    }
  }
}
