import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthProvider';

vi.mock('@web-wellbeing/supabase', () => ({
  getSupabaseClient: () => ({
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
      signUp: vi.fn().mockResolvedValue({ data: { user: { id: '123' } }, error: null }),
      signInWithPassword: vi.fn().mockResolvedValue({ error: null }),
      signInWithOAuth: vi.fn().mockResolvedValue({ error: null }),
      resetPasswordForEmail: vi.fn().mockResolvedValue({ error: null }),
      verifyOtp: vi.fn().mockResolvedValue({ error: null }),
      resend: vi.fn().mockResolvedValue({ error: null }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
    },
  }),
}));

function TestConsumer() {
  const { user, loading, isAuthModalOpen, openAuthModal, closeAuthModal } = useAuth();
  return (
    <div>
      <span data-testid="user">{user ? user.email : 'guest'}</span>
      <span data-testid="loading">{loading ? 'loading' : 'ready'}</span>
      <span data-testid="modal">{isAuthModalOpen ? 'open' : 'closed'}</span>
      <button onClick={openAuthModal}>Open Modal</button>
      <button onClick={closeAuthModal}>Close Modal</button>
    </div>
  );
}

describe('AuthProvider suite', () => {
  it('renders children and provides initial auth state', async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>,
      );
    });

    expect(screen.getByTestId('user')).toHaveTextContent('guest');
    expect(screen.getByTestId('loading')).toHaveTextContent('ready');
    expect(screen.getByTestId('modal')).toHaveTextContent('closed');
  });

  it('opens and closes auth modal when triggered', async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>,
      );
    });

    act(() => {
      screen.getByText('Open Modal').click();
    });
    expect(screen.getByTestId('modal')).toHaveTextContent('open');

    act(() => {
      screen.getByText('Close Modal').click();
    });
    expect(screen.getByTestId('modal')).toHaveTextContent('closed');
  });
});
