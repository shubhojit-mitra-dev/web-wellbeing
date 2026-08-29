import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Zap, User } from 'lucide-react';
import { StatusIndicator } from '@web-wellbeing/ui';
import { useThemeStore } from '../../stores/use-theme-store';

export function HeaderBar() {
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-hairline dark:border-hairline-dark bg-canvas/95 dark:bg-surface-dark/95 backdrop-blur-xl px-6 shrink-0">
      {/* Live Engine Status */}
      <div className="flex items-center gap-4">
        <StatusIndicator active label="Tracking Engine Active" />
        <span className="h-4 w-px bg-hairline dark:bg-hairline-dark" />
        <span className="text-xs text-muted dark:text-on-dark-soft font-medium">
          Sync Status: <span className="text-accent-teal font-semibold">Online & Synced</span>
        </span>
      </div>

      {/* Action items */}
      <div className="flex items-center gap-3">
        {/* Coral Quick Focus Action Button */}
        <button
          onClick={() => navigate('/focus')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary hover:bg-primary-active text-white shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
          title="Focus Mode"
          aria-label="Focus Mode"
        >
          <Zap className="h-4 w-4 fill-current" />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-full text-body dark:text-on-dark bg-canvas dark:bg-surface-dark-elevated hover:bg-surface-card dark:hover:bg-hairline-dark border border-hairline dark:border-hairline-dark transition-colors"
          title="Toggle Theme"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-accent-amber" />
          ) : (
            <Moon className="h-4 w-4 text-body" />
          )}
        </button>

        {/* Profile Avatar placeholder */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline dark:border-hairline-dark bg-surface-card dark:bg-surface-dark-elevated text-ink dark:text-on-dark">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
