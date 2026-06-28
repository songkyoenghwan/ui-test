import { FileFields, FileItem, FileItemInput } from './common/file';
import type { LocalizedText } from './common/locale';
import type { PaginatedResponse, PaginationQuery } from './common/pagination';
import type {
	OperatingScheduleResponse as BaseOperatingScheduleResponse,
	HolidayScheduleBody,
	HolidayScheduleResponse,
	OperatingScheduleBody,
} from './common/schedule';

export type FacilityFileResponse = FileItem;
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

export interface FacilityVpsPopupInput extends FileItemInput {
	name: LocalizedText;
	description?: LocalizedText | null;
	url: string;
}

export interface FacilityVpsPopupResponse extends FileFields {
	id: number;
	name: unknown;
	description: unknown;
	url: string | null;
}

export interface FacilityCongestionSectionResponse {
	id: number;
	memo: string | null;
}

export type matchingStatus = 'before' | 'complete';
export interface FacilityListQuery extends PaginationQuery {
	tourDestinationId: number;
	categoryId?: number;
	/** 시설명 검색어(한국어만 지원) */
	keyword?: string;
	/** 매칭상태 필터 (매칭전, 매칭완료) */
	matchingStatus?: matchingStatus;
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
	isUsingCongestion: boolean;
	hasVpsPopup: boolean;
	category: {
		name: unknown;
		categoryColorCodes: {
			colorCode: string | null;
		} | null;
	} | null;
	matchingPoiName: unknown;
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
	facilityFiles: FacilityFileResponse[];
	/** 휴일 스케줄 */
	facilityHolidaySchedules: FacilityHolidayScheduleResponse[];
	/** 운영 스케줄 */
	facilityOperatingSchedules: FacilityOperatingScheduleResponse[];
	/** VPS 팝업 이미지 */
	facilityVpsPopups: FacilityVpsPopupResponse[];
	/** 카테고리 정보  */
	category: {
		name: unknown;
		/** 부모 카테고리 정보 있으면 값 존재 , 없으면 null*/
		parent: {
			name: unknown;
		} | null;
	} | null;
	congestionSections: FacilityCongestionSectionResponse[];
}

export interface TourDestinationCommonLinkButton {
	id: number;
	buttonName: unknown;
	buttonUrl: unknown;
}

export interface CreateFacilityBody {
	/** 다국어 시설명 */
	name: LocalizedText;
	tourDestinationId: number;
	categoryId: number; // 1depth or 2depth
	description?: LocalizedText;
	startAt?: Date | null;
	endAt?: Date | null;
	overwriteCongestionStatus?: string;

	isOperationInfoSynced?: boolean; // 운영 정보 동기화 여부 (true로 전달 시 대상지의 운영 정보와 동일하게 설정)

	facilityFiles?: CreateFacilityFileBody;
	facilityHolidaySchedules?: CreateFacilityHolidayScheduleBody[];
	/** 운영 스케줄. facilityBreakSchedules 포함 가능 */
	facilityOperatingSchedules?: CreateFacilityOperatingScheduleBody[];
}

export interface UpdateFacilityBody {
	name?: LocalizedText;
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

	/** 휴일 스케줄 */
	facilityHolidaySchedules?: CreateFacilityHolidayScheduleBody[];

	/** 운영 스케줄 */
	facilityOperatingSchedules?: CreateFacilityOperatingScheduleBody[];

	/** VPS 팝업 이미지 */
	facilityVpsPopupImage?: FacilityVpsPopupInput | null;

	/** 시설 및 대상지 공통 버튼 연결 */
	facilityButtons?: {
		name?: LocalizedText | null;
		url?: string | null;
		/** 기존 대상지 공통 버튼과 연결할 경우 id 존재 */
		tourDestinationCommonLinkButtonId?: number | null;
	}[];
}
