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
      //quotes: ['error', 'single', { avoidEscape: true }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'no-unused-vars': 'off',
      'no-useless-escape': 'off',
      'no-undef': 'off',
      'no-empty': 'off',
      'no-fallthrough': 'off',
      'no-self-assign': 'off',
      'no-prototype-builtins': 'off',
      'no-misleading-character-class': 'off',
      'no-mixed-spaces-and-tabs': 'off',
      'no-constant-condition': 'off',
      'no-redeclare': 'off',
      'no-setter-return': 'off',
      'no-cond-assign': 'off',
      'es/no-symbol': 'off',
      'no-func-assign': 'off',
      'valid-typeof': 'off',
      'getter-return': 'off',
      'no-unreachable': 'off',
      'no-control-regex': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-useless-catch': 'off',
      'no-unsafe-finally': 'off',
      'no-unsafe-negation': 'off',
      'react/no-find-dom-node': 'off',
      'no-extra-boolean-cast': 'off',
      'no-unexpected-multiline': 'off',
      'Unexpected newline after': 'off',
      complexity: 'off',
      'max-statements': 'off',
      'no-invalid-this': 'off',
    },
    ignorePatterns: ['dist/**', '.history/**', '.vite-inspect/**'],
  }),
]);
