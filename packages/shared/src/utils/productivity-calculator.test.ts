import { describe, expect, it } from 'vitest';
import type { Activity } from '../types/activity.types';
import type { Category } from '../types/category.types';
import { calculateProductivityScore, getProductivityLabel } from './productivity-calculator';

describe('productivity-calculator', () => {
  const categories = new Map<number, Category>([
    [1, { id: 1, name: 'Dev', color: '#000', productivityScore: 2, isDefault: true }],
    [10, { id: 10, name: 'Social', color: '#fff', productivityScore: -2, isDefault: true }],
  ]);

  it('should return 50 for empty activity list', () => {
    expect(calculateProductivityScore([], categories)).toBe(50);
  });

  it('should calculate 100 for purely productive activity', () => {
    const activities: Activity[] = [
      {
        id: '1',
        userId: 'u1',
        deviceId: 'd1',
        domain: 'github.com',
        categoryId: 1,
        startedAt: '',
        endedAt: '',
        durationSeconds: 3600,
        isIdle: false,
        tabCount: 1,
        windowCount: 1,
      },
    ];
    expect(calculateProductivityScore(activities, categories)).toBe(100);
  });

  it('should return correct labels', () => {
    expect(getProductivityLabel(90)).toBe('Highly Productive');
    expect(getProductivityLabel(70)).toBe('Productive');
    expect(getProductivityLabel(50)).toBe('Balanced');
    expect(getProductivityLabel(30)).toBe('Distracted');
    expect(getProductivityLabel(10)).toBe('Unproductive');
  });
});
