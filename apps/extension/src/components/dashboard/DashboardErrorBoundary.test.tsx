import { describe, it, expect } from 'vitest';
import { DashboardErrorBoundary } from './DashboardErrorBoundary';

describe('DashboardErrorBoundary component', () => {
  it('renders children when no error occurs', () => {
    const boundary = new DashboardErrorBoundary({ children: 'Child Content' });
    expect(boundary.state.hasError).toBe(false);
  });

  it('updates state on error caught via getDerivedStateFromError', () => {
    const error = new Error('Test crash');
    const newState = DashboardErrorBoundary.getDerivedStateFromError(error);

    expect(newState.hasError).toBe(true);
    expect(newState.error).toBe(error);
  });
});
