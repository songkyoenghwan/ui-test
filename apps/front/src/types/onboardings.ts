import type { LocalizedText } from './common/locale';
import type { FileItem, FileItemInput } from './common/file';

export type OnboardingFileType = 'MAIN' | 'MAIN_GLOBAL' | 'THUMBNAIL' | 'THUMBNAIL_GLOBAL';
export type OnboardingDeploymentStatus = 'DRAFT' | 'DEPLOYING';
export interface OnboardingFileItem extends FileItem {
    fileType: OnboardingFileType;
}

export interface OnboardingFileItemInput extends FileItemInput {
    fileType: OnboardingFileType;
}

export interface OnboardingListResponse {
    id: number;
    tourDestinationId: number | null;
    title: unknown;
    description: unknown;
    sortingNumber: number | null;
    deploymentStatus: OnboardingDeploymentStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    onboardingFiles: OnboardingFileItem[];
}

export type OnboardingDetailResponse = OnboardingListResponse;

export interface OnboardingListQuery {
    tourDestinationId: number;
}

export interface CreateOnboardingBody {
    tourDestinationId: number;
    /**
     * 다국어 제목
     * @example {"ko": "온보딩 1", "en": "Onboarding 1"}
     */
    title: LocalizedText;
    /**
     * 다국어 설명
     * @example {"ko": "설명", "en": "Description"}
     */
    description?: LocalizedText;
    onboardingFiles?: OnboardingFileItemInput[];
}

export interface UpdateOnboardingBody {
    /**
     * 다국어 제목
     * @example {"ko": "온보딩 1", "en": "Onboarding 1"}
     */
    title?: LocalizedText;
    /**
     * 다국어 설명
     * @example {"ko": "설명", "en": "Description"}
     */
    description?: LocalizedText;
    onboardingFiles?: OnboardingFileItemInput[];
}

export interface DeployOnboardingsBody {
    /**
     * 배포할 온보딩 ID 목록입니다. 요청 순서를 배포 순서로 사용합니다.
     * @example [3, 7]
     */
    ids: number[];
}

export interface UndeployOnboardingsBody {
    /**
     * 배포 해제할 온보딩 ID 목록입니다.
     * @example [1, 2, 3]
     */
    ids: number[];
}

export interface UpdateOnboardingDeploymentOrderBody {
    /**
     * 대상지 ID입니다.
     * @example 1
     */
    tourDestinationId: number;
    /**
     * 순서를 변경할 목록 상태입니다. 배포 전/배포 중 목록만 순서를 변경할 수 있습니다.
     * @example "DRAFT"
     */
    deploymentStatus: OnboardingDeploymentStatus;
    /**
     * 배포 중 목록의 전체 ID 순서입니다.
     * @example [7, 3, 10]
     */
    ids: number[];
}

export interface UpdateOnboardingDeploymentResponse {
    updatedCount: number;
}
