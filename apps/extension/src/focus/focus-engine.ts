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
  private pausedRemainingSeconds = 0;

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
    if (this.state === 'inactive' || !this.activeSession) {
      return 0;
    }

    if (this.state === 'paused') {
      return this.pausedRemainingSeconds;
    }

    const elapsedMs = Date.now() - new Date(this.activeSession.startedAt).getTime();
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    const totalPlannedSeconds = (this.activeSession.plannedDurationMinutes ?? 25) * 60;

    return Math.max(0, totalPlannedSeconds - elapsedSeconds);
  }

  public async startSession(options: StartSessionOptions = {}): Promise<FocusSession> {
    const { mode = 'focus', plannedDurationMinutes = 25, blockedDomains = [] } = options;

    this.interruptionCount = 0;
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

    this.pausedRemainingSeconds = plannedDurationMinutes * 60;
    await updateDynamicRules(blockedDomains);

    return this.activeSession;
  }

  public pauseSession(): void {
    if (this.state === 'active') {
      this.pausedRemainingSeconds = this.getRemainingSeconds();
      this.state = 'paused';
    }
  }

  public resumeSession(): void {
    if (this.state === 'paused') {
      this.state = 'active';
    }
  }

  public async endSession(completed = false): Promise<FocusSession | null> {
    const session = this.activeSession;

    if (session) {
      const actualDurationSeconds = Math.floor(
        (Date.now() - new Date(session.startedAt).getTime()) / 1000,
      );

      const endedSession: FocusSession = {
        ...session,
        endedAt: new Date().toISOString(),
        actualDurationSeconds,
        completed,
        interruptionCount: this.interruptionCount,
      };

      this.activeSession = null;
      this.state = 'inactive';
      this.pausedRemainingSeconds = 0;

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
}
