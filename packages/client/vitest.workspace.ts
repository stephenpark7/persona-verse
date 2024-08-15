import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      include: [
        './src/tests/unit/**/*.{test,spec}.{ts,tsx}',
      ],
      name: 'unit',
      globals: true,
      environment: 'jsdom',
      setupFiles: [ './src/tests/vitest.setup.ts' ],
      exclude: [ './src/tests/browser' ],
    },
  },
]);
