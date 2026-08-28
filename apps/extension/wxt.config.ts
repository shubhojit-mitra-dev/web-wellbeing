import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  srcDir: 'src',
  runner: {
    disabled: true,
  },
  vite: (env) => ({
    plugins: [tailwindcss()],
    define: {
      'process.env': {},
      'process.env.NODE_ENV': JSON.stringify(env.mode || 'development'),
    },
  }),
  manifest: {
    name: 'Web Wellbeing',
    description: 'AI-powered browser companion & productivity dashboard',
    permissions: ['tabs', 'storage', 'alarms', 'idle', 'activeTab', 'webRequest', 'identity'],
    host_permissions: ['<all_urls>'],
    content_security_policy: {
      extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';",
    },
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
