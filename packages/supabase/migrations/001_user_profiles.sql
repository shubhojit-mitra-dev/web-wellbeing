CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  privacy_level TEXT NOT NULL DEFAULT 'domain-only',
  allow_incognito_tracking BOOLEAN NOT NULL DEFAULT FALSE,
  idle_threshold_seconds INT NOT NULL DEFAULT 300,
  theme TEXT NOT NULL DEFAULT 'system',
  break_theme TEXT NOT NULL DEFAULT 'warm',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
