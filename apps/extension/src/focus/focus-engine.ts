import type { FocusSession, FocusState, PomodoroPhase } from '@web-wellbeing/shared';
import { updateDynamicRules } from './declarative-net-request';

export interface StartSessionOptions {
  mode?: 'focus' | 'pomodoro';
  plannedDurationMinutes?: number;
  blockedDomains?: string[];
}

export class FocusEngine {
  private state: FocusState = 'inactive';
  private pomodoroPhase: PomodoroPhase = 'work';
  private activeSession: FocusSession | null = null;
  private interruptionCount = 0;
  private timerId: ReturnType<typeof setInterval> | null = null;
  private remainingSeconds = 0;

  public getState(): FocusState {
    return this.state;
  }

  public getPomodoroPhase(): PomodoroPhase {
    return this.pomodoroPhase;
  }

  public isFocusActive(): boolean {
    return this.state === 'active';
  }

  public getBlockedDomains(): readonly string[] {
    return this.activeSession?.blockedDomains ?? [];
  }

  public getInterruptionCount(): number {
    return this.interruptionCount;
  }

  public getRemainingSeconds(): number {
    return this.remainingSeconds;
  }

  public async startSession(options: StartSessionOptions = {}): Promise<FocusSession> {
    const { mode = 'focus', plannedDurationMinutes = 25, blockedDomains = [] } = options;

    this.interruptionCount = 0;
    this.remainingSeconds = plannedDurationMinutes * 60;
    this.state = 'active';
    this.pomodoroPhase = 'work';

    this.activeSession = {
      id: crypto.randomUUID(),
      userId: 'local-user',
      startedAt: new Date().toISOString(),
      plannedDurationMinutes,
      actualDurationSeconds: 0,
      mode,
      completed: false,
      blockedDomains,
      interruptionCount: 0,
    };

    await updateDynamicRules(blockedDomains);
    this.startTimer();

    return this.activeSession;
  }

  public pauseSession(): void {
    if (this.state === 'active') {
      this.state = 'paused';
      this.stopTimer();
    }
  }

  public resumeSession(): void {
    if (this.state === 'paused') {
      this.state = 'active';
      this.startTimer();
    }
  }

  public async endSession(completed = false): Promise<FocusSession | null> {
    this.stopTimer();
    const session = this.activeSession;

    if (session) {
      const endedSession: FocusSession = {
        ...session,
        endedAt: new Date().toISOString(),
        completed,
        interruptionCount: this.interruptionCount,
      };

      this.activeSession = null;
      this.state = 'inactive';
      this.remainingSeconds = 0;

      await updateDynamicRules([]);
      return endedSession;
    }

    this.state = 'inactive';
    return null;
  }

  public recordInterruption(_domain: string): void {
    if (this.state === 'active') {
      this.interruptionCount += 1;
    }
  }

  private startTimer(): void {
    this.stopTimer();
    this.timerId = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds -= 1;
      } else {
        void this.endSession(true);
      }
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
