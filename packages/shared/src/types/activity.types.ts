export type ActivityStatus = 'active' | 'idle' | 'paused';

export interface Activity {
  readonly id: string;
  readonly userId: string;
  readonly deviceId: string;
  readonly domain: string;
  readonly url?: string;
  readonly title?: string;
  readonly categoryId: number;
  readonly startedAt: string;
  readonly endedAt: string;
  readonly durationSeconds: number;
  readonly isIdle: boolean;
  readonly tabCount: number;
  readonly windowCount: number;
}

export interface ActivityRecord {
  readonly domain: string;
  readonly url?: string;
  readonly title?: string;
  readonly startedAt: number;
  readonly endedAt: number;
  readonly isIdle: boolean;
}

export interface RawActivity {
  readonly domain: string;
  readonly timestamp: number;
  readonly isIdle: boolean;
}

export interface ActivitySummary {
  readonly domain: string;
  readonly totalDurationSeconds: number;
  readonly visitCount: number;
  readonly categoryId: number;
}
