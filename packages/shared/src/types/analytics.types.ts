export interface CategoryBreakdown {
  readonly categoryId: number;
  readonly categoryName: string;
  readonly totalDurationSeconds: number;
  readonly percentage: number;
}

export interface DailySummary {
  readonly id: string;
  readonly userId: string;
  readonly date: string;
  readonly totalSeconds: number;
  readonly productiveSeconds: number;
  readonly distractingSeconds: number;
  readonly neutralSeconds: number;
  readonly productivityScore: number;
  readonly topDomains: readonly { readonly domain: string; readonly durationSeconds: number }[];
  readonly categoryBreakdown: readonly CategoryBreakdown[];
}

export interface WeeklySummary {
  readonly weekStart: string;
  readonly weekEnd: string;
  readonly totalSeconds: number;
  readonly dailyAverageSeconds: number;
  readonly dailySummaries: readonly DailySummary[];
  readonly topCategory: CategoryBreakdown;
  readonly contextSwitchesTotal: number;
}

export interface ContextSwitchMetric {
  readonly fromDomain: string;
  readonly toDomain: string;
  readonly timestamp: number;
  readonly timeOnPreviousSeconds: number;
}
