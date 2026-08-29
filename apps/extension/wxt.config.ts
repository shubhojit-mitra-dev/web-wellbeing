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
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(
        process.env.VITE_SUPABASE_URL || 'https://wzqmneutvtkdylvelmqc.supabase.co',
      ),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(
        process.env.VITE_SUPABASE_ANON_KEY ||
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6cW1uZXV0dnRrZHlsdmVsbXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5OTMyNjIsImV4cCI6MjEwMzU2OTI2Mn0.2csz1LHPYnVIxb8ZN3Is6c6ZMh8frTAWJCg1N-M-6Fo',
      ),
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
