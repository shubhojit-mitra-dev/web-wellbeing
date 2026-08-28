import { describe, expect, it, beforeEach } from 'vitest';
import { useFocusStore } from './use-focus-store';

describe('useFocusStore suite', () => {
  beforeEach(() => {
    useFocusStore.setState({
      focusState: 'inactive',
      pomodoroPhase: 'work',
      remainingSeconds: 1500,
      plannedDurationMinutes: 25,
      blockedDomains: ['facebook.com', 'twitter.com'],
      interruptionCount: 0,
      completedCycles: 0,
    });
  });

  it('initializes with default focus state and blocklist', () => {
    const state = useFocusStore.getState();
    expect(state.focusState).toBe('inactive');
    expect(state.pomodoroPhase).toBe('work');
    expect(state.remainingSeconds).toBe(1500);
    expect(state.blockedDomains).toEqual(['facebook.com', 'twitter.com']);
  });

  it('adds a new domain to blocklist', () => {
    useFocusStore.getState().addBlockedDomain('instagram.com');
    expect(useFocusStore.getState().blockedDomains).toContain('instagram.com');
  });

  it('prevents duplicate domains from being added to blocklist', () => {
    useFocusStore.getState().addBlockedDomain('facebook.com');
    expect(useFocusStore.getState().blockedDomains).toHaveLength(2);
  });

  it('removes a domain from blocklist', () => {
    useFocusStore.getState().removeBlockedDomain('twitter.com');
    expect(useFocusStore.getState().blockedDomains).not.toContain('twitter.com');
    expect(useFocusStore.getState().blockedDomains).toHaveLength(1);
  });

  it('updates remaining seconds ticker', () => {
    useFocusStore.getState().setRemainingSeconds(1499);
    expect(useFocusStore.getState().remainingSeconds).toBe(1499);
  });
});
