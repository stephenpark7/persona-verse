/// <reference types="vitest" />
import { mergeConfig, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';
// import playwrightConfig from './playwright.config';

const vitestConfig = defineConfig(
	// playwrightConfig,
	defineConfig({
		test: {
      name: 'jsdom',
      globals: true,
			include: [ './src/tests/unit/**/*' ],
      environment: 'jsdom',
      setupFiles: './src/tests/vitest.setup.ts',
		},
	}),
);

export default mergeConfig(
	viteConfig,
	vitestConfig,
);
