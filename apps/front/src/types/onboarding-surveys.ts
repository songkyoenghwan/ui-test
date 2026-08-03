import type { LocalizedText } from './common/locale';

export type OnboardingSurveyQuestionType = 'SINGLE' | 'MULTI';
export type OnboardingSurveyDeploymentStatus = 'DRAFT' | 'DEPLOYING' | 'ENDED';
export type OnboardingSurveySortableStatus = 'DRAFT' | 'DEPLOYING';

export interface OnboardingSurveyOptionResponse {
	id: number;
	optionItem: unknown;
	sortingNumber: number | null;
	isActive: boolean | null;
}

interface OnboardingSurveyBaseResponse {
	id: number;
	tourDestinationId: number | null;
	title: string | null;
	questionType: OnboardingSurveyQuestionType | null;
	isAiRecommendationEnabled: boolean | null;
	deploymentStatus: OnboardingSurveyDeploymentStatus | null;
	deployedAt: Date | null;
	deploymentEndedAt: Date | null;
	createdAt: Date | null;
}

export type OnboardingSurveyListResponse = OnboardingSurveyBaseResponse;

export interface OnboardingSurveyDetailResponse extends OnboardingSurveyBaseResponse {
	options: OnboardingSurveyOptionResponse[];
}

export interface OnboardingSurveyOptionInput {
	/**
	 * 다국어 답변 항목
	 * @example {"ko": "10대", "en": "Teens"}
	 */
	optionItem: LocalizedText;
	isActive?: boolean;
}

export interface UpdateOnboardingSurveyOptionInput extends OnboardingSurveyOptionInput {
	/**
	 * 기존 답변 항목 ID입니다. 배포 중 기존 항목 수정 시 필수이며, 신규 항목 추가 시 생략합니다.
	 * @example 1
	 */
	id?: number;
}

export interface OnboardingSurveyListQuery {
	tourDestinationId: number;
}

export interface CreateOnboardingSurveyBody {
	tourDestinationId: number;
	/**
	 * 설문 키워드
	 * @example "연령대"
	 */
	title: string;
	questionType: OnboardingSurveyQuestionType;
	isAiRecommendationEnabled?: boolean;

	/** 최소 2개, 최대 8개 */
	options: OnboardingSurveyOptionInput[];
}

export interface UpdateOnboardingSurveyBody {
	/**
	 * 설문 키워드
	 * @example "연령대"
	 */
	title?: string;
	questionType?: OnboardingSurveyQuestionType;
	isAiRecommendationEnabled?: boolean;
	isActive?: boolean;
	/**
	 * 배포 전에는 전체 교체, 배포 중에는 기존 항목 ID 유지 수정 및 신규 항목 추가만 허용합니다.
	 */
	options?: UpdateOnboardingSurveyOptionInput[];
}

export interface DeployOnboardingSurveysBody {
	/**
	 * 배포할 기초 설문 ID 목록입니다.
	 * @example [1, 2]
	 */
	ids: number[];
}

export interface EndOnboardingSurveysBody {
	/**
	 * 배포 종료할 기초 설문 ID 목록입니다.
	 * @example [3]
	 */
	ids: number[];
}

export interface UpdateOnboardingSurveyOrderBody {
	/**
	 * 대상지 ID입니다.
	 * @example 1
	 */
	tourDestinationId: number;
	/**
	 * 순서를 변경할 목록 상태입니다. 배포 전/배포 중 목록만 순서를 변경할 수 있습니다.
	 * @example "DRAFT"
	 */
	deploymentStatus: OnboardingSurveySortableStatus;
	/**
	 * 해당 상태 목록의 전체 ID 순서입니다.
	 * @example [3, 1, 2]
	 */
	ids: number[];
}

export interface UpdateOnboardingSurveyDeploymentResponse {
	updatedCount: number;
}
