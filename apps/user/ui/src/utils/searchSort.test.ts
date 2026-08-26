import { describe, expect, test } from 'bun:test';

import type { FacilityListResponse } from '@/types/facilities';

import { sortSearchResults, type SearchSortableFacility } from './searchSort';

function facility(
	id: number,
	name: string,
	status: NonNullable<FacilityListResponse['operation']>['status'],
	nextTransitionAt: string | null = null,
): SearchSortableFacility {
	return {
		id,
		name: { ko: name },
		startAt: null,
		endAt: null,
		description: null,
		overwriteCongestionStatus: null,
		linkButton: null,
		createdAt: null,
		updatedAt: null,
		isUsingCongestion: false,
		hasVpsPopup: false,
		category: null,
		matchingPoiName: null,
		facilityProductsCount: 0,
		facilityButtonsCount: 0,
		operation: { status, nextTransitionAt },
	};
}

const nameOf = (item: SearchSortableFacility) => (item.name as { ko: string }).ko;

describe('sortSearchResults', () => {
	test('운영 상태 우선순위를 적용한다', () => {
		const result = sortSearchResults(
			[facility(1, '휴무', 'HOLIDAY'), facility(2, '운영', 'OPERATING'), facility(3, '휴게', 'BREAK')],
			'hours',
			nameOf,
			'ko',
		);

		expect(result.map((item) => item.id)).toEqual([2, 3, 1]);
	});

	test('휴게 상태가 같으면 종료 시각이 가까운 순으로 정렬한다', () => {
		const result = sortSearchResults(
			[facility(1, '나', 'BREAK', '2026-08-24T05:00:00.000Z'), facility(2, '가', 'BREAK', '2026-08-24T04:00:00.000Z')],
			'hours',
			nameOf,
			'ko',
		);

		expect(result.map((item) => item.id)).toEqual([2, 1]);
	});

	test('거리가 같으면 운영시간순으로 정렬한다', () => {
		const closed = { ...facility(1, '가', 'AFTER_CLOSE'), distance: 10 };
		const open = { ...facility(2, '나', 'OPERATING'), distance: 10 };

		expect(sortSearchResults([closed, open], 'proximity', nameOf, 'ko').map((item) => item.id)).toEqual([2, 1]);
	});
});
