import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge, StatusIndicator } from './badge';

describe('Badge and StatusIndicator suite', () => {
  it('renders Badge component with text and variant classes', () => {
    const { rerender } = render(<Badge variant="default">Active</Badge>);
    const badge = screen.getByText('Active');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-[#efe9de]');

    rerender(<Badge variant="coral">Coral</Badge>);
    expect(screen.getByText('Coral')).toHaveClass('bg-[#cc785c]');
  });

  it('renders StatusIndicator with pulse effect when active', () => {
    const { container, rerender } = render(<StatusIndicator active label="Tracking Engine" />);
    expect(screen.getByText('Tracking Engine')).toBeInTheDocument();

    const pingDot = container.querySelector('.animate-ping');
    expect(pingDot).toBeInTheDocument();

    rerender(<StatusIndicator active={false} label="Tracking Engine" />);
    const updatedPing = container.querySelector('.animate-ping');
    expect(updatedPing).not.toBeInTheDocument();
  });
});
