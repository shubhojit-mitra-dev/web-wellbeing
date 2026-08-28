const IGNORED_SCHEMES = [
  'chrome://',
  'chrome-extension://',
  'moz-extension://',
  'edge://',
  'about:',
  'javascript:',
];

export function shouldTrackTab(
  url: string,
  isIncognito: boolean,
  allowIncognitoTracking: boolean,
): boolean {
  if (!url) {
    return false;
  }

  const lowerUrl = url.toLowerCase();
  for (const scheme of IGNORED_SCHEMES) {
    if (lowerUrl.startsWith(scheme)) {
      return false;
    }
  }

  if (isIncognito && !allowIncognitoTracking) {
    return false;
  }

  return true;
}
