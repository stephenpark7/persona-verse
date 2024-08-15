import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      include: [
        './src/tests/jsdom/**/*.{test,spec}.{ts,tsx}',
      ],
      name: 'jsdom',
      globals: true,
      environment: 'jsdom',
      setupFiles: [ './src/tests/jsdom/vitest.setup.ts' ],
      // exclude: [ './src/tests/browser' ],
    },
  },
]);
