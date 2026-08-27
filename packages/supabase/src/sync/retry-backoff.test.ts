import { describe, expect, it } from 'vitest';
import { ExponentialBackoffManager } from './retry-backoff';

describe('ExponentialBackoffManager', () => {
  it('should compute exponential delays correctly up to maxDelay', () => {
    const manager = new ExponentialBackoffManager({
      initialDelayMs: 100,
      maxDelayMs: 500,
      backoffFactor: 2,
      maxAttempts: 4,
    });

    expect(manager.calculateDelay()).toBe(100);
    manager.recordAttempt();
    expect(manager.calculateDelay()).toBe(200);
    manager.recordAttempt();
    expect(manager.calculateDelay()).toBe(400);
    manager.recordAttempt();
    expect(manager.calculateDelay()).toBe(500); // capped at maxDelayMs
    manager.recordAttempt();
    expect(manager.shouldRetry()).toBe(false);
  });
});
