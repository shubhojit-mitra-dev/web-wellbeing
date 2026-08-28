import { describe, it, expect } from 'vitest';
import React from 'react';
import { Skeleton, StatCardSkeleton } from './skeleton';

describe('Skeleton loader suite', () => {
  it('renders Skeleton component', () => {
    const el = <Skeleton className="h-4 w-12" />;
    expect(el.props.className).toContain('animate-pulse');
  });

  it('renders StatCardSkeleton component', () => {
    const el = <StatCardSkeleton />;
    expect(el.props.children).toBeDefined();
  });
});
