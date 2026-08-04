/// <reference types="astro/client" />

import type Alpine from 'alpinejs';

interface ImportMetaEnv {
	readonly PUBLIC_API_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare global {
	interface Window {
		Alpine: typeof Alpine;
		Tmapv3: any;
	}

	var Alpine: typeof Alpine;
	var Tmapv3: any;
}

export {};
