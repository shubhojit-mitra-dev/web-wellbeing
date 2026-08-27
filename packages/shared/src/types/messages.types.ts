export type InternalMessageType =
  | 'TRACKING_STATE_CHANGE'
  | 'FOCUS_STATE_CHANGE'
  | 'POMODORO_TICK'
  | 'RAM_ALERT'
  | 'DATA_BUDGET_ALERT'
  | 'SYNC_STATUS_CHANGE';

export interface BaseInternalMessage<T extends InternalMessageType, P> {
  readonly type: T;
  readonly payload: P;
  readonly timestamp: number;
}

export type ExtensionInternalMessage =
  | BaseInternalMessage<'TRACKING_STATE_CHANGE', { state: string; currentDomain?: string }>
  | BaseInternalMessage<'FOCUS_STATE_CHANGE', { isActive: boolean; remainingSeconds?: number }>
  | BaseInternalMessage<'POMODORO_TICK', { phase: string; remainingSeconds: number }>
  | BaseInternalMessage<'RAM_ALERT', { tabId: number; domain: string; memoryMb: number }>
  | BaseInternalMessage<'DATA_BUDGET_ALERT', { percentUsed: number }>
  | BaseInternalMessage<
      'SYNC_STATUS_CHANGE',
      { status: 'synced' | 'syncing' | 'error' | 'offline' }
    >;
