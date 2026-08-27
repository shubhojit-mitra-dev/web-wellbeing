import { describe, expect, it } from 'vitest';
import { AuthService } from './auth';

describe('AuthService', () => {
  it('should instantiate and allow listener subscriptions', () => {
    const authService = new AuthService();
    const unsubscribe = authService.subscribe(() => {});

    expect(authService).toBeDefined();
    expect(typeof unsubscribe).toBe('function');
    unsubscribe();
  });
});
