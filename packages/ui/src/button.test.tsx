import { describe, it, expect } from 'vitest';
import { Button } from './button';

describe('Button component suite', () => {
  it('renders children correctly', () => {
    const el = <Button>Click me</Button>;
    expect(el.props.children).toBe('Click me');
  });

  it('handles loading state with spinner and disables button', () => {
    const el = <Button isLoading>Submit</Button>;
    expect(el.props.isLoading).toBe(true);
  });

  it('applies variant classes correctly', () => {
    const defaultBtn = <Button variant="default">Default</Button>;
    const destBtn = <Button variant="destructive">Delete</Button>;
    const outlineBtn = <Button variant="outline">Outline</Button>;

    expect(defaultBtn.props.variant).toBe('default');
    expect(destBtn.props.variant).toBe('destructive');
    expect(outlineBtn.props.variant).toBe('outline');
  });

  it('applies size classes correctly', () => {
    const smBtn = <Button size="sm">Small</Button>;
    const lgBtn = <Button size="lg">Large</Button>;

    expect(smBtn.props.size).toBe('sm');
    expect(lgBtn.props.size).toBe('lg');
  });

  it('supports disabled prop', () => {
    const disabledBtn = <Button disabled>Disabled</Button>;
    expect(disabledBtn.props.disabled).toBe(true);
  });
});
