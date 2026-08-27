import { describe, expect, it } from 'vitest';
import { calculateSessionBoundary } from './session-boundary';

describe('session-boundary', () => {
  it('should detect when boundary is exceeded', () => {
    const now = 1000000;
    const past400s = now - 400 * 1000;

    const boundary = calculateSessionBoundary(past400s, now, 300);
    expect(boundary.isBoundaryExceeded).toBe(true);
  });

  it('should detect when boundary is within limits', () => {
    const now = 1000000;
    const past100s = now - 100 * 1000;

    const boundary = calculateSessionBoundary(past100s, now, 300);
    expect(boundary.isBoundaryExceeded).toBe(false);
  });
});
