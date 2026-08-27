export interface TabResourceInfo {
  readonly tabId: number;
  readonly domain: string;
  readonly title?: string;
  readonly memoryMb: number;
  readonly idleMinutes: number;
  readonly isAudible: boolean;
  readonly isPinned: boolean;
}

export interface RamSnapshot {
  readonly id: string;
  readonly userId: string;
  readonly deviceId: string;
  readonly tabs: readonly TabResourceInfo[];
  readonly totalMemoryMb: number;
  readonly recordedAt: string;
}

export interface CleanupSuggestion {
  readonly tabId: number;
  readonly domain: string;
  readonly memoryMb: number;
  readonly idleMinutes: number;
  readonly reason: 'high_ram_long_idle' | 'excessive_tabs';
}

export interface TabHealthStatus {
  readonly totalTabs: number;
  readonly totalWindows: number;
  readonly totalRamMb: number;
  readonly suggestions: readonly CleanupSuggestion[];
}
