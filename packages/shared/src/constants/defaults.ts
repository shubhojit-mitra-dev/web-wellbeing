import type { PomodoroPreset } from '../types/focus.types';
import type { UserSettings } from '../types/user.types';

export const BUILTIN_POMODORO_PRESETS: readonly PomodoroPreset[] = [
  {
    id: 'classic',
    name: 'Classic (25/5)',
    isBuiltIn: true,
    config: {
      workDurationMinutes: 25,
      breakDurationMinutes: 5,
      longBreakDurationMinutes: 15,
      cyclesBeforeLongBreak: 4,
      autoStartBreaks: false,
      autoStartWork: false,
    },
  },
  {
    id: 'deep-work',
    name: 'Deep Work (50/10)',
    isBuiltIn: true,
    config: {
      workDurationMinutes: 50,
      breakDurationMinutes: 10,
      longBreakDurationMinutes: 20,
      cyclesBeforeLongBreak: 3,
      autoStartBreaks: false,
      autoStartWork: false,
    },
  },
  {
    id: 'sprint',
    name: 'Sprint (15/3)',
    isBuiltIn: true,
    config: {
      workDurationMinutes: 15,
      breakDurationMinutes: 3,
      longBreakDurationMinutes: 10,
      cyclesBeforeLongBreak: 4,
      autoStartBreaks: true,
      autoStartWork: true,
    },
  },
] as const;

export const DEFAULT_USER_SETTINGS: UserSettings = {
  privacyLevel: 'domain-only',
  allowIncognitoTracking: false,
  idleThresholdSeconds: 300, // 5 minutes
  heartbeatIntervalSeconds: 30,
  ramThresholdMb: 500,
  ramIdleMinutes: 60,
  dailyDataBudgetMb: 2048, // 2 GB
  theme: 'system',
  breakTheme: 'warm',
};
