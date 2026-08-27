export type ExtensionMessageType =
  'TRACKING_UPDATE' | 'FOCUS_START' | 'FOCUS_STOP' | 'SYNC_TRIGGER' | 'SETTINGS_UPDATE';

export interface BaseMessage<T extends ExtensionMessageType, P> {
  type: T;
  payload: P;
}

export type ExtensionMessage =
  | BaseMessage<'TRACKING_UPDATE', { domain: string; duration: number }>
  | BaseMessage<'FOCUS_START', { durationMinutes?: number }>
  | BaseMessage<'FOCUS_STOP', void>
  | BaseMessage<'SYNC_TRIGGER', void>
  | BaseMessage<'SETTINGS_UPDATE', { privacyLevel: string }>;

export function setupMessageRouter(): void {
  chrome.runtime.onMessage.addListener((message: ExtensionMessage, _sender, sendResponse) => {
    switch (message.type) {
      case 'TRACKING_UPDATE':
        console.log('[MessageRouter] Tracking update received', message.payload);
        sendResponse({ status: 'ok' });
        break;
      case 'FOCUS_START':
        console.log('[MessageRouter] Focus start requested', message.payload);
        sendResponse({ status: 'ok' });
        break;
      case 'FOCUS_STOP':
        console.log('[MessageRouter] Focus stop requested');
        sendResponse({ status: 'ok' });
        break;
      case 'SYNC_TRIGGER':
        console.log('[MessageRouter] Sync trigger requested');
        sendResponse({ status: 'ok' });
        break;
      case 'SETTINGS_UPDATE':
        console.log('[MessageRouter] Settings update requested', message.payload);
        sendResponse({ status: 'ok' });
        break;
      default: {
        const _exhaustiveCheck: never = message;
        console.warn('[MessageRouter] Unknown message type', _exhaustiveCheck);
        sendResponse({ status: 'unknown_type' });
      }
    }
    return true;
  });
}
