import { describe, expect, it } from 'vitest';
import type { Activity } from '../types/activity.types';
import { aggregateTimeByDomain } from './aggregator';

describe('aggregator', () => {
  it('should aggregate duration per domain sorted descending', () => {
    const activities: Activity[] = [
      {
        id: '1',
        userId: 'u',
        deviceId: 'd',
        domain: 'github.com',
        categoryId: 1,
        startedAt: '',
        endedAt: '',
        durationSeconds: 100,
        isIdle: false,
        tabCount: 1,
        windowCount: 1,
      },
      {
        id: '2',
        userId: 'u',
        deviceId: 'd',
        domain: 'github.com',
        categoryId: 1,
        startedAt: '',
        endedAt: '',
        durationSeconds: 200,
        isIdle: false,
        tabCount: 1,
        windowCount: 1,
      },
      {
        id: '3',
        userId: 'u',
        deviceId: 'd',
        domain: 'youtube.com',
        categoryId: 11,
        startedAt: '',
        endedAt: '',
        durationSeconds: 500,
        isIdle: false,
        tabCount: 1,
        windowCount: 1,
      },
    ];

    const result = aggregateTimeByDomain(activities);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ domain: 'youtube.com', totalDurationSeconds: 500, categoryId: 11 });
    expect(result[1]).toEqual({ domain: 'github.com', totalDurationSeconds: 300, categoryId: 1 });
  });
});
