import { describe, it, expect, beforeEach } from 'vitest';
import { useDashboardStore } from './use-dashboard-store';

describe('useDashboardStore', () => {
  beforeEach(() => {
    useDashboardStore.setState({ sidebarCollapsed: false, activeView: 'overview' });
  });

  it('starts uncollapsed with overview view', () => {
    const state = useDashboardStore.getState();
    expect(state.sidebarCollapsed).toBe(false);
    expect(state.activeView).toBe('overview');
  });

  it('toggles sidebar collapsed state', () => {
    useDashboardStore.getState().toggleSidebar();
    expect(useDashboardStore.getState().sidebarCollapsed).toBe(true);

    useDashboardStore.getState().toggleSidebar();
    expect(useDashboardStore.getState().sidebarCollapsed).toBe(false);
  });

  it('updates active view correctly', () => {
    useDashboardStore.getState().setActiveView('analytics');
    expect(useDashboardStore.getState().activeView).toBe('analytics');
  });
});
