// @ts-check
import alpinejs from '@astrojs/alpinejs';
import node from '@astrojs/node';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const rootEnv = loadEnv(process.env.NODE_ENV ?? 'development', '..', 'TMAP_');
if (!process.env.TMAP_APP_KEY && rootEnv.TMAP_APP_KEY) {
	process.env.TMAP_APP_KEY = rootEnv.TMAP_APP_KEY;
}

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
		server: {
			host: true,
			proxy: {
				'/api': {
					target: 'http://localhost:5194',
					changeOrigin: true,
					cookieDomainRewrite: '',
					cookiePathRewrite: '/',
				},
			},
		},
	},
	integrations: [svelte({ extensions: ['.svelte'] }), react(), alpinejs({ entrypoint: '/src/entrypoint' })],
	output: 'server',
	adapter: node({ mode: 'standalone' }),
});
