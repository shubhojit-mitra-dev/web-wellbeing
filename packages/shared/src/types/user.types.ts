export type PrivacyLevel = 'domain-only' | 'full-url';

export interface UserProfile {
  readonly id: string;
  readonly email: string;
  readonly displayName?: string;
  readonly avatarUrl?: string;
  readonly timezone: string;
  readonly dailyGoalMinutes: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface UserSettings {
  readonly privacyLevel: PrivacyLevel;
  readonly allowIncognitoTracking: boolean;
  readonly idleThresholdSeconds: number;
  readonly heartbeatIntervalSeconds: number;
  readonly ramThresholdMb: number;
  readonly ramIdleMinutes: number;
  readonly dailyDataBudgetMb: number;
  readonly theme: 'system' | 'dark' | 'light';
  readonly breakTheme: 'warm' | 'monochrome' | 'blur' | 'dim';
}
