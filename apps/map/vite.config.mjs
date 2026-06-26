// import path from 'node:path';
import { fileURLToPath } from 'node:url';
// import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { aliases } from './aliases';

const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export default defineConfig({
	define: {
		__STATIC_URL__: JSON.stringify(''),
	},
	plugins: [
		tailwindcss(),
		enhancedImages(),
		sveltekit(),
		//	paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide', strategy: ['url', 'cookie', 'baseLocale'] }),
	],
	resolve: { alias: aliases },
});
