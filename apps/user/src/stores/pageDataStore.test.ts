import { afterEach, describe, expect, mock, test } from 'bun:test';

import {
	keywordSearchError,
	keywordSearchLoading,
	keywordSearchResultList,
	loadKeywordSearch,
	searchResultList,
} from './pageDataStore';

const originalFetch = globalThis.fetch;

afterEach(() => {
	globalThis.fetch = originalFetch;
	keywordSearchResultList.set([]);
	searchResultList.set([]);
	keywordSearchError.set(null);
	keywordSearchLoading.set(false);
});

describe('loadKeywordSearch', () => {
	test('검색 파라미터를 전달하고 envelope의 items를 저장한다', async () => {
		const fetchMock = mock(async (input: string | URL | Request) => {
			expect(input.toString()).toBe(
				'/api/v1/search?tourDestinationId=3&keyword=%EB%A7%9D%EC%9B%90+%EC%8B%9C%EC%9E%A5&language=ko',
			);

			return new Response(
				JSON.stringify({
					success: true,
					data: {
						items: [
							{
								id: 7,
								name: { ko: '망원시장 안내소' },
								category: {
									name: { ko: '관광 안내' },
									iconKey: 'information',
									categoryColorCodes: { colorCode: '#274FA8' },
								},
							},
						],
					},
				}),
			);
		});
		globalThis.fetch = fetchMock as typeof fetch;

		await expect(loadKeywordSearch({ destinationId: 3, keyword: '  망원 시장  ', language: 'ko' })).resolves.toBe(true);
		expect(keywordSearchResultList.get()).toHaveLength(1);
		expect(searchResultList.get()).toMatchObject([
			{
				id: 7,
				name: { ko: '망원시장 안내소' },
				category: { iconKey: 'information' },
			},
		]);
		expect(keywordSearchError.get()).toBeNull();
		expect(keywordSearchLoading.get()).toBe(false);
	});

	test('빈 검색어는 요청하지 않고 기존 결과를 초기화한다', async () => {
		const fetchMock = mock(async () => new Response());
		globalThis.fetch = fetchMock as typeof fetch;
		keywordSearchResultList.set([{ id: 1, name: { ko: '기존 결과' }, category: null }]);

		await expect(loadKeywordSearch({ destinationId: 1, keyword: '   ', language: 'ko' })).resolves.toBe(false);
		expect(fetchMock).not.toHaveBeenCalled();
		expect(keywordSearchResultList.get()).toEqual([]);
		expect(searchResultList.get()).toEqual([]);
	});

	test('실패 응답은 결과를 비우고 오류를 저장한다', async () => {
		globalThis.fetch = mock(async () => new Response(null, { status: 500 })) as typeof fetch;

		await expect(loadKeywordSearch({ destinationId: 1, keyword: '시장', language: 'ko' })).resolves.toBe(false);
		expect(keywordSearchResultList.get()).toEqual([]);
		expect(searchResultList.get()).toEqual([]);
		expect(keywordSearchError.get()).toBe('Failed to fetch search results: 500');
		expect(keywordSearchLoading.get()).toBe(false);
	});
});
