export function isDomainBlocked(domain: string, blocklist: readonly string[]): boolean {
  if (!domain || !blocklist || blocklist.length === 0) {
    return false;
  }

  const cleanDomain = domain.trim().toLowerCase();

  for (const item of blocklist) {
    const cleanItem = item.trim().toLowerCase();
    if (!cleanItem) continue;

    if (cleanDomain === cleanItem || cleanDomain.endsWith(`.${cleanItem}`)) {
      return true;
    }
  }

  return false;
}
