import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import { trpcProxyClient } from './src/trpc';
import tsconfigPaths from 'vite-tsconfig-paths';

// console.log(trpcProxyClient);

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [ react() ],
  plugins: [ react(), tsconfigPaths() ],
  server: {
    port: 3000,
    proxy: {
      '/trpc': 'http://localhost:3000',
    },
  },
});
