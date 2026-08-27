import type { GoalConfig } from '@web-wellbeing/shared';
import { getSupabaseClient } from '../client';

export interface IGoalRepository {
  createGoal(goal: GoalConfig): Promise<void>;
  getUserGoals(userId: string): Promise<GoalConfig[]>;
}

export class SupabaseGoalRepository implements IGoalRepository {
  public async createGoal(goal: GoalConfig): Promise<void> {
    const client = getSupabaseClient();
    const { error } = await client.from('user_goals').insert(goal);
    if (error) {
      throw new Error(`Failed to save goal: ${error.message}`);
    }
  }

  public async getUserGoals(userId: string): Promise<GoalConfig[]> {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('user_goals')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true);

    if (error) {
      throw new Error(`Failed to fetch goals: ${error.message}`);
    }

    return (data as GoalConfig[]) ?? [];
  }
}
