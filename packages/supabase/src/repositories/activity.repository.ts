import type { ActivityRecord, IActivityRepository } from '@web-wellbeing/shared';
import { getSupabaseClient } from '../client';

export type { IActivityRepository };

export class SupabaseActivityRepository implements IActivityRepository {
  public async insertBatch(activities: readonly ActivityRecord[]): Promise<void> {
    if (activities.length === 0) return;
    const client = getSupabaseClient();
    const { error } = await client.from('activities').insert(activities);
    if (error) {
      throw new Error(`Failed to insert activities: ${error.message}`);
    }
  }

  public async getByDateRange(startDate: string, endDate: string): Promise<ActivityRecord[]> {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('activities')
      .select('*')
      .gte('started_at', startDate)
      .lte('ended_at', endDate);

    if (error) {
      throw new Error(`Failed to fetch activities: ${error.message}`);
    }

    return (data as ActivityRecord[]) ?? [];
  }
}
