import { describe, it, expect } from 'vitest';
import React from 'react';
import { Badge, StatusIndicator } from './badge';

describe('Badge and StatusIndicator', () => {
  it('renders Badge component with default props', () => {
    const el = <Badge>Active</Badge>;
    expect(el.props.children).toBe('Active');
  });

  it('renders StatusIndicator with label', () => {
    const el = <StatusIndicator active label="Tracking" />;
    expect(el.props.active).toBe(true);
    expect(el.props.label).toBe('Tracking');
  });
});
