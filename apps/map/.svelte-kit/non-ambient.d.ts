
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/(page)" | "/(menulist)" | "/" | "/(menulist)/menulist" | "/(page)/product";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/(page)": Record<string, never>;
			"/(menulist)": Record<string, never>;
			"/": Record<string, never>;
			"/(menulist)/menulist": Record<string, never>;
			"/(page)/product": Record<string, never>
		};
		Pathname(): "/" | "/menulist" | "/product";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/fonts/woff-subset/Pretendard-Black.subset.woff" | "/fonts/woff-subset/Pretendard-Bold.subset.woff" | "/fonts/woff-subset/Pretendard-ExtraBold.subset.woff" | "/fonts/woff-subset/Pretendard-ExtraLight.subset.woff" | "/fonts/woff-subset/Pretendard-Light.subset.woff" | "/fonts/woff-subset/Pretendard-Medium.subset.woff" | "/fonts/woff-subset/Pretendard-Regular.subset.woff" | "/fonts/woff-subset/Pretendard-SemiBold.subset.woff" | "/fonts/woff-subset/Pretendard-Thin.subset.woff" | "/fonts/woff2-subset/Pretendard-Black.subset.woff2" | "/fonts/woff2-subset/Pretendard-Bold.subset.woff2" | "/fonts/woff2-subset/Pretendard-ExtraBold.subset.woff2" | "/fonts/woff2-subset/Pretendard-ExtraLight.subset.woff2" | "/fonts/woff2-subset/Pretendard-Light.subset.woff2" | "/fonts/woff2-subset/Pretendard-Medium.subset.woff2" | "/fonts/woff2-subset/Pretendard-Regular.subset.woff2" | "/fonts/woff2-subset/Pretendard-SemiBold.subset.woff2" | "/fonts/woff2-subset/Pretendard-Thin.subset.woff2" | string & {};
	}
}