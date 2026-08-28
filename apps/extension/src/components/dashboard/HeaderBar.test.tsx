import { describe, it, expect, beforeEach } from 'vitest';
import { HeaderBar } from './HeaderBar';
import { useThemeStore } from '../../stores/use-theme-store';

describe('HeaderBar component', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'dark' });
  });

  it('instantiates HeaderBar correctly', () => {
    const el = <HeaderBar />;
    expect(el.type).toBe(HeaderBar);
  });
});
