import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import tsParser from '@typescript-eslint/parser';
import tailwindPlugin from 'eslint-plugin-tailwindcss';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,astro,svelte}'] },
    pluginJs.configs.recommended,
    eslintPluginAstro.configs.recommended,
    ...tailwindPlugin.configs['flat/recommended'],
    ...svelte.configs['flat/recommended'],
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: tsParser,
        },
    },
    {
        languageOptions: {
            parserOptions: {
                parser: '@typescript-eslint/parser',
            },
            globals: { ...globals.browser },
        },
    },
    {
        ignores: ['build/', '.svelte-kit/', 'dist/', 'node_modules/*', 'examples', 'lib'],
    },
    ...svelte.configs['flat/prettier'],
    prettier,
    prettierPluginRecommended,
];
