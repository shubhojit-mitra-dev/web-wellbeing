import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FocusStatsCard } from './FocusStatsCard';

describe('FocusStatsCard component suite', () => {
  it('renders focus session metrics correctly', () => {
    render(<FocusStatsCard />);
    expect(screen.getByText('Focus Overview')).toBeInTheDocument();
    expect(screen.getByText('Interruption Attempts')).toBeInTheDocument();
    expect(screen.getByText('Completed Sessions')).toBeInTheDocument();
  });
});
