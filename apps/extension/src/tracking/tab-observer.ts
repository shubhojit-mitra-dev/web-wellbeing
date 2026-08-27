import type { TabState } from '@web-wellbeing/shared';

export type TabChangeListener = (tabState: TabState | null) => void;

export class TabObserver {
  private activeTabState: TabState | null = null;
  private listeners: TabChangeListener[] = [];

  public subscribe(listener: TabChangeListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getActiveTab(): TabState | null {
    return this.activeTabState;
  }

  public async updateActiveTab(): Promise<TabState | null> {
    if (typeof chrome === 'undefined' || !chrome.tabs) {
      return null;
    }

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });

      if (!tab || !tab.id || !tab.url) {
        this.setActiveTab(null);
        return null;
      }

      const newState: TabState = {
        tabId: tab.id,
        windowId: tab.windowId,
        url: tab.url,
        title: tab.title ?? '',
        incognito: tab.incognito ?? false,
      };

      this.setActiveTab(newState);
      return newState;
    } catch {
      this.setActiveTab(null);
      return null;
    }
  }

  private setActiveTab(state: TabState | null): void {
    this.activeTabState = state;
    for (const listener of this.listeners) {
      listener(state);
    }
  }
}
