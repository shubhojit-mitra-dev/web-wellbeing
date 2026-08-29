import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HeaderBar } from './HeaderBar';
import { useThemeStore } from '../../stores/use-theme-store';

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('HeaderBar component suite', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'dark' });
    mockedNavigate.mockReset();
  });

  it('renders status indicators and buttons', () => {
    render(
      <MemoryRouter>
        <HeaderBar />
      </MemoryRouter>,
    );

    expect(screen.getByText('Tracking Engine Active')).toBeInTheDocument();
    expect(screen.getByTitle('Focus Mode')).toBeInTheDocument();
  });

  it('navigates to /focus when Focus Mode button is clicked', async () => {
    render(
      <MemoryRouter>
        <HeaderBar />
      </MemoryRouter>,
    );

    const focusBtn = screen.getByTitle('Focus Mode');
    await userEvent.click(focusBtn);

    expect(mockedNavigate).toHaveBeenCalledWith('/focus');
  });

  it('toggles theme when theme toggle button is clicked', async () => {
    render(
      <MemoryRouter>
        <HeaderBar />
      </MemoryRouter>,
    );

    const themeBtn = screen.getByTitle('Toggle Theme');
    await userEvent.click(themeBtn);

    expect(useThemeStore.getState().theme).toBe('light');
  });
});
