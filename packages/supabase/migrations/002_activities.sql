CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL,
  domain TEXT NOT NULL,
  url TEXT,
  title TEXT,
  category_id INT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ NOT NULL,
  duration_seconds INT NOT NULL CHECK (duration_seconds >= 0),
  is_idle BOOLEAN NOT NULL DEFAULT FALSE,
  tab_count INT NOT NULL DEFAULT 1,
  window_count INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activities_user_started ON public.activities(user_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_activities_domain ON public.activities(domain);
