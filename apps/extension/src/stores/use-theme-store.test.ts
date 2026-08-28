import { describe, it, expect, beforeEach } from 'vitest';
import { useThemeStore } from './use-theme-store';

describe('useThemeStore', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'dark' });
  });

  it('starts with dark mode by default', () => {
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('toggles theme from dark to light and back', () => {
    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe('light');

    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('sets explicit theme mode', () => {
    useThemeStore.getState().setTheme('system');
    expect(useThemeStore.getState().theme).toBe('system');
  });
});
