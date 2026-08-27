import { HeartbeatManager } from './heartbeat';
import { IdleDetector } from './idle-detector';
import { shouldTrackTab } from './privacy-guard';
import { createActivityRecord, type RawTabSession } from './session-builder';
import { saveActivityRecord } from './session-storage';
import { TabObserver } from './tab-observer';
import { WindowTracker } from './window-tracker';

export class TrackingEngine {
  private tabObserver = new TabObserver();
  private windowTracker = new WindowTracker();
  private idleDetector = new IdleDetector();
  private heartbeat = new HeartbeatManager();
  private currentSession: RawTabSession | null = null;

  public init(): void {
    if (typeof chrome === 'undefined') return;

    this.idleDetector.subscribe((state) => {
      if (state !== 'active') {
        void this.flushCurrentSession(true);
      }
    });

    this.tabObserver.subscribe((tabState) => {
      if (!tabState || !shouldTrackTab(tabState.url, tabState.incognito, false)) {
        void this.flushCurrentSession();
        return;
      }

      void this.flushCurrentSession();
      this.currentSession = {
        url: tabState.url,
        title: tabState.title,
        startedAt: new Date(),
      };
    });

    if (chrome.tabs) {
      chrome.tabs.onActivated.addListener(() => {
        void this.tabObserver.updateActiveTab();
      });

      chrome.tabs.onUpdated.addListener((_tabId, changeInfo) => {
        if (changeInfo.url || changeInfo.title) {
          void this.tabObserver.updateActiveTab();
        }
      });
    }

    if (chrome.windows) {
      chrome.windows.onFocusChanged.addListener((windowId) => {
        this.windowTracker.setActiveWindowId(windowId);
        if (!this.windowTracker.isFocused()) {
          void this.flushCurrentSession();
        } else {
          void this.tabObserver.updateActiveTab();
        }
      });
    }

    if (chrome.idle) {
      chrome.idle.onStateChanged.addListener((state) => {
        this.idleDetector.handleStateChange(state);
      });
    }

    this.heartbeat.setup(() => {
      if (this.currentSession && this.idleDetector.isUserActive()) {
        void this.flushCurrentSession();
        this.currentSession = {
          url: this.currentSession.url,
          title: this.currentSession.title,
          startedAt: new Date(),
        };
      }
    }, 1);
  }

  public async flushCurrentSession(isIdle = false): Promise<void> {
    if (!this.currentSession) return;

    const record = createActivityRecord(this.currentSession, new Date(), isIdle);
    this.currentSession = null;
    await saveActivityRecord(record);
  }
}
