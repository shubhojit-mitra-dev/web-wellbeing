import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarNav } from './SidebarNav';
import { HeaderBar } from './HeaderBar';
import { useThemeStore } from '../../stores/use-theme-store';

export function DashboardLayout() {
  const { theme } = useThemeStore();

  return (
    <div
      className={`min-h-screen flex font-sans antialiased ${theme === 'dark' ? 'dark bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}
    >
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent dark:from-emerald-950/20" />

      {/* Sidebar Navigation */}
      <SidebarNav />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden min-w-0">
        <HeaderBar />

        {/* Page Content Outlet */}
        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
