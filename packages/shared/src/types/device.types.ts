export type SyncStatus = 'synced' | 'syncing' | 'error' | 'offline';

export interface Device {
  readonly id: string;
  readonly userId: string;
  readonly browser: 'chrome' | 'firefox' | 'edge' | 'other';
  readonly extensionVersion: string;
  readonly deviceName?: string;
  readonly lastSeenAt: string;
  readonly createdAt: string;
}

export interface SyncBatch<T> {
  readonly batchId: string;
  readonly deviceId: string;
  readonly items: readonly T[];
  readonly timestamp: number;
}

export interface SyncResult {
  readonly success: boolean;
  readonly itemsProcessed: number;
  readonly error?: string;
}
