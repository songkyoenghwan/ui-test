import type { LocalizedText, SupportedLanguages } from './common/locale';
import type { PaginationQuery } from './common/pagination';
import type {
	OperatingScheduleResponse as BaseOperatingScheduleResponse,
	HolidayScheduleBody,
	HolidayScheduleResponse,
	OperatingScheduleBody,
} from './common/schedule';

export type { HolidayScheduleResponse };

export type { SupportedLanguages };

export type CreateOperatingScheduleBody = OperatingScheduleBody;
export type CreateHolidayScheduleBody = HolidayScheduleBody;

export interface CreateCommonButtonBody {
	iconUrl?: string;
	/** 다국어 버튼명 */
	buttonName?: LocalizedText;
	sortingNumber?: number;
}

export interface CommonButtonResponse {
	/** 공통 버튼 ID */
	id: number;
	/** 공통 버튼 아이콘 URL */
	iconUrl: string | null;
	/** 다국어 버튼명 */
	buttonName: unknown;
	/** 정렬 순서 */
	sortingNumber: number | null;
	/** 버튼 표시 여부 */
	isVisible?: boolean | null;
}

export interface OperatingScheduleResponse extends BaseOperatingScheduleResponse {
	isVisible?: boolean | null;
}

export interface TourDestinationUserResponse {
	id: number;
	userId: number | null;
	sortingNumber: number | null;
	isVisible: boolean | null;
}

export type OperationStatus = 'operating' | 'scheduled' | 'closed';

export interface TourDestinationListQuery extends PaginationQuery {
	operationStatus?: OperationStatus;
	/** 대상지명 검색어(한국어만 지원)*/
	keyword?: string;
}

interface TourDestinationBase {
	/** 대상지 ID */
	id: number;
	/** 다국어 대상지명 */
	name: unknown;
	/** 운영 시작일 */
	startAt: Date | null;
	/** 운영 종료일 */
	endAt: Date | null;
	/** 홈페이지 URL */
	homepageUrl: string | null;
	/** 지도 URL */
	mapUrl: string | null;
	/** 대상지 대표 색상 코드 */
	colorCode: string | null;
	/** 상시 운영 여부 */
	isAlways: boolean | null;
	/** AI 추천 대상 여부 */
	isAiRecommendYn: boolean | null;
	/** 시설 혼잡도 사용 여부 */
	isFacilityCongestionYn: boolean | null;
	/** 구간 혼잡도 사용 여부 */
	isSectionCongestionYn: boolean | null;
	/** 시설 주소 사용 여부 */
	isFacilityAddressYn: boolean | null;
	/** 사용자 지정 정렬 사용 여부 */
	isCustomSortingYn: boolean | null;
	/** VPS 콘텐츠 사용 여부 */
	isVpsContentsYn: boolean | null;
	/** 지원 언어별 활성화 여부 */
	supportedLanguages: unknown;
	/** 최종 수정일시 */
	updatedAt: Date | null;
}

export interface TourDestinationListResponse extends TourDestinationBase {
	/** 최종 수정일시 */
	lastUpdatedAt: Date | null;
	/** 운영 상태 ('operating' | 'scheduled' | 'closed') */
	operationStatus: OperationStatus;
	/** 대상지 운영 스케줄 */
	tourDestinationOperatingSchedules: OperatingScheduleResponse[];
	/** 대상지 휴무 스케줄 */
	tourDestinationHolidaySchedules: HolidayScheduleResponse[];
}

export interface TourDestinationDetailResponse extends TourDestinationBase {
	/** 대상지 공통 버튼 */
	tourDestinationCommonButtons: CommonButtonResponse[];
	/** 대상지 운영 스케줄 */
	tourDestinationOperatingSchedules: OperatingScheduleResponse[];
	/** 대상지 휴무 스케줄 */
	tourDestinationHolidaySchedules: HolidayScheduleResponse[];
}

export interface TourDestinationOperatingInfoResponse {
	tourDestinationOperatingSchedules: OperatingScheduleResponse[];
	tourDestinationHolidaySchedules: HolidayScheduleResponse[];
}

export interface CreateTourDestinationBody {
	/**
	 * 다국어 대상지명
	 * @example {"ko": "서울 여의도 불꽃축제", "en": "Seoul Yeouido Fireworks Festival"}
	 */
	name: LocalizedText;
	/** 지원 언어별 활성화 여부 */
	supportedLanguages?: SupportedLanguages;
	/** @isFloat */
	latitude: number;
	/** @isFloat */
	longitude: number;

	/** 운영 시작일(미입력 시 상시 운영으로 간주) */
	startAt?: Date;
	/** 운영 종료일(미입력 시 상시 운영으로 간주) */
	endAt?: Date;

	colorCode: string;
	homepageUrl?: string;
	mapUrl?: string;

	/** 상시 운영 여부 (startAt과 endAt이 모두 null인 경우 true) */
	isAlways?: boolean;
	isAiRecommendYn?: boolean;
	isFacilityCongestionYn?: boolean;
	isSectionCongestionYn?: boolean;
	isFacilityAddressYn?: boolean;
	isCustomSortingYn?: boolean;

	/** 공통 링크 버튼 정보. 최대 3개까지 생성 가능 */
	tourDestinationCommonButtons?: CreateCommonButtonBody[];

	/** 운영 스케줄 정보. dayOfWeek가 있는 경우 매주 해당 요일에 운영 */
	tourDestinationOperatingSchedules?: CreateOperatingScheduleBody[];

	/** 정기휴무 스케줄 정보. weekOfMonth, dayOfWeek, fixedHoliday 중 하나 이상이 있어야 함 */
	tourDestinationHolidaySchedules?: CreateHolidayScheduleBody[];
}

export interface UpdateTourDestinationBody {
	/**
	 * 다국어 대상지명
	 * @example {"ko": "서울 여의도 불꽃축제", "en": "Seoul Yeouido Fireworks Festival"}
	 */
	name?: LocalizedText;
	/** @isFloat */
	latitude?: number;
	/** @isFloat */
	longitude?: number;

	startAt?: Date | null;
	endAt?: Date | null;
	colorCode?: string;
	homepageUrl?: string;
	mapUrl?: string;
	isAlways?: boolean;
	isVisible?: boolean;
	isAiRecommendYn?: boolean;
	isFacilityCongestionYn?: boolean;
	isSectionCongestionYn?: boolean;
	isFacilityAddressYn?: boolean;
	isCustomSortingYn?: boolean;
	supportedLanguages?: SupportedLanguages;

	/** 전체 교체 — 전달 시 기존 항목 soft-delete 후 재삽입 */
	tourDestinationCommonButtons?: CreateCommonButtonBody[];
	/** 전체 교체 — 전달 시 기존 항목 soft-delete 후 재삽입 */
	tourDestinationOperatingSchedules?: CreateOperatingScheduleBody[];
	/** 전체 교체 — 전달 시 기존 항목 soft-delete 후 재삽입 */
	tourDestinationHolidaySchedules?: CreateHolidayScheduleBody[];
}
