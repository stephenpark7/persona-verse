import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
// import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import vitest from 'eslint-plugin-vitest';

const configs = [
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  reactPlugin.configs.flat.recommended,
  prettierConfig,
];

const plugins = {
  react: reactPlugin,
  // reactHooks: reactHooksPlugin,
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
    plugins: {
      vitest,
    },
    rules: {
      'react/react-in-jsx-scope': [ 'off' ],
      ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
      'vitest/max-nested-describe': [ 'error', { 'max': 3 } ], // you can also modify rules' behavior using option like this
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
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
