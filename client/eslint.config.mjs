import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import reactPlugin from 'eslint-plugin-react';

const defaultConfig = {
  files: [ '**/*.js' ],
  languageOptions: {
    globals: {
      ...globals.browser,
    },
    parser: babelParser,
    sourceType: 'module',
  },
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'eol-last': [ 'error', 'always' ],
    'quotes': [ 'error', 'single' ],
  }
};

const pluginsConfig = {
  plugins: {
    reactPlugin,
  }
};

export default [
  defaultConfig,
  pluginsConfig
];
