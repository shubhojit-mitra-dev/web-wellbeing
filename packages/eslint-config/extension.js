import reactConfig from './react.js';

export default [
  ...reactConfig,
  {
    languageOptions: {
      globals: {
        chrome: 'readonly',
        browser: 'readonly',
      },
    },
  },
];
