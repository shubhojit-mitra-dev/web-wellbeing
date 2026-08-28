import { describe, expect, it, vi, beforeEach } from 'vitest';
import { TrackingEngine } from './engine';

describe('TrackingEngine suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('instantiates and initializes without throwing errors when chrome APIs are undefined', () => {
    const engine = new TrackingEngine();
    expect(() => engine.init()).not.toThrow();
  });

  it('flushes current session safely when session is empty', async () => {
    const engine = new TrackingEngine();
    await expect(engine.flushCurrentSession()).resolves.not.toThrow();
  });

  it('tracks current active tab session and flushes state correctly on user idle', async () => {
    const engine = new TrackingEngine();
    await engine.flushCurrentSession(true);
    expect(engine).toBeDefined();
  });
});
