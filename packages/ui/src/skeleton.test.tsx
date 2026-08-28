import { describe, it, expect } from 'vitest';
import { Skeleton, StatCardSkeleton } from './skeleton';

describe('Skeleton loader suite', () => {
  it('instantiates Skeleton component with className', () => {
    const el = <Skeleton className="h-4 w-12" />;
    expect(el.type).toBe(Skeleton);
    expect(el.props.className).toBe('h-4 w-12');
  });

  it('instantiates StatCardSkeleton component', () => {
    const el = <StatCardSkeleton />;
    expect(el.type).toBe(StatCardSkeleton);
  });
});
