import { aliases } from './aliases';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

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
		port: 6713, // homepage는 3000, map은 3001 등으로 분리
		strictPort: true, // 포트가 이미 사용 중일 때 자동으로 번호를 바꾸지 않게 함
		hmr: {
			protocol: 'ws',
			host: 'localhost',
		},
	},
	plugins: [
		tailwindcss(),
		enhancedImages(),
		sveltekit(),
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide', strategy: ['localStorage', 'cookie', 'preferredLanguage', 'baseLocale'] }),
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
