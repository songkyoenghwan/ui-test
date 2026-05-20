// src/lib/stores/navigation.ts
import type { Lnblist } from '$lib/types/Lnb';
import { writable, get, derived } from 'svelte/store';

// 스토어 타입 (필수 필드만)
interface NavigationState {
	currentId: string;
	currentLink?: string;
	lnblist: Lnblist;
	lastPathname?: string;
}

// 스토어 초기화 (빈 배열)
export const navigationStore = writable<NavigationState>({
	currentId: 'CMS-MAP',
	currentLink: '',
	lnblist: [],
});

// 초기화 (서버 데이터로)
export function initNavigation(lnblist: Lnblist) {
	const defaultItem = lnblist.flatMap((g) => g.list)[0];
	navigationStore.set({
		currentId: defaultItem?.id || 'CMS-MAP',
		currentLink: defaultItem?.link || '/',
		lnblist,
	});
}

// ID 설정
export function setCurrentId(itemId: string): boolean {
	const state = get(navigationStore);
	const matchedItem = state.lnblist.flatMap((g) => g.list).find((item) => item.id === itemId);

	if (!matchedItem) return false;

	navigationStore.set({
		...state,
		currentId: matchedItem.id,
		currentLink: matchedItem.link,
	});

	return true;
}

export function getCurrentId(itemId: string): boolean {
	const state = get(navigationStore);
	const matchedItem = state.lnblist.flatMap((g) => g.list).find((item) => item.id === itemId);

	if (!matchedItem) return false;

	navigationStore.set({
		...state,
		currentId: matchedItem.id,
		currentLink: matchedItem.link,
	});

	return true;
}

// pathname 매칭 (헬퍼만 반환)
export const currentItemFromPath = derived(navigationStore, ($state) => {
	if (typeof window === 'undefined') return undefined;

	const pathname = window.location.pathname.toLowerCase();
	return $state.lnblist.flatMap((g) => g.list).find((item) => pathname.includes(item.id.toLowerCase()));
});

export const currentSubItem = derived([currentItemFromPath, navigationStore], ([$menu]) => {
	if (!$menu?.sub || typeof window === 'undefined') return null;

	const pathname = window.location.pathname.toLowerCase();
	return $menu.sub.find((sub) => pathname.includes(sub.link.toLowerCase()));
});
