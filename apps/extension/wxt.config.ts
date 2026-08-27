import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  srcDir: 'src',
  manifest: {
    name: 'Web Wellbeing',
    description: 'AI-powered browser companion & productivity dashboard',
    permissions: ['tabs', 'storage', 'alarms', 'idle', 'activeTab', 'webRequest', 'identity'],
    host_permissions: ['<all_urls>'],
    commands: {
      'toggle-focus': {
        suggested_key: {
          default: 'Ctrl+Shift+F',
          mac: 'Command+Shift+F',
        },
        description: 'Toggle Focus Mode',
      },
    },
  },
});
