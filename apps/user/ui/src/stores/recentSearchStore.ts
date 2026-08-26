import { atom } from 'nanostores';

import type { RecentFacilitySearch, RecentKeywordSearch, RecentSearchItem } from '@/types/search';

export const RECENT_SEARCH_STORAGE_KEY = 'mapRecentSearches:v1';
export const RECENT_SEARCH_LIMIT = 30;

type RecentSearchStorage = Pick<Storage, 'getItem' | 'setItem'>;

export const recentSearchItems = atom<RecentSearchItem[]>([]);

export function loadRecentSearches(storage: RecentSearchStorage | null = browserStorage()): RecentSearchItem[] {
	const items = readRecentSearches(storage);
	recentSearchItems.set(items);
	return items;
}

export function saveRecentKeyword(
	input: { keyword: string; tourDestinationId: number },
	storage: RecentSearchStorage | null = browserStorage(),
	now: Date = new Date(),
): void {
	const keyword = input.keyword.trim();
	if (!keyword || !isPositiveInteger(input.tourDestinationId)) return;

	const normalizedKeyword = keyword.toLocaleLowerCase();
	const item: RecentKeywordSearch = {
		id: `keyword:${input.tourDestinationId}:${normalizedKeyword}`,
		type: 'keyword',
		keyword,
		tourDestinationId: input.tourDestinationId,
		searchedAt: now.toISOString(),
	};
	updateRecentSearches(
		(current) => [
			item,
			...current.filter(
				(existing) =>
					existing.type !== 'keyword' ||
					existing.tourDestinationId !== input.tourDestinationId ||
					existing.keyword.trim().toLocaleLowerCase() !== normalizedKeyword,
			),
		],
		storage,
	);
}

export function saveRecentFacility(
	input: {
		facilityId: number;
		poiId: number;
		tourDestinationId: number;
		name: unknown;
		iconKey?: string | null;
		colorCode?: string | null;
	},
	storage: RecentSearchStorage | null = browserStorage(),
	now: Date = new Date(),
): void {
	if (!isPositiveInteger(input.facilityId) || !isPositiveInteger(input.poiId) || !isPositiveInteger(input.tourDestinationId)) {
		return;
	}

	const item: RecentFacilitySearch = {
		id: `facility:${input.tourDestinationId}:${input.facilityId}`,
		type: 'facility',
		facilityId: input.facilityId,
		poiId: input.poiId,
		tourDestinationId: input.tourDestinationId,
		name: input.name,
		iconKey: input.iconKey ?? null,
		colorCode: input.colorCode ?? null,
		searchedAt: now.toISOString(),
	};
	updateRecentSearches(
		(current) => [
			item,
			...current.filter(
				(existing) =>
					existing.type !== 'facility' ||
					existing.tourDestinationId !== input.tourDestinationId ||
					existing.facilityId !== input.facilityId,
			),
		],
		storage,
	);
}

export function removeRecentSearch(id: string, storage: RecentSearchStorage | null = browserStorage()): void {
	updateRecentSearches((current) => current.filter((item) => item.id !== id), storage);
}

export function touchRecentSearch(
	id: string,
	storage: RecentSearchStorage | null = browserStorage(),
	now: Date = new Date(),
): void {
	updateRecentSearches((current) => {
		const item = current.find((entry) => entry.id === id);
		return item ? [{ ...item, searchedAt: now.toISOString() }, ...current.filter((entry) => entry.id !== id)] : current;
	}, storage);
}

export function recentSearchesForDestination(tourDestinationId: number): RecentSearchItem[] {
	return recentSearchItems.get().filter((item) => item.tourDestinationId === tourDestinationId);
}

function updateRecentSearches(
	update: (current: RecentSearchItem[]) => RecentSearchItem[],
	storage: RecentSearchStorage | null,
): void {
	const next = update(readRecentSearches(storage)).slice(0, RECENT_SEARCH_LIMIT);
	recentSearchItems.set(next);
	try {
		storage?.setItem(RECENT_SEARCH_STORAGE_KEY, JSON.stringify(next));
	} catch {
		// 저장 공간 제한 또는 private browsing에서도 메모리 이력은 유지한다.
	}
}

function readRecentSearches(storage: RecentSearchStorage | null): RecentSearchItem[] {
	if (!storage) return recentSearchItems.get();

	try {
		const parsed: unknown = JSON.parse(storage.getItem(RECENT_SEARCH_STORAGE_KEY) ?? '[]');
		if (!Array.isArray(parsed)) return [];
		return parsed
			.filter(isRecentSearchItem)
			.sort((a, b) => b.searchedAt.localeCompare(a.searchedAt))
			.slice(0, RECENT_SEARCH_LIMIT);
	} catch {
		return [];
	}
}

function isRecentSearchItem(value: unknown): value is RecentSearchItem {
	if (!value || typeof value !== 'object') return false;
	const item = value as Partial<RecentSearchItem>;
	if (
		typeof item.id !== 'string' ||
		!isPositiveInteger(item.tourDestinationId) ||
		typeof item.searchedAt !== 'string' ||
		!Number.isFinite(Date.parse(item.searchedAt))
	) {
		return false;
	}
	if (item.type === 'keyword') return typeof item.keyword === 'string' && Boolean(item.keyword.trim());
	return (
		item.type === 'facility' &&
		isPositiveInteger(item.facilityId) &&
		isPositiveInteger(item.poiId) &&
		(item.iconKey == null || typeof item.iconKey === 'string') &&
		(item.colorCode == null || typeof item.colorCode === 'string')
	);
}

function isPositiveInteger(value: unknown): value is number {
	return Number.isInteger(value) && Number(value) > 0;
}

function browserStorage(): RecentSearchStorage | null {
	return typeof localStorage === 'undefined' ? null : localStorage;
}
