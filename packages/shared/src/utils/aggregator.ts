import type { Activity } from '../types/activity.types';

export interface AggregatedDomainTime {
  readonly domain: string;
  readonly totalDurationSeconds: number;
  readonly categoryId: number;
}

export function aggregateTimeByDomain(
  activities: readonly Activity[],
): readonly AggregatedDomainTime[] {
  const map = new Map<string, { totalDurationSeconds: number; categoryId: number }>();

  for (const activity of activities) {
    const existing = map.get(activity.domain);
    if (existing) {
      map.set(activity.domain, {
        totalDurationSeconds: existing.totalDurationSeconds + activity.durationSeconds,
        categoryId: activity.categoryId,
      });
    } else {
      map.set(activity.domain, {
        totalDurationSeconds: activity.durationSeconds,
        categoryId: activity.categoryId,
      });
    }
  }

  return Array.from(map.entries())
    .map(([domain, data]) => ({
      domain,
      totalDurationSeconds: data.totalDurationSeconds,
      categoryId: data.categoryId,
    }))
    .sort((a, b) => b.totalDurationSeconds - a.totalDurationSeconds);
}
