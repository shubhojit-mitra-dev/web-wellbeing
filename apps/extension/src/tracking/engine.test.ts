import { describe, expect, it } from 'vitest';
import { TrackingEngine } from './engine';

describe('TrackingEngine', () => {
  it('should instantiate and initialize without throwing errors', () => {
    const engine = new TrackingEngine();
    expect(() => engine.init()).not.toThrow();
  });

  it('should flush current session safely when empty', async () => {
    const engine = new TrackingEngine();
    await expect(engine.flushCurrentSession()).resolves.not.toThrow();
  });
});
