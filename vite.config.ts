import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss()
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	// Handle public assets
	publicDir: 'public',
	build: {
		outDir: 'build',
		emptyOutDir: true,
		assetsDir: 'static',
		manifest: true, // Generate manifest.json for asset tracking 
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, 'index.html'),
			},
		},  
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
	define: {
		'process.env.REACT_APP_API_URL': process.env.REACT_APP_API_URL
	}
}) 