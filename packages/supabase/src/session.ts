import type { User } from '@supabase/supabase-js';
import { getSupabaseClient } from './client';

export class SessionManager {
  public async getCurrentUser(): Promise<User | null> {
    const client = getSupabaseClient();
    const {
      data: { user },
    } = await client.auth.getUser();
    return user;
  }

  public async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }

  public async signOut(): Promise<void> {
    const client = getSupabaseClient();
    await client.auth.signOut();
  }
}
