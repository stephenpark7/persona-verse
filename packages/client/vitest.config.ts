/// <reference types="vitest" />
import { mergeConfig, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

const vitestConfig =
	defineConfig({
		test: {
      name: 'jsdom',
      globals: true,
			include: [ './src/tests/unit/**/*' ],
      environment: 'jsdom',
      setupFiles: './src/tests/vitest.setup.ts',
			dir: './src/tests/unit',
		},
	});

export default mergeConfig(
	viteConfig,
	vitestConfig,
);
