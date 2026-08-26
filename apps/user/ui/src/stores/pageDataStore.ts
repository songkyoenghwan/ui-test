import { atom, map } from 'nanostores';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { setPointSheetUi } from '@/src/stores/sheetUiStore';
import { colorState, DEFAULT_TOUR_DESTINATION_ID, distance, FALLBACK_TOUR_DESTINATION_ID, langState } from '@/stores/globalStore';
import { loadGrantedUserPosition, routeEndpoints, routeSelecting, userPosition, type RoutePlace } from '@/stores/locationStore';
import { saveRecentKeyword } from '@/stores/recentSearchStore';
import {
	beforeState,
	detailViewState,
	layoutViewState,
	routeViewState,
	searchViewState,
	toastState,
	updateViewState,
	type ViewStateSnapshot,
} from '@/stores/uxStore';
import type { CategoryResponse } from '@/types/categories';
import type { ApiErrorResponse, ApiSuccessResponse } from '@/types/common/api-response';
import type { SupportedLang } from '@/types/common/locale';
import type { PaginatedResponse } from '@/types/common/pagination';
import type { FacilityDetailResponse, FacilityListResponse } from '@/types/facilities';
import type { WalkingPathPoint, WalkingTurn } from '@/types/tmap-pedestrian';
import type {
	BasicSurveyAnswerRequest,
	BasicSurveySkipRequest,
	BasicSurveySubmissionResponse,
	BasicSurveySubmitRequest,
	TourDestinationBasicSurveyResponse,
	TourDestinationDetailResponse,
	TourDestinationEntryResponse,
	TourDestinationListResponse,
	TourDestinationOnboardingResponse,
} from '@/types/tour-destinations';
import { areRoutePlacesOverlapping, facilityDisplayName } from '@/utils/route-place';
import { classifyPedestrianError, mapPedestrianFeatures } from '@/utils/tmap-pedestrian';
import { getOrCreateVisitorId } from '@/utils/visitor-id';

type TourDestinationEntryApiResponse = ApiSuccessResponse<PaginatedResponse<TourDestinationEntryResponse>>;
type TourDestinationOnboardingApiResponse = ApiSuccessResponse<TourDestinationOnboardingResponse>;
type TourDestinationBasicSurveyApiResponse = ApiSuccessResponse<TourDestinationBasicSurveyResponse>;
type BasicSurveySubmissionApiResponse = ApiSuccessResponse<BasicSurveySubmissionResponse>;
type BasicSurveySubmissionAction = 'submit' | 'skip';

export type BasicSurveySubmissionState = 'idle' | 'submitting' | 'skipping';
import type {
	PoiDetailResponse,
	PoiListResponse,
	PoiMarkerResponse,
	NestPoiDetailFacilityResponse,
	NestPoiDetailResponse,
} from '@/types/pois';
import type { DepartureSearchTab, SearchLanguage, SearchResultResponse, SearchSuccessResponse } from '@/types/search';

export const CurrentSchema = z.object({
	destination: z.number(),
	poi: z.number(),
	facility: z.number(),
});

export type Current = z.infer<typeof CurrentSchema>;

export const current = map<Current>({
	destination: DEFAULT_TOUR_DESTINATION_ID,
	poi: 0,
	facility: 0,
});

export const searchList = atom<FacilityListResponse[]>([]);
export const searchResultList = atom<FacilityListResponse[]>([]);
export const keywordSearchResultList = atom<SearchResultResponse[]>([]);
export const keywordSearchLoading = atom(false);
export const keywordSearchError = atom<string | null>(null);
export const keywordSearchSubmitted = atom(false);
export const departureSearchTab = atom<DepartureSearchTab>('recent-searches');
export const aiRecommendationFacilityItems = atom<FacilityListResponse[]>([]);
export const aiRecommendationLoading = atom(false);
export const aiRecommendationError = atom<string | null>(null);
export const aiRecommendationLoadedDestinationId = atom<number | null>(null);
export const popularSearchFacilityItems = atom<FacilityListResponse[]>([]);
export const popularSearchLoading = atom(false);
export const popularSearchError = atom<string | null>(null);
export const popularSearchLoadedDestinationId = atom<number | null>(null);
export const categoryList = atom<CategoryResponse[]>([]);
export const destinationDetail = atom<TourDestinationDetailResponse | null>(null);
export const destinationList = atom<TourDestinationListResponse[]>([]);
export const tourDestinationEntryList = atom<TourDestinationEntryResponse[]>([]);
export const tourDestinationEntryLoading = atom(true);
export const tourDestinationEntryError = atom('');
export const tourDestinationOnboarding = atom<TourDestinationOnboardingResponse | null>(null);
export const tourDestinationOnboardingLoading = atom(true);
export const tourDestinationOnboardingError = atom('');
export const tourDestinationBasicSurvey = atom<TourDestinationBasicSurveyResponse | null>(null);
export const tourDestinationBasicSurveyLoading = atom(true);
export const tourDestinationBasicSurveyError = atom('');
export const basicSurveySubmissionState = atom<BasicSurveySubmissionState>('idle');
export const basicSurveySubmissionError = atom('');
export const poiDetail = atom<PoiDetailResponse[]>([]);
const sharedAtoms = globalThis as typeof globalThis & {
	__visitPoiList?: ReturnType<typeof atom<PoiListResponse[]>>;
	__visitPoiListAll?: ReturnType<typeof atom<PoiListResponse[]>>;
};

/** Nest 마커 → 레거시 facilityPoiMappings 형태로 보관 (기존 Svelte 바인딩 유지) */
export const poiList = (sharedAtoms.__visitPoiList ??= atom<PoiListResponse[]>([]));
export const poiListAll = (sharedAtoms.__visitPoiListAll ??= atom<PoiListResponse[]>([]));

const POI_LIST_EVENT = 'visit:poi-list';

function publishPoiList(list: PoiListResponse[]) {
	poiList.set(list);
	if (typeof window === 'undefined') return;
	window.dispatchEvent(new CustomEvent(POI_LIST_EVENT, { detail: list }));
}
export const facility = atom<FacilityListResponse | null>(null);
export const facilityDetail = atom<FacilityDetailResponse | null>(null);
export const facilityList = atom<FacilityListResponse[] | null>(null);
export const facilityOtherList = atom<FacilityDetailResponse[] | null>(null);
export const otherFacilityDetails = atom<FacilityDetailResponse[]>([]);
export const pathList = atom<WalkingTurn[]>([]);
export const walkingRoutePath = atom<WalkingPathPoint[]>([]);
export const recommendList = atom<FacilityListResponse[]>([]);
let walkingRouteRequestVersion = 0;

let entryRequestVersion = 0;
let onboardingRequestVersion = 0;
let basicSurveyRequestVersion = 0;
const pendingBasicSurveySubmissionIds = new Map<string, string>();

export async function loadTourDestinationEntries(language: SupportedLang, signal: AbortSignal): Promise<void> {
	const requestVersion = ++entryRequestVersion;
	tourDestinationEntryList.set([]);
	tourDestinationEntryError.set('');
	tourDestinationEntryLoading.set(true);

	try {
		const searchParams = new URLSearchParams({
			page: '1',
			pageSize: '100',
			language,
		});
		const response = await fetch(`/api/v1/tour-destinations/entry?${searchParams}`, { signal });

		if (!response.ok) {
			throw new Error(`관광지 목록 조회에 실패했습니다. (${response.status})`);
		}

		const result = (await response.json()) as TourDestinationEntryApiResponse;
		if (signal.aborted || requestVersion !== entryRequestVersion) return;

		tourDestinationEntryList.set(result.data.items);
	} catch (error) {
		if (signal.aborted || requestVersion !== entryRequestVersion) return;

		tourDestinationEntryList.set([]);
		tourDestinationEntryError.set(error instanceof Error ? error.message : '관광지 목록 조회에 실패했습니다.');
	} finally {
		if (requestVersion === entryRequestVersion) {
			tourDestinationEntryLoading.set(false);
		}
	}
}

export async function loadTourDestinationOnboardings(
	destinationId: number,
	language: SupportedLang,
	signal: AbortSignal,
): Promise<void> {
	const requestVersion = ++onboardingRequestVersion;
	tourDestinationOnboarding.set(null);
	tourDestinationOnboardingError.set('');
	tourDestinationOnboardingLoading.set(true);

	try {
		const searchParams = new URLSearchParams({ language });
		const response = await fetch(`/api/v1/tour-destinations/${destinationId}/onboardings?${searchParams}`, {
			signal,
		});

		if (!response.ok) {
			throw new Error(`온보딩 목록 조회에 실패했습니다. (${response.status})`);
		}

		const result = (await response.json()) as TourDestinationOnboardingApiResponse;
		if (signal.aborted || requestVersion !== onboardingRequestVersion) return;

		tourDestinationOnboarding.set(result.data);
	} catch (error) {
		if (signal.aborted || requestVersion !== onboardingRequestVersion) return;

		tourDestinationOnboardingError.set(error instanceof Error ? error.message : '온보딩 목록 조회에 실패했습니다.');
	} finally {
		if (requestVersion === onboardingRequestVersion) {
			tourDestinationOnboardingLoading.set(false);
		}
	}
}

export async function loadTourDestinationBasicSurvey(
	destinationId: number,
	language: SupportedLang,
	signal: AbortSignal,
): Promise<void> {
	const requestVersion = ++basicSurveyRequestVersion;
	tourDestinationBasicSurvey.set(null);
	tourDestinationBasicSurveyError.set('');
	tourDestinationBasicSurveyLoading.set(true);

	try {
		const searchParams = new URLSearchParams({ language });
		const response = await fetch(`/api/v1/tour-destinations/${destinationId}/onboarding/basic-survey?${searchParams}`, {
			signal,
		});

		if (!response.ok) {
			throw new Error(`기초 설문을 불러오지 못했습니다. (${response.status})`);
		}

		const result = (await response.json()) as TourDestinationBasicSurveyApiResponse;
		if (signal.aborted || requestVersion !== basicSurveyRequestVersion) return;

		tourDestinationBasicSurvey.set(result.data);
	} catch (error) {
		if (signal.aborted || requestVersion !== basicSurveyRequestVersion) return;

		tourDestinationBasicSurveyError.set(error instanceof Error ? error.message : '기초 설문을 불러오지 못했습니다.');
	} finally {
		if (requestVersion === basicSurveyRequestVersion) {
			tourDestinationBasicSurveyLoading.set(false);
		}
	}
}

export function clearBasicSurveySubmissionError(): void {
	basicSurveySubmissionError.set('');
}

export function submitTourDestinationBasicSurvey(
	destinationId: number,
	languageCode: SupportedLang,
	answers: BasicSurveyAnswerRequest[],
): Promise<boolean> {
	return sendBasicSurveySubmission('submit', destinationId, languageCode, answers);
}

export function skipTourDestinationBasicSurvey(destinationId: number, languageCode: SupportedLang): Promise<boolean> {
	return sendBasicSurveySubmission('skip', destinationId, languageCode, []);
}

function normalizeBasicSurveyAnswers(answers: BasicSurveyAnswerRequest[]): BasicSurveyAnswerRequest[] {
	return answers
		.map((answer) => ({
			questionId: answer.questionId,
			optionIds: [...answer.optionIds].sort((left, right) => left - right),
		}))
		.sort((left, right) => left.questionId - right.questionId);
}

function createBasicSurveySubmissionKey(
	action: BasicSurveySubmissionAction,
	destinationId: number,
	visitorId: string,
	languageCode: SupportedLang,
	answers: BasicSurveyAnswerRequest[],
): string {
	return JSON.stringify({ action, destinationId, visitorId, languageCode, answers });
}

async function getBasicSurveySubmissionErrorMessage(response: Response, fallbackMessage: string): Promise<string> {
	try {
		const result = (await response.json()) as ApiErrorResponse;
		if (typeof result.message === 'string' && result.message.trim()) {
			return result.message;
		}
	} catch {
		// JSON 오류 응답이 아니면 상태 코드가 포함된 기본 문구를 사용한다.
	}

	return `${fallbackMessage} (${response.status})`;
}

async function sendBasicSurveySubmission(
	action: BasicSurveySubmissionAction,
	destinationId: number,
	languageCode: SupportedLang,
	answers: BasicSurveyAnswerRequest[],
): Promise<boolean> {
	if (basicSurveySubmissionState.get() !== 'idle') return false;

	const normalizedAnswers = normalizeBasicSurveyAnswers(answers);
	const visitorId = getOrCreateVisitorId();
	const requestKey = createBasicSurveySubmissionKey(action, destinationId, visitorId, languageCode, normalizedAnswers);
	const submissionId = pendingBasicSurveySubmissionIds.get(requestKey) ?? uuidv4();
	const baseRequest: BasicSurveySkipRequest = {
		submissionId,
		visitorId,
		languageCode,
	};
	const requestBody: BasicSurveySkipRequest | BasicSurveySubmitRequest =
		action === 'submit' ? { ...baseRequest, answers: normalizedAnswers } : baseRequest;
	const endpoint = action === 'submit' ? 'answers' : 'skip';
	const fallbackMessage = action === 'submit' ? '기초 설문 제출에 실패했습니다.' : '기초 설문 건너뛰기에 실패했습니다.';

	pendingBasicSurveySubmissionIds.set(requestKey, submissionId);
	basicSurveySubmissionState.set(action === 'submit' ? 'submitting' : 'skipping');
	basicSurveySubmissionError.set('');

	try {
		const response = await fetch(`/api/v1/tour-destinations/${destinationId}/onboarding/basic-survey/${endpoint}`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			if (response.status < 500) {
				pendingBasicSurveySubmissionIds.delete(requestKey);
			}
			basicSurveySubmissionError.set(await getBasicSurveySubmissionErrorMessage(response, fallbackMessage));
			return false;
		}

		const result = (await response.json()) as BasicSurveySubmissionApiResponse;
		if (!result.success || result.data.submissionId !== submissionId) {
			basicSurveySubmissionError.set(fallbackMessage);
			return false;
		}

		pendingBasicSurveySubmissionIds.delete(requestKey);
		return true;
	} catch {
		basicSurveySubmissionError.set(`${fallbackMessage} 네트워크 연결을 확인해 주세요.`);
		return false;
	} finally {
		basicSurveySubmissionState.set('idle');
	}
}

let keywordSearchController: AbortController | null = null;
let aiRecommendationController: AbortController | null = null;
let popularSearchController: AbortController | null = null;

export function toFacilityListResponse(item: SearchResultResponse): FacilityListResponse {
	return {
		...item,
		poiId: item.poiId ?? null,
		poiName: item.poiName,
		address: item.address,
		addressDetail: item.addressDetail,
		latitude: item.latitude,
		longitude: item.longitude,
		thumbnailUrl: item.thumbnailUrl,
		congestionStatus: item.congestionStatus,
		operation: item.operation,
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
	};
}

export async function loadPois(
	destinationId: number,
	options?: { keyword?: string; language?: SearchLanguage },
): Promise<boolean> {
	const params = new URLSearchParams({
		tourDestinationId: String(destinationId),
	});
	if (options?.language) params.set('language', options.language);

	const keyword = options?.keyword?.trim();
	if (keyword) params.set('keyword', keyword);

	const response = await fetch(`/api/v1/pois?${params}`);
	if (!response.ok) throw new Error('Failed to fetch POIs');

	const poiData: { data?: { items?: PoiMarkerResponse[] } } = await response.json();
	const markers = (poiData.data?.items ?? []) as PoiMarkerResponse[];
	const list = markers.map((marker) => toLegacyPoiListItem(marker, destinationId));
	publishPoiList(list);
	if (!keyword) {
		poiListAll.set(list);
	}
	return true;
}

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
		keywordSearchSubmitted.set(false);
		publishPoiList(poiListAll.get());
		return false;
	}

	keywordSearchController?.abort();
	const controller = new AbortController();
	keywordSearchController = controller;
	keywordSearchLoading.set(true);
	keywordSearchError.set(null);
	keywordSearchSubmitted.set(false);

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

		const pois = Array.isArray(json.data.pois) ? json.data.pois : [];

		keywordSearchResultList.set(json.data.items);
		keywordSearchSubmitted.set(true);
		searchResultList.set(json.data.items.map(toFacilityListResponse));
		publishPoiList(pois.map((marker) => toLegacyPoiListItem(marker, destinationId)));
		saveRecentKeyword({ keyword: normalizedKeyword, tourDestinationId: destinationId });
		return json.data.items.length > 0;
	} catch (error) {
		if (controller.signal.aborted || keywordSearchController !== controller) return false;

		keywordSearchResultList.set([]);
		searchResultList.set([]);
		keywordSearchError.set(error instanceof Error ? error.message : 'Failed to fetch search results');
		keywordSearchSubmitted.set(false);
		return false;
	} finally {
		if (keywordSearchController === controller) {
			keywordSearchController = null;
			keywordSearchLoading.set(false);
		}
	}
}

export async function loadPopularSearches({
	destinationId,
	language,
}: {
	destinationId: number;
	language: SearchLanguage;
}): Promise<boolean> {
	if (popularSearchLoadedDestinationId.get() === destinationId) {
		return popularSearchFacilityItems.get().length > 0;
	}

	popularSearchController?.abort();
	const controller = new AbortController();
	popularSearchController = controller;
	popularSearchLoading.set(true);
	popularSearchError.set(null);

	const params = new URLSearchParams({
		tourDestinationId: String(destinationId),
		language,
	});

	try {
		const response = await fetch(`/api/v1/search/popularity?${params}`, { signal: controller.signal });
		if (!response.ok) throw new Error(`Failed to fetch popular searches: ${response.status}`);

		const json = (await response.json()) as Partial<SearchSuccessResponse>;
		if (json.success !== true || !Array.isArray(json.data?.items)) {
			throw new Error('Invalid popularity response');
		}
		if (popularSearchController !== controller) return false;

		popularSearchFacilityItems.set(json.data.items.map(toFacilityListResponse));
		popularSearchLoadedDestinationId.set(destinationId);
		return json.data.items.length > 0;
	} catch (error) {
		if (controller.signal.aborted || popularSearchController !== controller) return false;

		popularSearchFacilityItems.set([]);
		popularSearchLoadedDestinationId.set(null);
		popularSearchError.set(error instanceof Error ? error.message : 'Failed to fetch popular searches');
		return false;
	} finally {
		if (popularSearchController === controller) {
			popularSearchController = null;
			popularSearchLoading.set(false);
		}
	}
}

export async function loadAiRecommendationFacilities({
	destinationId,
	language,
}: {
	destinationId: number;
	language: SearchLanguage;
}): Promise<boolean> {
	if (aiRecommendationLoadedDestinationId.get() === destinationId) {
		return aiRecommendationFacilityItems.get().length > 0;
	}

	aiRecommendationController?.abort();
	const controller = new AbortController();
	aiRecommendationController = controller;
	aiRecommendationLoading.set(true);
	aiRecommendationError.set(null);

	const params = new URLSearchParams({
		tourDestinationId: String(destinationId),
		language,
	});

	try {
		const response = await fetch(`/api/v1/search/ai-recommendations?${params}`, { signal: controller.signal });
		if (!response.ok) throw new Error(`Failed to fetch AI recommendations: ${response.status}`);

		const json = (await response.json()) as Partial<SearchSuccessResponse>;
		if (json.success !== true || !Array.isArray(json.data?.items)) {
			throw new Error('Invalid AI recommendation response');
		}
		if (aiRecommendationController !== controller) return false;

		aiRecommendationFacilityItems.set(json.data.items.map(toFacilityListResponse).slice(0, 5));
		aiRecommendationLoadedDestinationId.set(destinationId);
		return json.data.items.length > 0;
	} catch (error) {
		if (controller.signal.aborted || aiRecommendationController !== controller) return false;

		aiRecommendationFacilityItems.set([]);
		aiRecommendationLoadedDestinationId.set(null);
		aiRecommendationError.set(error instanceof Error ? error.message : 'Failed to fetch AI recommendations');
		return false;
	} finally {
		if (aiRecommendationController === controller) {
			aiRecommendationController = null;
			aiRecommendationLoading.set(false);
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
					name: marker.facilityName ?? null,
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
	const [resDestination, resCategory] = await Promise.all([
		fetch(`/api/v1/tour-destinations/${destinationId}`),
		fetch(`/api/v1/categories?tourDestinationId=${destinationId}`),
		loadPois(destinationId),
	]);

	if (!resDestination.ok) {
		if (destinationId === DEFAULT_TOUR_DESTINATION_ID && destinationId !== FALLBACK_TOUR_DESTINATION_ID) {
			return loadDestination(FALLBACK_TOUR_DESTINATION_ID);
		}
		throw new Error('Failed to fetch destination');
	}
	if (!resCategory.ok) throw new Error('Failed to fetch Category');

	const [destinationData, categoryData] = await Promise.all([resDestination.json(), resCategory.json()]);

	const detail = (destinationData?.data ?? null) as TourDestinationDetailResponse | null;

	current.setKey('destination', destinationId);
	destinationDetail.set(detail);
	popularSearchController?.abort();
	popularSearchController = null;
	aiRecommendationController?.abort();
	aiRecommendationController = null;
	departureSearchTab.set('recent-searches');
	aiRecommendationFacilityItems.set([]);
	aiRecommendationLoading.set(false);
	aiRecommendationError.set(null);
	aiRecommendationLoadedDestinationId.set(null);
	popularSearchFacilityItems.set([]);
	popularSearchLoading.set(false);
	popularSearchError.set(null);
	popularSearchLoadedDestinationId.set(null);
	applyDestinationGuideColor(detail?.colorCode);
	categoryList.set(categoryData.data ?? []);
	facilityList.set([]);
	searchList.set([]);

	return detail;
}

function toFacilityListItem(facility: NestPoiDetailFacilityResponse): FacilityListResponse {
	return {
		id: facility.id,
		name: facility.name,
		startAt: facility.startAt ? new Date(facility.startAt) : null,
		endAt: facility.endAt ? new Date(facility.endAt) : null,
		description: facility.description,
		overwriteCongestionStatus: null,
		linkButton: null,
		createdAt: null,
		updatedAt: null,
		isUsingCongestion: facility.isUsingCongestion,
		hasVpsPopup: facility.hasVpsPopup,
		category: facility.category
			? {
					name: facility.category.name,
					iconKey: facility.category.iconKey,
					categoryColorCodes: facility.category.categoryColorCodes
						? { colorCode: facility.category.categoryColorCodes.colorCode }
						: { colorCode: null },
					parent: facility.category.parent ? { name: facility.category.parent.name, iconKey: null } : null,
				}
			: null,
		matchingPoiName: null,
		facilityProductsCount: facility.facilityProducts?.length ?? 0,
		facilityButtonsCount: facility.facilityButtons?.length ?? 0,
	};
}

function toFacilityDetailItem(facility: NestPoiDetailFacilityResponse): FacilityDetailResponse {
	return {
		...toFacilityListItem(facility),
		isOperationInfoSynced: null,
		contact: facility.contact,
		facilityFiles: (facility.facilityFiles ?? []).map((file) => ({
			id: file.id,
			fileUrl: file.fileUrl,
			fileType: null,
			fileOriginalName: null,
			fileUploadPath: null,
			fileUploadName: null,
			fileSize: null,
			fileMimeType: null,
		})),
		facilityProductGuideFiles: (facility.facilityProductGuideFiles ?? []).map((file) => ({
			id: file.id,
			fileUrl: file.fileUrl,
			fileType: null,
			fileOriginalName: null,
			fileUploadPath: null,
			fileUploadName: null,
			fileSize: null,
			fileMimeType: null,
		})),
		facilityHolidaySchedules: (facility.facilityHolidaySchedules ?? []).map((holiday) => ({
			id: holiday.id,
			holidayType: holiday.holidayType,
			weekOfMonth: holiday.weekOfMonth,
			dayOfWeek: holiday.dayOfWeek,
			fixedHoliday: holiday.fixedHoliday,
		})),
		facilityOperatingSchedules: (facility.facilityOperatingSchedules ?? []).map((schedule) => ({
			id: schedule.id,
			dayOfWeek: schedule.dayOfWeek,
			openingTime: schedule.openingTime,
			closingTime: schedule.closingTime,
			facilityBreakSchedules: (schedule.facilityBreakSchedules ?? []).map((breakTime) => ({
				id: breakTime.id,
				breakStartTime: breakTime.breakStartTime,
				breakEndTime: breakTime.breakEndTime,
			})),
		})),
		facilityVpsPopups: (facility.facilityVpsPopups ?? []).map((popup) => ({
			id: popup.id,
			poiId: popup.poiId,
			isVisible: popup.isVisible,
			name: popup.name,
			description: popup.description,
			url: popup.url,
			fileUrl: popup.fileUrl,
			fileOriginalName: null,
			fileUploadPath: null,
			fileUploadName: null,
			fileSize: null,
			fileMimeType: null,
		})),
		category: facility.category
			? {
					id: facility.category.id,
					name: facility.category.name,
					iconKey: facility.category.iconKey,
					categoryColorCodes: facility.category.categoryColorCodes
						? { colorCode: facility.category.categoryColorCodes.colorCode }
						: { colorCode: null },
					parent: facility.category.parent
						? {
								id: facility.category.parent.id,
								name: facility.category.parent.name,
								iconKey: null,
								categoryColorCodes: null,
							}
						: null,
				}
			: null,
		congestionSections: [],
		facilityPoiMappings: [],
		facilityButtons: (facility.facilityButtons ?? []).map((button) => ({
			id: button.id,
			buttonName: button.buttonName,
			buttonUrl: button.buttonUrl,
			tourDestinationCommonButtonId: button.tourDestinationCommonButtonId,
		})),
		facilityProducts: (facility.facilityProducts ?? []).map((product) => ({
			id: product.id,
			isVisible: null,
			displayOrder: 0,
			name: product.name,
			description: product.description,
			price: product.price,
			currency: product.currency,
			facilityProductFiles: (product.facilityProductFiles ?? []).map((file) => ({
				id: file.id,
				fileUrl: file.fileUrl,
				fileOriginalName: null,
				fileUploadPath: null,
				fileUploadName: null,
				fileSize: null,
				fileMimeType: null,
			})),
		})),
	};
}

export async function loadPoiDetail(poiId: number, selectedFacilityId: number) {
	current.setKey('poi', poiId);
	current.setKey('facility', selectedFacilityId);
	setPointSheetUi('mid');

	try {
		const response = await fetch(`/api/v1/pois/${poiId}`);
		if (!response.ok) throw new Error(`${response.status}`);

		const json = (await response.json()) as { data?: NestPoiDetailResponse };
		const detail = json.data;
		if (!detail) throw new Error('Invalid POI detail response');

		const mappings = detail.facilityPoiMappings ?? [];
		const selected = mappings.find((mapping) => Number(mapping.facilityId) === Number(selectedFacilityId)) ?? mappings[0];
		const selectedFacility = selected?.facility ?? null;
		const otherFacilities = mappings
			.filter((mapping) => Number(mapping.facilityId) !== Number(selected?.facilityId))
			.map((mapping) => mapping.facility)
			.filter((item): item is NestPoiDetailFacilityResponse => item != null);

		facility.set(selectedFacility ? toFacilityListItem(selectedFacility) : null);
		facilityDetail.set(selectedFacility ? toFacilityDetailItem(selectedFacility) : null);
		facilityOtherList.set(otherFacilities.map(toFacilityDetailItem));
	} catch {
		facility.set(null);
		facilityDetail.set(null);
		facilityOtherList.set([]);
	}
}

export async function currentDetail() {
	const { poi: poiId, facility: facilityId } = current.get();
	if (!poiId) {
		facilityOtherList.set([]);
		return;
	}

	await loadPoiDetail(poiId, facilityId);
}

function representativeFacilityForPoi(poiId: number) {
	const poi =
		poiList.get().find((entry) => Number(entry.id) === poiId) ?? poiListAll.get().find((entry) => Number(entry.id) === poiId);
	const mapping = poi?.facilityPoiMappings?.[0];
	if (!mapping) return null;

	return {
		facilityId: Number(mapping.facilityId),
		name: mapping.facility?.name,
	};
}

function resolveFacilityRouteName(place: RoutePlace, source: 'detail' | 'poi'): string {
	const lang = langState.get();
	const poiId = place.poiId == null ? Number.NaN : Number(place.poiId);
	if (!(Number.isFinite(poiId) && poiId > 0)) {
		return facilityDisplayName(place.name, lang, place.name);
	}

	if (source === 'detail' && Number(current.get().poi) === poiId) {
		const fromCurrent = facilityDisplayName(facility.get()?.name, lang);
		if (fromCurrent) return fromCurrent;
		return facilityDisplayName(place.name, lang, place.name);
	}

	const representative = representativeFacilityForPoi(poiId);
	const representativeId = Number(representative?.facilityId);
	const fromMapping = facilityDisplayName(representative?.name, lang);
	if (fromMapping) return fromMapping;

	if (Number.isFinite(representativeId) && representativeId > 0) {
		const matchedFacility =
			searchResultList.get().find((item) => Number(item.id) === representativeId) ??
			aiRecommendationFacilityItems.get().find((item) => Number(item.id) === representativeId) ??
			popularSearchFacilityItems.get().find((item) => Number(item.id) === representativeId) ??
			keywordSearchResultList.get().find((item) => Number(item.id) === representativeId);
		const fromLists = facilityDisplayName(matchedFacility?.name, lang);
		if (fromLists) return fromLists;
	}

	return facilityDisplayName(place.name, lang, place.name);
}

function withFacilityRouteName(place: RoutePlace, source: 'detail' | 'poi'): RoutePlace {
	const name = resolveFacilityRouteName(place, source);
	return name ? { ...place, name } : place;
}

export function beginWalkingSelection(slot: 'start' | 'end', place: RoutePlace) {
	const namedPlace = withFacilityRouteName(place, 'detail');
	walkingRouteRequestVersion += 1;
	walkingRoutePath.set([]);
	pathList.set([]);
	toastState.set('none');
	distance.set({
		start: slot === 'start' ? namedPlace.name : '',
		end: slot === 'end' ? namedPlace.name : '',
		step: 0,
		totalDistance: 0,
		time: 0,
	});
	routeEndpoints.set({
		start: slot === 'start' ? namedPlace : null,
		end: slot === 'end' ? namedPlace : null,
	});
	routeSelecting.set(slot === 'start' ? 'end' : 'start');
	updateViewState({
		layout: 'directions',
		detail: 'idle',
		search: 'departure',
		route: 'idle',
	});
}

export async function startWalkingFromUserLocation(destination: RoutePlace, currentLocationName: string): Promise<boolean> {
	const position = userPosition.get() ?? (await loadGrantedUserPosition());
	if (!position) {
		beginWalkingSelection('end', destination);
		return false;
	}

	const start: RoutePlace = {
		latitude: position.latitude,
		longitude: position.longitude,
		poiId: null,
		name: currentLocationName,
	};

	if (areRoutePlacesOverlapping(start, destination)) {
		beginWalkingSelection('end', destination);
		toastState.set('same');
		return false;
	}

	walkingRouteRequestVersion += 1;
	walkingRoutePath.set([]);
	pathList.set([]);
	toastState.set('none');
	distance.set({
		start: start.name,
		end: destination.name,
		step: 0,
		totalDistance: 0,
		time: 0,
	});
	routeEndpoints.set({ start, end: destination });
	return requestWalkingRoute();
}

export function openWalkingPlaceSearch(slot: 'start' | 'end') {
	routeSelecting.set(slot);
	keywordSearchSubmitted.set(false);
	departureSearchTab.set('recent-searches');
	updateViewState({
		layout: 'search',
		detail: 'idle',
		search: 'departureSearch',
		route: 'idle',
	});
}

export function assignRoutePlace(place: RoutePlace): boolean {
	const selecting = routeSelecting.get();
	if (selecting === 'idle') return false;

	const namedPlace = withFacilityRouteName(place, 'poi');
	const endpoints = routeEndpoints.get();
	const other = selecting === 'start' ? endpoints.end : endpoints.start;
	if (areRoutePlacesOverlapping(namedPlace, other)) {
		toastState.set('same');
		layoutViewState.set('directions');
		detailViewState.set('idle');
		searchViewState.set('departure');
		return false;
	}

	toastState.set('none');
	if (selecting === 'start') {
		routeEndpoints.setKey('start', namedPlace);
		distance.setKey('start', namedPlace.name);
	} else {
		routeEndpoints.setKey('end', namedPlace);
		distance.setKey('end', namedPlace.name);
	}

	const next = routeEndpoints.get();
	if (next.start && next.end) {
		void requestWalkingRoute();
		return true;
	}

	layoutViewState.set('directions');
	detailViewState.set('idle');
	searchViewState.set('departure');
	return true;
}

export function swapWalkingEndpoints() {
	const prevDistance = distance.get();
	const endpoints = routeEndpoints.get();
	const selecting = routeSelecting.get();

	distance.set({
		...prevDistance,
		start: prevDistance.end,
		end: prevDistance.start,
	});
	routeEndpoints.set({ start: endpoints.end, end: endpoints.start });
	if (selecting !== 'idle') {
		routeSelecting.set(selecting === 'start' ? 'end' : 'start');
	}
}

function isRestorableMapView(state: ViewStateSnapshot) {
	if (state.layout === 'directions') return false;
	if (state.detail === 'path') return false;
	if (
		state.search === 'departure' ||
		state.search === 'departureSearch' ||
		state.search === 'finding' ||
		state.search === 'path'
	) {
		return false;
	}
	if (state.detail === 'idle' && state.search === 'idle') return false;
	return true;
}

function restoreMapHomeView() {
	layoutViewState.set('default');
	detailViewState.set('ai');
	searchViewState.set('default');
	routeViewState.set('idle');
}

export function closeWalkingRoute() {
	walkingRouteRequestVersion += 1;
	walkingRoutePath.set([]);
	pathList.set([]);
	routeEndpoints.set({ start: null, end: null });
	routeSelecting.set('idle');
	toastState.set('none');
	distance.set({ start: '', end: '', step: 0, totalDistance: 0, time: 0 });

	const history = beforeState.get();
	const previous = [...history].reverse().find(isRestorableMapView);
	beforeState.set([]);
	if (previous) {
		layoutViewState.set(previous.layout);
		detailViewState.set(previous.detail);
		searchViewState.set(previous.search);
		routeViewState.set(previous.route);
		return;
	}

	restoreMapHomeView();
}

export async function requestWalkingRoute(): Promise<boolean> {
	const { start, end } = routeEndpoints.get();
	if (!start || !end) return false;
	if (areRoutePlacesOverlapping(start, end)) {
		toastState.set('same');
		return false;
	}

	const requestVersion = ++walkingRouteRequestVersion;
	updateViewState({
		layout: 'directions',
		detail: 'idle',
		search: 'finding',
		route: 'idle',
	});
	toastState.set('none');

	try {
		const response = await fetch('/api/tmap/routes/pedestrian?version=1', {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				startX: start.longitude,
				startY: start.latitude,
				endX: end.longitude,
				endY: end.latitude,
				startName: encodeURIComponent(start.name || '출발지'),
				endName: encodeURIComponent(end.name || '도착지'),
				reqCoordType: 'WGS84GEO',
				resCoordType: 'WGS84GEO',
				searchOption: '0',
			}),
		});
		const json = await response.json().catch(() => null);
		if (requestVersion !== walkingRouteRequestVersion) return false;

		if (!response.ok) {
			toastState.set(classifyPedestrianError(response.status, json));
			updateViewState({
				layout: 'directions',
				detail: 'idle',
				search: 'departure',
				route: 'idle',
			});
			walkingRoutePath.set([]);
			pathList.set([]);
			return false;
		}

		const mapped = mapPedestrianFeatures(json);
		if (!mapped) {
			toastState.set('disabled');
			updateViewState({
				layout: 'directions',
				detail: 'idle',
				search: 'departure',
				route: 'idle',
			});
			walkingRoutePath.set([]);
			pathList.set([]);
			return false;
		}

		walkingRoutePath.set(mapped.path);
		pathList.set(mapped.turns);
		distance.set({
			start: start.name,
			end: end.name,
			totalDistance: mapped.totalDistance,
			time: mapped.totalTimeMinutes,
			step: mapped.step,
		});
		routeSelecting.set('idle');
		updateViewState({
			layout: 'directions',
			detail: 'path',
			search: 'path',
			route: 'path',
		});
		return true;
	} catch {
		if (requestVersion !== walkingRouteRequestVersion) return false;
		toastState.set('disabled');
		updateViewState({
			layout: 'directions',
			detail: 'idle',
			search: 'departure',
			route: 'idle',
		});
		walkingRoutePath.set([]);
		pathList.set([]);
		return false;
	}
}
