import viteConfig from './vite.config';
import { mergeConfig, defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

const vitestConfig = defineConfig({
	plugins: [
    dts({
      tsconfigPath: 'tsconfig.node.json',
    }),
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/tests/vitest.setup.ts',
		include: [ './src/tests/**/*.test.tsx' ],
	},
});

export default mergeConfig(
	viteConfig,
	vitestConfig,
);
