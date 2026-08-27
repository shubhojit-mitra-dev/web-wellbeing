import type { Activity } from '../types/activity.types';
import type { Category, ProductivityWeight } from '../types/category.types';

export function calculateProductivityScore(
  activities: readonly Activity[],
  categoriesMap: Map<number, Category>,
): number {
  if (activities.length === 0) return 50;

  let totalWeight = 0;
  let weightedDurationSum = 0;
  let totalDuration = 0;

  for (const activity of activities) {
    const category = categoriesMap.get(activity.categoryId);
    const weight: ProductivityWeight = category?.productivityScore ?? 0;
    weightedDurationSum += activity.durationSeconds * weight;
    totalDuration += activity.durationSeconds;
    totalWeight += Math.abs(weight);
  }

  if (totalDuration === 0 || totalWeight === 0) return 50;

  const normalizedScore = weightedDurationSum / (totalDuration * 2);
  return Math.max(0, Math.min(100, Math.round((normalizedScore + 1) * 50)));
}

export function getProductivityLabel(score: number): string {
  if (score >= 80) return 'Highly Productive';
  if (score >= 60) return 'Productive';
  if (score >= 40) return 'Balanced';
  if (score >= 20) return 'Distracted';
  return 'Unproductive';
}
