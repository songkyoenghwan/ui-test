import { describe, expect, test } from 'bun:test';

import { areRoutePlacesOverlapping, facilityDisplayName, placeDisplayName, ROUTE_PLACE_OVERLAP_METERS } from './route-place';

const poiA = { latitude: 37.556, longitude: 126.905, poiId: 12, name: '망원시장' };
const poiB = { latitude: 37.557, longitude: 126.906, poiId: 13, name: '망원한강공원' };

describe('areRoutePlacesOverlapping', () => {
	test('같은 POI ID는 겹친 것으로 본다', () => {
		expect(areRoutePlacesOverlapping(poiA, { ...poiA, name: '다른 이름' })).toBe(true);
		expect(areRoutePlacesOverlapping(poiA, { ...poiA, poiId: '12' as unknown as number })).toBe(true);
	});

	test('서로 다른 POI는 겹치지 않는다', () => {
		expect(areRoutePlacesOverlapping(poiA, poiB)).toBe(false);
	});

	test('좌표가 수 미터 이내면 겹친 것으로 본다', () => {
		expect(
			areRoutePlacesOverlapping(
				{ latitude: 37.556, longitude: 126.905, poiId: null, name: '현위치' },
				{ latitude: 37.55600001, longitude: 126.90500001, poiId: 12, name: '망원시장' },
			),
		).toBe(true);
	});

	test('한쪽이 비어 있으면 겹치지 않는다', () => {
		expect(areRoutePlacesOverlapping(poiA, null)).toBe(false);
		expect(areRoutePlacesOverlapping(undefined, poiB)).toBe(false);
	});

	test('겹침 임계값은 5m이다', () => {
		expect(ROUTE_PLACE_OVERLAP_METERS).toBe(5);
	});
});

describe('placeDisplayName', () => {
	test('문자열과 다국어 객체에서 이름을 고른다', () => {
		expect(placeDisplayName('망원시장')).toBe('망원시장');
		expect(placeDisplayName({ ko: '망원시장', en: 'Mangwon Market' })).toBe('망원시장');
		expect(placeDisplayName(null, '현위치')).toBe('현위치');
	});
});

describe('facilityDisplayName', () => {
	test('현재 언어의 시설명을 우선한다', () => {
		expect(facilityDisplayName({ ko: '망원시장 안내소', en: 'Information Center' }, 'en')).toBe('Information Center');
		expect(facilityDisplayName({ ko: '망원시장 안내소' }, 'ja')).toBe('망원시장 안내소');
		expect(facilityDisplayName('망원시장 안내소', 'ko')).toBe('망원시장 안내소');
	});
});
