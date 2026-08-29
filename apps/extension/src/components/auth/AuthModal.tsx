import { useState, useEffect, type FormEvent } from 'react';
import { X, Mail, Lock, Shield, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from '@web-wellbeing/ui';
import { useAuth } from '../../context/AuthProvider';
import { emailSchema, passwordSchema, evaluatePasswordStrength } from '../../utils/auth-validation';

type AuthViewMode = 'signin' | 'signup' | 'verify' | 'forgot';

export function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    signIn,
    signUp,
    signInWithGoogle,
    resetPassword,
    verifyOtp,
    resendVerification,
    user,
  } = useAuth();

  const [mode, setMode] = useState<AuthViewMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpToken, setOtpToken] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  if (!isAuthModalOpen) return null;

  const passwordStrength = evaluatePasswordStrength(password);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Client-side Zod validation
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      setErrorMsg(emailResult.error.errors[0].message);
      return;
    }

    if (mode === 'signup') {
      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) {
        setErrorMsg(passwordResult.error.errors[0].message);
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please re-enter.');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (mode === 'signin') {
        const res = await signIn(email, password);
        if (res.error) {
          setErrorMsg(res.error.message);
        } else {
          closeAuthModal();
        }
      } else if (mode === 'signup') {
        const res = await signUp(email, password);
        if (res.error) {
          setErrorMsg(res.error.message);
        } else {
          // Transition to email verification view
          setMode('verify');
          setSuccessMsg('Confirmation link and OTP code sent to your email.');
          setResendCooldown(60);
        }
      } else if (mode === 'verify') {
        const res = await verifyOtp(email, otpToken);
        if (res.error) {
          setErrorMsg(res.error.message);
        } else {
          setSuccessMsg('Email verified successfully!');
          closeAuthModal();
        }
      } else if (mode === 'forgot') {
        const res = await resetPassword(email);
        if (res.error) {
          setErrorMsg(res.error.message);
        } else {
          setSuccessMsg('Password reset instructions sent to your email.');
        }
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Authentication request failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setIsLoading(true);
    try {
      const res = await signInWithGoogle();
      if (res.error) {
        setErrorMsg(res.error.message);
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Google OAuth failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    setErrorMsg(null);
    setSuccessMsg(null);
    const res = await resendVerification(email);
    if (res.error) {
      setErrorMsg(res.error.message);
    } else {
      setSuccessMsg('A new verification code has been sent.');
      setResendCooldown(60);
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

        {/* Modal Header with Brand Asterisk */}
        <div className="flex items-center gap-3 pb-4 border-b border-hairline dark:border-hairline-dark">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-base shadow-sm">
            ✳
          </div>
          <div>
            <h2 className="font-serif text-xl font-normal tracking-tight text-ink dark:text-on-dark">
              {user
                ? 'Account Settings'
                : mode === 'signin'
                  ? 'Welcome Back'
                  : mode === 'signup'
                    ? 'Create Account'
                    : mode === 'verify'
                      ? 'Verify Your Email'
                      : 'Reset Password'}
            </h2>
            <p className="text-xs text-muted dark:text-on-dark-soft">
              {mode === 'verify'
                ? `Enter the verification code sent to ${email}`
                : mode === 'forgot'
                  ? 'We will send password reset instructions to your inbox'
                  : 'Sync your web wellbeing data securely across devices via Supabase.'}
            </p>
          </div>
        </div>

        {/* Notice Banners */}
        <div className="pt-4 space-y-2">
          {errorMsg && (
            <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Email Verification OTP View */}
          {mode === 'verify' ? (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-body dark:text-on-dark-soft">
                  Verification OTP Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpToken}
                  onChange={(e) => setOtpToken(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full rounded-md border border-hairline dark:border-hairline-dark bg-surface-card dark:bg-surface-dark-elevated px-3 py-2 text-center font-mono text-lg tracking-widest text-ink dark:text-on-dark placeholder:text-muted-soft focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendCooldown > 0}
                  className="flex items-center gap-1 font-medium text-primary hover:underline disabled:opacity-50 disabled:no-underline"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>
                    {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code'}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Standard Email Field */}
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

              {/* Password Fields for Sign In & Sign Up */}
              {mode !== 'forgot' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-body dark:text-on-dark-soft">
                      Password
                    </label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode('forgot');
                          setErrorMsg(null);
                        }}
                        className="text-xs text-primary hover:underline font-medium"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
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

                  {/* Password Strength Meter (Sign Up Only) */}
                  {mode === 'signup' && password.length > 0 && (
                    <div className="space-y-1.5 pt-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted dark:text-on-dark-soft font-medium">
                          Strength:
                        </span>
                        <span className="font-semibold text-ink dark:text-on-dark">
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-surface-card dark:bg-surface-dark-elevated overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                        />
                      </div>
                      {passwordStrength.feedback.length > 0 && (
                        <p className="text-[10px] text-muted-soft">
                          Requires: {passwordStrength.feedback.join(', ')}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Confirm Password Field (Sign Up Only) */}
              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-body dark:text-on-dark-soft">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-soft" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-md border border-hairline dark:border-hairline-dark bg-surface-card dark:bg-surface-dark-elevated pl-9 pr-3 py-2 text-sm text-ink dark:text-on-dark placeholder:text-muted-soft focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Primary Submit Button - Perfectly Centered Text, No Misaligned Arrow Icon */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full rounded-md bg-primary hover:bg-primary-active text-white font-medium shadow-sm py-2.5 mt-2 justify-center"
          >
            {mode === 'signin'
              ? 'Sign In'
              : mode === 'signup'
                ? 'Create Account'
                : mode === 'verify'
                  ? 'Verify Code'
                  : 'Send Reset Link'}
          </Button>
        </form>

        {/* Social Google Sign In (Sign In & Sign Up Views) */}
        {(mode === 'signin' || mode === 'signup') && (
          <div className="mt-4">
            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-hairline dark:border-hairline-dark" />
              </div>
              <div className="relative bg-canvas dark:bg-surface-dark px-3 text-[11px] font-medium text-muted dark:text-on-dark-soft uppercase">
                Or continue with
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              isLoading={isLoading}
              className="w-full gap-2.5 rounded-md border-hairline dark:border-hairline-dark bg-surface-card dark:bg-surface-dark-elevated text-ink dark:text-on-dark hover:bg-surface-cream-strong dark:hover:bg-hairline-dark font-medium py-2.5 justify-center"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </Button>
          </div>
        )}

        {/* Mode Switcher Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-hairline dark:border-hairline-dark pt-4 text-xs text-muted dark:text-on-dark-soft">
          <span className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-accent-teal" />
            <span>RLS Protected</span>
          </span>
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
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
