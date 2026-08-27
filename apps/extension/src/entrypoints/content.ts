import { defineContentScript } from 'wxt/sandbox';

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    console.log('[Web Wellbeing] Content script initialized on page.');
  },
});
