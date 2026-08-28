import { describe, expect, it } from 'vitest';
import { shouldTrackTab } from './privacy-guard';

describe('privacy-guard suite', () => {
  it('ignores browser internal pages and extension schemes', () => {
    expect(shouldTrackTab('chrome://extensions', false, false)).toBe(false);
    expect(shouldTrackTab('chrome-extension://abcdefg/newtab.html', false, false)).toBe(false);
    expect(shouldTrackTab('moz-extension://12345/page.html', false, false)).toBe(false);
    expect(shouldTrackTab('edge://settings', false, false)).toBe(false);
    expect(shouldTrackTab('about:blank', false, false)).toBe(false);
    expect(shouldTrackTab('about:config', false, false)).toBe(false);
  });

  it('honors incognito tracking settings', () => {
    expect(shouldTrackTab('https://example.com', true, false)).toBe(false);
    expect(shouldTrackTab('https://example.com', true, true)).toBe(true);
  });

  it('handles empty, null, or invalid URLs gracefully', () => {
    expect(shouldTrackTab('', false, false)).toBe(false);
    expect(shouldTrackTab('javascript:void(0)', false, false)).toBe(false);
  });
});
