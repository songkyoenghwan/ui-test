import path from 'node:path';
import { fileURLToPath } from 'node:url';

// import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import { aliases } from './aliases';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	// optimizeDeps: {
	// 	exclude: ['flowbite-svelte', 'flowbite-svelte-icons'],
	// },
	// ssr: {
	// 	noExternal: ['flowbite-svelte', 'flowbite-svelte-icons'],
	// },
	server: {
		host: true,
		port: 5174,
	},
	preview: {
		// outDir: 'dist',
		port: 5184,
		host: true,
	},
	plugins: [
		tailwindcss(),
		enhancedImages(),
		sveltekit(),
		//	paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide', strategy: ['url', 'cookie', 'baseLocale'] }),
	],
	resolve: { alias: aliases },
	// build: {
	// 	outDir: './dist',
	// 	lib: {
	// 		entry: path.resolve(__dirname, 'src/index.js'),
	// 		name: 'WebComponents',
	// 		fileName: (format) => `wc.lit.${format}.js`,
	// 		formats: ['es', 'cjs'], // ✅ 포맷 추가
	// 	},
	// },);
});
