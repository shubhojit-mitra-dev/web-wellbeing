import { POPULAR_DOMAIN_CATEGORIES } from '../constants/domain-mappings';
import { parseDomain } from './domain-parser';

export function resolveCategoryId(
  domain: string,
  customOverrides?: Record<string, number>,
): number {
  const normDomain = parseDomain(domain);

  if (customOverrides?.[normDomain] !== undefined) {
    return customOverrides[normDomain];
  }

  if (POPULAR_DOMAIN_CATEGORIES[normDomain] !== undefined) {
    return POPULAR_DOMAIN_CATEGORIES[normDomain];
  }

  // Fallback checking for parent domain
  const parts = normDomain.split('.');
  if (parts.length > 2) {
    const parentDomain = parts.slice(1).join('.');
    if (POPULAR_DOMAIN_CATEGORIES[parentDomain] !== undefined) {
      return POPULAR_DOMAIN_CATEGORIES[parentDomain];
    }
  }

  return 12; // Other category
}
