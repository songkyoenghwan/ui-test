import { describe, expect, test } from 'bun:test';

import { classifyPedestrianError, mapPedestrianFeatures } from './tmap-pedestrian';

describe('mapPedestrianFeatures', () => {
	test('LineString 좌표와 턴 안내, 거리·시간을 매핑한다', () => {
		const mapped = mapPedestrianFeatures({
			type: 'FeatureCollection',
			features: [
				{
					geometry: { type: 'Point', coordinates: [126.905, 37.556] },
					properties: {
						totalDistance: '140',
						totalTime: '120',
						description: '망원시장에서 출발',
					},
				},
				{
					geometry: {
						type: 'LineString',
						coordinates: [
							[126.905, 37.556],
							[126.906, 37.557],
						],
					},
					properties: {
						description: '포은로, 140m',
					},
				},
				{
					geometry: { type: 'Point', coordinates: [126.906, 37.557] },
					properties: { description: '도착' },
				},
			],
		});

		expect(mapped).toEqual({
			path: [
				{ latitude: 37.556, longitude: 126.905 },
				{ latitude: 37.557, longitude: 126.906 },
			],
			turns: [{ description: '망원시장에서 출발' }, { description: '도착' }],
			totalDistance: 140,
			totalTimeMinutes: 2,
			step: 200,
		});
	});

	test('경로 좌표가 부족하면 null을 반환한다', () => {
		expect(mapPedestrianFeatures({ features: [] })).toBeNull();
		expect(
			mapPedestrianFeatures({
				features: [{ geometry: { type: 'LineString', coordinates: [[126.905, 37.556]] } }],
			}),
		).toBeNull();
	});
});

describe('classifyPedestrianError', () => {
	test('과거리 메시지는 far로 분류한다', () => {
		expect(classifyPedestrianError(400, { error: { message: '거리가 너무 멉니다' } })).toBe('far');
	});

	test('그 외 오류는 disabled로 분류한다', () => {
		expect(classifyPedestrianError(500, { error: { message: '경로를 탐색할 수 없습니다' } })).toBe('disabled');
		expect(classifyPedestrianError(503, null)).toBe('disabled');
	});
});
