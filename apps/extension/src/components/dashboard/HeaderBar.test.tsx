import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeaderBar } from './HeaderBar';
import { useThemeStore } from '../../stores/use-theme-store';

describe('HeaderBar component suite', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'dark' });
  });

  it('renders status indicators and buttons', () => {
    render(<HeaderBar />);

    expect(screen.getByText('Tracking Engine Active')).toBeInTheDocument();
    expect(screen.getByText('Start Focus')).toBeInTheDocument();
  });

  it('toggles theme when theme toggle button is clicked', async () => {
    render(<HeaderBar />);

    const themeBtn = screen.getByTitle('Toggle Theme');
    await userEvent.click(themeBtn);

    expect(useThemeStore.getState().theme).toBe('light');
  });
});
