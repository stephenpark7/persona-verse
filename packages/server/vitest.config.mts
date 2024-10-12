import { config } from 'dotenv';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: './src/tests/vitest.setup.ts',
    include: ['./**/*.(spec|test).(ts|tsx)'],
    env: {
      ...config({ path: '.env.test' }).parsed,
    },
    isolate: true,
    printConsoleTrace: true,
    fileParallelism: false, // This is necessary for Sequelize to work
  },
});
