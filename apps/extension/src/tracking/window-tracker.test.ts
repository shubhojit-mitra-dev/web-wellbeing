import { describe, expect, it } from 'vitest';
import { WindowTracker } from './window-tracker';

describe('WindowTracker', () => {
  it('should initialize with null active window', () => {
    const tracker = new WindowTracker();
    expect(tracker.getActiveWindowId()).toBeNull();
    expect(tracker.isFocused()).toBe(false);
  });

  it('should track window focus changes', () => {
    const tracker = new WindowTracker();
    tracker.setActiveWindowId(101);
    expect(tracker.getActiveWindowId()).toBe(101);
    expect(tracker.isFocused()).toBe(true);

    tracker.setActiveWindowId(-1);
    expect(tracker.getActiveWindowId()).toBeNull();
    expect(tracker.isFocused()).toBe(false);
  });
});
