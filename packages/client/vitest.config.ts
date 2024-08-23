import viteConfig from './vite.config';
import { mergeConfig, defineConfig } from 'vitest/config';

const vitestConfig = defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/tests/vitest.setup.ts',
		include: [ './src/tests/**/*.(spec|test).tsx', './src/**/*.(spec|test).tsx' ],
	},
});

export default mergeConfig(
	viteConfig,
	vitestConfig,
);
