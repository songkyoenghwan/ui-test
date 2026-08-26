import { afterEach, beforeEach, describe, expect, mock, test } from 'bun:test';

import {
	loadTourDestinationBasicSurvey,
	loadTourDestinationOnboardings,
	tourDestinationBasicSurvey,
	tourDestinationBasicSurveyError,
	tourDestinationBasicSurveyLoading,
	tourDestinationOnboarding,
	tourDestinationOnboardingError,
	tourDestinationOnboardingLoading,
} from '../../src/stores/pageDataStore';

const originalFetch = globalThis.fetch;

const onboardingData = {
	destinationId: 38,
	hasBasicSurvey: true,
	items: [
		{
			id: 10,
			title: 'Welcome',
			description: 'Description',
			mainImageUrl: 'https://cdn.example.com/main.png',
			subImageUrl: null,
		},
	],
};

const basicSurveyData = {
	destinationId: 38,
	questionCount: 1,
	questions: [
		{
			id: 101,
			questionType: 'MULTI',
			aiRecommendationEnabled: true,
			title: '관심사를 선택해 주세요.',
			options: [{ id: 1001, label: '자연' }],
		},
	],
};

beforeEach(() => {
	tourDestinationOnboarding.set(null);
	tourDestinationOnboardingLoading.set(false);
	tourDestinationOnboardingError.set('');
	tourDestinationBasicSurvey.set(null);
	tourDestinationBasicSurveyLoading.set(false);
	tourDestinationBasicSurveyError.set('');
});

afterEach(() => {
	globalThis.fetch = originalFetch;
});

describe('tour destination onboarding page data', () => {
	test('관광지 ID와 언어로 온보딩·기초 설문을 조회한다', async () => {
		const requestedUrls: string[] = [];
		globalThis.fetch = mock(async (input: string | URL | Request) => {
			const url = input.toString();
			requestedUrls.push(url);

			if (url.includes('/onboardings?')) {
				return Response.json({ success: true, data: onboardingData });
			}

			return Response.json({ success: true, data: basicSurveyData });
		}) as typeof fetch;

		await loadTourDestinationOnboardings(38, 'en', new AbortController().signal);
		await loadTourDestinationBasicSurvey(38, 'ko', new AbortController().signal);

		expect(requestedUrls).toEqual([
			'/api/v1/tour-destinations/38/onboardings?language=en',
			'/api/v1/tour-destinations/38/onboarding/basic-survey?language=ko',
		]);
		expect(tourDestinationOnboarding.get()).toEqual(onboardingData);
		expect(tourDestinationBasicSurvey.get()).toEqual(basicSurveyData);
		expect(tourDestinationOnboardingLoading.get()).toBeFalse();
		expect(tourDestinationBasicSurveyLoading.get()).toBeFalse();
	});

	test('HTTP 실패는 데이터를 비우고 오류 상태를 기록한다', async () => {
		tourDestinationOnboarding.set(onboardingData as never);
		globalThis.fetch = mock(async () => new Response(null, { status: 404 })) as typeof fetch;

		await loadTourDestinationOnboardings(38, 'ko', new AbortController().signal);

		expect(tourDestinationOnboarding.get()).toBeNull();
		expect(tourDestinationOnboardingError.get()).toBe('온보딩 목록 조회에 실패했습니다. (404)');
		expect(tourDestinationOnboardingLoading.get()).toBeFalse();
	});
});
