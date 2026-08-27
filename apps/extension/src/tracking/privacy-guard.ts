export function shouldTrackTab(
  url: string,
  isIncognito: boolean,
  allowIncognitoTracking: boolean,
): boolean {
  if (!url || url.startsWith('chrome://') || url.startsWith('about:')) {
    return false;
  }

  if (isIncognito && !allowIncognitoTracking) {
    return false;
  }

  return true;
}
