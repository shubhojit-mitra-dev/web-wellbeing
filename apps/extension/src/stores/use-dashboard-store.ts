import { create } from 'zustand';

export type DashboardView = 'overview' | 'analytics' | 'focus' | 'goals' | 'settings';

interface DashboardState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  activeView: DashboardView;
  setActiveView: (view: DashboardView) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed: boolean) => set({ sidebarCollapsed: collapsed }),
  activeView: 'overview',
  setActiveView: (view: DashboardView) => set({ activeView: view }),
}));
