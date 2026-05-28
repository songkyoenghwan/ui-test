import path from 'path';
import { fileURLToPath } from 'url';

import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import { aliases } from './aliases.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	root: '.',
	publicDir: './static',
	base: '/output/',
	resolve: { alias: aliases },
	define: { __STATIC_URL__: JSON.stringify('/output'), 'process.env.NODE_ENV': JSON.stringify('production') },
	plugins: [
		enhancedImages(),
		tailwindcss(),
		svelte(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['localStorage', 'cookie', 'preferredLanguage', 'baseLocale'],
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
		outDir: './output',
		lib: {
			entry: path.resolve(__dirname, 'src/lib/index.ts'),
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
					const extType = assetInfo.name?.split('.').pop()?.toLowerCase();

					// CSS 파일 마감 규칙
					if (extType === 'css') {
						const format = assetInfo.name && assetInfo.name.includes('cjs') ? 'cjs' : 'es';
						return `main-bundle.${format}.css`;
					}

					// 🌟 [철벽 복구 가드레일: 불순물 경로 세척 레이더]
					if (assetInfo.originalFileName) {
						// 1. 역슬래시(\)를 슬래시(/)로 일괄 통일하여 윈도우 환경 방어
						let cleanPath = assetInfo.originalFileName.replace(/\\/g, '/');

						// 2. 모노레포 상위 탈출용 좀비 경로(../../) 및 무의미한 폴더 진입점 제거
						cleanPath = cleanPath.replace(/^(\.\.\/)+/, ''); // ../ 전부 삭제
						cleanPath = cleanPath.replace(/^(apps\/[^/]+\/)?(static\/|src\/lib\/assets\/|public\/)/, '');

						const pathSegments = cleanPath.split('/');
						pathSegments.pop(); // 파일명 제거 (폴더 트리만 남김)

						// 3. 만약 하위 폴더방(예: imgs/visual)이 정확하게 추출되었다면
						//    슬래시나 상대경로 기호 없이 단정하게 폴더트리만 리턴합니다.
						if (pathSegments.length > 0) {
							const pureSubFolder = pathSegments.filter(Boolean).join('/');
							return `${pureSubFolder}/[name].[ext]`; // 🎯 에러 원천 봉쇄! (e.g. imgs/visual/[name].[ext])
						}
					}

					// 하위 폴더가 없는 생짜 파일들의 기본 분류 안전망
					if (extType && ['webm', 'mp4', 'ogg', 'avi'].includes(extType)) {
						return `video/[name].[ext]`;
					}
					if (extType && ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(extType)) {
						return `imgs/[name].[ext]`;
					}
					return 'assets/[name].[ext]';
				},
			},
		},
	},
});
