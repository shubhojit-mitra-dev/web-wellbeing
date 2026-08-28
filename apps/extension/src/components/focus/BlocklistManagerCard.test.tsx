import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlocklistManagerCard } from './BlocklistManagerCard';
import { useFocusStore } from '../../stores/use-focus-store';

describe('BlocklistManagerCard component suite', () => {
  it('renders blocked domains list and domain input field', () => {
    render(<BlocklistManagerCard />);
    expect(screen.getByText('Distraction Blocklist')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add domain (e.g. reddit.com)...')).toBeInTheDocument();
  });

  it('allows adding a new domain tag via input field', async () => {
    const user = userEvent.setup();
    render(<BlocklistManagerCard />);

    const input = screen.getByPlaceholderText('Add domain (e.g. reddit.com)...');
    await user.type(input, 'tiktok.com{enter}');

    expect(useFocusStore.getState().blockedDomains).toContain('tiktok.com');
  });

  it('allows removing a domain tag', async () => {
    const user = userEvent.setup();
    render(<BlocklistManagerCard />);

    const removeBtn = screen.getByRole('button', { name: 'Remove facebook.com' });
    await user.click(removeBtn);

    expect(useFocusStore.getState().blockedDomains).not.toContain('facebook.com');
  });
});
