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
        theme === 'dark' ? 'dark bg-[#181715] text-[#faf9f5]' : 'bg-[#faf9f5] text-[#141413]'
      }`}
    >
      {/* Background Atmosphere Tint */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#cc785c]/5 via-transparent to-transparent dark:from-[#cc785c]/10" />

      {/* Static Fixed Sidebar Navigation */}
      <SidebarNav />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col h-full overflow-hidden min-w-0">
        <HeaderBar />

        {/* Scrollable Page Container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
