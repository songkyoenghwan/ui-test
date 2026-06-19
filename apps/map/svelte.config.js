import adapter from '@sveltejs/adapter-static';

import { aliases } from './aliases.js';

const isDeployMode = process.env.IS_DEPLOY === 'true';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true,
		}),
		paths: {
			base: isDeployMode ? '/ui-test/apps/map' : '',
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
