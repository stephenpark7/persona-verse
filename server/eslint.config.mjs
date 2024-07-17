import eslint from '@eslint/js';
import tseslint from 'typescript-eslint'
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';

export default tseslint.config({
  files: [ 'src/**/*.ts', '*.js', '*.mjs' ],
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
}, {
  files: [ '*.json' ],
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
    prettierConfig,
  ],
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'eol-last': [ 'error', 'always' ],
    'quotes': [ 'error', 'double' ],
    'comma-dangle': [ 'error', 'never' ],
  },
});
