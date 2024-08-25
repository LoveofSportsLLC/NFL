import globals from 'globals';
import eslintJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import ssrfriendly from 'eslint-plugin-ssr-friendly';
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  recommendedConfig: eslintJs.configs.recommended,
});

// Flat config array
export default fixupConfigRules([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': jsxA11y,
      'ssr-friendly': ssrfriendly,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  ...compat.config({
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:ssr-friendly/recommended',
    ],
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
    ignorePatterns: ['dist/**', '.history/**', '.vite-inspect/**'],
  }),
]);
