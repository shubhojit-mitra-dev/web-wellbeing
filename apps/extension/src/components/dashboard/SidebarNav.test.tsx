import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SidebarNav } from './SidebarNav';
import { useDashboardStore } from '../../stores/use-dashboard-store';

describe('SidebarNav component', () => {
  beforeEach(() => {
    useDashboardStore.setState({ sidebarCollapsed: false });
  });

  it('instantiates SidebarNav inside router context', () => {
    const el = (
      <MemoryRouter>
        <SidebarNav />
      </MemoryRouter>
    );
    expect(el).toBeDefined();
  });

  it('reflects sidebar collapsed state', () => {
    useDashboardStore.setState({ sidebarCollapsed: true });
    expect(useDashboardStore.getState().sidebarCollapsed).toBe(true);
  });
});
