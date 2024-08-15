import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      include: [
        './packages/client/src/tests/**/*.{test,spec}.{ts,tsx}',
      ],
      globals: true,
      environment: 'jsdom',
      setupFiles: [ './packages/client/src/tests/vitest.setup.ts' ],
    },
  },
]);
