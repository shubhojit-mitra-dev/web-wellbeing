export type VisibilityState = 'visible' | 'hidden';

export class ContentObserver {
  private isVisible = true;
  private isFocused = true;

  public init(): void {
    if (typeof document !== 'undefined') {
      this.isVisible = !document.hidden;
      document.addEventListener('visibilitychange', () => {
        this.isVisible = !document.hidden;
        this.notifyState();
      });
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('focus', () => {
        this.isFocused = true;
        this.notifyState();
      });

      window.addEventListener('blur', () => {
        this.isFocused = false;
        this.notifyState();
      });
    }
  }

  public getPageVisibility(): { isVisible: boolean; isFocused: boolean } {
    return {
      isVisible: this.isVisible,
      isFocused: this.isFocused,
    };
  }

  private notifyState(): void {
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      chrome.runtime
        .sendMessage({
          type: 'PAGE_VISIBILITY_CHANGE',
          payload: this.getPageVisibility(),
        })
        .catch(() => {
          // Extension context invalidated
        });
    }
  }
}
