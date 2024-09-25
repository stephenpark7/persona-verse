import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config({
  files: [ '**/**/*.ts', '*.js', '*.mjs' ],
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
    'quotes': [ 'error', 'single' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    '@typescript-eslint/no-unused-vars': [
      'error', {
        'args': 'all',
        'argsIgnorePattern': '^_',
        'caughtErrors': 'all',
        'caughtErrorsIgnorePattern': '^_',
        'destructuredArrayIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'ignoreRestSiblings': true,
      },
    ],
    'semi': [ 'error', 'always' ],
  },
}, {
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
    '@typescript-eslint/no-unused-expressions': 'off',
  },
},{
  ignores: [ 'coverage', 'dist', 'node_modules' ],
},{
  files: [ '**/**/*.{test,spec}.{ts}' ],
  languageOptions: {
    globals: {
      ...vitest.environments.env.globals,
    },
    sourceType: 'module',
  },
  plugins: {
    vitest,
  },
  settings: {
    vitest: {
      typecheck: true,
    },
  },
  rules: {
    ...vitest.configs.recommended.rules,
    'vitest/max-nested-describe': [ 'error', { max: 3 } ],
  },
},
);
