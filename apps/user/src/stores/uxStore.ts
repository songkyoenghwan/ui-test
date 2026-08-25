import { atom, batch, computed } from 'nanostores';
import { type BottomSheetRef } from '@/utils/uxEvent.type';

type LayoutView = 'idle' | 'default' | 'facilities' | 'search' | 'directions';
type DetailView = 'idle' | 'ai' | 'facilities' | 'search' | 'path' | 'directions' | 'finding';
type SearchView =
	| 'idle'
	| 'default'
	| 'recommend'
	| 'search'
	| 'searchResult'
	| 'popularity'
	| 'path'
	| 'departure'
	| 'departureSearch'
	| 'finding';
type RouteView = 'idle' | 'path' | 'directions';
type RecommendView = 'idle' | 'loading' | 'result' | 'empty';
export type ToastVariant = 'none' | 'same' | 'disabled' | 'far' | 'arrival';

type ViewStatePatch = {
	layout?: LayoutView;
	detail?: DetailView;
	search?: SearchView;
	route?: RouteView;
};

export type ViewStateSnapshot = Required<ViewStatePatch>;

export const layoutViewState = atom<LayoutView>('default');
export const detailViewState = atom<DetailView>('idle');
export const searchViewState = atom<SearchView>('idle');
export const routeViewState = atom<RouteView>('idle');
export const recommendViewState = atom<RecommendView>('idle');
export const beforeState = atom<ViewStateSnapshot[]>([]);
export const toastState = atom<ToastVariant>('none');
export const searchFormViewState = atom<SearchView>('idle');

export const viewportH = atom<number>(30);
export const sheetInstance = atom<BottomSheetRef | undefined>(undefined);
export const sheetScrollInstance = atom<HTMLElement | null>(null);
// export const sheetHandleArea = atom<number>(30);
// export const sheetBottomArea = atom<number>(68);
// export const sheetBackArea = atom<number>(70);
export const sheetMaxHeight = atom(0.99);
export const sheetSnapPoint = atom<number>(0);
export const sheetScrollPoint = atom<number>(90);
export const confusionBar = atom(false);
export const aiInterestMatching = atom(false);
export const aiInterest = atom(false);

export const viewDri = computed(
	[layoutViewState, detailViewState, searchViewState, routeViewState, beforeState],
	(layout, detail, search, route, previousStates) => ({
		layout,
		detail,
		search,
		route,
		beforeState: previousStates,
	}),
);

if (import.meta.env.DEV && !import.meta.env.SSR) {
	viewDri.subscribe((state) => {
		console.debug('[viewDri]', state);
	});
}

export function updateViewState(patch: ViewStatePatch) {
	const previousState: ViewStateSnapshot = {
		layout: layoutViewState.get(),
		detail: detailViewState.get(),
		search: searchViewState.get(),
		route: routeViewState.get(),
	};
	const hasStateChange =
		(patch.layout !== undefined && patch.layout !== previousState.layout) ||
		(patch.detail !== undefined && patch.detail !== previousState.detail) ||
		(patch.search !== undefined && patch.search !== previousState.search) ||
		(patch.route !== undefined && patch.route !== previousState.route);

	if (!hasStateChange) return;

	batch(() => {
		const history = beforeState.get();
		const latestState = history.at(-1);
		const isSameState =
			latestState !== undefined &&
			latestState.layout === previousState.layout &&
			latestState.detail === previousState.detail &&
			latestState.search === previousState.search &&
			latestState.route === previousState.route;

		if (!isSameState) {
			beforeState.set([...history, previousState]);
		}

		if (patch.layout !== undefined) layoutViewState.set(patch.layout);
		if (patch.detail !== undefined) detailViewState.set(patch.detail);
		if (patch.search !== undefined) searchViewState.set(patch.search);
		if (patch.route !== undefined) routeViewState.set(patch.route);
	});
}

export function restorePreviousViewState() {
	const history = beforeState.get();
	const previousState = history.at(-1);

	if (!previousState) return false;

	batch(() => {
		beforeState.set(history.slice(0, -1));
		layoutViewState.set(previousState.layout);
		detailViewState.set(previousState.detail);
		searchViewState.set(previousState.search);
		routeViewState.set(previousState.route);
	});

	return true;
}

export function openSearchResult() {
	updateViewState({
		layout: 'search',
		search: 'search',
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
		layout: 'directions',
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
