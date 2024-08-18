import viteConfig from './vite.config';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import dts from 'vite-plugin-dts';

const vitestConfig = defineConfig({
	plugins: [
    dts({
      tsconfigPath: 'tsconfig.vite.json',
    }),
	],
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
