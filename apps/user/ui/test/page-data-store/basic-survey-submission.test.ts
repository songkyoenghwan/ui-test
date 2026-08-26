import { afterEach, beforeEach, describe, expect, mock, test } from 'bun:test';

import {
	basicSurveySubmissionError,
	basicSurveySubmissionState,
	skipTourDestinationBasicSurvey,
	submitTourDestinationBasicSurvey,
} from '../../src/stores/pageDataStore';

const originalFetch = globalThis.fetch;
const originalLocalStorageDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
const visitorId = '7074e8be-1c93-41c0-8e4f-a2569f780cbc';
const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const createDeferred = <T>() => {
	let resolve!: (value: T | PromiseLike<T>) => void;
	const promise = new Promise<T>((resolvePromise) => {
		resolve = resolvePromise;
	});

	return { promise, resolve };
};

const createSubmissionSuccessResponse = (submissionId: string) =>
	Response.json({
		success: true,
		data: { submissionId },
	});

beforeEach(() => {
	Object.defineProperty(globalThis, 'localStorage', {
		configurable: true,
		value: {
			getItem: mock((key: string) => (key === 'visitorId' ? visitorId : null)),
			setItem: mock(() => undefined),
		},
	});

	basicSurveySubmissionState.set('idle');
	basicSurveySubmissionError.set('');
});

afterEach(() => {
	globalThis.fetch = originalFetch;

	if (originalLocalStorageDescriptor) {
		Object.defineProperty(globalThis, 'localStorage', originalLocalStorageDescriptor);
	} else {
		delete (globalThis as { localStorage?: Storage }).localStorage;
	}
});

describe('basic survey submission', () => {
	test('submit과 skip endpoint에 visitor·language·submission·답변을 전달한다', async () => {
		const requests: Array<{ url: string; body: Record<string, unknown> }> = [];
		globalThis.fetch = mock(async (input: string | URL | Request, init?: RequestInit) => {
			const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
			requests.push({ url: input.toString(), body });
			return createSubmissionSuccessResponse(String(body.submissionId));
		}) as typeof fetch;

		expect(
			await submitTourDestinationBasicSurvey(38, 'en', [
				{ questionId: 102, optionIds: [1004, 1003] },
				{ questionId: 101, optionIds: [1002] },
			]),
		).toBeTrue();
		expect(await skipTourDestinationBasicSurvey(38, 'ko')).toBeTrue();

		expect(requests[0]?.url).toBe('/api/v1/tour-destinations/38/onboarding/basic-survey/answers');
		expect(requests[0]?.body).toMatchObject({
			visitorId,
			languageCode: 'en',
			answers: [
				{ questionId: 101, optionIds: [1002] },
				{ questionId: 102, optionIds: [1003, 1004] },
			],
		});
		expect(String(requests[0]?.body.submissionId)).toMatch(uuidV4Pattern);
		expect(requests[1]?.url).toBe('/api/v1/tour-destinations/38/onboarding/basic-survey/skip');
		expect(requests[1]?.body).toMatchObject({ visitorId, languageCode: 'ko' });
		expect(requests[1]?.body).not.toHaveProperty('answers');
	});

	test('5xx와 네트워크 실패 재시도는 같은 submissionId를 사용한다', async () => {
		const submissionIds: string[] = [];
		let requestCount = 0;
		globalThis.fetch = mock(async (_input: string | URL | Request, init?: RequestInit) => {
			const body = JSON.parse(String(init?.body)) as { submissionId: string };
			submissionIds.push(body.submissionId);
			requestCount += 1;

			if (requestCount === 1) {
				return Response.json({ success: false, message: '서버 오류' }, { status: 500 });
			}
			if (requestCount === 2) {
				throw new TypeError('network error');
			}

			return createSubmissionSuccessResponse(body.submissionId);
		}) as typeof fetch;

		const answers = [{ questionId: 201, optionIds: [2001] }];
		expect(await submitTourDestinationBasicSurvey(51, 'ko', answers)).toBeFalse();
		expect(await submitTourDestinationBasicSurvey(51, 'ko', answers)).toBeFalse();
		expect(await submitTourDestinationBasicSurvey(51, 'ko', answers)).toBeTrue();

		expect(new Set(submissionIds).size).toBe(1);
	});

	test('4xx 재시도와 변경된 payload는 새 submissionId를 사용한다', async () => {
		const submissionIds: string[] = [];
		let requestCount = 0;
		globalThis.fetch = mock(async (_input: string | URL | Request, init?: RequestInit) => {
			const body = JSON.parse(String(init?.body)) as { submissionId: string };
			submissionIds.push(body.submissionId);
			requestCount += 1;

			if (requestCount === 1) {
				return Response.json({ success: false, message: '잘못된 요청' }, { status: 400 });
			}
			if (requestCount === 3) {
				return Response.json({ success: false, message: '서버 오류' }, { status: 500 });
			}

			return createSubmissionSuccessResponse(body.submissionId);
		}) as typeof fetch;

		const firstAnswers = [{ questionId: 301, optionIds: [3001] }];
		expect(await submitTourDestinationBasicSurvey(61, 'ko', firstAnswers)).toBeFalse();
		expect(await submitTourDestinationBasicSurvey(61, 'ko', firstAnswers)).toBeTrue();

		const retainedAnswers = [{ questionId: 302, optionIds: [3002] }];
		expect(await submitTourDestinationBasicSurvey(62, 'ko', retainedAnswers)).toBeFalse();
		expect(await submitTourDestinationBasicSurvey(62, 'ko', [{ questionId: 302, optionIds: [3003] }])).toBeTrue();

		expect(submissionIds[0]).not.toBe(submissionIds[1]);
		expect(submissionIds[2]).not.toBe(submissionIds[3]);
		expect(basicSurveySubmissionError.get()).toBe('');
	});

	test('제출 중에는 추가 요청을 보내지 않는다', async () => {
		const response = createDeferred<Response>();
		let requestBody: { submissionId: string } | null = null;
		let requestCount = 0;
		globalThis.fetch = mock(async (_input: string | URL | Request, init?: RequestInit) => {
			requestCount += 1;
			requestBody = JSON.parse(String(init?.body)) as { submissionId: string };
			return response.promise;
		}) as typeof fetch;

		const firstRequest = skipTourDestinationBasicSurvey(71, 'en');
		expect(basicSurveySubmissionState.get()).toBe('skipping');
		expect(await skipTourDestinationBasicSurvey(71, 'en')).toBeFalse();
		expect(requestCount).toBe(1);

		response.resolve(createSubmissionSuccessResponse(requestBody?.submissionId ?? ''));
		expect(await firstRequest).toBeTrue();
		expect(basicSurveySubmissionState.get()).toBe('idle');
	});
});
