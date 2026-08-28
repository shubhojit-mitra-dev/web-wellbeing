export interface BlockingRule {
  id: number;
  priority: number;
  action: {
    type: 'redirect' | 'block';
    redirect?: { extensionPath: string };
  };
  condition: {
    urlFilter: string;
    resourceTypes: string[];
  };
}

export function buildBlockingRules(domains: readonly string[]): BlockingRule[] {
  if (!domains || !Array.isArray(domains) || domains.length === 0) {
    return [];
  }

  return domains.map((domain, index) => {
    const cleanDomain = domain.trim().toLowerCase();
    return {
      id: index + 1,
      priority: 1,
      action: {
        type: 'redirect',
        redirect: { extensionPath: '/newtab.html#/focus?blocked=true' },
      },
      condition: {
        urlFilter: `*://*.${cleanDomain}/*`,
        resourceTypes: ['main_frame'],
      },
    };
  });
}

export async function updateDynamicRules(domains: readonly string[]): Promise<void> {
  if (typeof chrome === 'undefined' || !chrome.declarativeNetRequest) {
    return;
  }

  try {
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const existingRuleIds = existingRules.map((rule) => rule.id);
    const newRules = buildBlockingRules(domains);

    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingRuleIds,
      addRules: newRules as unknown as chrome.declarativeNetRequest.Rule[],
    });
  } catch (error) {
    console.error('Failed to update declarativeNetRequest dynamic rules:', error);
  }
}
