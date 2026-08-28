import { describe, expect, it, vi, beforeEach } from 'vitest';
import { TabObserver } from './tab-observer';

describe('TabObserver suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with null active tab state', () => {
    const observer = new TabObserver();
    expect(observer.getActiveTab()).toBeNull();
  });

  it('allows subscribing and unsubscribing listeners to tab state changes', () => {
    const observer = new TabObserver();
    const listener = vi.fn();
    const unsubscribe = observer.subscribe(listener);

    expect(listener).not.toHaveBeenCalled();
    unsubscribe();
  });

  it('returns null when chrome API is not available during tab update', async () => {
    const observer = new TabObserver();
    const result = await observer.updateActiveTab();
    expect(result).toBeNull();
    expect(observer.getActiveTab()).toBeNull();
  });
});
