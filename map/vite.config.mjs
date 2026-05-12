import { aliases } from './aliases';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

import { svelte } from '@sveltejs/vite-plugin-svelte';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	plugins: [tailwindcss(), svelte()],
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
