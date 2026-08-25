import type { FacilityDetailResponse, FacilityListResponse } from '@/types/facilities';
import type { PoiDetailResponse, PoiListResponse, PoiMarkerResponse } from '@/types/pois';
import type { SearchLanguage, SearchResultResponse, SearchSuccessResponse } from '@/types/search';
import type { TourDestinationDetailResponse, TourDestinationListResponse } from '@/types/tour-destinations';
import { atom, map } from 'nanostores';

import type { CategoryResponse } from '@/types/categories';
import MapController from '@/events/mapEvent';
import { colorState } from '@/stores/globalStore';
import { z } from 'zod';

export const CurrentSchema = z.object({
	destination: z.number(),
	poi: z.number(),
	facility: z.number(),
});

export type Current = z.infer<typeof CurrentSchema>;

export const current = map<Current>({
	destination: 1,
	poi: 0,
	facility: 0,
});

export const searchList = atom<FacilityListResponse[]>([]);
export const searchResultList = atom<FacilityListResponse[]>([]);
export const keywordSearchResultList = atom<SearchResultResponse[]>([]);
export const keywordSearchLoading = atom(false);
export const keywordSearchError = atom<string | null>(null);
export const categoryList = atom<CategoryResponse[]>([]);
export const destinationDetail = atom<TourDestinationDetailResponse | null>(null);
export const destinationList = atom<TourDestinationListResponse[]>([]);
export const poiDetail = atom<PoiDetailResponse[]>([]);
/** Nest 마커 → 레거시 facilityPoiMappings 형태로 보관 (기존 Svelte 바인딩 유지) */
export const poiList = atom<PoiListResponse[]>([]);
export const facility = atom<FacilityListResponse | null>(null);
export const facilityDetail = atom<FacilityDetailResponse | null>(null);
export const facilityList = atom<FacilityListResponse[] | null>(null);
export const facilityOtherList = atom<FacilityDetailResponse[] | null>(null);
export const otherFacilityDetails = atom<FacilityDetailResponse[]>([]);
export const pathList = atom([]);
export const directionList = atom([]);
export const recommendList = atom<FacilityListResponse[]>([]);
export const popularityList = atom<FacilityListResponse[]>([]);
export const mapControllerInstance = atom<MapController | null>(null);

let keywordSearchController: AbortController | null = null;

export async function loadKeywordSearch({
	destinationId,
	keyword,
	language,
}: {
	destinationId: number;
	keyword: string;
	language: SearchLanguage;
}): Promise<boolean> {
	const normalizedKeyword = keyword.trim();

	if (!normalizedKeyword) {
		keywordSearchController?.abort();
		keywordSearchController = null;
		keywordSearchResultList.set([]);
		searchResultList.set([]);
		keywordSearchError.set(null);
		keywordSearchLoading.set(false);
		return false;
	}

	keywordSearchController?.abort();
	const controller = new AbortController();
	keywordSearchController = controller;
	keywordSearchLoading.set(true);
	keywordSearchError.set(null);

	const params = new URLSearchParams({
		tourDestinationId: String(destinationId),
		keyword: normalizedKeyword,
		language,
	});

	try {
		const response = await fetch(`/api/v1/search?${params}`, { signal: controller.signal });
		if (!response.ok) throw new Error(`Failed to fetch search results: ${response.status}`);

		const json = (await response.json()) as Partial<SearchSuccessResponse>;
		if (json.success !== true || !Array.isArray(json.data?.items)) {
			throw new Error('Invalid search response');
		}

		if (keywordSearchController !== controller) return false;

		keywordSearchResultList.set(json.data.items);
		searchResultList.set(
			json.data.items.map((item) => ({
				...item,
				category: item.category ? { ...item.category, parent: null } : null,
				startAt: null,
				endAt: null,
				description: null,
				overwriteCongestionStatus: null,
				linkButton: null,
				createdAt: null,
				updatedAt: null,
				isUsingCongestion: false,
				hasVpsPopup: false,
				matchingPoiName: null,
				facilityProductsCount: 0,
				facilityButtonsCount: 0,
			})),
		);
		return true;
	} catch (error) {
		if (controller.signal.aborted || keywordSearchController !== controller) return false;

		keywordSearchResultList.set([]);
		searchResultList.set([]);
		keywordSearchError.set(error instanceof Error ? error.message : 'Failed to fetch search results');
		return false;
	} finally {
		if (keywordSearchController === controller) {
			keywordSearchController = null;
			keywordSearchLoading.set(false);
		}
	}
}

const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function applyDestinationGuideColor(colorCode: string | null | undefined) {
	if (!colorCode || !HEX_COLOR_PATTERN.test(colorCode.trim())) return;

	const nextColor = colorCode.trim();
	colorState.set(nextColor);
	document.body?.style.setProperty('--base-color', nextColor);
}

/** Nest 마커를 Address/MapCanvas가 쓰는 레거시 POI 목록 형태로 변환 */
export function toLegacyPoiListItem(marker: PoiMarkerResponse, destinationId: number): PoiListResponse {
	return {
		id: marker.id,
		tourDestinationId: destinationId,
		name: { ko: marker.name },
		latitude: marker.latitude,
		longitude: marker.longitude,
		managementCode: null,
		isVisible: true,
		createdAt: null,
		updatedAt: null,
		address: '',
		facilityPoiMappings: [
			{
				id: marker.id,
				facilityId: marker.facilityId,
				facility: {
					id: marker.facilityId,
					name: null,
					category: {
						id: marker.categoryId,
						name: null,
						iconKey: marker.categoryIconKey,
						categoryColorCodes: marker.categoryColorCode
							? { id: marker.categoryId, colorCode: marker.categoryColorCode }
							: null,
						parent: null,
					},
				},
				congestionStatus: marker.congestionStatus,
			},
		],
	};
}

export async function loadDestination(destinationId: number) {
	const [resDestination, resCategory, resPoi] = await Promise.all([
		fetch(`/api/tour-destinations/${destinationId}`),
		fetch(`/api/categories?tourDestinationId=${destinationId}`),
		fetch(`/api/pois?tourDestinationId=${destinationId}`),
	]);

	if (!resDestination.ok) throw new Error('Failed to fetch destination');
	if (!resCategory.ok) throw new Error('Failed to fetch Category');
	if (!resPoi.ok) throw new Error('Failed to fetch POIs');

	const [destinationData, categoryData, poiData] = await Promise.all([
		resDestination.json(),
		resCategory.json(),
		resPoi.json(),
	]);

	const detail = (destinationData?.data ?? null) as TourDestinationDetailResponse | null;
	const markers = (poiData?.data?.items ?? []) as PoiMarkerResponse[];

	current.setKey('destination', destinationId);
	destinationDetail.set(detail);
	applyDestinationGuideColor(detail?.colorCode);
	categoryList.set(categoryData.data ?? []);
	poiList.set(markers.map((marker) => toLegacyPoiListItem(marker, destinationId)));
	facilityList.set([]);
	searchList.set([]);

	return detail;
}

export async function currentDetail() {
	try {
		const response = await fetch(`/api/facilities/${current.get().facility}`);
		if (!response.ok) throw new Error(`${response.status}`);

		const json = await response.json();
		const detailData = json.data ?? null;
		const currentFacilityDetail = detailData ?? {};
		const currentFacility = facilityList.get()?.find((f) => Number(f.id) === Number(current.get().facility)) ?? null;
		const matchedPoi =
			poiList
				.get()
				.find((poi) => poi.facilityPoiMappings?.some((mapping) => Number(mapping.facilityId) === current.get().facility))
				?.facilityPoiMappings ?? [];
		const otherDetails = await Promise.all(
			matchedPoi.map(async (mapping) => {
				const res = await fetch(`/api/facilities/${mapping.facilityId}`);
				if (!res.ok) return null;

				const otherJson = await res.json();
				return otherJson.data ?? null;
			}),
		);
		facility.set(currentFacility);
		facilityDetail.set(currentFacilityDetail);
		facilityOtherList.set(otherDetails.filter(Boolean));
	} catch {
		facilityOtherList.set([]);
	}
}
