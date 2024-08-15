/// <reference types="vitest" />
import { mergeConfig, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

const vitestConfig =
	defineConfig({
		test: {
      name: 'jsdom',
      globals: true,
			// include: [ './src/tests/jsdom/**/*' ],
      environment: 'jsdom',
      setupFiles: './src/tests/jsdom/vitest.setup.ts',
			dir: './src/tests/jsdom',
		},
	});

export default mergeConfig(
	viteConfig,
	vitestConfig,
);
