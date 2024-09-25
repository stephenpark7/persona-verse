import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  // 'packages/*',
  {
    extends: './packages/client/vitest.config.ts',
    test: {
      setupFiles: './packages/client/src/tests/vitest.setup.ts',
    },
  },
  {
    extends: './packages/server/vitest.config.ts',
    test: {
      setupFiles: './packages/server/src/tests/vitest.setup.ts',
    },
  }
]);
