import { afterEach, describe, expect, mock, test } from 'bun:test';

import { distance } from './globalStore';
import { routeEndpoints, routeSelecting, userPosition } from './locationStore';
import {
	aiRecommendationFacilityItems,
	aiRecommendationError,
	aiRecommendationLoading,
	aiRecommendationLoadedDestinationId,
	assignRoutePlace,
	beginWalkingSelection,
	closeWalkingRoute,
	current,
	departureSearchTab,
	facility,
	facilityDetail,
	facilityOtherList,
	keywordSearchError,
	keywordSearchLoading,
	keywordSearchResultList,
	keywordSearchSubmitted,
	loadDestination,
	loadKeywordSearch,
	loadAiRecommendationFacilities,
	loadPopularSearches,
	loadPoiDetail,
	openWalkingPlaceSearch,
	pathList,
	poiList,
	poiListAll,
	popularSearchFacilityItems,
	popularSearchError,
	popularSearchLoadedDestinationId,
	popularSearchLoading,
	requestWalkingRoute,
	searchResultList,
	startWalkingFromUserLocation,
	toFacilityListResponse,
	toLegacyPoiListItem,
	walkingRoutePath,
} from './pageDataStore';
import { recentSearchItems } from './recentSearchStore';
import { beforeState, detailViewState, layoutViewState, routeViewState, searchViewState, toastState } from './uxStore';

const originalFetch = globalThis.fetch;

afterEach(() => {
	globalThis.fetch = originalFetch;
	keywordSearchResultList.set([]);
	searchResultList.set([]);
	poiList.set([]);
	poiListAll.set([]);
	keywordSearchError.set(null);
	keywordSearchLoading.set(false);
	keywordSearchSubmitted.set(false);
	recentSearchItems.set([]);
	departureSearchTab.set('recent-searches');
	aiRecommendationFacilityItems.set([]);
	aiRecommendationError.set(null);
	aiRecommendationLoading.set(false);
	aiRecommendationLoadedDestinationId.set(null);
	popularSearchFacilityItems.set([]);
	popularSearchError.set(null);
	popularSearchLoadedDestinationId.set(null);
	popularSearchLoading.set(false);
	facility.set(null);
	facilityDetail.set(null);
	facilityOtherList.set([]);
	routeEndpoints.set({ start: null, end: null });
	routeSelecting.set('idle');
	userPosition.set(null);
	walkingRoutePath.set([]);
	pathList.set([]);
	toastState.set('none');
	beforeState.set([]);
	layoutViewState.set('default');
	detailViewState.set('idle');
	searchViewState.set('idle');
	routeViewState.set('idle');
	distance.set({ start: '', end: '', step: 0, totalDistance: 0, time: 0 });
});

describe('departure search tab state', () => {
	test('AI 추천 시설과 인기 시설 상태를 서로 분리한다', () => {
		aiRecommendationFacilityItems.set([]);
		popularSearchFacilityItems.set([
			toFacilityListResponse({
				id: 7,
				name: { ko: '인기 시설' },
				category: null,
				poiId: 12,
				poiName: { ko: '인기 시설 위치' },
				address: null,
				addressDetail: null,
				latitude: null,
				longitude: null,
				thumbnailUrl: null,
				congestionStatus: 'none',
				operation: { status: 'NO_INFO', nextTransitionAt: null },
			}),
		]);

		expect(aiRecommendationFacilityItems.get()).toEqual([]);
		expect(popularSearchFacilityItems.get()).toHaveLength(1);
		expect(popularSearchFacilityItems.get()[0]?.id).toBe(7);
	});

	test('인기 탭은 같은 대상지에서 캐시를 공유한다', async () => {
		let requestCount = 0;
		const fetchMock = mock(async (input: string | URL | Request) => {
			requestCount += 1;
			expect(String(input)).toBe('/api/v1/search/popularity?tourDestinationId=37&language=ko');
			return new Response(
				JSON.stringify({
					success: true,
					data: {
						items: [
							{
								id: requestCount,
								name: { ko: `인기 시설 ${requestCount}` },
								category: null,
								poiId: 12,
								poiName: null,
								address: null,
								addressDetail: null,
								latitude: null,
								longitude: null,
								thumbnailUrl: null,
								congestionStatus: 'none',
								operation: { status: 'NO_INFO', nextTransitionAt: null },
							},
						],
						pois: [],
					},
				}),
			);
		});
		globalThis.fetch = fetchMock as typeof fetch;

		await expect(loadPopularSearches({ destinationId: 37, language: 'ko' })).resolves.toBe(true);
		await expect(loadPopularSearches({ destinationId: 37, language: 'ko' })).resolves.toBe(true);

		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(popularSearchFacilityItems.get()).toHaveLength(1);
		expect(popularSearchFacilityItems.get()[0]?.id).toBe(1);
		expect(popularSearchLoadedDestinationId.get()).toBe(37);
		expect(popularSearchError.get()).toBeNull();
		expect(popularSearchLoading.get()).toBe(false);
		expect(aiRecommendationFacilityItems.get()).toEqual([]);
	});

	test('AI 추천 탭은 전용 API의 시설을 최대 5개까지 저장한다', async () => {
		const items = Array.from({ length: 6 }, (_, index) => ({
			id: index + 1,
			name: { ko: `AI 추천 시설 ${index + 1}` },
			category: null,
			poiId: index + 101,
			poiName: null,
			address: null,
			addressDetail: null,
			latitude: null,
			longitude: null,
			thumbnailUrl: null,
			congestionStatus: 'none' as const,
			operation: { status: 'NO_INFO' as const, nextTransitionAt: null },
		}));
		const fetchMock = mock(async (input: string | URL | Request) => {
			expect(String(input)).toBe('/api/v1/search/ai-recommendations?tourDestinationId=37&language=ko');
			return new Response(JSON.stringify({ success: true, data: { items, pois: [] } }));
		});
		globalThis.fetch = fetchMock as typeof fetch;

		await expect(loadAiRecommendationFacilities({ destinationId: 37, language: 'ko' })).resolves.toBe(true);
		await expect(loadAiRecommendationFacilities({ destinationId: 37, language: 'ko' })).resolves.toBe(true);

		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(aiRecommendationFacilityItems.get()).toHaveLength(5);
		expect(aiRecommendationLoadedDestinationId.get()).toBe(37);
		expect(aiRecommendationError.get()).toBeNull();
		expect(aiRecommendationLoading.get()).toBe(false);
	});
});

const searchPoi = {
	id: 12,
	name: '망원시장 입구',
	latitude: 37.556,
	longitude: 126.905,
	facilityId: 7,
	categoryId: 3,
	categoryIconKey: 'information',
	categoryIconUrl: null,
	categoryColorCode: '#274FA8',
	congestionStatus: 'none' as const,
};

describe('loadKeywordSearch', () => {
	test('검색 한 번으로 시설 목록과 맵 POI를 저장한다', async () => {
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
								poiId: 12,
								poiName: { ko: '망원시장 입구' },
								address: { ko: '서울 마포구 동교로9길 56' },
								addressDetail: { ko: '1층' },
								latitude: 37.556,
								longitude: 126.905,
								thumbnailUrl: null,
								congestionStatus: 'none',
								operation: { status: 'OPERATING', nextTransitionAt: null },
								category: {
									name: { ko: '관광 안내' },
									iconKey: 'information',
									categoryColorCodes: { colorCode: '#274FA8' },
								},
							},
						],
						pois: [searchPoi],
					},
				}),
			);
		});
		globalThis.fetch = fetchMock as typeof fetch;

		await expect(loadKeywordSearch({ destinationId: 3, keyword: '  망원 시장  ', language: 'ko' })).resolves.toBe(true);
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(keywordSearchResultList.get()).toHaveLength(1);
		expect(searchResultList.get()).toMatchObject([
			{
				id: 7,
				name: { ko: '망원시장 안내소' },
				category: { iconKey: 'information' },
				address: { ko: '서울 마포구 동교로9길 56' },
				addressDetail: { ko: '1층' },
			},
		]);
		expect(poiList.get()).toEqual([toLegacyPoiListItem(searchPoi, 3)]);
		expect(keywordSearchError.get()).toBeNull();
		expect(keywordSearchLoading.get()).toBe(false);
		expect(recentSearchItems.get()).toMatchObject([{ type: 'keyword', keyword: '망원 시장', tourDestinationId: 3 }]);
	});

	test('빈 검색어는 요청 없이 결과를 초기화하고 전체 POI를 복원한다', async () => {
		const fetchMock = mock(async () => new Response());
		globalThis.fetch = fetchMock as typeof fetch;
		keywordSearchResultList.set([
			{
				id: 1,
				name: { ko: '기존 결과' },
				category: null,
				poiId: 1,
				poiName: { ko: '기존 위치' },
				address: null,
				addressDetail: null,
				latitude: 37.5,
				longitude: 127,
				thumbnailUrl: null,
				congestionStatus: 'none',
				operation: { status: 'NO_INFO', nextTransitionAt: null },
			},
		]);
		poiList.set([]);
		poiListAll.set([toLegacyPoiListItem(searchPoi, 1)]);

		await expect(loadKeywordSearch({ destinationId: 1, keyword: '   ', language: 'ko' })).resolves.toBe(false);
		expect(fetchMock).not.toHaveBeenCalled();
		expect(keywordSearchResultList.get()).toEqual([]);
		expect(searchResultList.get()).toEqual([]);
		expect(recentSearchItems.get()).toEqual([]);
		expect(poiList.get()).toEqual(poiListAll.get());
		expect(keywordSearchSubmitted.get()).toBe(false);
	});

	test('검색 결과가 없으면 검색 완료 상태를 저장하고 결과 화면 전환을 막는다', async () => {
		globalThis.fetch = mock(
			async () =>
				new Response(
					JSON.stringify({
						success: true,
						data: { items: [], pois: [] },
					}),
				),
		) as typeof fetch;

		await expect(loadKeywordSearch({ destinationId: 1, keyword: '없는 시설', language: 'ko' })).resolves.toBe(false);
		expect(keywordSearchSubmitted.get()).toBe(true);
		expect(keywordSearchResultList.get()).toEqual([]);
		expect(searchResultList.get()).toEqual([]);
		expect(recentSearchItems.get()).toMatchObject([{ type: 'keyword', keyword: '없는 시설', tourDestinationId: 1 }]);
	});

	test('실패 응답은 결과를 비우고 오류를 저장한다', async () => {
		globalThis.fetch = mock(async () => new Response(null, { status: 500 })) as typeof fetch;

		await expect(loadKeywordSearch({ destinationId: 1, keyword: '시장', language: 'ko' })).resolves.toBe(false);
		expect(keywordSearchResultList.get()).toEqual([]);
		expect(searchResultList.get()).toEqual([]);
		expect(keywordSearchError.get()).toBe('Failed to fetch search results: 500');
		expect(keywordSearchLoading.get()).toBe(false);
		expect(recentSearchItems.get()).toEqual([]);
	});
});

describe('loadPoiDetail', () => {
	test('선택한 시설을 메인으로 두고 나머지는 other에 넣는다', async () => {
		globalThis.fetch = mock(async (input: string | URL | Request) => {
			expect(String(input)).toBe('/api/v1/pois/12');
			return new Response(
				JSON.stringify({
					success: true,
					data: {
						id: 12,
						facilityPoiMappings: [
							{
								id: 1,
								facilityId: 7,
								facility: {
									id: 7,
									name: { ko: '안내소' },
									facilityFiles: [],
									facilityButtons: [],
									facilityProducts: [],
									category: {
										id: 3,
										name: { ko: '관광 안내' },
										iconKey: 'information',
										categoryColorCodes: { id: 1, colorCode: '#274FA8' },
										parent: null,
									},
								},
							},
							{
								id: 2,
								facilityId: 9,
								facility: {
									id: 9,
									name: { ko: '카페' },
									description: { ko: '테스트 내용' },
									contact: '010-3333-8888',
									facilityFiles: [{ id: 1, fileUrl: 'https://cdn.example.com/cafe.png' }],
									facilityOperatingSchedules: [
										{
											id: 1,
											dayOfWeek: 1,
											openingTime: '09:00',
											closingTime: '18:00',
											facilityBreakSchedules: [{ id: 11, breakStartTime: '12:00', breakEndTime: '13:00' }],
										},
									],
									facilityHolidaySchedules: [],
									facilityButtons: [
										{
											id: 5,
											buttonName: { ko: '홈페이지' },
											buttonUrl: 'https://example.com',
											tourDestinationCommonButtonId: null,
										},
									],
									facilityProductGuideFiles: [],
									facilityProducts: [
										{
											id: 20,
											name: { ko: '상품테스트1' },
											description: { ko: '상품테스트1' },
											price: 1100,
											currency: 'KRW',
											facilityProductFiles: [],
										},
									],
									facilityVpsPopups: [],
									category: {
										id: 4,
										name: { ko: '카페' },
										iconKey: 'coffee',
										categoryColorCodes: { id: 2, colorCode: '#8B5A2B' },
										parent: null,
									},
								},
							},
						],
					},
				}),
			);
		}) as typeof fetch;

		await loadPoiDetail(12, 9);
		expect(current.get().poi).toBe(12);
		expect(current.get().facility).toBe(9);
		expect(facility.get()?.id).toBe(9);
		expect(facilityDetail.get()?.id).toBe(9);
		expect(facilityOtherList.get()?.map((item) => item.id)).toEqual([7]);
		expect(facility.get()?.category).toMatchObject({ iconKey: 'coffee' });
		expect(facilityOtherList.get()?.[0]?.category).toMatchObject({
			iconKey: 'information',
			categoryColorCodes: { colorCode: '#274FA8' },
		});
		expect(facility.get()?.description).toEqual({ ko: '테스트 내용' });
		expect(facilityDetail.get()?.contact).toBe('010-3333-8888');
		expect(facilityDetail.get()?.facilityFiles).toEqual([
			{
				id: 1,
				fileUrl: 'https://cdn.example.com/cafe.png',
				fileType: null,
				fileOriginalName: null,
				fileUploadPath: null,
				fileUploadName: null,
				fileSize: null,
				fileMimeType: null,
			},
		]);
		expect(facilityDetail.get()?.facilityOperatingSchedules).toEqual([
			{
				id: 1,
				dayOfWeek: 1,
				openingTime: '09:00',
				closingTime: '18:00',
				facilityBreakSchedules: [{ id: 11, breakStartTime: '12:00', breakEndTime: '13:00' }],
			},
		]);
		expect(facilityDetail.get()?.facilityProducts?.[0]).toMatchObject({
			id: 20,
			name: { ko: '상품테스트1' },
			price: 1100,
			currency: 'KRW',
		});
		expect(facilityDetail.get()?.facilityButtons).toEqual([
			{
				id: 5,
				buttonName: { ko: '홈페이지' },
				buttonUrl: 'https://example.com',
				tourDestinationCommonButtonId: null,
			},
		]);
	});
});

describe('walking route', () => {
	const startPlace = { latitude: 37.556, longitude: 126.905, poiId: 12, name: '망원시장' };
	const endPlace = { latitude: 37.557, longitude: 126.906, poiId: 13, name: '망원한강공원' };

	test('같은 POI를 두 번째 장소로 넣으면 TMAP을 호출하지 않는다', async () => {
		beginWalkingSelection('start', startPlace);
		globalThis.fetch = mock(async () => {
			throw new Error('should not fetch');
		}) as typeof fetch;

		expect(assignRoutePlace({ ...startPlace, name: '같은 장소' })).toBe(false);
		expect(toastState.get()).toBe('same');
		expect(searchViewState.get()).toBe('departure');
		expect(routeEndpoints.get().end).toBeNull();
	});

	test('두 장소가 준비되면 도보 경로를 매핑한다', async () => {
		routeEndpoints.set({ start: startPlace, end: endPlace });
		globalThis.fetch = mock(async (input, init) => {
			expect(input.toString()).toBe('/api/tmap/routes/pedestrian?version=1');
			expect(init?.method).toBe('POST');
			return Response.json({
				type: 'FeatureCollection',
				features: [
					{
						geometry: { type: 'Point', coordinates: [126.905, 37.556] },
						properties: { totalDistance: '140', totalTime: '120', description: '출발' },
					},
					{
						geometry: {
							type: 'LineString',
							coordinates: [
								[126.905, 37.556],
								[126.906, 37.557],
							],
						},
						properties: { description: '포은로, 140m' },
					},
					{
						geometry: { type: 'Point', coordinates: [126.906, 37.557] },
						properties: { description: '도착' },
					},
				],
			});
		}) as typeof fetch;

		expect(await requestWalkingRoute()).toBe(true);
		expect(walkingRoutePath.get()).toEqual([
			{ latitude: 37.556, longitude: 126.905 },
			{ latitude: 37.557, longitude: 126.906 },
		]);
		expect(pathList.get()).toEqual([{ description: '출발' }, { description: '도착' }]);
		expect(distance.get()).toMatchObject({ totalDistance: 140, time: 2, step: 200 });
		expect(searchViewState.get()).toBe('path');
	});

	test('TMAP 오류는 disabled 토스트로 남긴다', async () => {
		routeEndpoints.set({ start: startPlace, end: endPlace });
		globalThis.fetch = mock(
			async () => new Response(JSON.stringify({ error: { message: 'fail' } }), { status: 500 }),
		) as typeof fetch;

		expect(await requestWalkingRoute()).toBe(false);
		expect(toastState.get()).toBe('disabled');
		expect(searchViewState.get()).toBe('departure');
	});

	test('검색창에서 고른 시설을 선택 중인 도착지로 넣는다', async () => {
		beginWalkingSelection('start', startPlace);
		openWalkingPlaceSearch('end');

		expect(routeSelecting.get()).toBe('end');
		expect(searchViewState.get()).toBe('departureSearch');
		expect(departureSearchTab.get()).toBe('recent-searches');
		expect(keywordSearchSubmitted.get()).toBe(false);

		globalThis.fetch = mock(async (input: string | URL | Request, init?: RequestInit) => {
			const url = String(input);
			if (url.startsWith('/api/v1/search?')) {
				expect(url).toBe('/api/v1/search?tourDestinationId=3&keyword=%EA%B3%B5%EC%9B%90&language=ko');
				return Response.json({
					success: true,
					data: {
						items: [
							{
								id: 8,
								name: { ko: '망원한강공원' },
								poiId: 13,
								poiName: { ko: '망원한강공원' },
								address: { ko: '서울 마포구' },
								addressDetail: null,
								latitude: 37.557,
								longitude: 126.906,
								thumbnailUrl: null,
								congestionStatus: 'none',
								operation: { status: 'NO_INFO', nextTransitionAt: null },
								category: null,
							},
						],
						pois: [],
					},
				});
			}

			expect(url).toBe('/api/tmap/routes/pedestrian?version=1');
			expect(init?.method).toBe('POST');
			return Response.json({
				type: 'FeatureCollection',
				features: [
					{
						geometry: { type: 'Point', coordinates: [126.905, 37.556] },
						properties: { totalDistance: '140', totalTime: '120', description: '출발' },
					},
					{
						geometry: {
							type: 'LineString',
							coordinates: [
								[126.905, 37.556],
								[126.906, 37.557],
							],
						},
						properties: { description: '포은로, 140m' },
					},
				],
			});
		}) as typeof fetch;

		await expect(loadKeywordSearch({ destinationId: 3, keyword: '공원', language: 'ko' })).resolves.toBe(true);
		expect(keywordSearchSubmitted.get()).toBe(true);
		const result = searchResultList.get()[0];
		expect(result).toMatchObject({ id: 8, poiId: 13, latitude: 37.557, longitude: 126.906 });

		expect(
			assignRoutePlace({
				latitude: result.latitude ?? 0,
				longitude: result.longitude ?? 0,
				poiId: result.poiId,
				name: '망원한강공원',
			}),
		).toBe(true);
		expect(routeEndpoints.get().end).toMatchObject({
			poiId: 13,
			latitude: 37.557,
			longitude: 126.906,
			name: '망원한강공원',
		});
	});

	test('상세에서 출발하면 보고 있는 시설을, 지도 POI를 고르면 대표 시설을 넣는다', () => {
		globalThis.fetch = mock(async () => Response.json({ type: 'FeatureCollection', features: [] })) as typeof fetch;
		poiList.set([
			toLegacyPoiListItem(
				{
					...searchPoi,
					facilityId: 45,
					facilityName: '아이콘 시설',
				},
				3,
			),
		]);
		facility.set(
			toFacilityListResponse({
				id: 7,
				name: { ko: '상세에서 연 시설' },
				category: null,
				poiId: 12,
				poiName: { ko: '망원시장 입구' },
				address: null,
				addressDetail: null,
				latitude: 37.556,
				longitude: 126.905,
				thumbnailUrl: null,
				congestionStatus: 'none',
				operation: { status: 'NO_INFO', nextTransitionAt: null },
			}),
		);
		current.setKey('poi', 12);
		current.setKey('facility', 7);

		beginWalkingSelection('start', { ...startPlace, name: '망원시장 입구' });

		expect(distance.get().start).toBe('상세에서 연 시설');
		expect(routeEndpoints.get().start).toMatchObject({
			poiId: 12,
			name: '상세에서 연 시설',
		});

		poiList.set([
			toLegacyPoiListItem(
				{
					id: 13,
					name: '망원한강공원',
					latitude: 37.557,
					longitude: 126.906,
					facilityId: 45,
					facilityName: '아이콘 도착 시설',
					categoryId: 3,
					categoryIconKey: 'information',
					categoryIconUrl: null,
					categoryColorCode: '#274FA8',
					congestionStatus: 'none',
				},
				3,
			),
		]);
		searchResultList.set([
			toFacilityListResponse({
				id: 8,
				name: { ko: '검색 목록의 다른 시설' },
				category: null,
				poiId: 13,
				poiName: { ko: '망원한강공원' },
				address: null,
				addressDetail: null,
				latitude: 37.557,
				longitude: 126.906,
				thumbnailUrl: null,
				congestionStatus: 'none',
				operation: { status: 'NO_INFO', nextTransitionAt: null },
			}),
		]);

		expect(
			assignRoutePlace({
				latitude: 37.557,
				longitude: 126.906,
				poiId: 13,
				name: '망원한강공원',
			}),
		).toBe(true);
		expect(routeEndpoints.get().end).toMatchObject({
			poiId: 13,
			name: '아이콘 도착 시설',
		});
		expect(distance.get().end).toBe('아이콘 도착 시설');
	});

	test('위치가 허용되어 있으면 현위치를 출발지로 바로 길찾기를 요청한다', async () => {
		userPosition.set({ latitude: 37.555, longitude: 126.904 });
		globalThis.fetch = mock(async (input, init) => {
			expect(input.toString()).toBe('/api/tmap/routes/pedestrian?version=1');
			expect(init?.method).toBe('POST');
			const body = JSON.parse(String(init?.body));
			expect(body).toMatchObject({
				startX: 126.904,
				startY: 37.555,
				endX: 126.906,
				endY: 37.557,
			});
			return Response.json({
				type: 'FeatureCollection',
				features: [
					{
						geometry: { type: 'Point', coordinates: [126.904, 37.555] },
						properties: { totalDistance: '140', totalTime: '120', description: '출발' },
					},
					{
						geometry: {
							type: 'LineString',
							coordinates: [
								[126.904, 37.555],
								[126.906, 37.557],
							],
						},
						properties: { description: '포은로, 140m' },
					},
				],
			});
		}) as typeof fetch;

		expect(await startWalkingFromUserLocation(endPlace, '현위치')).toBe(true);
		expect(routeEndpoints.get().start).toMatchObject({
			latitude: 37.555,
			longitude: 126.904,
			poiId: null,
			name: '현위치',
		});
		expect(routeEndpoints.get().end).toMatchObject(endPlace);
		expect(searchViewState.get()).toBe('path');
	});

	test('바로 길찾기를 닫으면 검색바와 시트가 있는 지도 홈으로 돌아간다', async () => {
		layoutViewState.set('default');
		detailViewState.set('ai');
		searchViewState.set('default');
		beforeState.set([]);
		userPosition.set({ latitude: 37.555, longitude: 126.904 });
		globalThis.fetch = mock(async () =>
			Response.json({
				type: 'FeatureCollection',
				features: [
					{
						geometry: { type: 'Point', coordinates: [126.904, 37.555] },
						properties: { totalDistance: '140', totalTime: '120', description: '출발' },
					},
					{
						geometry: {
							type: 'LineString',
							coordinates: [
								[126.904, 37.555],
								[126.906, 37.557],
							],
						},
						properties: { description: '포은로, 140m' },
					},
				],
			}),
		) as typeof fetch;

		expect(await startWalkingFromUserLocation(endPlace, '현위치')).toBe(true);
		expect(searchViewState.get()).toBe('path');

		closeWalkingRoute();
		expect(layoutViewState.get()).toBe('default');
		expect(detailViewState.get()).toBe('ai');
		expect(searchViewState.get()).toBe('default');
	});

	test('히스토리가 비어 있어도 길찾기를 닫으면 지도만 남지 않는다', () => {
		beforeState.set([]);
		layoutViewState.set('directions');
		detailViewState.set('path');
		searchViewState.set('path');
		routeViewState.set('path');

		closeWalkingRoute();
		expect(layoutViewState.get()).toBe('default');
		expect(detailViewState.get()).toBe('ai');
		expect(searchViewState.get()).toBe('default');
	});

	test('위치가 허용되지 않으면 도착지만 넣고 출발지를 고르게 한다', async () => {
		const originalPermissions = navigator.permissions;
		Object.defineProperty(navigator, 'permissions', {
			configurable: true,
			value: { query: async () => ({ state: 'denied' }) },
		});
		globalThis.fetch = mock(async () => {
			throw new Error('should not fetch');
		}) as typeof fetch;

		try {
			expect(await startWalkingFromUserLocation(endPlace, '현위치')).toBe(false);
			expect(routeEndpoints.get().start).toBeNull();
			expect(routeEndpoints.get().end).toMatchObject(endPlace);
			expect(routeSelecting.get()).toBe('start');
			expect(searchViewState.get()).toBe('departure');
		} finally {
			Object.defineProperty(navigator, 'permissions', {
				configurable: true,
				value: originalPermissions,
			});
		}
	});

	test('현위치와 도착지가 같으면 TMAP을 호출하지 않는다', async () => {
		userPosition.set({ latitude: endPlace.latitude, longitude: endPlace.longitude });
		globalThis.fetch = mock(async () => {
			throw new Error('should not fetch');
		}) as typeof fetch;

		expect(await startWalkingFromUserLocation(endPlace, '현위치')).toBe(false);
		expect(toastState.get()).toBe('same');
		expect(searchViewState.get()).toBe('departure');
		expect(routeEndpoints.get().start).toBeNull();
		expect(routeEndpoints.get().end).toMatchObject(endPlace);
	});
});

function requestUrl(input: string | URL | Request): string {
	if (typeof input === 'string') return input;
	if (input instanceof URL) return input.toString();
	return input.url;
}

function jsonResponse(body: unknown, status = 200) {
	return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

describe('loadDestination default fallback', () => {
	test('기본 대상지 48이 없으면 1을 불러온다', async () => {
		const requested = new Set<string>();
		globalThis.fetch = mock(async (input: string | URL | Request) => {
			const url = requestUrl(input);
			requested.add(url);

			if (url === '/api/v1/tour-destinations/48') {
				return jsonResponse({ success: false, message: '대상지를 찾을 수 없습니다.' }, 404);
			}
			if (url === '/api/v1/categories?tourDestinationId=48' || url === '/api/v1/pois?tourDestinationId=48') {
				return jsonResponse({ success: true, data: url.includes('/pois') ? { items: [] } : [] });
			}
			if (url === '/api/v1/tour-destinations/1') {
				return jsonResponse({
					success: true,
					data: { id: 1, latitude: 37.5, longitude: 127.0, isAiRecommendYn: false, colorCode: null },
				});
			}
			if (url === '/api/v1/categories?tourDestinationId=1') {
				return jsonResponse({ success: true, data: [{ id: 9 }] });
			}
			if (url === '/api/v1/pois?tourDestinationId=1') {
				return jsonResponse({ success: true, data: { items: [] } });
			}

			throw new Error(`unexpected fetch: ${url}`);
		}) as typeof fetch;

		const detail = await loadDestination(48);

		expect(detail).toMatchObject({ id: 1, latitude: 37.5, longitude: 127.0 });
		expect(current.get().destination).toBe(1);
		expect(requested.has('/api/v1/tour-destinations/48')).toBe(true);
		expect(requested.has('/api/v1/tour-destinations/1')).toBe(true);
	});

	test('선택한 대상지가 없으면 1로 바꾸지 않는다', async () => {
		globalThis.fetch = mock(async (input: string | URL | Request) => {
			const url = requestUrl(input);
			if (url === '/api/v1/tour-destinations/12') {
				return jsonResponse({ success: false, message: '대상지를 찾을 수 없습니다.' }, 404);
			}
			if (url.startsWith('/api/v1/categories') || url.startsWith('/api/v1/pois')) {
				return jsonResponse({ success: true, data: url.includes('/pois') ? { items: [] } : [] });
			}
			throw new Error(`unexpected fetch: ${url}`);
		}) as typeof fetch;

		current.set({ destination: 12, poi: 0, facility: 0 });
		await expect(loadDestination(12)).rejects.toThrow('Failed to fetch destination');
		expect(current.get().destination).toBe(12);
	});
});
