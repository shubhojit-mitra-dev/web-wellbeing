import type { Session, User } from '@supabase/supabase-js';
import { getSupabaseClient } from './client';

export type AuthChangeListener = (user: User | null, session: Session | null) => void;

export class AuthService {
  private listeners: AuthChangeListener[] = [];

  public init(): void {
    const client = getSupabaseClient();
    client.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      for (const listener of this.listeners) {
        listener(user, session);
      }
    });
  }

  public subscribe(listener: AuthChangeListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}
