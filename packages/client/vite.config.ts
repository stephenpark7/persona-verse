import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [ 
    react(), 
    tsconfigPaths(),
    checker({ typescript: true }),
    dts({
      tsconfigPath: 'tsconfig.vite.json',
    }),
  ],
  server: {
    port: 3000,
  },
});
