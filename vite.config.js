import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'src': path.resolve(__dirname, './src'),
		},
	},
	build: {
		outDir: 'build',
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, 'index.html'),
			},
		},
		// Generate manifest in the format expected by the SSR server
		manifest: true,
		// Ensure assets are placed in the expected location
		assetsDir: 'static',
	},
	server: {
		port: 3001, // Different from SSR server port
		proxy: {
			// Proxy API requests to the SSR server
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
			},
		},
	},
	// Ensure CSS is extracted for SSR compatibility
	css: {
		modules: {
			localsConvention: 'camelCase',
		},
	},
	// Handle public assets
	publicDir: 'public',
	define: {
		'process.env.REACT_APP_API_URL': process.env.REACT_APP_API_URL
	}
}) 