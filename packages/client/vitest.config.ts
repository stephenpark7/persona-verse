/// <reference types="vitest" />
import viteConfig from './vite.config';
import { mergeConfig, defineConfig } from 'vitest/config';

const vitestConfig = defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/tests/vitest.setup.ts',
		dir: './src/tests',
		include: [
			'./src/tests/**/*.{test,spec}.{ts,tsx}',
		],
	},
});

export default mergeConfig(
	viteConfig,
	vitestConfig,
);
