import { describe, expect, test } from 'bun:test';

import { boundsFromPoints, expandBoundsForOverlayPadding } from './map-bounds';

describe('expandBoundsForOverlayPadding', () => {
	test('위아래 패딩만큼 위도를 늘려 경로가 가려진 영역 밖에 맞게 한다', () => {
		const expanded = expandBoundsForOverlayPadding(
			{ minLat: 37.55, maxLat: 37.56, minLng: 126.9, maxLng: 126.91 },
			{ width: 400, height: 800 },
			{ top: 80, right: 0, bottom: 160, left: 0 },
		);

		expect(expanded.maxLat).toBeGreaterThan(37.56);
		expect(expanded.minLat).toBeLessThan(37.55);
		expect(expanded.maxLat - 37.56).toBeCloseTo(((37.56 - 37.55) * (800 / 560) * 80) / 800, 8);
		expect(37.55 - expanded.minLat).toBeCloseTo(((37.56 - 37.55) * (800 / 560) * 160) / 800, 8);
		expect(expanded.minLng).toBe(126.9);
		expect(expanded.maxLng).toBe(126.91);
	});

	test('좌우 패딩만큼 경도를 늘린다', () => {
		const expanded = expandBoundsForOverlayPadding(
			{ minLat: 37.55, maxLat: 37.56, minLng: 126.9, maxLng: 126.91 },
			{ width: 400, height: 800 },
			{ top: 0, right: 40, bottom: 0, left: 40 },
		);

		expect(expanded.maxLng).toBeGreaterThan(126.91);
		expect(expanded.minLng).toBeLessThan(126.9);
		expect(expanded.minLat).toBe(37.55);
		expect(expanded.maxLat).toBe(37.56);
	});
});

describe('boundsFromPoints', () => {
	test('경로 점의 최소·최대 좌표를 만든다', () => {
		expect(
			boundsFromPoints([
				{ latitude: 37.55, longitude: 126.91 },
				{ latitude: 37.56, longitude: 126.9 },
			]),
		).toEqual({ minLat: 37.55, maxLat: 37.56, minLng: 126.9, maxLng: 126.91 });
	});
});
