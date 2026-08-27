export type FocusState = 'inactive' | 'active' | 'paused';
export type PomodoroPhase = 'work' | 'break' | 'long-break';
export type BreakTheme = 'warm' | 'monochrome' | 'blur' | 'dim';

export interface FocusSession {
  readonly id: string;
  readonly userId: string;
  readonly startedAt: string;
  readonly endedAt?: string;
  readonly plannedDurationMinutes?: number;
  readonly actualDurationSeconds: number;
  readonly mode: 'focus' | 'pomodoro';
  readonly completed: boolean;
  readonly blockedDomains: readonly string[];
  readonly interruptionCount: number;
}

export interface PomodoroConfig {
  readonly workDurationMinutes: number;
  readonly breakDurationMinutes: number;
  readonly longBreakDurationMinutes: number;
  readonly cyclesBeforeLongBreak: number;
  readonly autoStartBreaks: boolean;
  readonly autoStartWork: boolean;
}

export interface PomodoroPreset {
  readonly id: string;
  readonly name: string;
  readonly config: PomodoroConfig;
  readonly isBuiltIn: boolean;
}
