import { Server } from 'socket.io';
import { aliases } from './aliases';
import { defineConfig } from 'vite';

import { enhancedImages } from '@sveltejs/enhanced-img';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadVersionedSvelteCss() {
	let server;
	return {
		name: 'load-versioned-svelte-css',
		enforce: 'pre',
		configureServer(viteServer) {
			server = viteServer;
		},
		load(id) {
			if (!/\/node_modules\/.*\.svelte\?svelte&type=style&lang\.css$/.test(id)) return;

			// Vite versions dependency module IDs, while Svelte requests their CSS without that version.
			const filename = id.split('?')[0];
			const graph = server?.environments[this.environment.name]?.moduleGraph;
			const component = [...(graph?.idToModuleMap.values() ?? [])].find(
				(module) => module.file === filename && module.info?.meta?.svelte?.css,
			);
			const css = component?.info.meta.svelte.css;
			if (css) return { code: css.code, map: css.map, moduleType: 'css' };
		},
	};
}

export default defineConfig({
	optimizeDeps: {
		exclude: ['flowbite-svelte', 'flowbite-svelte-icons', 'layerchart'],
	},
	ssr: {
		noExternal: ['flowbite-svelte', 'flowbite-svelte-icons', 'layerchart'],
	},
	plugins: [loadVersionedSvelteCss(), enhancedImages(), sveltekit(), tailwindcss()],
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
