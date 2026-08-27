export type SessionState = 'active' | 'idle' | 'locked' | 'ended';

export interface Session {
  readonly id: string;
  readonly userId: string;
  readonly deviceId: string;
  readonly startedAt: string;
  readonly endedAt?: string;
  readonly state: SessionState;
  readonly totalDurationSeconds: number;
  readonly idleDurationSeconds: number;
}

export interface SessionBoundary {
  readonly lastActivityTimestamp: number;
  readonly currentTimestamp: number;
  readonly idleThresholdSeconds: number;
  readonly isBoundaryExceeded: boolean;
}
