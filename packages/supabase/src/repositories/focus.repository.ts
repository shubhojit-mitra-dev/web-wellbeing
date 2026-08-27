import type { FocusSession } from '@web-wellbeing/shared';
import { getSupabaseClient } from '../client';

export interface IFocusRepository {
  createSession(session: FocusSession): Promise<void>;
  getUserSessions(userId: string): Promise<FocusSession[]>;
}

export class SupabaseFocusRepository implements IFocusRepository {
  public async createSession(session: FocusSession): Promise<void> {
    const client = getSupabaseClient();
    const { error } = await client.from('focus_sessions').insert(session);
    if (error) {
      throw new Error(`Failed to save focus session: ${error.message}`);
    }
  }

  public async getUserSessions(userId: string): Promise<FocusSession[]> {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('focus_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch focus sessions: ${error.message}`);
    }

    return (data as FocusSession[]) ?? [];
  }
}
