import { describe, expect, test } from 'bun:test';

import { calculateDistanceMeters, formatDistance } from './distance';

describe('distance', () => {
	test('위경도 사이의 Haversine 직선거리를 계산한다', () => {
		const distance = calculateDistanceMeters({ latitude: 37.5, longitude: 127 }, { latitude: 37.51, longitude: 127.01 });

		expect(distance).toBeGreaterThan(0);
	});

	test('유효하지 않은 좌표는 계산하지 않는다', () => {
		expect(calculateDistanceMeters({ latitude: 91, longitude: 127 }, { latitude: 37.51, longitude: 127.01 })).toBeNull();
	});

	test('거리를 m 또는 km로 표시한다', () => {
		expect(formatDistance(0)).toBe('0m');
		expect(formatDistance(999.9)).toBe('999m');
		expect(formatDistance(1_000)).toBe('1.0km');
		expect(formatDistance(1_234)).toBe('1.2km');
		expect(formatDistance(null)).toBeNull();
	});
});
