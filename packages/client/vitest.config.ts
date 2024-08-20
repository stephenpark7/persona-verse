import viteConfig from './vite.config';
import { mergeConfig, defineConfig } from 'vitest/config';
import path from 'path';

const vitestConfig = defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/tests/vitest.setup.ts',
		include: [ './src/tests/**/*.(spec|test).tsx' ],
	},
	resolve: {
		alias: {
			'@pages': path.resolve(__dirname, './src/pages'),
			'@core': path.resolve(__dirname, './src/core'),
		},
	},
});

export default mergeConfig(
	viteConfig,
	vitestConfig,
);
