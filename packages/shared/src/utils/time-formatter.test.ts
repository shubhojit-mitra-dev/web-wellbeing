import { describe, expect, it } from 'vitest';
import { formatDuration, isSameDay, isToday } from './time-formatter';

describe('time-formatter', () => {
  it('should format seconds into human readable duration', () => {
    expect(formatDuration(45)).toBe('45s');
    expect(formatDuration(150)).toBe('2m 30s');
    expect(formatDuration(3665)).toBe('1h 1m');
  });

  it('should check if dates are on the same day', () => {
    const date1 = new Date('2026-01-01T10:00:00Z');
    const date2 = new Date('2026-01-01T15:30:00Z');
    const date3 = new Date('2026-01-02T10:00:00Z');

    expect(isSameDay(date1, date2)).toBe(true);
    expect(isSameDay(date1, date3)).toBe(false);
  });

  it('should check if date is today', () => {
    expect(isToday(new Date())).toBe(true);
    expect(isToday(new Date('2000-01-01'))).toBe(false);
  });
});
