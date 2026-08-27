import { describe, expect, it } from 'vitest';
import { getPastDaysDateStrings, getUtcIsoDateString } from './date-utils';

describe('date-utils', () => {
  it('should generate ISO date string (YYYY-MM-DD)', () => {
    const d = new Date('2026-08-28T10:00:00Z');
    expect(getUtcIsoDateString(d)).toBe('2026-08-28');
  });

  it('should generate list of past N days date strings', () => {
    const list = getPastDaysDateStrings(3);
    expect(list).toHaveLength(3);
    expect(list[0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
