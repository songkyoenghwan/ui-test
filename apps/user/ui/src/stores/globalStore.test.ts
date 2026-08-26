import { afterEach, describe, expect, test } from 'bun:test';

import {
	DEFAULT_TOUR_DESTINATION_ID,
	FALLBACK_TOUR_DESTINATION_ID,
	resolveMapDestinationId,
	setCurrentTourDestinationId,
} from './globalStore';

describe('resolveMapDestinationId', () => {
	afterEach(() => {
		setCurrentTourDestinationId(DEFAULT_TOUR_DESTINATION_ID);
	});

	test('미선택·잘못된 값은 기본 대상지 48을 쓴다', () => {
		expect(DEFAULT_TOUR_DESTINATION_ID).toBe(48);
		expect(FALLBACK_TOUR_DESTINATION_ID).toBe(1);

		setCurrentTourDestinationId(0);
		expect(resolveMapDestinationId()).toBe(48);
	});

	test('저장된 대상지가 있으면 그 값을 쓴다', () => {
		setCurrentTourDestinationId(12);
		expect(resolveMapDestinationId()).toBe(12);
	});
});
