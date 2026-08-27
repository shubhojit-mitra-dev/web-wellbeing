import { describe, expect, it } from 'vitest';
import { extractHostname, isSubdomain, parseDomain } from './domain-parser';

describe('domain-parser', () => {
  it('should parse simple domain correctly', () => {
    expect(parseDomain('https://github.com/user/repo')).toBe('github.com');
    expect(parseDomain('http://www.google.com')).toBe('google.com');
  });

  it('should handle domain without protocol', () => {
    expect(parseDomain('youtube.com/watch?v=123')).toBe('youtube.com');
    expect(parseDomain('www.reddit.com')).toBe('reddit.com');
  });

  it('should extract hostname', () => {
    expect(extractHostname('https://sub.domain.com/path')).toBe('sub.domain.com');
  });

  it('should check subdomains correctly', () => {
    expect(isSubdomain('api.github.com', 'github.com')).toBe(true);
    expect(isSubdomain('github.com', 'github.com')).toBe(true);
    expect(isSubdomain('notgithub.com', 'github.com')).toBe(false);
  });
});
