// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	const __STATIC_URL__: string;
}

// ✅ global 블록 외부에서 선언
declare module '$lib/assets/*.png' {
	const content: string;

	export default content;
}

declare module '$lib/assets/*.svg' {
	const content: string;

	export default content;
}

declare module '*.svg' {
	const content: string;

	export default content;
}

export {};
