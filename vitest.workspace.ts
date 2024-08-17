import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [ './packages/client/src/tests/vitest.setup.ts' ],
      dir: './packages/client/src/tests',
      include: [
        './packages/client/src/tests/**/*.{test,spec}.{ts,tsx}',
      ],
    },
  },
]);
