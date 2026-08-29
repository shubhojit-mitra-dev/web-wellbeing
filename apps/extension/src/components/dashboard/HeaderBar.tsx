import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Zap, User } from 'lucide-react';
import { StatusIndicator } from '@web-wellbeing/ui';
import { useThemeStore } from '../../stores/use-theme-store';

export function HeaderBar() {
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl px-6 shrink-0">
      {/* Live Status indicator */}
      <div className="flex items-center gap-4">
        <StatusIndicator active label="Tracking Engine Active" />
        <span className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
        <span className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
          Sync Status:{' '}
          <span className="text-emerald-500 dark:text-emerald-400 font-semibold">
            Online & Synced
          </span>
        </span>
      </div>

      {/* Action items */}
      <div className="flex items-center gap-3">
        {/* Quick Focus Button (Round icon button navigating to /focus) */}
        <button
          onClick={() => navigate('/focus')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all duration-200 hover:scale-105 shadow-sm"
          title="Focus Mode"
          aria-label="Focus Mode"
        >
          <Zap className="h-4 w-4 fill-emerald-500/20" />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 transition-colors"
          title="Toggle Theme"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-zinc-700" />
          )}
        </button>

        {/* Profile Avatar placeholder */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
