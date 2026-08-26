import { HttpStatus } from '@nestjs/common';
import { AppException } from '../common/exceptions/app.exception';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '../generated/prisma/client';
import { BasicSurveySubmitDto } from './dto/basic-survey-submit.dto';
import { TourDestinationBasicSurveySubmissionService } from './tour-destination-basic-survey-submission.service';

describe('TourDestinationBasicSurveySubmissionService', () => {
  const now = new Date('2026-08-20T03:00:00.000Z');
  const kstNow = new Date('2026-08-20T12:00:00.000Z');
  const submissionId = 'e29053d2-c7af-4eba-8765-b23d9d060072';
  const visitorId = '7074e8be-1c93-41c0-8e4f-a2569f780cbc';
  const activeQuestions = [
    {
      id: 101,
      title: { ko: '거주지', en: 'Residence' },
      questionType: 'SINGLE',
      onboardingBasicSurveyOptions: [
        { id: 1001, optionItem: { ko: '현지', en: 'Local' } },
        { id: 1002, optionItem: { ko: '외지', en: 'Visitor' } },
      ],
    },
    {
      id: 102,
      title: { ko: '동행인', en: 'Companions' },
      questionType: 'MULTI',
      onboardingBasicSurveyOptions: [
        { id: 1003, optionItem: { ko: '가족', en: 'Family' } },
        { id: 1004, optionItem: { ko: '친구', en: 'Friends' } },
        { id: 1005, optionItem: { ko: '동료', en: 'Colleagues' } },
      ],
    },
  ];

  let service: TourDestinationBasicSurveySubmissionService;
  let rootFindUniqueMock: jest.Mock;
  let transactionFindUniqueMock: jest.Mock;
  let analyticsVisitorUpsertMock: jest.Mock;
  let destinationFindFirstMock: jest.Mock;
  let submissionCreateMock: jest.Mock;
  let answerCreateManyMock: jest.Mock;
  let surveyStatusUpsertMock: jest.Mock;
  let transactionMock: jest.Mock;
  let capturedSubmissionCreateArgument: unknown;
  let capturedSurveyStatusUpsertArgument: unknown;
  let capturedAnalyticsVisitorUpsertArgument: unknown;

  const submittedDto = (): BasicSurveySubmitDto => ({
    submissionId,
    visitorId,
    languageCode: 'en',
    answers: [
      { questionId: 101, optionIds: [1001] },
      { questionId: 102, optionIds: [1003, 1004] },
    ],
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(now);

    rootFindUniqueMock = jest.fn().mockResolvedValue(null);
    transactionFindUniqueMock = jest.fn().mockResolvedValue(null);
    capturedSubmissionCreateArgument = undefined;
    capturedSurveyStatusUpsertArgument = undefined;
    capturedAnalyticsVisitorUpsertArgument = undefined;
    analyticsVisitorUpsertMock = jest.fn().mockImplementation((argument: unknown) => {
      capturedAnalyticsVisitorUpsertArgument = argument;
      return Promise.resolve({ visitorId });
    });
    destinationFindFirstMock = jest.fn().mockResolvedValue({
      id: 38,
      onboardingBasicSurveyQuestions: activeQuestions,
    });
    submissionCreateMock = jest
      .fn()
      .mockImplementation((argument: { data: Record<string, unknown> }) => {
        capturedSubmissionCreateArgument = argument;
        return Promise.resolve({
          ...argument.data,
          visitorOnboardingBasicSurveyAnswers: [],
        });
      });
    answerCreateManyMock = jest.fn().mockResolvedValue({ count: 3 });
    surveyStatusUpsertMock = jest.fn().mockImplementation((argument: unknown) => {
      capturedSurveyStatusUpsertArgument = argument;
      return Promise.resolve({ id: 1 });
    });

    const transactionClient = {
      onboardingSurveySubmission: {
        findUnique: transactionFindUniqueMock,
        create: submissionCreateMock,
      },
      analyticsVisitor: { upsert: analyticsVisitorUpsertMock },
      tourDestination: { findFirst: destinationFindFirstMock },
      visitorOnboardingBasicSurveyAnswer: { createMany: answerCreateManyMock },
      analyticsVisitorSurveyStatus: { upsert: surveyStatusUpsertMock },
    };
    transactionMock = jest
      .fn()
      .mockImplementation((callback: (transaction: typeof transactionClient) => Promise<unknown>) =>
        callback(transactionClient),
      );

    const prismaMock = {
      onboardingSurveySubmission: { findUnique: rootFindUniqueMock },
      $transaction: transactionMock,
    };
    service = new TourDestinationBasicSurveySubmissionService(
      prismaMock as unknown as PrismaService,
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('설문 스킵을 답변 없이 저장하고 최신 분석 상태를 갱신한다', async () => {
    await expect(
      service.skip(38, { submissionId, visitorId, languageCode: 'ko' }),
    ).resolves.toEqual({
      submissionId,
      visitorId,
      destinationId: 38,
      languageCode: 'ko',
      status: 'SKIPPED',
      submittedAt: null,
      skippedAt: kstNow,
    });

    expect(answerCreateManyMock).not.toHaveBeenCalled();
    expect(capturedSubmissionCreateArgument).toMatchObject({
      data: {
        status: 'SKIPPED',
        createdAt: kstNow,
        submittedAt: null,
        skippedAt: kstNow,
      },
    });
    expect(capturedSurveyStatusUpsertArgument).toMatchObject({
      where: {
        visitorId_tourDestinationId: { visitorId, tourDestinationId: 38 },
      },
      create: {
        status: 'SKIPPED',
        createdAt: kstNow,
        firstSeenAt: kstNow,
        submittedAt: null,
        skippedAt: kstNow,
      },
      update: {
        status: 'SKIPPED',
        submittedAt: null,
        skippedAt: kstNow,
        updatedAt: kstNow,
        isVisible: true,
        isDeleted: false,
        deletedAt: null,
      },
    });
  });

  it('전체 번역 snapshot과 제출 언어를 선택지별 답변 row로 저장한다', async () => {
    await expect(service.submitAnswers(38, submittedDto())).resolves.toMatchObject({
      submissionId,
      visitorId,
      destinationId: 38,
      languageCode: 'en',
      status: 'SUBMITTED',
      submittedAt: kstNow,
      skippedAt: null,
    });

    expect(capturedSubmissionCreateArgument).toMatchObject({
      data: {
        status: 'SUBMITTED',
        createdAt: kstNow,
        submittedAt: kstNow,
        skippedAt: null,
      },
    });
    expect(capturedAnalyticsVisitorUpsertArgument).toMatchObject({
      where: { visitorId },
      create: {
        visitorId,
        createdAt: kstNow,
        firstSeenAt: kstNow,
        lastSeenAt: kstNow,
      },
      update: {
        lastSeenAt: kstNow,
        updatedAt: kstNow,
        isVisible: true,
        isDeleted: false,
      },
    });
    expect(capturedSurveyStatusUpsertArgument).toMatchObject({
      create: {
        status: 'SUBMITTED',
        createdAt: kstNow,
        firstSeenAt: kstNow,
        submittedAt: kstNow,
        skippedAt: null,
      },
      update: {
        status: 'SUBMITTED',
        submittedAt: kstNow,
        skippedAt: null,
        updatedAt: kstNow,
      },
    });
    expect(answerCreateManyMock).toHaveBeenCalledWith({
      data: [
        {
          submissionId,
          createdAt: kstNow,
          onboardingBasicSurveyQuestionId: 101,
          onboardingBasicSurveyOptionId: 1001,
          questionSnapshot: { ko: '거주지', en: 'Residence' },
          optionSnapshot: { ko: '현지', en: 'Local' },
        },
        {
          submissionId,
          createdAt: kstNow,
          onboardingBasicSurveyQuestionId: 102,
          onboardingBasicSurveyOptionId: 1003,
          questionSnapshot: { ko: '동행인', en: 'Companions' },
          optionSnapshot: { ko: '가족', en: 'Family' },
        },
        {
          submissionId,
          createdAt: kstNow,
          onboardingBasicSurveyQuestionId: 102,
          onboardingBasicSurveyOptionId: 1004,
          questionSnapshot: { ko: '동행인', en: 'Companions' },
          optionSnapshot: { ko: '친구', en: 'Friends' },
        },
      ],
    });
  });

  it('MULTI 질문은 선택지 1개 답변을 허용한다', async () => {
    const dto = submittedDto();
    dto.answers = [
      { questionId: 101, optionIds: [1001] },
      { questionId: 102, optionIds: [1003] },
    ];

    await expect(service.submitAnswers(38, dto)).resolves.toMatchObject({
      submissionId,
      status: 'SUBMITTED',
      submittedAt: kstNow,
      skippedAt: null,
    });
    expect(answerCreateManyMock).toHaveBeenCalledWith({
      data: [
        expect.objectContaining({
          onboardingBasicSurveyQuestionId: 101,
          onboardingBasicSurveyOptionId: 1001,
        }),
        expect.objectContaining({
          onboardingBasicSurveyQuestionId: 102,
          onboardingBasicSurveyOptionId: 1003,
        }),
      ],
    });
  });

  it('조회 API와 동일한 대상지·질문·선택지 조건 및 개수 제한을 사용한다', async () => {
    await service.submitAnswers(38, submittedDto());

    expect(destinationFindFirstMock).toHaveBeenCalledWith({
      where: {
        id: 38,
        isVisible: true,
        isDeleted: false,
        OR: [{ isAlways: true }, { startAt: { lte: kstNow }, endAt: { gte: kstNow } }],
      },
      select: {
        id: true,
        onboardingBasicSurveyQuestions: {
          where: {
            isVisible: true,
            isDeleted: false,
            deploymentStatus: 'DEPLOYING',
            questionType: { in: ['SINGLE', 'MULTI'] },
            deployedAt: { lte: kstNow },
            OR: [{ deploymentEndedAt: null }, { deploymentEndedAt: { gte: kstNow } }],
            onboardingBasicSurveyOptions: {
              some: { isVisible: true, isDeleted: false, isActive: true },
            },
          },
          orderBy: [{ sortingNumber: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }],
          take: 10,
          select: {
            id: true,
            title: true,
            questionType: true,
            onboardingBasicSurveyOptions: {
              where: { isVisible: true, isDeleted: false, isActive: true },
              orderBy: [{ sortingNumber: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }],
              take: 8,
              select: { id: true, optionItem: true },
            },
          },
        },
      },
    });
  });

  it('null인 질문·선택지 원본은 빈 JSON snapshot으로 저장한다', async () => {
    destinationFindFirstMock.mockResolvedValue({
      id: 38,
      onboardingBasicSurveyQuestions: [
        {
          id: 101,
          title: null,
          questionType: 'SINGLE',
          onboardingBasicSurveyOptions: [{ id: 1001, optionItem: null }],
        },
      ],
    });
    const dto = submittedDto();
    dto.answers = [{ questionId: 101, optionIds: [1001] }];

    await service.submitAnswers(38, dto);

    expect(answerCreateManyMock).toHaveBeenCalledWith({
      data: [
        expect.objectContaining({
          questionSnapshot: {},
          optionSnapshot: {},
        }),
      ],
    });
  });

  it('대상지가 유효하지 않으면 404를 반환하고 트랜잭션 쓰기를 롤백한다', async () => {
    destinationFindFirstMock.mockResolvedValue(null);

    await expect(service.submitAnswers(999, submittedDto())).rejects.toMatchObject({
      code: 'NOT_FOUND',
    });
    expect(submissionCreateMock).not.toHaveBeenCalled();
    expect(answerCreateManyMock).not.toHaveBeenCalled();
    expect(surveyStatusUpsertMock).not.toHaveBeenCalled();
  });

  it('활성 설문이 없으면 409를 반환한다', async () => {
    destinationFindFirstMock.mockResolvedValue({
      id: 38,
      onboardingBasicSurveyQuestions: [],
    });

    await expect(
      service.skip(38, { submissionId, visitorId, languageCode: 'ko' }),
    ).rejects.toMatchObject({
      code: 'CONFLICT',
    });
  });

  it.each([
    {
      name: '질문 누락',
      answers: [{ questionId: 101, optionIds: [1001] }],
    },
    {
      name: '질문 중복',
      answers: [
        { questionId: 101, optionIds: [1001] },
        { questionId: 101, optionIds: [1002] },
        { questionId: 102, optionIds: [1003, 1004] },
      ],
    },
    {
      name: '다른 질문의 선택지',
      answers: [
        { questionId: 101, optionIds: [1003] },
        { questionId: 102, optionIds: [1003, 1004] },
      ],
    },
    {
      name: 'SINGLE 복수 선택',
      answers: [
        { questionId: 101, optionIds: [1001, 1002] },
        { questionId: 102, optionIds: [1003, 1004] },
      ],
    },
  ])('$name 답변을 400으로 거부한다', async ({ answers }) => {
    const dto = submittedDto();
    dto.answers = answers;

    await expect(service.submitAnswers(38, dto)).rejects.toMatchObject({
      code: 'BAD_REQUEST',
    });
    expect(submissionCreateMock).not.toHaveBeenCalled();
  });

  it('같은 submissionId와 의미상 같은 답변 재요청은 기존 결과를 반환한다', async () => {
    rootFindUniqueMock.mockResolvedValue({
      submissionId,
      visitorId,
      tourDestinationId: 38,
      languageCode: 'en',
      status: 'SUBMITTED',
      submittedAt: now,
      skippedAt: null,
      visitorOnboardingBasicSurveyAnswers: [
        { onboardingBasicSurveyQuestionId: 102, onboardingBasicSurveyOptionId: 1004 },
        { onboardingBasicSurveyQuestionId: 101, onboardingBasicSurveyOptionId: 1001 },
        { onboardingBasicSurveyQuestionId: 102, onboardingBasicSurveyOptionId: 1003 },
      ],
    });
    const dto = submittedDto();
    dto.answers.reverse();
    dto.answers[0].optionIds.reverse();

    await expect(service.submitAnswers(38, dto)).resolves.toMatchObject({
      submissionId,
      status: 'SUBMITTED',
      submittedAt: now,
      skippedAt: null,
    });
    expect(transactionMock).not.toHaveBeenCalled();
  });

  it('같은 submissionId를 다른 payload로 재사용하면 409를 반환한다', async () => {
    rootFindUniqueMock.mockResolvedValue({
      submissionId,
      visitorId,
      tourDestinationId: 38,
      languageCode: 'ko',
      status: 'SKIPPED',
      submittedAt: null,
      skippedAt: now,
      visitorOnboardingBasicSurveyAnswers: [],
    });

    await expect(service.submitAnswers(38, submittedDto())).rejects.toMatchObject({
      code: 'CONFLICT',
    });
  });

  it('동시 unique 충돌 뒤 생성된 동일 제출을 재조회해 반환한다', async () => {
    rootFindUniqueMock.mockResolvedValueOnce(null).mockResolvedValueOnce({
      submissionId,
      visitorId,
      tourDestinationId: 38,
      languageCode: 'ko',
      status: 'SKIPPED',
      submittedAt: null,
      skippedAt: now,
      visitorOnboardingBasicSurveyAnswers: [],
    });
    transactionMock.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: '7.9.1',
      }),
    );

    await expect(
      service.skip(38, { submissionId, visitorId, languageCode: 'ko' }),
    ).resolves.toMatchObject({ submissionId, status: 'SKIPPED' });
    expect(rootFindUniqueMock).toHaveBeenCalledTimes(2);
  });

  it('트랜잭션 내부 오류를 숨기지 않고 전파한다', async () => {
    const transactionError = new Error('transaction failed');
    surveyStatusUpsertMock.mockRejectedValue(transactionError);

    await expect(service.submitAnswers(38, submittedDto())).rejects.toBe(transactionError);
  });

  it('도메인 오류는 AppException의 명시적인 HTTP 상태를 사용한다', async () => {
    destinationFindFirstMock.mockResolvedValue({
      id: 38,
      onboardingBasicSurveyQuestions: [],
    });

    try {
      await service.submitAnswers(38, submittedDto());
      throw new Error('expected rejection');
    } catch (error) {
      expect(error).toBeInstanceOf(AppException);
      if (!(error instanceof AppException)) throw error;
      expect(error.getStatus()).toBe(HttpStatus.CONFLICT);
    }
  });
});
