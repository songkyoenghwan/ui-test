import { beforeEach, describe, expect, test } from 'bun:test';

import {
	loadRecentSearches,
	recentSearchItems,
	recentSearchesForDestination,
	RECENT_SEARCH_LIMIT,
	RECENT_SEARCH_STORAGE_KEY,
	removeRecentSearch,
	saveRecentFacility,
	saveRecentKeyword,
	touchRecentSearch,
} from './recentSearchStore';

function memoryStorage(initial?: string) {
	const values = new Map<string, string>();
	if (initial !== undefined) values.set(RECENT_SEARCH_STORAGE_KEY, initial);
	return {
		getItem: (key: string) => values.get(key) ?? null,
		setItem: (key: string, value: string) => values.set(key, value),
	};
}

describe('recentSearchStore', () => {
	beforeEach(() => recentSearchItems.set([]));

	test('키워드와 시설을 최신순으로 저장하고 대상지별로 조회한다', () => {
		const storage = memoryStorage();
		saveRecentKeyword({ keyword: ' 먹거리 ', tourDestinationId: 1 }, storage, new Date('2026-08-24T01:00:00Z'));
		saveRecentFacility(
			{
				facilityId: 78,
				poiId: 93,
				tourDestinationId: 1,
				name: { ko: '노을빛전망대' },
				iconKey: 'information',
				colorCode: '#274fa8',
			},
			storage,
			new Date('2026-08-24T02:00:00Z'),
		);
		saveRecentKeyword({ keyword: '다른 대상지', tourDestinationId: 2 }, storage, new Date('2026-08-24T03:00:00Z'));

		expect(recentSearchesForDestination(1).map((item) => item.type)).toEqual(['facility', 'keyword']);
		expect(loadRecentSearches(storage).map((item) => item.searchedAt)).toEqual([
			'2026-08-24T03:00:00.000Z',
			'2026-08-24T02:00:00.000Z',
			'2026-08-24T01:00:00.000Z',
		]);
	});

	test('키워드와 시설 중복은 최신 기록으로 덮어쓴다', () => {
		const storage = memoryStorage();
		saveRecentKeyword({ keyword: '먹거리', tourDestinationId: 1 }, storage, new Date('2026-08-24T01:00:00Z'));
		saveRecentKeyword({ keyword: ' 먹거리 ', tourDestinationId: 1 }, storage, new Date('2026-08-24T02:00:00Z'));
		saveRecentFacility({ facilityId: 7, poiId: 12, tourDestinationId: 1, name: { ko: '시설' } }, storage);
		saveRecentFacility({ facilityId: 7, poiId: 12, tourDestinationId: 1, name: { ko: '변경 시설' } }, storage);

		expect(recentSearchItems.get()).toHaveLength(2);
		expect(recentSearchItems.get().filter((item) => item.type === 'keyword')[0]?.searchedAt).toBe('2026-08-24T02:00:00.000Z');
		const keyword = recentSearchItems.get().find((item) => item.type === 'keyword');
		if (!keyword) throw new Error('keyword fixture missing');
		touchRecentSearch(keyword.id, storage, new Date('2026-08-24T04:00:00Z'));
		expect(recentSearchItems.get()[0]?.id).toBe(keyword.id);
	});

	test('최대 30개를 유지하고 항목을 즉시 삭제한다', () => {
		const storage = memoryStorage();
		for (let index = 0; index < RECENT_SEARCH_LIMIT + 5; index += 1) {
			saveRecentKeyword({ keyword: `검색 ${index}`, tourDestinationId: 1 }, storage, new Date(1_000 + index));
		}

		expect(recentSearchItems.get()).toHaveLength(RECENT_SEARCH_LIMIT);
		const target = recentSearchItems.get()[0];
		removeRecentSearch(target.id, storage);
		expect(recentSearchItems.get().some((item) => item.id === target.id)).toBe(false);
	});

	test('손상되거나 유효하지 않은 저장 데이터는 버린다', () => {
		expect(loadRecentSearches(memoryStorage('{broken'))).toEqual([]);
		expect(loadRecentSearches(memoryStorage(JSON.stringify([{ type: 'keyword' }])))).toEqual([]);
	});
});
