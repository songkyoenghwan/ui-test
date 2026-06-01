import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import { aliases } from './aliases';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	optimizeDeps: {
		exclude: ['flowbite-svelte', 'flowbite-svelte-icons'],
	},
	ssr: {
		noExternal: ['flowbite-svelte', 'flowbite-svelte-icons'],
	},
	server: {
		host: true,
		port: 5173,
	},
	define: {
		__STATIC_URL__: JSON.stringify(''),
	},
	// publicDir: './static',
	preview: {
		// outDir: 'dist',
		port: 5183,
		host: true,
	},
	plugins: [
		tailwindcss(),
		enhancedImages(),
		sveltekit(),
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide', strategy: ['localStorage', 'cookie', 'preferredLanguage', 'baseLocale'] }),
	],
	resolve: { alias: aliases },
});
