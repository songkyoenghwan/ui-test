import { describe, expect, test } from 'bun:test';

import { formatOperatingStatus } from './operatingStatus';

describe('formatOperatingStatus', () => {
	test.each([
		['OUT_OF_PERIOD', null, '미운영'],
		['HOLIDAY', null, '오늘 휴무'],
		['OPERATING', '2026-08-24T09:00:00.000Z', '운영 중 · 18:00 운영 종료'],
		['BREAK', '2026-08-24T04:00:00.000Z', '휴게 시간 · 13:00 운영 재시작'],
		['BEFORE_OPEN', '2026-08-24T00:00:00.000Z', '운영 전 · 09:00 운영 시작'],
		['AFTER_CLOSE', null, '오늘 운영 종료'],
	] as const)('%s 상태를 요구 형식으로 표시한다', (status, nextTransitionAt, expected) => {
		expect(formatOperatingStatus({ status, nextTransitionAt })).toBe(expected);
	});

	test('전환 시각이 없으면 상태만 표시한다', () => {
		expect(formatOperatingStatus({ status: 'OPERATING', nextTransitionAt: null })).toBe('운영 중');
	});
});
