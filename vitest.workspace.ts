// import { defineWorkspace } from 'vitest/config'

// export default defineWorkspace([
//   {
//     extends: './packages/client/vitest.config.ts',
//     test: {
//       include: ['**/*.test.tsx'],
//     },
//   }
// ]);

export default [
  'packages/*',
  {
    extends: './packages/client/vitest.config.ts',
    test: {
      setupFiles: './packages/client/src/tests/vitest.setup.ts',
    },
  }
]
