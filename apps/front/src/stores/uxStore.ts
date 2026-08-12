import { type BottomSheetRef } from '@/utils/uxEvent.type';
import { atom, batch, computed } from 'nanostores';

type LayoutView = 'default' | 'facilities' | 'ai' | 'search' | 'path' | 'directions';
type DetailView = 'idle' | 'ai' | 'facilities' | 'search' | 'path' | 'directions';
type SearchView = 'idle' | 'result' | 'searchResult' | 'directions';
type RouteView = 'idle' | 'path' | 'directions';
type RecommendView = 'idle' | 'loading' | 'result' | 'empty';

type ViewStatePatch = {
	layout?: LayoutView;
	detail?: DetailView;
	search?: SearchView;
	route?: RouteView;
};

export const prevViewState = atom<LayoutView>('default');
export const layoutViewState = atom<LayoutView>('default');
export const detailViewState = atom<DetailView>('idle');
export const searchViewState = atom<SearchView>('idle');
export const routeViewState = atom<RouteView>('idle');
export const recommendViewState = atom<RecommendView>('idle');

export const viewportH = atom<number>(30);
export const sheetInstance = atom<BottomSheetRef | undefined>(undefined);
export const sheetScrollInstance = atom<HTMLElement | null>(null);
// export const sheetHandleArea = atom<number>(30);
// export const sheetBottomArea = atom<number>(68);
// export const sheetBackArea = atom<number>(70);
export const sheetMaxHeight = atom(0.99);
export const sheetSnapPoint = atom<number>(0);
export const confusionBar = atom(false);

export const viewDri = computed(
	[layoutViewState, detailViewState, searchViewState, routeViewState],
	(layout, detail, search, route) => ({
		layout,
		detail,
		search,
		route,
	}),
);

export function updateViewState(patch: ViewStatePatch) {
	batch(() => {
		if (patch.layout !== undefined) layoutViewState.set(patch.layout);
		if (patch.detail !== undefined) detailViewState.set(patch.detail);
		if (patch.search !== undefined) searchViewState.set(patch.search);
		if (patch.route !== undefined) routeViewState.set(patch.route);
	});
}

export function openSearchResult() {
	updateViewState({
		layout: 'search',
		search: 'result',
		route: 'idle',
	});
}

export function openSearchEmpty() {
	updateViewState({
		layout: 'search',
		search: 'idle',
		route: 'idle',
	});
}

export function openRouteResult() {
	updateViewState({
		layout: 'path',
		route: 'path',
		search: 'idle',
	});
}

export function openPoiFacilities() {
	updateViewState({
		layout: 'facilities',
		detail: 'facilities',
	});
}

export function resetViewState() {
	updateViewState({
		layout: 'default',
		detail: 'ai',
		search: 'idle',
		route: 'idle',
	});
}
