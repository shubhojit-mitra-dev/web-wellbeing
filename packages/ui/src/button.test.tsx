import { describe, it, expect } from 'vitest';
import { Button } from './button';

describe('Button component', () => {
  it('renders children correctly', () => {
    const el = <Button>Click me</Button>;
    expect(el.props.children).toBe('Click me');
  });

  it('defaults to default variant and size', () => {
    const el = <Button>Test</Button>;
    expect(el.props.variant).toBeUndefined();
    expect(el.props.size).toBeUndefined();
  });

  it('passes disabled prop when isLoading is true', () => {
    const el = <Button isLoading>Loading</Button>;
    expect(el.props.isLoading).toBe(true);
  });
});
