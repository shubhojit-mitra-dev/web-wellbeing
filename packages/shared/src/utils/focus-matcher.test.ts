import { describe, expect, it } from 'vitest';
import { isDomainBlocked } from './focus-matcher';

describe('focus-matcher utility suite', () => {
  const blocklist = ['facebook.com', 'twitter.com', 'reddit.com', 'youtube.com'];

  it('identifies exact domain matches in blocklist', () => {
    expect(isDomainBlocked('facebook.com', blocklist)).toBe(true);
    expect(isDomainBlocked('twitter.com', blocklist)).toBe(true);
  });

  it('identifies subdomain matches (e.g. m.facebook.com or www.reddit.com)', () => {
    expect(isDomainBlocked('m.facebook.com', blocklist)).toBe(true);
    expect(isDomainBlocked('www.reddit.com', blocklist)).toBe(true);
    expect(isDomainBlocked('old.reddit.com', blocklist)).toBe(true);
  });

  it('allows non-blocked domains', () => {
    expect(isDomainBlocked('github.com', blocklist)).toBe(false);
    expect(isDomainBlocked('stackoverflow.com', blocklist)).toBe(false);
  });

  it('handles empty blocklists, null inputs, and case sensitivity gracefully', () => {
    expect(isDomainBlocked('facebook.com', [])).toBe(false);
    expect(isDomainBlocked('FACEBOOK.COM', blocklist)).toBe(true);
    expect(isDomainBlocked('', blocklist)).toBe(false);
    expect(isDomainBlocked(null as unknown as string, blocklist)).toBe(false);
  });
});
