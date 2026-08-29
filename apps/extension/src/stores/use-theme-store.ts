import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ThemeMode = 'dark' | 'light' | 'system';

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export function applyThemeClass(theme: ThemeMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'light') {
    root.classList.remove('dark');
  } else {
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      setTheme: (theme: ThemeMode) => {
        applyThemeClass(theme);
        set({ theme });
      },
      toggleTheme: () => {
        const current = get().theme;
        const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
        applyThemeClass(next);
        set({ theme: next });
      },
    }),
    {
      name: 'web-wellbeing-theme-mode',
      storage: createJSONStorage(() =>
        typeof localStorage !== 'undefined' ? localStorage : ({} as Storage),
      ),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          applyThemeClass(state.theme);
        }
      },
    },
  ),
);
