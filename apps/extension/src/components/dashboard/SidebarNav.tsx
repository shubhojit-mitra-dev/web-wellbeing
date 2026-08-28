import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart2,
  Zap,
  Target,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useDashboardStore } from '../../stores/use-dashboard-store';

export function SidebarNav() {
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/' },
    { label: 'Analytics', icon: BarChart2, path: '/analytics' },
    { label: 'Focus Mode', icon: Zap, path: '/focus' },
    { label: 'Goals', icon: Target, path: '/goals' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl transition-all duration-300 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-lg shadow-emerald-900/30 font-bold text-lg">
            W
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-100">
                Web Wellbeing
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                Dashboard v1.0
              </span>
            </div>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-950/40 shadow-sm border border-emerald-500/20'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Extension Footer Badge */}
      {!sidebarCollapsed && (
        <div className="p-4 m-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>Local Privacy First</span>
          </div>
          <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
            All raw web usage & logs are stored locally.
          </p>
        </div>
      )}
    </aside>
  );
}
