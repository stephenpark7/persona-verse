import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  // 'packages/*',
  {
    extends: './packages/client/vitest.config.ts',
    test: {
      setupFiles: './packages/client/src/tests/vitest.setup.ts',
    },
  }
]);
