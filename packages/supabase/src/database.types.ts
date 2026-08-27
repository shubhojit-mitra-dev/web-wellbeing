export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          email: string;
          privacy_level: string;
          allow_incognito_tracking: boolean;
          idle_threshold_seconds: number;
          theme: string;
          break_theme: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          privacy_level?: string;
          allow_incognito_tracking?: boolean;
          idle_threshold_seconds?: number;
          theme?: string;
          break_theme?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          privacy_level?: string;
          allow_incognito_tracking?: boolean;
          idle_threshold_seconds?: number;
          theme?: string;
          break_theme?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      activities: {
        Row: {
          id: string;
          user_id: string;
          device_id: string;
          domain: string;
          url: string | null;
          title: string | null;
          category_id: number;
          started_at: string;
          ended_at: string;
          duration_seconds: number;
          is_idle: boolean;
          tab_count: number;
          window_count: number;
          created_at: string;
        };
      };
    };
  };
}
