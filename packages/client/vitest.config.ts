import viteConfig from './vite.config';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';

const vitestConfig = defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/tests/vitest.setup.ts',
		include: [ './src/tests/**/*.test.tsx' ],
		// exclude: [ ...configDefaults.exclude ],
	},
});

export default mergeConfig(
	viteConfig,
	vitestConfig,
);
