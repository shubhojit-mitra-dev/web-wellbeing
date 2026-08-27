import { describe, expect, it } from 'vitest';
import { shouldTrackTab } from './privacy-guard';

describe('privacy-guard', () => {
  it('should ignore chrome internal pages', () => {
    expect(shouldTrackTab('chrome://extensions', false, false)).toBe(false);
    expect(shouldTrackTab('about:blank', false, false)).toBe(false);
  });

  it('should honor incognito tracking settings', () => {
    expect(shouldTrackTab('https://example.com', true, false)).toBe(false);
    expect(shouldTrackTab('https://example.com', true, true)).toBe(true);
  });
});
