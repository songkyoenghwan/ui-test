import adapter from '@sveltejs/adapter-static';

import { aliases } from './aliases.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto 대신 adapter-static 사용
		adapter: adapter({
			pages: 'dist',
			assets: 'dist',
			fallback: '404.html',
			precompress: false,
			strict: true,
		}),
		paths: {
			base: '/ui-test/apps/homepage',
		},
		prerender: {
			handleHttpError: 'warn',
		},
		alias: aliases,
	},
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) => (filename.includes('node_modules') ? undefined : { runes: true }),
	},
	compilerOptions: {
		customElement: true,
	},
};

export default config;
