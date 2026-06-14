// import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import { aliases } from './aliases';

const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const isDeployMode = process.env.IS_DEPLOY === 'true';

export default defineConfig({
	// publicDir: './static',
	define: {
		__STATIC_URL__: JSON.stringify(''),
	},
	optimizeDeps: {
		exclude: ['flowbite-svelte', 'flowbite-svelte-icons'],
	},
	ssr: {
		noExternal: ['flowbite-svelte', 'flowbite-svelte-icons'],
	},
	// server: {
	// 	host: true,
	// 	port: 5173,
	// 	strictPort: true,
	// },
	// preview: {
	// 	// outDir: 'dist',
	// 	host: true,
	// 	open: true,
	// },
	plugins: [
		tailwindcss(),
		enhancedImages(),
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['localStorage', 'cookie', 'preferredLanguage', 'baseLocale'],
		}),
	],
	resolve: { alias: aliases },
	base: isDeployMode ? '/ui-test/apps/homepage' : '',
});
