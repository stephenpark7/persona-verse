import eslint from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    // ...eslint.configs.recommended,
    // ...prettierConfig,
    files: [ 'tsconfig.json' ],
    languageOptions: {
      globals: { 
        ...globals.browser, 
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
    },
    rules: {
      'array-bracket-spacing': [ 'error', 'always' ],
      'eol-last': [ 'error', 'always' ],
      'quotes': [ 'error', 'double' ],
      'comma-dangle': [ 'error', 'never' ],
    },
  }
];
