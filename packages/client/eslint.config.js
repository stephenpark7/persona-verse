import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import vitest from 'eslint-plugin-vitest';
// import reactHooksPlugin from 'eslint-plugin-react-hooks';

const configs = [
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  reactPlugin.configs.flat.recommended,
  prettierConfig,
];

const plugins = {
  react: reactPlugin,
  reactRefreshPlugin: reactRefreshPlugin,
  // reactHooks: reactHooksPlugin,
};

export default [
  ...configs,
  {
    files: [ '**/**/*.{ts,tsx}' ],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
        // defaultVersion: '18.3.1'
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
    files: [ 'vite.config.ts', 'vitest.config.ts' ],
    rules: {
      'no-restricted-syntax': [ 'off' ],
    },
  },
  {
    files: [ '**/tests/**/*.{ts,tsx}' ],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...vitest.environments.env.globals,
        ...globals.browser,
      },
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
        // defaultVersion: '18.3.1'
      },
      vitest: {
        typecheck: true,
      },
    },
    plugins: {
      // ...plugins,
      // react: reactPlugin,
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'react/react-in-jsx-scope': [ 'off' ],
      // 'vitest/max-nested-describe': [ 'error', { 'max': 3 } ],
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
