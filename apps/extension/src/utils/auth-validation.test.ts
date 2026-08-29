import { describe, it, expect } from 'vitest';
import { emailSchema, passwordSchema, evaluatePasswordStrength } from './auth-validation';

describe('auth-validation suite', () => {
  it('validates correct email addresses', () => {
    expect(emailSchema.safeParse('user@example.com').success).toBe(true);
    expect(emailSchema.safeParse('invalid-email').success).toBe(false);
  });

  it('validates password requirements', () => {
    expect(passwordSchema.safeParse('Password123!').success).toBe(true);
    expect(passwordSchema.safeParse('short').success).toBe(false);
    expect(passwordSchema.safeParse('lowercase123!').success).toBe(false);
  });

  it('evaluates password strength score correctly', () => {
    const weak = evaluatePasswordStrength('abc');
    expect(weak.score).toBe(0);
    expect(weak.label).toBe('Weak');

    const strong = evaluatePasswordStrength('P@ssword123!');
    expect(strong.score).toBe(4);
    expect(strong.label).toBe('Strong');
  });
});
