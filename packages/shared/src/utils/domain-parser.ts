export function parseDomain(rawUrl: string): string {
  try {
    let urlString = rawUrl.trim();
    if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
      urlString = `https://${urlString}`;
    }
    const parsed = new URL(urlString);
    return parsed.hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return rawUrl.toLowerCase().trim();
  }
}

export function extractHostname(url: string): string {
  return parseDomain(url);
}

export function isSubdomain(domain: string, parentDomain: string): boolean {
  const normDomain = parseDomain(domain);
  const normParent = parseDomain(parentDomain);
  return normDomain === normParent || normDomain.endsWith(`.${normParent}`);
}

export function normalizeDomain(domain: string): string {
  return parseDomain(domain);
}
