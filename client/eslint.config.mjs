import eslint from '@eslint/js';
import tseslint from 'typescript-eslint'
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import query from '@tanstack/eslint-plugin-query';


export default tseslint
  .config(
  {
    files: [ 'src/**/*.ts', 'src/**/*.tsx' ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: 'module',
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig,
      query.configs.recommended,
    ],
    plugins: {
      reactPlugin: reactPlugin,
      query: query,
    },
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
    files: [ 'src/tests/**/*.ts', 'src/tests/**/*.tsx' ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      jest.configs.recommended.plugins.jest,
      prettierConfig,
    ],
    plugins: {
      jest: jest,
      reactPlugin: reactPlugin,
    },
    rules: {
      'array-bracket-spacing': [ 'error', 'always' ],
      'eol-last': [ 'error', 'always' ],
      'quotes': [ 'error', 'single' ],
      'comma-dangle': [ 'error', 'always-multiline' ],
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
  {
    files: [ '*.mjs' ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: 'module',
    },
    extends: [
      eslint.configs.recommended,
      prettierConfig,
    ],
    rules: {
      'array-bracket-spacing': [ 'error', 'always' ],
      'eol-last': [ 'error', 'always' ],
      'quotes': [ 'error', 'single' ],
      'comma-dangle': [ 'error', 'always-multiline' ],
    },
  },
  {
    files: [ '*.json' ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: 'module',
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig,
    ],
    rules: {
      'array-bracket-spacing': [ 'error', 'always' ],
      'eol-last': [ 'error', 'always' ],
      'quotes': [ 'error', 'double' ],
      'comma-dangle': [ 'error', 'never' ],
    },
  },
);
