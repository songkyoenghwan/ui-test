import { aliases } from './aliases.js';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	root: '.',
	resolve: { alias: aliases },
	define: {
		'process.env.NODE_ENV': JSON.stringify('production'),
	},
	plugins: [
		enhancedImages(),
		tailwindcss(),
		svelte(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/paraglide',
			strategy: ['cookie', 'globalVariable', 'baseLocale'],
		}),
		// {
		// 	name: 'remove-unwanted-public',
		// 	async writeBundle() {
		// 		const foldersToRemove = [
		// 			'wc/lit/api',
		// 			'wc/lit/html',
		// 			'wc/lit/css',
		// 			'wc/lit/dummy',
		// 			'wc/lit/libs',
		// 			'wc/vue/api',
		// 			'wc/vue/html',
		// 			'wc/vue/css',
		// 			'wc/vue/dummy',
		// 			'wc/vue/libs',
		// 			'wc/vue/images',
		// 			'wc/svelte/api',
		// 			'wc/svelte/html',
		// 			'wc/svelte/css',
		// 			'wc/svelte/dummy',
		// 			'wc/svelte/libs',
		// 			'mockServiceWorker.js',
		// 		];

		// 		for (const folder of foldersToRemove) {
		// 			await fs.rm(folder, { recursive: true, force: true });
		// 		}
		// 	},
		// },
	],
	build: {
		outDir: './build',
		lib: {
			entry: path.resolve(__dirname, 'src/lib/wc.ts'),
			name: 'WebComponents',
			// fileName: 'main-bundle',
			fileName: (format) => `wc.${format}.js`,
			formats: ['es', 'iife'],
		},
		rolldownOptions: {
			//	external: ['svelte'],
			output: {
				globals: { svelte: 'Svelte' },
				// ✨ CSS와 기타 자산 파일 이름 지정
				assetFileNames: (assetInfo) => {
					if (assetInfo.name && assetInfo.name.endsWith('.css')) {
						// JS 파일 이름 패턴을 따라감
						const format = assetInfo.name.includes('cjs') ? 'cjs' : 'es';

						return `main-bundle.${format}.css`;
					}

					return '[name].[ext]';
				},
			},
		},
	},
});
