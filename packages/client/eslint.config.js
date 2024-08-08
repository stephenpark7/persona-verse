import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import jestPlugin from 'eslint-plugin-jest';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

const configs = [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  prettierConfig,
];

const plugins = {
  jest: jestPlugin,
  react: reactPlugin,
  reactHooks: reactHooksPlugin,
  reactRefreshPlugin: reactRefreshPlugin,
};

export default [
  ...configs,
  {
    files: [ '**/**/*.{js,mjs,cjs,ts,jsx,tsx}' ],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins,
    rules: {
      'array-bracket-spacing': [ 'error', 'always' ],
      'object-curly-spacing': [ 'error', 'always' ],
      'eol-last': [ 'error', 'always' ],
      'quotes': [ 'error', 'single' ],
      'comma-dangle': [ 'error', 'always-multiline' ],
      'no-restricted-syntax': [ 'error', {
        'selector': 'ExportDefaultDeclaration',
        'message': 'Use named exports instead',
      } ],
      'semi': [ 'error', 'always' ],
    },
  },
  {
    files: [ '**/**/*.{js,mjs,cjs,ts}' ],
    rules: {
      'no-restricted-syntax': [ 'off' ],
    },
  },
  {
    files: [ '**/**/*.{test,spec}.{jsx,tsx}' ],
    rules: {
      'react/react-in-jsx-scope': [ 'off' ],
    },
  },
  {
    files: [ '*.json ' ],
    rules: {
      'array-bracket-spacing': [ 'error', 'always' ],
      'eol-last': [ 'error', 'always' ],
      'quotes': [ 'error', 'double' ],
      'comma-dangle': [ 'error', 'never' ],
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
];


