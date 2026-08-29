import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Zap, User } from 'lucide-react';
import { StatusIndicator } from '@web-wellbeing/ui';
import { useThemeStore } from '../../stores/use-theme-store';

export function HeaderBar() {
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#e6dfd8] dark:border-[#2d2b27] bg-[#faf9f5]/95 dark:bg-[#181715]/95 backdrop-blur-xl px-6 shrink-0">
      {/* Live Engine Status */}
      <div className="flex items-center gap-4">
        <StatusIndicator active label="Tracking Engine Active" />
        <span className="h-4 w-px bg-[#e6dfd8] dark:bg-[#2d2b27]" />
        <span className="text-xs text-[#6c6a64] dark:text-[#a09d96] font-medium">
          Sync Status: <span className="text-[#5db8a6] font-semibold">Online & Synced</span>
        </span>
      </div>

      {/* Action items */}
      <div className="flex items-center gap-3">
        {/* Coral Quick Focus Action Button */}
        <button
          onClick={() => navigate('/focus')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#cc785c] hover:bg-[#a9583e] text-white shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
          title="Focus Mode"
          aria-label="Focus Mode"
        >
          <Zap className="h-4 w-4 fill-current" />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#3d3d3a] dark:text-[#faf9f5] bg-[#faf9f5] dark:bg-[#252320] hover:bg-[#efe9de] dark:hover:bg-[#2d2b27] border border-[#e6dfd8] dark:border-[#2d2b27] transition-colors"
          title="Toggle Theme"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-[#e8a55a]" />
          ) : (
            <Moon className="h-4 w-4 text-[#3d3d3a]" />
          )}
        </button>

        {/* Profile Avatar placeholder */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e6dfd8] dark:border-[#2d2b27] bg-[#efe9de] dark:bg-[#252320] text-[#141413] dark:text-[#faf9f5]">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
