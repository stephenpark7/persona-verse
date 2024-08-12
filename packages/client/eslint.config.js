import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

const configs = [
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  reactPlugin.configs.flat.recommended,
  prettierConfig,
];

const plugins = {
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
      'semi': [ 'error', 'always' ],
      'no-restricted-syntax': [ 'error', {
        'selector': 'FunctionDeclaration',
        'message': 'Function declarations are not allowed. Use arrow functions instead.',
      }, {
          'selector': 'FunctionExpression:not([async])',
          'message': 'Function expressions are not allowed. Use arrow functions instead.',
        }, {
          'selector': 'ExportDefaultDeclaration',
          'message': 'Use named exports instead',
        },
      ],
      '@typescript-eslint/no-invalid-void-type': [ 'off' ],
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
    files: [ '*.json' ],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'array-bracket-spacing': [ 'error', 'always' ],
      'eol-last': [ 'error', 'always' ],
      'quotes': [ 'error', 'double' ],
      'comma-dangle': [ 'error', 'never' ],
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    ignores: [ 'coverage', 'dist', 'node_modules' ],
  },
];
