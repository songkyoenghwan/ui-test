import type { LocalizedText } from './common/locale';
import type { FileItem, FileItemInput } from './common/file';

export type CategoryIconKey =
    | 'location'
    | 'binoculars'
    | 'ticket'
    | 'information'
    | 'coffee'
    | 'food'
    | 'meat'
    | 'fish'
    | 'apple'
    | 'shopping'
    | 'three'
    | 'flag'
    | 'smoking'
    | 'stroller'
    | 'medical'
    | 'toilet'
    | 'wheelchair'
    | 'parking'
    | 'transport'
    | 'camera'
    | 'coin'
    | 'popper'
    | 'phone'
    | 'etc';

export interface CategoryColorCodeResponse {
    id: number;
    paletteNumber: number | null;
    sortingNumber: number | null;
    colorCode: string | null;
}

export interface CategoryResponse {
    /** 카테고리 ID */
    id: number;
    /** 다국어 카테고리명 */
    name: unknown;
    /** 코드에 등록된 카테고리 아이콘 식별자 */
    iconKey?: string | null;
    /** 상위 카테고리 ID. 최상위 카테고리인 경우 null */
    parentId?: number | null;
    /** 정렬 순서 */
    sortingNumber?: number | null;
    /** 이벤트 카테고리 여부 */
    isEventCategory: boolean | null;
    /** AI 추천 카테고리 여부 */
    isAiRecommendationEnabled?: boolean | null;
    /** 카테고리 색상 */
    categoryColorCodes?: CategoryColorCodeResponse | null;
    /** 현재 카테고리에 연결된 시설 수 */
    _count?: {
        facilities: number;
    } | null;
}

export interface CategoryDetailResponse extends CategoryResponse {
    /** 카테고리 색상 */
    categoryColorCodes?: CategoryColorCodeResponse | null;
    /** 전체 카테고리 색상 목록 (색상 선택 UI용) */
    allColorCodes: CategoryColorCodeResponse[];

    /** 현재 카테고리에 연결된 시설 수 */
    _count: { facilities: number };
    /** 카테고리 썸네일 파일 */
    categoryFiles: FileItem[];

    /** 하위 카테고리 목록 */
    children: {
        id: number;
        name: unknown;
        iconKey?: string | null;
        sortingNumber?: number | null;
        _count: { facilities: number };
    }[];
}

export interface CreateCategoryBody {
    /**
     * 다국어 카테고리명
     * @example {"ko": "음식", "en": "Food"}
     */
    name: LocalizedText;
    tourDestinationId: number;
    iconKey: CategoryIconKey;
    categoryColorCodeId?: number; // 하위 카테고리의 경우 없음
    /** 상위 카테고리 ID. 최상위 카테고리인 경우 null 또는 미전송 */
    parentId?: number | null | undefined;
    sortingNumber?: number;
    isEventCategory?: boolean | null;
    isAiRecommendationEnabled?: boolean;
    isNavigationProvided?: boolean;
    categoryFiles?: FileItemInput[];
}

export interface UpdateCategoryBody {
    /**
     * 다국어 카테고리명
     * @example {"ko": "음식", "en": "Food"}
     */
    name?: LocalizedText;
    iconKey?: CategoryIconKey;
    categoryColorCodeId?: number; // 하위 카테고리의 경우 없음
    /** 상위 카테고리 ID. 최상위 카테고리인 경우 null 또는 미전송 */
    parentId?: number | null | undefined;
    sortingNumber?: number;
    isEventCategory?: boolean | null;
    isAiRecommendationEnabled?: boolean;
    isNavigationProvided?: boolean;
    categoryFiles?: FileItemInput[];
}
