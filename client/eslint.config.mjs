import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import reactPlugin from 'eslint-plugin-react';

const baseConfig = {
  files: [ '**/*.js', '**/*.mjs' ],
  languageOptions: {
    globals: {
      ...globals.browser,
    },
    parser: babelParser,
    parserOptions: {
      requireConfigFile: false,
      babelOptions: {
        presets: [ '@babel/preset-react' ],
      },
    },
    sourceType: 'module',
  },
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'eol-last': [ 'error', 'always' ],
    'quotes': [ 'error', 'single' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
  },
  plugins: {
    react: reactPlugin,
  },
};

export default [
  baseConfig,
];
