import type { ActivityRecord } from './activity.types';

/**
 * Repository interface for activity persistence.
 * Defined in shared so the background service worker can depend on this
 * contract without importing the @web-wellbeing/supabase package (which
 * pulls in @supabase/supabase-js and accesses document — crashing in SW context).
 */
export interface IActivityRepository {
  insertBatch(activities: readonly ActivityRecord[]): Promise<void>;
  getByDateRange(startDate: string, endDate: string): Promise<ActivityRecord[]>;
}
