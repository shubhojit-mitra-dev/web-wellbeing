import { describe, expect, it, vi } from 'vitest';
import { IdleDetector } from './idle-detector';

describe('IdleDetector', () => {
  it('should default to active state', () => {
    const detector = new IdleDetector();
    expect(detector.getIdleState()).toBe('active');
    expect(detector.isUserActive()).toBe(true);
  });

  it('should transition states and notify listeners', () => {
    const detector = new IdleDetector();
    const listener = vi.fn();
    detector.subscribe(listener);

    detector.handleStateChange('idle');
    expect(detector.getIdleState()).toBe('idle');
    expect(detector.isUserActive()).toBe(false);
    expect(listener).toHaveBeenCalledWith('idle');
  });
});
