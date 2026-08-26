import { Test, TestingModule } from '@nestjs/testing';
import { BasicSurveySkipDto } from './dto/basic-survey-skip.dto';
import { BasicSurveySubmitDto } from './dto/basic-survey-submit.dto';
import { TourDestinationEntryQueryDto } from './dto/tour-destination-entry-query.dto';
import { TourDestinationOnboardingParamsDto } from './dto/tour-destination-onboarding-params.dto';
import { TourDestinationOnboardingQueryDto } from './dto/tour-destination-onboarding-query.dto';
import { TourDestinationBasicSurveySubmissionService } from './tour-destination-basic-survey-submission.service';
import { TourDestinationsController } from './tour-destinations.controller';
import { TourDestinationsService } from './tour-destinations.service';

describe('TourDestinationsController', () => {
  let controller: TourDestinationsController;
  let findBasicSurveyMock: jest.Mock;
  let findEntryDestinationsMock: jest.Mock;
  let findOneMock: jest.Mock;
  let findOnboardingsMock: jest.Mock;
  let skipBasicSurveyMock: jest.Mock;
  let submitBasicSurveyAnswersMock: jest.Mock;

  beforeEach(async () => {
    findBasicSurveyMock = jest.fn();
    findEntryDestinationsMock = jest.fn();
    findOneMock = jest.fn();
    findOnboardingsMock = jest.fn();
    skipBasicSurveyMock = jest.fn();
    submitBasicSurveyAnswersMock = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourDestinationsController],
      providers: [
        {
          provide: TourDestinationsService,
          useValue: {
            findBasicSurvey: findBasicSurveyMock,
            findEntryDestinations: findEntryDestinationsMock,
            findOne: findOneMock,
            findOnboardings: findOnboardingsMock,
          },
        },
        {
          provide: TourDestinationBasicSurveySubmissionService,
          useValue: {
            skip: skipBasicSurveyMock,
            submitAnswers: submitBasicSurveyAnswersMock,
          },
        },
      ],
    }).compile();

    controller = module.get<TourDestinationsController>(TourDestinationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('검증된 쿼리를 서비스에 위임한다', async () => {
    const query: TourDestinationEntryQueryDto = {
      page: 1,
      pageSize: 10,
      language: 'ko',
    };
    const response = {
      items: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      totalPages: 0,
    };
    findEntryDestinationsMock.mockResolvedValue(response);

    await expect(controller.findEntryDestinations(query)).resolves.toBe(response);
    expect(findEntryDestinationsMock).toHaveBeenCalledWith(query);
  });

  it('검증된 대상지 ID와 언어를 상세 서비스에 위임한다', async () => {
    const params: TourDestinationOnboardingParamsDto = { destinationId: 1 };
    const query: TourDestinationOnboardingQueryDto = { language: 'ko' };
    const response = {
      id: 1,
      name: '해운대시장',
      latitude: 35.1587,
      longitude: 129.1604,
      colorCode: '#274FA8',
      startAt: null,
      endAt: null,
      isAlways: true,
      homepageUrl: null,
      mapUrl: null,
      fileUrl: null,
      supportedLanguages: ['ko'] as const,
      isAiRecommendYn: true,
      isFacilityCongestionYn: true,
      isSectionCongestionYn: false,
      isFacilityAddressYn: false,
      isCustomSortingYn: true,
      isVpsContentsYn: false,
    };
    findOneMock.mockResolvedValue(response);

    await expect(controller.findOne(params, query)).resolves.toBe(response);
    expect(findOneMock).toHaveBeenCalledWith(1, query);
  });

  it('검증된 대상지 ID와 언어를 온보딩 서비스에 위임한다', async () => {
    const params: TourDestinationOnboardingParamsDto = { destinationId: 30 };
    const query: TourDestinationOnboardingQueryDto = { language: 'en' };
    const response = {
      destinationId: 30,
      hasBasicSurvey: false,
      items: [],
    };
    findOnboardingsMock.mockResolvedValue(response);

    await expect(controller.findOnboardings(params, query)).resolves.toBe(response);
    expect(findOnboardingsMock).toHaveBeenCalledWith(30, query);
  });

  it('검증된 대상지 ID와 언어를 기초 설문 서비스에 위임한다', async () => {
    const params: TourDestinationOnboardingParamsDto = { destinationId: 38 };
    const query: TourDestinationOnboardingQueryDto = { language: 'ko' };
    const response = {
      destinationId: 38,
      questionCount: 0,
      questions: [],
    };
    findBasicSurveyMock.mockResolvedValue(response);

    await expect(controller.findBasicSurvey(params, query)).resolves.toBe(response);
    expect(findBasicSurveyMock).toHaveBeenCalledWith(38, query);
  });

  it('검증된 식별값을 기초 설문 스킵 서비스에 위임한다', async () => {
    const params: TourDestinationOnboardingParamsDto = { destinationId: 38 };
    const body: BasicSurveySkipDto = {
      submissionId: 'e29053d2-c7af-4eba-8765-b23d9d060072',
      visitorId: '7074e8be-1c93-41c0-8e4f-a2569f780cbc',
      languageCode: 'ko',
    };
    const response = {
      ...body,
      destinationId: 38,
      status: 'SKIPPED',
      submittedAt: null,
      skippedAt: new Date(),
    };
    skipBasicSurveyMock.mockResolvedValue(response);

    await expect(controller.skipBasicSurvey(params, body)).resolves.toBe(response);
    expect(skipBasicSurveyMock).toHaveBeenCalledWith(38, body);
  });

  it('검증된 답변을 기초 설문 제출 서비스에 위임한다', async () => {
    const params: TourDestinationOnboardingParamsDto = { destinationId: 38 };
    const body: BasicSurveySubmitDto = {
      submissionId: 'e29053d2-c7af-4eba-8765-b23d9d060072',
      visitorId: '7074e8be-1c93-41c0-8e4f-a2569f780cbc',
      languageCode: 'en',
      answers: [{ questionId: 101, optionIds: [1001] }],
    };
    const response = {
      submissionId: body.submissionId,
      visitorId: body.visitorId,
      destinationId: 38,
      languageCode: body.languageCode,
      status: 'SUBMITTED',
      submittedAt: new Date(),
      skippedAt: null,
    };
    submitBasicSurveyAnswersMock.mockResolvedValue(response);

    await expect(controller.submitBasicSurveyAnswers(params, body)).resolves.toBe(response);
    expect(submitBasicSurveyAnswersMock).toHaveBeenCalledWith(38, body);
  });
});
