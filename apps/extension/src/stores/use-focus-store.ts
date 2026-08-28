import { create } from 'zustand';
import type { FocusState, PomodoroPhase } from '@web-wellbeing/shared';

export interface FocusStoreState {
  focusState: FocusState;
  pomodoroPhase: PomodoroPhase;
  remainingSeconds: number;
  plannedDurationMinutes: number;
  blockedDomains: string[];
  interruptionCount: number;
  completedCycles: number;

  setFocusState: (state: FocusState) => void;
  setPomodoroPhase: (phase: PomodoroPhase) => void;
  setRemainingSeconds: (seconds: number) => void;
  setPlannedDurationMinutes: (minutes: number) => void;
  addBlockedDomain: (domain: string) => void;
  removeBlockedDomain: (domain: string) => void;
  setBlockedDomains: (domains: string[]) => void;
  incrementInterruptionCount: () => void;
  incrementCompletedCycles: () => void;
}

export const useFocusStore = create<FocusStoreState>((set) => ({
  focusState: 'inactive',
  pomodoroPhase: 'work',
  remainingSeconds: 1500,
  plannedDurationMinutes: 25,
  blockedDomains: ['facebook.com', 'twitter.com', 'instagram.com', 'youtube.com', 'reddit.com'],
  interruptionCount: 0,
  completedCycles: 0,

  setFocusState: (focusState) => set({ focusState }),
  setPomodoroPhase: (pomodoroPhase) => set({ pomodoroPhase }),
  setRemainingSeconds: (remainingSeconds) => set({ remainingSeconds }),
  setPlannedDurationMinutes: (plannedDurationMinutes) =>
    set({ plannedDurationMinutes, remainingSeconds: plannedDurationMinutes * 60 }),

  addBlockedDomain: (domain) =>
    set((state) => {
      const clean = domain.trim().toLowerCase();
      if (!clean || state.blockedDomains.includes(clean)) {
        return state;
      }
      return { blockedDomains: [...state.blockedDomains, clean] };
    }),

  removeBlockedDomain: (domain) =>
    set((state) => ({
      blockedDomains: state.blockedDomains.filter((d) => d !== domain.trim().toLowerCase()),
    })),

  setBlockedDomains: (blockedDomains) => set({ blockedDomains }),
  incrementInterruptionCount: () =>
    set((state) => ({ interruptionCount: state.interruptionCount + 1 })),
  incrementCompletedCycles: () => set((state) => ({ completedCycles: state.completedCycles + 1 })),
}));
