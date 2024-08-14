/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [ './src/tests/vitest.setup.ts' ],
    // alias: {
    //   '\\.css$': '__mocks__/styleMock.js',
    // },
    exclude: [
      './src/tests/e2e',
    ],
  },
});
