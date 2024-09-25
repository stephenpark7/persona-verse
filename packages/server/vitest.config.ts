import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: './src/tests/vitest.setup.ts',
    include: [ './**/*.(spec|test).(ts|tsx)' ],
  },
});
