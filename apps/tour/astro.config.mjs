// @ts-check
import alpinejs from '@astrojs/alpinejs';
import node from '@astrojs/node';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [svelte(), alpinejs()],

	env: {
		schema: {
			PUBLIC_STATIC_URL: envField.string({
				context: 'client',
				access: 'public',
				default: '/output',
			}),
			PUBLIC_API_MOCK_URL: envField.string({
				context: 'client',
				access: 'public',
				default: 'http://localhost:5195',
				url: true,
			}),
		},
	},

	vite: {
		plugins: [tailwindcss()],
	},

	adapter: node({
		mode: 'standalone',
	}),

	output: 'server',
	site: 'https://songkyoenghwan.github.io/',
});
