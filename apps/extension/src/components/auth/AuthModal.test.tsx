import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthModal } from './AuthModal';
import type { AuthContextType } from '../../context/AuthProvider';
import { useAuth } from '../../context/AuthProvider';

vi.mock('../../context/AuthProvider', () => ({
  useAuth: vi.fn(),
}));

describe('AuthModal component suite', () => {
  it('does not render when isAuthModalOpen is false', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthModalOpen: false,
      closeAuthModal: vi.fn(),
      signIn: vi.fn(),
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      resetPassword: vi.fn(),
      verifyOtp: vi.fn(),
      resendVerification: vi.fn(),
      user: null,
    } as unknown as AuthContextType);

    const { container } = render(<AuthModal />);
    expect(container.firstChild).toBeNull();
  });

  it('renders modal with email, password, and Google button when open', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthModalOpen: true,
      closeAuthModal: vi.fn(),
      signIn: vi.fn(),
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      resetPassword: vi.fn(),
      verifyOtp: vi.fn(),
      resendVerification: vi.fn(),
      user: null,
    } as unknown as AuthContextType);

    render(<AuthModal />);
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue with Google' })).toBeInTheDocument();
  });

  it('submits credentials when sign in button clicked', async () => {
    const mockSignIn = vi.fn().mockResolvedValue({ error: null });
    const mockClose = vi.fn();

    vi.mocked(useAuth).mockReturnValue({
      isAuthModalOpen: true,
      closeAuthModal: mockClose,
      signIn: mockSignIn,
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      resetPassword: vi.fn(),
      verifyOtp: vi.fn(),
      resendVerification: vi.fn(),
      user: null,
    } as unknown as AuthContextType);

    render(<AuthModal />);

    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('switches to sign up view and shows password strength meter', async () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthModalOpen: true,
      closeAuthModal: vi.fn(),
      signIn: vi.fn(),
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      resetPassword: vi.fn(),
      verifyOtp: vi.fn(),
      resendVerification: vi.fn(),
      user: null,
    } as unknown as AuthContextType);

    render(<AuthModal />);

    await userEvent.click(screen.getByText("Don't have an account? Sign up"));
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('••••••••')).toHaveLength(2);
  });
});
