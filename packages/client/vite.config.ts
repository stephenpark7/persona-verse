/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ 
    react(), 
    tsconfigPaths(),
    checker({ typescript: true }),
  ],
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    setupFiles: [ './vitest.setup.ts' ],
  },
});
