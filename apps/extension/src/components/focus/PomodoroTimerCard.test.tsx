import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PomodoroTimerCard } from './PomodoroTimerCard';
import { useFocusStore } from '../../stores/use-focus-store';

describe('PomodoroTimerCard component suite', () => {
  it('renders timer card in inactive state with default time', () => {
    render(<PomodoroTimerCard />);
    expect(screen.getByText('Focus Session')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start focus/i })).toBeInTheDocument();
  });

  it('allows clicking duration preset chips to change planned duration', async () => {
    const user = userEvent.setup();
    render(<PomodoroTimerCard />);

    const chip45 = screen.getByRole('button', { name: '45m' });
    await user.click(chip45);

    expect(useFocusStore.getState().plannedDurationMinutes).toBe(45);
  });
});
