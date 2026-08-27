export type GoalType = 'max_screen_time' | 'max_category_time' | 'min_focus_time' | 'max_site_time';

export interface Goal {
  readonly id: string;
  readonly userId: string;
  readonly type: GoalType;
  readonly targetMinutes: number;
  readonly categoryId?: number;
  readonly domain?: string;
  readonly isActive: boolean;
  readonly createdAt: string;
}

export interface GoalProgress {
  readonly goalId: string;
  readonly currentMinutes: number;
  readonly targetMinutes: number;
  readonly percentage: number;
  readonly isAchieved: boolean;
}

export interface DailyGoalStatus {
  readonly date: string;
  readonly goals: readonly GoalProgress[];
  readonly overallProgressPercent: number;
}
