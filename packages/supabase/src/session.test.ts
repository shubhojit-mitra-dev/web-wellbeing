import { describe, expect, it } from 'vitest';
import { SessionManager } from './session';

describe('SessionManager', () => {
  it('should instantiate SessionManager properly', () => {
    const manager = new SessionManager();
    expect(manager).toBeDefined();
    expect(typeof manager.getCurrentUser).toBe('function');
  });
});
