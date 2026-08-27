import { describe, expect, it } from 'vitest';
import { ContentObserver } from './content-observer';

describe('ContentObserver', () => {
  it('should initialize and report default visibility state', () => {
    const observer = new ContentObserver();
    observer.init();

    const state = observer.getPageVisibility();
    expect(state).toHaveProperty('isVisible');
    expect(state).toHaveProperty('isFocused');
  });
});
