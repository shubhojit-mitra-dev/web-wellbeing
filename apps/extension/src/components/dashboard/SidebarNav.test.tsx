import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { SidebarNav } from './SidebarNav';
import { useDashboardStore } from '../../stores/use-dashboard-store';

describe('SidebarNav component suite', () => {
  beforeEach(() => {
    useDashboardStore.setState({ sidebarCollapsed: false });
  });

  it('renders brand header and navigation links', () => {
    render(
      <MemoryRouter>
        <SidebarNav />
      </MemoryRouter>,
    );

    expect(screen.getByText('Web Wellbeing')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Focus Mode')).toBeInTheDocument();
    expect(screen.getByText('Goals')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('toggles sidebar collapse state when collapse button is clicked', async () => {
    render(
      <MemoryRouter>
        <SidebarNav />
      </MemoryRouter>,
    );

    const toggleBtn = screen.getByRole('button', { name: 'Collapse sidebar' });
    await userEvent.click(toggleBtn);

    expect(useDashboardStore.getState().sidebarCollapsed).toBe(true);
  });
});
