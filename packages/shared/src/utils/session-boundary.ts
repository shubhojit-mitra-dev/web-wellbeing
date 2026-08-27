import type { SessionBoundary } from '../types/session.types';

export function calculateSessionBoundary(
  lastActivityTimestamp: number,
  currentTimestamp: number,
  idleThresholdSeconds = 300,
): SessionBoundary {
  const diffSeconds = Math.max(0, (currentTimestamp - lastActivityTimestamp) / 1000);
  const isBoundaryExceeded = diffSeconds >= idleThresholdSeconds;

  return {
    lastActivityTimestamp,
    currentTimestamp,
    idleThresholdSeconds,
    isBoundaryExceeded,
  };
}
