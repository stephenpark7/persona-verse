import eslint from '@eslint/js';
import tseslint from 'typescript-eslint'
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';

export default tseslint.config({
  files: [ 'src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx', '*.mjs' ],
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


// import globals from 'globals';
// import babelParser from '@babel/eslint-parser';
// import reactPlugin from 'eslint-plugin-react';

// const baseConfig = {
//   files: [ 'src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx', '*.mjs' ],
//   languageOptions: {
//     globals: {
//       ...globals.browser,
//     },
//     parser: babelParser,
//     parserOptions: {
//       requireConfigFile: false,
//       babelOptions: {
//         presets: [ '@babel/preset-react' ],
//       },
//     },
//     sourceType: 'module',
//   },
//   rules: {
//     'array-bracket-spacing': [ 'error', 'always' ],
//     'eol-last': [ 'error', 'always' ],
//     'quotes': [ 'error', 'single' ],
//     'comma-dangle': [ 'error', 'always-multiline' ],
//   },
//   plugins: {
//     react: reactPlugin,
//   },
// };

// export default [
//   baseConfig,
// ];
