
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
		RouteId(): "/(page)" | "/(menulist)" | "/" | "/(page)/CMS-CON-001" | "/(page)/CMS-LOC-001" | "/(page)/CMS-MAP-001" | "/(page)/CMS-MAP-002" | "/(page)/CMS-MAP-003" | "/(page)/CMS-MAP-004" | "/(page)/CMS-OBD-001" | "/(page)/CMS-OBD-002" | "/(page)/CMS-STA-001" | "/(page)/CMS-STA-002" | "/(page)/CMS-UI" | "/(menulist)/menulist";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/(page)": Record<string, never>;
			"/(menulist)": Record<string, never>;
			"/": Record<string, never>;
			"/(page)/CMS-CON-001": Record<string, never>;
			"/(page)/CMS-LOC-001": Record<string, never>;
			"/(page)/CMS-MAP-001": Record<string, never>;
			"/(page)/CMS-MAP-002": Record<string, never>;
			"/(page)/CMS-MAP-003": Record<string, never>;
			"/(page)/CMS-MAP-004": Record<string, never>;
			"/(page)/CMS-OBD-001": Record<string, never>;
			"/(page)/CMS-OBD-002": Record<string, never>;
			"/(page)/CMS-STA-001": Record<string, never>;
			"/(page)/CMS-STA-002": Record<string, never>;
			"/(page)/CMS-UI": Record<string, never>;
			"/(menulist)/menulist": Record<string, never>
		};
		Pathname(): "/" | "/CMS-CON-001" | "/CMS-LOC-001" | "/CMS-MAP-001" | "/CMS-MAP-002" | "/CMS-MAP-003" | "/CMS-MAP-004" | "/CMS-OBD-001" | "/CMS-OBD-002" | "/CMS-STA-001" | "/CMS-STA-002" | "/CMS-UI" | "/menulist";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.svg" | "/fonts/woff-subset/Pretendard-Black.subset.woff" | "/fonts/woff-subset/Pretendard-Bold.subset.woff" | "/fonts/woff-subset/Pretendard-ExtraBold.subset.woff" | "/fonts/woff-subset/Pretendard-ExtraLight.subset.woff" | "/fonts/woff-subset/Pretendard-Light.subset.woff" | "/fonts/woff-subset/Pretendard-Medium.subset.woff" | "/fonts/woff-subset/Pretendard-Regular.subset.woff" | "/fonts/woff-subset/Pretendard-SemiBold.subset.woff" | "/fonts/woff-subset/Pretendard-Thin.subset.woff" | "/fonts/woff2-subset/Pretendard-Black.subset.woff2" | "/fonts/woff2-subset/Pretendard-Bold.subset.woff2" | "/fonts/woff2-subset/Pretendard-ExtraBold.subset.woff2" | "/fonts/woff2-subset/Pretendard-ExtraLight.subset.woff2" | "/fonts/woff2-subset/Pretendard-Light.subset.woff2" | "/fonts/woff2-subset/Pretendard-Medium.subset.woff2" | "/fonts/woff2-subset/Pretendard-Regular.subset.woff2" | "/fonts/woff2-subset/Pretendard-SemiBold.subset.woff2" | "/fonts/woff2-subset/Pretendard-Thin.subset.woff2" | "/images/logo/lnb-logo.svg" | string & {};
	}
}