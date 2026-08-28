import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardErrorBoundary } from './DashboardErrorBoundary';

function ProblemChild(): null {
  throw new Error('Component crashed during render!');
}

describe('DashboardErrorBoundary component suite', () => {
  it('renders children when no error occurs', () => {
    render(
      <DashboardErrorBoundary>
        <div>Normal View Content</div>
      </DashboardErrorBoundary>,
    );

    expect(screen.getByText('Normal View Content')).toBeInTheDocument();
  });

  it('catches render errors and displays fallback UI with try again action', () => {
    // Suppress console.error log output from vitest for expected throw
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <DashboardErrorBoundary>
        <ProblemChild />
      </DashboardErrorBoundary>,
    );

    expect(screen.getByText('Dashboard View Error')).toBeInTheDocument();
    expect(screen.getByText('Component crashed during render!')).toBeInTheDocument();

    const tryAgainBtn = screen.getByRole('button', { name: 'Try Again' });
    expect(tryAgainBtn).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
