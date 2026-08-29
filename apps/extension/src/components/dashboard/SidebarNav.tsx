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
      className={`relative flex flex-col shrink-0 border-r border-[#e6dfd8] dark:border-[#2d2b27] bg-[#faf9f5] dark:bg-[#181715] transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header with Anthropic Asterisk Glyph */}
      <div className="flex h-16 items-center border-b border-[#e6dfd8] dark:border-[#2d2b27] px-4">
        {sidebarCollapsed ? (
          <div className="flex w-full items-center justify-center">
            <button
              onClick={toggleSidebar}
              className="group flex h-10 w-10 items-center justify-center rounded-lg bg-[#cc785c] text-white font-bold text-lg shadow-sm hover:bg-[#a9583e] transition-colors"
              title="Expand sidebar"
            >
              <span className="group-hover:hidden">✳</span>
              <ChevronRight className="hidden group-hover:block h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#cc785c] text-white font-bold text-base shadow-sm">
                ✳
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-base font-normal tracking-tight text-[#141413] dark:text-[#faf9f5] truncate">
                  Web Wellbeing
                </span>
                <span className="text-[10px] text-[#6c6a64] dark:text-[#a09d96] font-medium tracking-wider uppercase">
                  Anthropic OS
                </span>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="rounded-md p-1.5 text-[#6c6a64] hover:bg-[#efe9de] dark:hover:bg-[#252320] hover:text-[#141413] dark:hover:text-[#faf9f5] transition-colors shrink-0"
              title="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={sidebarCollapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center rounded-md text-sm font-medium transition-all ${
                  sidebarCollapsed ? 'justify-center p-3' : 'gap-3 px-3.5 py-2.5'
                } ${
                  isActive
                    ? 'bg-[#efe9de] dark:bg-[#252320] text-[#141413] dark:text-[#faf9f5] border-l-2 border-[#cc785c] font-semibold'
                    : 'text-[#6c6a64] dark:text-[#a09d96] hover:bg-[#efe9de]/50 dark:hover:bg-[#252320]/50 hover:text-[#141413] dark:hover:text-[#faf9f5]'
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Extension Footer Badge */}
      {!sidebarCollapsed && (
        <div className="p-4 m-3 rounded-lg border border-[#e6dfd8] dark:border-[#2d2b27] bg-[#efe9de]/50 dark:bg-[#1f1e1b]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#cc785c]">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Local Privacy First</span>
          </div>
          <p className="mt-1 text-[11px] text-[#6c6a64] dark:text-[#a09d96] leading-relaxed">
            All web activity logs stay strictly local on device.
          </p>
        </div>
      )}
    </aside>
  );
}
