export type IdleState = 'active' | 'idle' | 'locked';
export type IdleChangeListener = (newState: IdleState) => void;

export class IdleDetector {
  private currentState: IdleState = 'active';
  private listeners: IdleChangeListener[] = [];
  private detectionIntervalSeconds = 300; // default 5 mins

  public setDetectionInterval(seconds: number): void {
    this.detectionIntervalSeconds = seconds;
    if (typeof chrome !== 'undefined' && chrome.idle) {
      chrome.idle.setDetectionInterval(seconds);
    }
  }

  public getDetectionInterval(): number {
    return this.detectionIntervalSeconds;
  }

  public getIdleState(): IdleState {
    return this.currentState;
  }

  public isUserActive(): boolean {
    return this.currentState === 'active';
  }

  public subscribe(listener: IdleChangeListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public handleStateChange(newState: IdleState): void {
    this.currentState = newState;
    for (const listener of this.listeners) {
      listener(newState);
    }
  }
}
