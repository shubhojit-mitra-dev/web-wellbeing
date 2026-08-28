import { describe, expect, it, vi, beforeEach } from 'vitest';
import { FocusEngine } from './focus-engine';

describe('FocusEngine suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes in inactive state with default pomodoro config', () => {
    const engine = new FocusEngine();
    expect(engine.getState()).toBe('inactive');
    expect(engine.getPomodoroPhase()).toBe('work');
    expect(engine.isFocusActive()).toBe(false);
  });

  it('starts focus session, updates active state, and calculates remaining time accurately', async () => {
    const engine = new FocusEngine();
    const blocklist = ['facebook.com', 'twitter.com'];

    await engine.startSession({
      mode: 'focus',
      plannedDurationMinutes: 25,
      blockedDomains: blocklist,
    });

    expect(engine.getState()).toBe('active');
    expect(engine.isFocusActive()).toBe(true);
    expect(engine.getBlockedDomains()).toEqual(blocklist);
    expect(engine.getRemainingSeconds()).toBe(1500); // 25 mins * 60
  });

  it('pauses and resumes active focus session correctly, maintaining remaining seconds across pause duration', async () => {
    const engine = new FocusEngine();
    await engine.startSession({ mode: 'focus', plannedDurationMinutes: 25, blockedDomains: [] });

    engine.pauseSession();
    expect(engine.getState()).toBe('paused');
    expect(engine.isFocusActive()).toBe(false);

    const remainingWhenPaused = engine.getRemainingSeconds();

    engine.resumeSession();
    expect(engine.getState()).toBe('active');
    expect(engine.isFocusActive()).toBe(true);

    // Remaining seconds immediately after resume must match remaining time when paused
    expect(engine.getRemainingSeconds()).toBe(remainingWhenPaused);
  });

  it('ends active focus session and calculates duration', async () => {
    const engine = new FocusEngine();
    await engine.startSession({ mode: 'focus', plannedDurationMinutes: 25, blockedDomains: [] });

    const session = await engine.endSession(true);
    expect(engine.getState()).toBe('inactive');
    expect(engine.isFocusActive()).toBe(false);
    expect(session).toBeDefined();
    if (session) {
      expect(session.completed).toBe(true);
    }
  });

  it('increments interruption count when blocklist site is attempted', async () => {
    const engine = new FocusEngine();
    await engine.startSession({
      mode: 'focus',
      plannedDurationMinutes: 25,
      blockedDomains: ['reddit.com'],
    });

    engine.recordInterruption('reddit.com');
    expect(engine.getInterruptionCount()).toBe(1);
  });
});
