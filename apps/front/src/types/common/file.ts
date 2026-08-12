/** 파일 컬럼 공통 필드 (인라인 컬럼 테이블용) */
export interface FileFields {
    fileOriginalName: string | null;
    fileUrl: string | null;
    fileUploadPath: string | null;
    fileUploadName: string | null;
    fileSize: number | null;
    fileMimeType: string | null;
}

/** 파일 전용 테이블 응답 (자체 id 보유) */
export interface FileItem extends FileFields {
    id: number;
}

export type FileUploadType =
    | 'category'
    | 'facility'
    | 'facilityProduct'
    | 'tourDestinationOverlay'
    | 'facilityVpsPopup'
    | 'onboarding';

export const FILE_UPLOAD_PATH_PREFIXES: Record<FileUploadType, string> = {
    category: 'images/categories',
    facility: 'images/facilities',
    facilityProduct: 'images/facility-products',
    tourDestinationOverlay: 'images/tour-destination-overlays',
    facilityVpsPopup: 'images/facility-vps-popups',
    onboarding: 'images/onboarding',
};

/** 파일 업로드 입력값 */
export interface FileItemInput {
    fileOriginalName: string;
    fileUrl: string;
    fileUploadPath: string;
    fileUploadName: string;
    fileSize: number;
    fileMimeType: string;
}
