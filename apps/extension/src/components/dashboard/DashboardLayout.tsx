import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarNav } from './SidebarNav';
import { HeaderBar } from './HeaderBar';
import { useThemeStore, applyThemeClass } from '../../stores/use-theme-store';

export function DashboardLayout() {
  const { theme } = useThemeStore();

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  return (
    <div
      className={`h-screen w-screen flex overflow-hidden font-sans antialiased select-none ${
        theme === 'dark' ? 'dark bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'
      }`}
    >
      {/* Background Subtle Mesh */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent dark:from-emerald-950/20" />

      {/* Static Fixed Sidebar Navigation */}
      <SidebarNav />

      {/* Main Right Area - Header + Scrollable Content */}
      <div className="flex flex-1 flex-col h-full overflow-hidden min-w-0">
        <HeaderBar />

        {/* Page Content Outlet (Only this container scrolls) */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
