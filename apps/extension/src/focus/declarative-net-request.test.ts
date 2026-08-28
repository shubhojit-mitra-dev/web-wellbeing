import { describe, expect, it } from 'vitest';
import { buildBlockingRules } from './declarative-net-request';

describe('declarative-net-request rule builder suite', () => {
  it('generates declarativeNetRequest redirect rules for blocked domain list', () => {
    const domains = ['facebook.com', 'twitter.com'];
    const rules = buildBlockingRules(domains);

    expect(rules).toHaveLength(2);
    expect(rules[0].id).toBe(1);
    expect(rules[0].action.type).toBe('redirect');
    expect(rules[0].condition.urlFilter).toBe('*://*.facebook.com/*');

    expect(rules[1].id).toBe(2);
    expect(rules[1].condition.urlFilter).toBe('*://*.twitter.com/*');
  });

  it('returns empty rules array for empty domain list or invalid inputs', () => {
    expect(buildBlockingRules([])).toHaveLength(0);
    expect(buildBlockingRules(null as unknown as string[])).toHaveLength(0);
  });
});
