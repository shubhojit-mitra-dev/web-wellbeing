import { describe, it, expect } from 'vitest';
import { Badge, StatusIndicator } from './badge';

describe('Badge and StatusIndicator', () => {
  it('renders Badge component with variants', () => {
    const defaultBadge = <Badge variant="default">Default</Badge>;
    const successBadge = <Badge variant="success">Active</Badge>;
    const errorBadge = <Badge variant="destructive">Error</Badge>;

    expect(defaultBadge.props.children).toBe('Default');
    expect(successBadge.props.variant).toBe('success');
    expect(errorBadge.props.variant).toBe('destructive');
  });

  it('renders StatusIndicator active vs inactive states', () => {
    const activeInd = <StatusIndicator active label="Online" />;
    const inactiveInd = <StatusIndicator active={false} label="Offline" />;

    expect(activeInd.props.active).toBe(true);
    expect(inactiveInd.props.active).toBe(false);
  });
});
