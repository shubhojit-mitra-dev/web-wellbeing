export class WindowTracker {
  private activeWindowId: number | null = null;

  public getActiveWindowId(): number | null {
    return this.activeWindowId;
  }

  public setActiveWindowId(windowId: number): void {
    if (windowId === -1) {
      // Chrome uses -1 (WINDOW_ID_NONE) when browser loses focus
      this.activeWindowId = null;
    } else {
      this.activeWindowId = windowId;
    }
  }

  public isFocused(): boolean {
    return this.activeWindowId !== null;
  }
}
