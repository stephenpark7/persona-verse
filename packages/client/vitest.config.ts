/// <reference types="vitest" />
import { mergeConfig, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

const vitestConfig = defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/tests/vitest.setup.ts',
		dir: './src/tests',
	},
});

export default mergeConfig(
	viteConfig,
	vitestConfig,
);
