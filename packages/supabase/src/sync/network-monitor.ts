export type NetworkStatusListener = (isOnline: boolean) => void;

export class NetworkMonitor {
  private listeners: NetworkStatusListener[] = [];
  private isOnlineState = true;

  constructor() {
    if (
      typeof window !== 'undefined' &&
      typeof navigator !== 'undefined' &&
      typeof navigator.onLine === 'boolean'
    ) {
      this.isOnlineState = navigator.onLine;
      window.addEventListener('online', () => this.handleStatusChange(true));
      window.addEventListener('offline', () => this.handleStatusChange(false));
    }
  }

  isOnline(): boolean {
    if (typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean') {
      return navigator.onLine;
    }
    return this.isOnlineState;
  }

  onStatusChange(listener: NetworkStatusListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private handleStatusChange(status: boolean): void {
    this.isOnlineState = status;
    for (const listener of this.listeners) {
      listener(status);
    }
  }
}
