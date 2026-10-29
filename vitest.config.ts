import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Separate from vite.config.ts: the Cloudflare plugin can't run under Vitest.
export default defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [viteReact()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/test/setup.ts'],
	},
})
