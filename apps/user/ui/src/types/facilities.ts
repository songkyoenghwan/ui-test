import type { FileFields, FileItem, FileItemInput } from './common/file';
import type { LocalizedText } from './common/locale';
import type { PaginatedResponse, PaginationQuery } from './common/pagination';
import type {
	OperatingScheduleResponse as BaseOperatingScheduleResponse,
	HolidayScheduleBody,
	HolidayScheduleResponse,
	OperatingScheduleBody,
} from './common/schedule';

export interface FacilityFileResponse extends FileItem {
	fileType: string | null;
}
export type CreateFacilityFileBody = FileItemInput;
export type CreateFacilityHolidayScheduleBody = HolidayScheduleBody;
export type FacilityHolidayScheduleResponse = HolidayScheduleResponse;

export interface CreateFacilityBreakScheduleBody {
	breakStartTime?: string;
	breakEndTime?: string;
}

export interface CreateFacilityOperatingScheduleBody extends OperatingScheduleBody {
	/** 시설 휴게 시간 정보 */
	facilityBreakSchedules?: CreateFacilityBreakScheduleBody;
}

export interface FacilityBreakScheduleResponse {
	id: number;
	breakStartTime: string | null;
	breakEndTime: string | null;
}

export interface FacilityOperatingScheduleResponse extends BaseOperatingScheduleResponse {
	/** 시설 휴게 시간 정보 */
	facilityBreakSchedules: FacilityBreakScheduleResponse[];
}

export interface CreateFacilityVpsPopupBody extends Partial<FileItemInput> {
	isVisible?: boolean;
	name: LocalizedText;
	description?: LocalizedText | null;
	url: string;
}

export interface FacilityVpsPopupResponse extends FileFields {
	id: number;
	poiId: number | null;
	isVisible: boolean | null;
	name: unknown;
	description: unknown;
	url: string | null;
}

export interface FacilityCongestionSectionResponse {
	id: number;
	memo: string | null;
	congestionSensorDevice: {
		id: number;
		memo: string | null;
	} | null;
}

export interface FacilityPoiMappingResponse {
	poi: {
		name: unknown;
	} | null;
}

export interface FacilityButtonResponse {
	id: number;
	buttonName: unknown;
	buttonUrl: string | null;
	tourDestinationCommonButtonId: number | null;
}

export interface ReplaceFacilityCommonButtonsBody {
	buttons: {
		tourDestinationCommonButtonId: number;
		buttonUrl: string;
	}[];
}

export interface ReplaceFacilityExclusiveButtonsBody {
	buttons: {
		buttonName: LocalizedText;
		buttonUrl: string;
	}[];
}

export type FacilityProductFileResponse = FileItem;

export interface FacilityProductResponse {
	id: number;
	isVisible: boolean | null;
	displayOrder: number;
	name: unknown;
	description: unknown;
	price: number | null;
	currency: string | null;
	facilityProductFiles: FacilityProductFileResponse[];
}

export interface CreateFacilityProductBody {
	isVisible?: boolean;
	name: LocalizedText;
	description: LocalizedText;
	price: number;
	currency?: string;
	/** 최대 5개까지 등록 가능합니다. */
	facilityProductFiles?: FileItemInput[];
}

export interface UpdateFacilityProductBody {
	isVisible?: boolean;
	name?: LocalizedText;
	description?: LocalizedText | null;
	price?: number;
	currency?: string;
	/**
	 * 전달 시 기존 이미지를 모두 교체합니다 (최대 5개). 전달하지 않으면 기존 이미지를 유지합니다.
	 */
	facilityProductFiles?: FileItemInput[];
}

export interface UpdateFacilityProductOrderBody {
	/** 시설에 속한 삭제되지 않은 전체 상품 ID를 표시 순서대로 전달합니다. */
	productIds: number[];
}

export interface UpdateFacilityProductOrderResponse {
	updatedCount: number;
}

export interface UpdateFacilityVpsPopupBody extends Partial<FileItemInput> {
	isVisible?: boolean;
	name?: LocalizedText;
	description?: LocalizedText | null;
	url?: string;
}

export type matchingStatus = 'before' | 'complete';
export type FacilitySortOrder = 'latest' | 'nameAsc';
export interface FacilityListQuery extends PaginationQuery {
	tourDestinationId: number;
	/** 정렬 기준 (최신순, 가나다순) */
	sortOrder?: FacilitySortOrder;
	/** 카테고리 ID. 상위 카테고리 ID인 경우 해당 상위 및 하위 카테고리 시설을 포함 */
	categoryId?: number;
	/** 시설명 또는 상품명 검색어(한국어만 지원) */
	keyword?: string;
	/** 매칭상태 필터 (매칭전, 매칭완료) */
	matchingStatus?: matchingStatus;
	/**
	 * POI 매칭 후보 모드.
	 * true이면 다른 POI에 이미 매칭된 시설을 제외합니다.
	 * currentPoiId가 있으면 해당 POI 매칭분은 포함합니다.
	 */
	forPoiMatching?: boolean;
	/** forPoiMatching 시 현재 편집 중인 POI ID */
	currentPoiId?: number;
	/** 썸네일 여부 */
	hasThumbnail?: boolean;
	/** 혼잡도 사용 여부 */
	isUsingCongestion?: boolean;
	/** 위치 기반 콘텐츠 사용 여부 */
	hasUsingVpsPopup?: boolean;
}

interface FacilityBase {
	id: number;
	name: unknown;
	startAt: Date | null;
	endAt: Date | null;
	description: unknown;
	overwriteCongestionStatus: string | null;
	linkButton: unknown;
	createdAt: Date | null;
	updatedAt: Date | null;
}

export interface FacilityListResponse extends FacilityBase {
	poiId?: number | null;
	poiName?: unknown;
	address?: unknown;
	addressDetail?: unknown;
	latitude?: number | null;
	longitude?: number | null;
	thumbnailUrl?: string | null;
	congestionStatus?: 'none' | 'RELAXED' | 'NORMAL' | 'CROWDED' | 'VERY_CROWDED';
	operation?: {
		status: import('./search').FacilityOperatingStatus;
		nextTransitionAt: string | null;
	};
	isUsingCongestion: boolean;
	hasVpsPopup: boolean;
	category: {
		id?: number;
		name: unknown;
		iconKey?: string | null;
		categoryColorCodes: {
			colorCode: string | null;
		} | null;
		parent: {
			name: unknown;
			iconKey?: string | null;
			categoryColorCodes?: {
				colorCode: string | null;
			} | null;
		} | null;
	} | null;
	matchingPoiName: unknown;
	facilityProductsCount: number;
	facilityButtonsCount: number;
}

export interface FacilityMatchingStatus {
	totalCount: number;
	matched: number;
	unmatched: number;
}

export interface FacilityListPaginatedResponse extends PaginatedResponse<FacilityListResponse> {
	matchingStatus: FacilityMatchingStatus;
}

export interface FacilityDetailResponse extends FacilityBase {
	isOperationInfoSynced: boolean | null;
	contact: string | null; // 연락처
	/** 시설 기본정보 썸네일 (fileType: MAIN) */
	facilityFiles: FacilityFileResponse[];
	/** 상품·이용 안내 참고 이미지, 최대 5개 (fileType: PRODUCT) */
	facilityProductGuideFiles: FacilityFileResponse[];
	/** 휴일 스케줄 */
	facilityHolidaySchedules: FacilityHolidayScheduleResponse[];
	/** 운영 스케줄 */
	facilityOperatingSchedules: FacilityOperatingScheduleResponse[];
	/** VPS 팝업 이미지 */
	facilityVpsPopups: FacilityVpsPopupResponse[];
	/** 카테고리 정보  */
	category: {
		id: number;
		name: unknown;
		iconKey?: string | null;
		categoryColorCodes?: {
			colorCode: string | null;
		} | null;
		/** 부모 카테고리 정보 있으면 값 존재 , 없으면 null*/
		parent: {
			id: number;
			name: unknown;
			iconKey?: string | null;
			categoryColorCodes?: {
				colorCode: string | null;
			} | null;
		} | null;
	} | null;
	congestionSections: FacilityCongestionSectionResponse[];
	facilityPoiMappings: FacilityPoiMappingResponse[];
	facilityButtons: FacilityButtonResponse[];
	facilityProducts: FacilityProductResponse[];
}

export interface TourDestinationCommonLinkButton {
	id: number;
	buttonName: unknown;
	buttonUrl: unknown;
}

export interface CreateFacilityBody {
	/** 다국어 시설명 */
	name: LocalizedText;
	contact?: string | null;
	tourDestinationId: number;
	categoryId: number; // 1depth or 2depth
	description?: LocalizedText;
	startAt?: Date | null;
	endAt?: Date | null;
	overwriteCongestionStatus?: string;

	isOperationInfoSynced?: boolean; // 운영 정보 동기화 여부 (true로 전달 시 대상지의 운영 정보와 동일하게 설정)

	facilityFiles?: CreateFacilityFileBody;
	/** 상품·이용 안내 참고 이미지. 최대 5개까지 등록 가능합니다. */
	facilityProductGuideFiles?: CreateFacilityFileBody[];
	facilityHolidaySchedules?: CreateFacilityHolidayScheduleBody[];
	/** 운영 스케줄. facilityBreakSchedules 포함 가능 */
	facilityOperatingSchedules?: CreateFacilityOperatingScheduleBody[];
}

export interface UpdateFacilityBody {
	name?: LocalizedText;
	contact?: string | null;
	categoryId?: number | null;
	description?: LocalizedText | null;
	startAt?: Date | null;
	endAt?: Date | null;
	/** 혼잡도 상태 직접 설정 */
	overwriteCongestionStatus?: string | null;

	/** 운영 정보 동기화 여부 (true로 전달 시 대상지의 운영 정보와 동일하게 설정) */
	isOperationInfoSynced?: boolean;

	/** 전체 교체 —  전달 시 기존 항목 soft-delete 후 재삽입 */
	facilityFiles?: CreateFacilityFileBody[];

	/** 상품·이용 안내 참고 이미지. 전체 교체 — 전달 시 기존 항목 soft-delete 후 재삽입. 최대 5개 */
	facilityProductGuideFiles?: CreateFacilityFileBody[];

	/** 휴일 스케줄 */
	facilityHolidaySchedules?: CreateFacilityHolidayScheduleBody[];

	/** 운영 스케줄 */
	facilityOperatingSchedules?: CreateFacilityOperatingScheduleBody[];
}
