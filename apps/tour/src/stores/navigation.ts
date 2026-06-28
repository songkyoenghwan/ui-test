import { derived, get, writable } from 'svelte/store';

// src/lib/stores/navigation.ts
import type { LnbList } from '@/types/Lnb';

// 스토어 타입 (필수 필드만)
interface NavigationState {
	currentId: string;
	currentLink?: string;
	list: LnbList;
	lastPathname?: string;
}

// 스토어 초기화 (빈 배열)
export const navigationStore = writable<NavigationState>({
	currentId: 'CMS-MAP',
	currentLink: '',
	list: [],
});

// 초기화 (서버 데이터로)
export function initNavigation(list: LnbList) {
	const defaultItem = list.flatMap((g) => g.item)[0];
	navigationStore.set({
		currentId: defaultItem?.id || 'CMS-MAP',
		currentLink: defaultItem?.link || '/',
		list,
	});
}

// ID 설정
export function setCurrentId(itemId: string): boolean {
	const state = get(navigationStore);
	const matchedItem = state.list.flatMap((g) => g.item).find((it) => it.id === itemId);

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
	const matchedItem = state.list.flatMap((g) => g.item).find((it) => it.id === itemId);

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
	return $state.list.flatMap((g) => g.item).find((item) => pathname.includes(item.id.toLowerCase()));
});

export const currentSubItem = derived([currentItemFromPath, navigationStore], ([$menu]) => {
	if (!$menu?.sub || typeof window === 'undefined') return null;

	const pathname = window.location.pathname.toLowerCase();
	return $menu.sub.find((sub) => pathname.includes(sub.link.toLowerCase()));
});
