import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Skeleton, StatCardSkeleton } from './skeleton';

describe('Skeleton loader suite', () => {
  it('renders Skeleton with pulse animation class', () => {
    const { container } = render(<Skeleton className="h-4 w-12" />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass('animate-pulse');
    expect(div).toHaveClass('h-4');
  });

  it('renders StatCardSkeleton container structure', () => {
    const { container } = render(<StatCardSkeleton />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
