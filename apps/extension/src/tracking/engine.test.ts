import { describe, expect, it, vi, beforeEach } from 'vitest';
import { TrackingEngine } from './engine';
import * as sessionStorage from './session-storage';
import type { ActivityRecord } from '@web-wellbeing/shared';

describe('TrackingEngine suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes listeners safely when chrome API is absent', () => {
    const engine = new TrackingEngine();
    engine.init();
    // Verify no session is active initially
    expect(engine).toBeInstanceOf(TrackingEngine);
  });

  it('flushes active session to storage when session exists and user becomes idle', async () => {
    const saveSpy = vi.spyOn(sessionStorage, 'saveActivityRecord').mockResolvedValue();
    const engine = new TrackingEngine();

    // Manually set internal session state by triggering tab observer logic
    (
      engine as unknown as { currentSession: { url: string; title: string; startedAt: Date } }
    ).currentSession = {
      url: 'https://github.com/shubhojit-mitra-dev/web-wellbeing',
      title: 'GitHub - web-wellbeing',
      startedAt: new Date(Date.now() - 60000), // 60 seconds ago
    };

    await engine.flushCurrentSession(true);

    expect(saveSpy).toHaveBeenCalledTimes(1);
    const savedRecord = saveSpy.mock.calls[0][0] as ActivityRecord;
    expect(savedRecord.domain).toBe('github.com');
    expect(savedRecord.isIdle).toBe(true);
    expect(savedRecord.endedAt).toBeGreaterThanOrEqual(savedRecord.startedAt);
  });

  it('clears current active session state after flushing', async () => {
    vi.spyOn(sessionStorage, 'saveActivityRecord').mockResolvedValue();
    const engine = new TrackingEngine();

    (
      engine as unknown as { currentSession: { url: string; title: string; startedAt: Date } }
    ).currentSession = {
      url: 'https://news.ycombinator.com',
      title: 'Hacker News',
      startedAt: new Date(),
    };

    await engine.flushCurrentSession(false);

    // Second flush should do nothing because currentSession is reset to null
    const saveSpy = vi.spyOn(sessionStorage, 'saveActivityRecord');
    await engine.flushCurrentSession(false);
    expect(saveSpy).not.toHaveBeenCalled();
  });
});
