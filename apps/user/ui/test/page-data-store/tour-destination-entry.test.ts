import { afterEach, beforeEach, describe, expect, mock, test } from 'bun:test';

import {
	loadTourDestinationEntries,
	tourDestinationEntryError,
	tourDestinationEntryList,
	tourDestinationEntryLoading,
} from '../../src/stores/pageDataStore';

const originalFetch = globalThis.fetch;

const entryItem = {
	id: 38,
	name: '순천만국가정원',
	thumbnailUrl: 'https://cdn.example.com/entry.png',
	hasOnboarding: true,
	hasBasicSurvey: true,
	supportedLanguages: ['ko', 'en'],
};

const createDeferred = <T>() => {
	let resolve!: (value: T | PromiseLike<T>) => void;
	const promise = new Promise<T>((resolvePromise) => {
		resolve = resolvePromise;
	});

	return { promise, resolve };
};

beforeEach(() => {
	tourDestinationEntryList.set([]);
	tourDestinationEntryLoading.set(false);
	tourDestinationEntryError.set('');
});

afterEach(() => {
	globalThis.fetch = originalFetch;
});

describe('tour destination entry page data', () => {
	test('진입 목록 endpoint와 성공 envelope을 entry atom에 연결한다', async () => {
		globalThis.fetch = mock(async (input: string | URL | Request) => {
			expect(input.toString()).toBe('/api/v1/tour-destinations/entry?page=1&pageSize=100&language=en');
			return Response.json({
				success: true,
				data: { items: [entryItem], totalCount: 1, page: 1, pageSize: 100, totalPages: 1 },
			});
		}) as typeof fetch;

		await loadTourDestinationEntries('en', new AbortController().signal);

		expect(tourDestinationEntryList.get()).toEqual([entryItem]);
		expect(tourDestinationEntryLoading.get()).toBeFalse();
		expect(tourDestinationEntryError.get()).toBe('');
	});

	test('취소된 이전 요청이 최신 진입 목록을 덮어쓰지 않는다', async () => {
		const oldResponse = createDeferred<Response>();
		let requestCount = 0;
		globalThis.fetch = mock(async () => {
			requestCount += 1;
			if (requestCount === 1) return oldResponse.promise;

			return Response.json({
				success: true,
				data: { items: [{ ...entryItem, id: 99 }], totalCount: 1, page: 1, pageSize: 100, totalPages: 1 },
			});
		}) as typeof fetch;

		const oldController = new AbortController();
		const oldRequest = loadTourDestinationEntries('en', oldController.signal);
		oldController.abort();

		await loadTourDestinationEntries('ko', new AbortController().signal);
		oldResponse.resolve(
			Response.json({
				success: true,
				data: { items: [{ ...entryItem, id: 1 }], totalCount: 1, page: 1, pageSize: 100, totalPages: 1 },
			}),
		);
		await oldRequest;

		expect(tourDestinationEntryList.get().map((item) => item.id)).toEqual([99]);
		expect(tourDestinationEntryError.get()).toBe('');
		expect(tourDestinationEntryLoading.get()).toBeFalse();
	});
});
