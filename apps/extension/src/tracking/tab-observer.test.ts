import { describe, expect, it, vi } from 'vitest';
import { TabObserver } from './tab-observer';

describe('TabObserver', () => {
  it('should initialize with null active tab', () => {
    const observer = new TabObserver();
    expect(observer.getActiveTab()).toBeNull();
  });

  it('should allow subscription to state changes', () => {
    const observer = new TabObserver();
    const listener = vi.fn();
    const unsubscribe = observer.subscribe(listener);

    expect(listener).not.toHaveBeenCalled();
    unsubscribe();
  });
});
