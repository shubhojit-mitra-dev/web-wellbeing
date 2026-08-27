import { describe, expect, it } from 'vitest';
import { createActivityRecord } from './session-builder';

describe('session-builder', () => {
  it('should build activity record from raw tab session', () => {
    const startedAt = new Date('2026-08-28T10:00:00Z');
    const endedAt = new Date('2026-08-28T10:05:00Z');

    const record = createActivityRecord(
      {
        url: 'https://github.com/shubhojit-mitra-dev/web-wellbeing',
        title: 'GitHub - web-wellbeing',
        startedAt,
      },
      endedAt,
      false,
    );

    expect(record.domain).toBe('github.com');
    expect(record.durationSeconds).toBe(300);
    expect(record.isIdle).toBe(false);
  });
});
