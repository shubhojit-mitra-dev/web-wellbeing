import { describe, expect, it } from 'vitest';
import { resolveCategoryId } from './category-matcher';

describe('category-matcher', () => {
  it('should resolve known domain categories', () => {
    expect(resolveCategoryId('github.com')).toBe(1); // Development
    expect(resolveCategoryId('youtube.com')).toBe(11); // Entertainment
  });

  it('should respect custom overrides', () => {
    const overrides = { 'youtube.com': 3 }; // Override YouTube to Education
    expect(resolveCategoryId('youtube.com', overrides)).toBe(3);
  });

  it('should fallback to 12 (Other) for unknown domain', () => {
    expect(resolveCategoryId('unknown-random-domain.xyz')).toBe(12);
  });
});
