CREATE TABLE IF NOT EXISTS public.focus_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  planned_duration_minutes INT,
  actual_duration_seconds INT NOT NULL DEFAULT 0,
  mode TEXT NOT NULL CHECK (mode IN ('focus', 'pomodoro')),
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  blocked_domains TEXT[] NOT NULL DEFAULT '{}',
  interruption_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_focus_sessions_user ON public.focus_sessions(user_id, started_at DESC);
