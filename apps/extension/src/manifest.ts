export const REQUIRED_PERMISSIONS = [
  'tabs',
  'storage',
  'alarms',
  'idle',
  'activeTab',
  'webRequest',
  'identity',
] as const;

export const REQUIRED_HOST_PERMISSIONS = ['<all_urls>'] as const;
