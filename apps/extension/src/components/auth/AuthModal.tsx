import { useState, type FormEvent } from 'react';
import { X, Mail, Lock, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@web-wellbeing/ui';
import { useAuth } from '../../context/AuthProvider';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, signIn, signUp, user } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = mode === 'signin' ? await signIn(email, password) : await signUp(email, password);
      if (res.error) {
        setErrorMsg(res.error.message);
      } else {
        closeAuthModal();
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-hairline dark:border-hairline-dark bg-canvas dark:bg-surface-dark p-6 shadow-2xl transition-all">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 rounded-md p-1 text-muted hover:bg-surface-card dark:hover:bg-surface-dark-elevated hover:text-ink dark:hover:text-on-dark transition-colors"
          aria-label="Close Auth Modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header with Asterisk Brand Glyph */}
        <div className="flex items-center gap-3 pb-4 border-b border-hairline dark:border-hairline-dark">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-base shadow-sm">
            ✳
          </div>
          <div>
            <h2 className="font-serif text-xl font-normal tracking-tight text-ink dark:text-on-dark">
              {user ? 'Account Settings' : mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-xs text-muted dark:text-on-dark-soft">
              Sync your web wellbeing data securely across devices via Supabase.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-6">
          {errorMsg && (
            <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
              {errorMsg}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-body dark:text-on-dark-soft">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-soft" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-md border border-hairline dark:border-hairline-dark bg-surface-card dark:bg-surface-dark-elevated pl-9 pr-3 py-2 text-sm text-ink dark:text-on-dark placeholder:text-muted-soft focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-body dark:text-on-dark-soft">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-soft" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md border border-hairline dark:border-hairline-dark bg-surface-card dark:bg-surface-dark-elevated pl-9 pr-3 py-2 text-sm text-ink dark:text-on-dark placeholder:text-muted-soft focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full gap-2 rounded-md bg-primary hover:bg-primary-active text-white font-medium shadow-sm py-2.5 mt-2"
          >
            <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        {/* Mode Switcher Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-hairline dark:border-hairline-dark pt-4 text-xs text-muted dark:text-on-dark-soft">
          <span className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-accent-teal" />
            <span>RLS Protected</span>
          </span>
          <button
            type="button"
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="font-medium text-primary hover:underline"
          >
            {mode === 'signin'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
