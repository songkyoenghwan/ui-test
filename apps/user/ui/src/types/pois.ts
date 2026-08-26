import type { LocalizedText } from './common/locale';
import type { PaginatedResponse, PaginationQuery } from './common/pagination';

/** Nest GET /api/v1/pois 맵 마커 항목 */
export interface PoiMarkerResponse {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
	facilityId: number;
	facilityName?: string;
	categoryId: number;
	categoryIconKey: string | null;
	categoryIconUrl: string | null;
	categoryColorCode: string | null;
	congestionStatus: 'none' | 'RELAXED' | 'NORMAL' | 'CROWDED' | 'VERY_CROWDED';
	/** 마커 API에는 없음 — 거리 UI 호환용 optional */
	address?: unknown;
}

export interface PoiFacilityMappingFacilityResponse {
	id: number;
	name: unknown;
	category: {
		id: number;
		name: unknown;
		iconKey: string | null;
		categoryColorCodes: {
			id: number;
			colorCode: string | null;
		} | null;
		parent: {
			id: number;
			name: unknown;
		} | null;
	} | null;
}

export interface PoiFacilityMappingResponse {
	id: number;
	facilityId: number | null;
	facility: PoiFacilityMappingFacilityResponse | null;
	/** Nest 마커 어댑트 시 첨부 (선택) */
	congestionStatus?: 'none' | 'RELAXED' | 'NORMAL' | 'CROWDED' | 'VERY_CROWDED';
}

interface PoiBaseResponse {
	/** POI ID */
	id: number;
	/** 대상지 ID */
	tourDestinationId: number | null;
	/** 다국어 POI명 */
	name: unknown;
	/** 위도 */
	latitude: number;
	/** 경도 */
	longitude: number;
	/** POI 관리 코드 */
	managementCode: string | null;
	/** 지도 노출 여부 */
	isVisible: boolean | null;
	/** 생성일시 */
	createdAt: Date | null;
	/** 최종 수정일시 */
	updatedAt: Date | null;
	address: string;
	/** 시설 매칭 요약 */
	facilityPoiMappings: PoiFacilityMappingResponse[];
}

/** @deprecated 레거시 목록 형태. 맵 부트스트랩은 PoiMarkerResponse 사용 */
export type PoiListResponse = PoiBaseResponse;

export interface PoiListPaginatedResponse extends PaginatedResponse<PoiListResponse> {
	/** 조회 대상지 좌표 */
	tourDestination: {
		/** 대상지 위도 */
		latitude: number;
		/** 대상지 경도 */
		longitude: number;
	} | null;
}

export type PoiDetailResponse = PoiBaseResponse;

/** Nest GET /api/v1/pois/:id */
export interface NestPoiDetailFacilityResponse {
	id: number;
	name: unknown;
	description: unknown;
	contact: string | null;
	startAt: string | Date | null;
	endAt: Date | string | null;
	category: {
		id: number;
		name: unknown;
		iconKey: string | null;
		categoryColorCodes: { id: number; colorCode: string | null } | null;
		parent: { id: number; name: unknown } | null;
	} | null;
	facilityFiles: { id: number; fileUrl: string }[];
	facilityOperatingSchedules: Array<{
		id: number;
		dayOfWeek: number | null;
		openingTime: string | null;
		closingTime: string | null;
		facilityBreakSchedules: Array<{
			id: number;
			breakStartTime: string | null;
			breakEndTime: string | null;
		}>;
	}>;
	facilityHolidaySchedules: Array<{
		id: number;
		holidayType: number | null;
		weekOfMonth: number | null;
		dayOfWeek: number | null;
		fixedHoliday: number | null;
	}>;
	facilityButtons: {
		id: number;
		buttonName: unknown;
		buttonUrl: string | null;
		tourDestinationCommonButtonId: number | null;
	}[];
	facilityProductGuideFiles: { id: number; fileUrl: string }[];
	facilityProducts: Array<{
		id: number;
		name: unknown;
		description: unknown;
		price: number | null;
		currency: string | null;
		facilityProductFiles: { id: number; fileUrl: string }[];
	}>;
	facilityVpsPopups: Array<{
		id: number;
		name: unknown;
		description: unknown;
		url: string;
		fileUrl: string | null;
		poiId: number | null;
		isVisible: boolean | null;
	}>;
	congestionStatus: string;
	isUsingCongestion: boolean;
	hasVpsPopup: boolean;
}

export interface NestPoiDetailResponse {
	id: number;
	tourDestinationId: number | null;
	name: unknown;
	latitude: number;
	longitude: number;
	address: unknown;
	addressDetail: unknown;
	managementCode: string | null;
	facilityPoiMappings: Array<{
		id: number;
		facilityId: number | null;
		sortingNumber: number | null;
		facility: NestPoiDetailFacilityResponse | null;
	}>;
}

export interface PoiListQuery extends PaginationQuery {
	/** 대상지 ID */
	tourDestinationId: number;
	/** POI명 검색어. 현재 한국어 이름(name.ko)을 기준으로 검색합니다. */
	keyword?: string;
}

export interface CreatePoiBody {
	/**
	 * 다국어 POI명
	 * @example {"ko": "정문", "en": "Main gate"}
	 */
	name: LocalizedText;
	/** 대상지 ID */
	tourDestinationId: number;
	/** 위도 */
	latitude: number;
	/** 경도 */
	longitude: number;
	/** POI 관리 코드 */
	managementCode?: string;
	/** 지도 노출 여부 */
	isVisible?: boolean;
	/** 매칭할 시설 ID 목록 */
	facilityIds?: number[];
}

export interface UpdatePoiBody {
	/**
	 * 다국어 POI명
	 * @example {"ko": "정문", "en": "Main gate"}
	 */
	name?: LocalizedText;
	/** 위도 */
	latitude?: number;
	/** 경도 */
	longitude?: number;
	/** POI 관리 코드. null 전송 시 값을 비웁니다. */
	managementCode?: string | null;
	/** 지도 노출 여부 */
	isVisible?: boolean;
	/** 매칭할 시설 ID 목록. 전달 시 전체 교체합니다. */
	facilityIds?: number[];
}
