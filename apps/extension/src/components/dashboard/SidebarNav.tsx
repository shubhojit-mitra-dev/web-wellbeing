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
      className={`relative flex flex-col shrink-0 border-r border-hairline dark:border-hairline-dark bg-canvas dark:bg-surface-dark transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header with Anthropic Asterisk Glyph */}
      <div className="flex h-16 items-center border-b border-hairline dark:border-hairline-dark px-4">
        {sidebarCollapsed ? (
          <div className="flex w-full items-center justify-center">
            <button
              onClick={toggleSidebar}
              className="group flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg shadow-sm hover:bg-primary-active transition-colors"
              title="Expand sidebar"
            >
              <span className="group-hover:hidden">✳</span>
              <ChevronRight className="hidden group-hover:block h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-base shadow-sm">
                ✳
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-base font-normal tracking-tight text-ink dark:text-on-dark truncate">
                  Web Wellbeing
                </span>
                <span className="text-[10px] text-muted dark:text-on-dark-soft font-medium tracking-wider uppercase">
                  Anthropic OS
                </span>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="rounded-md p-1.5 text-muted hover:bg-surface-card dark:hover:bg-surface-dark-elevated hover:text-ink dark:hover:text-on-dark transition-colors shrink-0"
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
                    ? 'bg-surface-card dark:bg-surface-dark-elevated text-ink dark:text-on-dark border-l-2 border-primary font-semibold'
                    : 'text-muted dark:text-on-dark-soft hover:bg-surface-card/50 dark:hover:bg-surface-dark-elevated/50 hover:text-ink dark:hover:text-on-dark'
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
        <div className="p-4 m-3 rounded-lg border border-hairline dark:border-hairline-dark bg-surface-card/50 dark:bg-surface-dark-soft">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Local Privacy First</span>
          </div>
          <p className="mt-1 text-[11px] text-muted dark:text-on-dark-soft leading-relaxed">
            All web activity logs stay strictly local on device.
          </p>
        </div>
      )}
    </aside>
  );
}
