/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'unit',
    globals: true,
    environment: 'jsdom',
    setupFiles: [ './src/tests/vitest.setup.ts' ],
    exclude: [
      './src/tests/browser',
    ],
  },
});
