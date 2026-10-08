import adapter from '@sveltejs/adapter-node';
import { aliases } from './aliases.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto 대신 adapter-node 사용
		adapter: adapter({ out: 'build' }),
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
