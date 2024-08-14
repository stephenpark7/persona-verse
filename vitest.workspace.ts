import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    test: {
      include: [
        './packages/client/src/tests/unit/**/*.{test,spec}.{ts,tsx}',
      ],
      name: 'unit',
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./packages/client/src/tests/vitest.setup.ts'],
      exclude: ['./packages/client/src/tests/browser'],
    },
  },
  {
    test: {
      include: [
        './packages/client/src/tests/browser/**/*.{test,spec}.{ts,tsx}',
      ],
      name: 'browser',
      globals: true,
      environment: 'node',
      browser: {
        provider: 'playwright',
        enabled: true,
        name: 'chromium',
        headless: true,
      },
      exclude: ['./packages/client/src/tests/unit'],
    },
  },
]);
