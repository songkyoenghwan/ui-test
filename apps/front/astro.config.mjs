import node from '@astrojs/node';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [
			tailwindcss(),
			paraglideVitePlugin({
				project: './project.inlang',
				outdir: './src/paraglide',
				emitTsDeclarations: true,
				strategy: ['cookie', 'url', 'baseLocale'],
			}),
		],
	},
	integrations: [svelte({ extensions: ['.svelte'] }), react(), alpinejs({ entrypoint: '/src/entrypoint' })],
	output: 'server',
	adapter: node({ mode: 'standalone' }),
});
