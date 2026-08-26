import type { PoiMarkerResponse } from './pois';

export type SearchLanguage = 'ko' | 'en' | 'ja' | 'zh' | 'th' | 'vi';
export type DepartureSearchTab = 'recent-searches' | 'ai-recommend' | 'popularity';
export type FacilityOperatingStatus =
	| 'OPERATING'
	| 'BREAK'
	| 'BEFORE_OPEN'
	| 'AFTER_CLOSE'
	| 'HOLIDAY'
	| 'OUT_OF_PERIOD'
	| 'NO_INFO';

export interface SearchResultResponse {
	id: number;
	name: unknown;
	category: {
		id: number;
		name: unknown;
		iconKey: string | null;
		categoryColorCodes: {
			colorCode: string | null;
		} | null;
	} | null;
	poiId: number | null;
	poiName: unknown;
	address: unknown;
	addressDetail: unknown;
	latitude: number | null;
	longitude: number | null;
	thumbnailUrl: string | null;
	congestionStatus: 'none' | 'RELAXED' | 'NORMAL' | 'CROWDED' | 'VERY_CROWDED';
	operation: {
		status: FacilityOperatingStatus;
		nextTransitionAt: string | null;
	};
}

export interface SearchListResponse {
	items: SearchResultResponse[];
	pois: PoiMarkerResponse[];
}

export interface SearchSuccessResponse {
	success: true;
	data: SearchListResponse;
}

interface RecentSearchBase {
	id: string;
	tourDestinationId: number;
	searchedAt: string;
}

export interface RecentKeywordSearch extends RecentSearchBase {
	type: 'keyword';
	keyword: string;
}

export interface RecentFacilitySearch extends RecentSearchBase {
	type: 'facility';
	facilityId: number;
	poiId: number;
	name: unknown;
	iconKey: string | null;
	colorCode: string | null;
}

export type RecentSearchItem = RecentKeywordSearch | RecentFacilitySearch;
