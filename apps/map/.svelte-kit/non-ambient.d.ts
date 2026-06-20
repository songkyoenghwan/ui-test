
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
		RouteId(): "/(page)" | "/(menulist)" | "/" | "/(page)/CMS-CON-001" | "/(page)/CMS-LOC-001-1" | "/(page)/CMS-LOC-001-1/reg" | "/(page)/CMS-LOC-001-1/[...id]/detail" | "/(page)/CMS-LOC-001-1/[...id]/edit" | "/(page)/CMS-LOC-001-1/[...id]" | "/(page)/CMS-LOC-001" | "/(page)/CMS-LOC-001/[view]" | "/(page)/CMS-LOC-001/[view]/[...id]" | "/(page)/CMS-MAP-001" | "/(page)/CMS-MAP-002" | "/(page)/CMS-MAP-003" | "/(page)/CMS-MAP-004" | "/(page)/CMS-OBD-001" | "/(page)/CMS-OBD-002" | "/(page)/CMS-STA-001" | "/(page)/CMS-STA-002" | "/(page)/CMS-UI" | "/api" | "/api/cms-loc-001" | "/api/menu" | "/(menulist)/menulist";
		RouteParams(): {
			"/(page)/CMS-LOC-001-1/[...id]/detail": { id: string };
			"/(page)/CMS-LOC-001-1/[...id]/edit": { id: string };
			"/(page)/CMS-LOC-001-1/[...id]": { id: string };
			"/(page)/CMS-LOC-001/[view]": { view: string };
			"/(page)/CMS-LOC-001/[view]/[...id]": { view: string; id: string }
		};
		LayoutParams(): {
			"/(page)": { id?: string | undefined; view?: string | undefined };
			"/(menulist)": Record<string, never>;
			"/": { id?: string | undefined; view?: string | undefined };
			"/(page)/CMS-CON-001": Record<string, never>;
			"/(page)/CMS-LOC-001-1": { id?: string | undefined };
			"/(page)/CMS-LOC-001-1/reg": Record<string, never>;
			"/(page)/CMS-LOC-001-1/[...id]/detail": { id: string };
			"/(page)/CMS-LOC-001-1/[...id]/edit": { id: string };
			"/(page)/CMS-LOC-001-1/[...id]": { id: string };
			"/(page)/CMS-LOC-001": { view?: string | undefined; id?: string | undefined };
			"/(page)/CMS-LOC-001/[view]": { view: string; id?: string | undefined };
			"/(page)/CMS-LOC-001/[view]/[...id]": { view: string; id: string };
			"/(page)/CMS-MAP-001": Record<string, never>;
			"/(page)/CMS-MAP-002": Record<string, never>;
			"/(page)/CMS-MAP-003": Record<string, never>;
			"/(page)/CMS-MAP-004": Record<string, never>;
			"/(page)/CMS-OBD-001": Record<string, never>;
			"/(page)/CMS-OBD-002": Record<string, never>;
			"/(page)/CMS-STA-001": Record<string, never>;
			"/(page)/CMS-STA-002": Record<string, never>;
			"/(page)/CMS-UI": Record<string, never>;
			"/api": Record<string, never>;
			"/api/cms-loc-001": Record<string, never>;
			"/api/menu": Record<string, never>;
			"/(menulist)/menulist": Record<string, never>
		};
		Pathname(): "/" | "/CMS-CON-001" | "/CMS-LOC-001-1" | "/CMS-LOC-001-1/reg" | `/CMS-LOC-001-1/${string}/detail` & {} | `/CMS-LOC-001-1/${string}/edit` & {} | "/CMS-LOC-001" | `/CMS-LOC-001/${string}` & {} | `/CMS-LOC-001/${string}/${string}` & {} | "/CMS-MAP-001" | "/CMS-MAP-002" | "/CMS-MAP-003" | "/CMS-MAP-004" | "/CMS-OBD-001" | "/CMS-OBD-002" | "/CMS-STA-001" | "/CMS-STA-002" | "/CMS-UI" | "/api/cms-loc-001" | "/api/menu" | "/menulist";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.svg" | "/fonts/woff-subset/Pretendard-Black.subset.woff" | "/fonts/woff-subset/Pretendard-Bold.subset.woff" | "/fonts/woff-subset/Pretendard-ExtraBold.subset.woff" | "/fonts/woff-subset/Pretendard-ExtraLight.subset.woff" | "/fonts/woff-subset/Pretendard-Light.subset.woff" | "/fonts/woff-subset/Pretendard-Medium.subset.woff" | "/fonts/woff-subset/Pretendard-Regular.subset.woff" | "/fonts/woff-subset/Pretendard-SemiBold.subset.woff" | "/fonts/woff-subset/Pretendard-Thin.subset.woff" | "/fonts/woff2-subset/Pretendard-Black.subset.woff2" | "/fonts/woff2-subset/Pretendard-Bold.subset.woff2" | "/fonts/woff2-subset/Pretendard-ExtraBold.subset.woff2" | "/fonts/woff2-subset/Pretendard-ExtraLight.subset.woff2" | "/fonts/woff2-subset/Pretendard-Light.subset.woff2" | "/fonts/woff2-subset/Pretendard-Medium.subset.woff2" | "/fonts/woff2-subset/Pretendard-Regular.subset.woff2" | "/fonts/woff2-subset/Pretendard-SemiBold.subset.woff2" | "/fonts/woff2-subset/Pretendard-Thin.subset.woff2" | "/html/CMS-UI.html" | "/html/index copy.html" | "/html/index.html" | "/images/chk/stepper-chk.svg" | "/images/date/calendar.svg" | "/images/date/clock.svg" | "/images/date/search.svg" | "/images/logo/lnb-logo.svg" | "/imgs/chk/stepper-chk.svg" | "/imgs/date/calendar.svg" | "/imgs/date/clock.svg" | "/imgs/date/search.svg" | "/imgs/logo/lnb-logo.svg" | "/json/db.json" | string & {};
	}
}