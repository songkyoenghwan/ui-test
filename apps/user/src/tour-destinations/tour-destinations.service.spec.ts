import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';
import { DEFAULT_ENTRY_THUMBNAIL_URL } from './constants/tour-destination.constant';
import { TourDestinationsService } from './tour-destinations.service';

describe('TourDestinationsService', () => {
  const now = new Date('2026-08-18T03:00:00.000Z');
  let service: TourDestinationsService;
  let findManyMock: jest.Mock;
  let findFirstMock: jest.Mock;
  let countMock: jest.Mock;
  let transactionMock: jest.Mock;
  let getOrThrowMock: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(now);

    findManyMock = jest.fn();
    findFirstMock = jest.fn();
    countMock = jest.fn();
    getOrThrowMock = jest.fn().mockReturnValue('https://cdn.example.com/base/');
    transactionMock = jest
      .fn()
      .mockImplementation((operations: Promise<unknown>[]) => Promise.all(operations));
    const prismaMock = {
      tourDestination: {
        findMany: findManyMock,
        findFirst: findFirstMock,
        count: countMock,
      },
      $transaction: transactionMock,
    };
    const configServiceMock = { getOrThrow: getOrThrowMock };

    service = new TourDestinationsService(
      prismaMock as unknown as PrismaService,
      configServiceMock as unknown as ConfigService,
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('공개·미삭제·운영 중 관광지를 정렬값과 id 순으로 페이징 조회한다', async () => {
    findManyMock.mockResolvedValue([
      {
        id: 2,
        name: { ko: '해운대시장', en: 'Haeundae Market' },
        fileUrl: 'https://cdn.example.com/tour-destinations/haeundae.png',
        supportedLanguages: { ko: true, en: true, ja: false },
        onboardings: [{ id: 10 }],
        onboardingBasicSurveyQuestions: [{ id: 20 }],
      },
      {
        id: 4,
        name: { ko: '망원시장', en: '' },
        fileUrl: null,
        supportedLanguages: { ko: true },
        onboardings: [],
        onboardingBasicSurveyQuestions: [],
      },
    ]);
    countMock.mockResolvedValue(12);

    const result = await service.findEntryDestinations({
      page: 2,
      pageSize: 2,
      language: 'en',
    });

    const expectedWhere = {
      isVisible: true,
      isDeleted: false,
      OR: [
        { isAlways: true },
        {
          startAt: { lte: now },
          endAt: { gte: now },
        },
      ],
    };

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expectedWhere,
        orderBy: [{ sortingNumber: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }],
        skip: 2,
        take: 2,
      }),
    );
    expect(countMock).toHaveBeenCalledWith({ where: expectedWhere });
    expect(transactionMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      items: [
        {
          id: 2,
          name: 'Haeundae Market',
          thumbnailUrl: 'https://cdn.example.com/tour-destinations/haeundae.png',
          hasOnboarding: true,
          hasBasicSurvey: true,
          supportedLanguages: ['ko', 'en'],
        },
        {
          id: 4,
          name: '망원시장',
          thumbnailUrl: DEFAULT_ENTRY_THUMBNAIL_URL,
          hasOnboarding: false,
          hasBasicSurvey: false,
          supportedLanguages: ['ko'],
        },
      ],
      totalCount: 12,
      page: 2,
      pageSize: 2,
      totalPages: 6,
    });
  });

  it('DEPLOYING 온보딩과 활성 선택지가 있는 배포 중 설문만 조회한다', async () => {
    findManyMock.mockResolvedValue([]);
    countMock.mockResolvedValue(0);

    await service.findEntryDestinations({
      page: 1,
      pageSize: 10,
      language: 'ko',
    });

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        select: {
          id: true,
          name: true,
          fileUrl: true,
          supportedLanguages: true,
          onboardings: {
            where: {
              isVisible: true,
              isDeleted: false,
              deploymentStatus: 'DEPLOYING',
            },
            select: { id: true },
            take: 1,
          },
          onboardingBasicSurveyQuestions: {
            where: {
              isVisible: true,
              isDeleted: false,
              deploymentStatus: 'DEPLOYING',
              questionType: { in: ['SINGLE', 'MULTI'] },
              deployedAt: { lte: now },
              OR: [{ deploymentEndedAt: null }, { deploymentEndedAt: { gte: now } }],
              onboardingBasicSurveyOptions: {
                some: {
                  isVisible: true,
                  isDeleted: false,
                  isActive: true,
                },
              },
            },
            select: { id: true },
            take: 1,
          },
        },
      }),
    );
  });

  it('요청 언어, 한국어, 첫 번째 번역 순으로 이름을 fallback한다', async () => {
    findManyMock.mockResolvedValue([
      {
        id: 1,
        name: { en: 'English Name', ko: '한국어 이름' },
        fileUrl: null,
        supportedLanguages: {},
        onboardings: [],
        onboardingBasicSurveyQuestions: [],
      },
      {
        id: 2,
        name: { en: 'Only English', ko: '' },
        fileUrl: null,
        supportedLanguages: { vi: true, ko: true, zh: true, en: false },
        onboardings: [],
        onboardingBasicSurveyQuestions: [],
      },
      {
        id: 3,
        name: ['잘못된 형식'],
        fileUrl: null,
        supportedLanguages: null,
        onboardings: [],
        onboardingBasicSurveyQuestions: [],
      },
    ]);
    countMock.mockResolvedValue(3);

    const result = await service.findEntryDestinations({
      page: 1,
      pageSize: 10,
      language: 'zh',
    });

    expect(result.items.map(({ name }) => name)).toEqual(['한국어 이름', 'Only English', '']);
    expect(result.items[1].supportedLanguages).toEqual(['ko', 'zh', 'vi']);
    expect(
      result.items.every(({ thumbnailUrl }) => thumbnailUrl === DEFAULT_ENTRY_THUMBNAIL_URL),
    ).toBe(true);
  });

  it('결과가 없으면 0건의 빈 페이지를 반환한다', async () => {
    findManyMock.mockResolvedValue([]);
    countMock.mockResolvedValue(0);

    await expect(
      service.findEntryDestinations({
        page: 1,
        pageSize: 10,
        language: 'ko',
      }),
    ).resolves.toEqual({
      items: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      totalPages: 0,
    });
  });

  it('배포 중 온보딩과 설문을 조회하고 한국어 이미지의 최신 유효 파일을 반환한다', async () => {
    findFirstMock.mockResolvedValue({
      id: 30,
      onboardings: [
        {
          id: 10,
          title: { ko: '한국어 제목', en: 'English title' },
          description: { ko: '한국어 설명', en: 'English description' },
          onboardingFiles: [
            { id: 9, fileType: 'MAIN', fileUrl: '   ' },
            { id: 8, fileType: 'MAIN', fileUrl: ' /uploads/main-new.png ' },
            { id: 7, fileType: 'MAIN', fileUrl: 'images/main-old.png' },
            {
              id: 6,
              fileType: 'MAIN_GLOBAL',
              fileUrl: 'https://global.example.com/main.png',
            },
            { id: 5, fileType: 'THUMBNAIL', fileUrl: 'images/sub.png' },
          ],
        },
      ],
      onboardingBasicSurveyQuestions: [{ id: 20 }],
    });

    const result = await service.findOnboardings(30, { language: 'ko' });

    expect(findFirstMock).toHaveBeenCalledWith({
      where: {
        id: 30,
        isVisible: true,
        isDeleted: false,
        OR: [
          { isAlways: true },
          {
            startAt: { lte: now },
            endAt: { gte: now },
          },
        ],
      },
      select: {
        id: true,
        onboardings: {
          where: {
            isVisible: true,
            isDeleted: false,
            deploymentStatus: 'DEPLOYING',
          },
          orderBy: [{ sortingNumber: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }],
          take: 10,
          select: {
            id: true,
            title: true,
            description: true,
            onboardingFiles: {
              where: {
                isVisible: true,
                isDeleted: false,
              },
              orderBy: { id: 'desc' },
              select: {
                id: true,
                fileType: true,
                fileUrl: true,
              },
            },
          },
        },
        onboardingBasicSurveyQuestions: {
          where: {
            isVisible: true,
            isDeleted: false,
            deploymentStatus: 'DEPLOYING',
            questionType: { in: ['SINGLE', 'MULTI'] },
            deployedAt: { lte: now },
            OR: [{ deploymentEndedAt: null }, { deploymentEndedAt: { gte: now } }],
            onboardingBasicSurveyOptions: {
              some: {
                isVisible: true,
                isDeleted: false,
                isActive: true,
              },
            },
          },
          select: { id: true },
          take: 1,
        },
      },
    });
    expect(result).toEqual({
      destinationId: 30,
      hasBasicSurvey: true,
      items: [
        {
          id: 10,
          title: '한국어 제목',
          description: '한국어 설명',
          mainImageUrl: 'https://cdn.example.com/base/uploads/main-new.png',
          subImageUrl: 'https://cdn.example.com/base/images/sub.png',
        },
      ],
    });
  });

  it('비한국어 요청에는 GLOBAL 이미지를 우선하고 없으면 기본 이미지로 fallback한다', async () => {
    findFirstMock.mockResolvedValue({
      id: 30,
      onboardings: [
        {
          id: 11,
          title: { ko: '한국어 제목', en: '' },
          description: { ko: '한국어 설명', en: 'English description' },
          onboardingFiles: [
            {
              id: 4,
              fileType: 'MAIN_GLOBAL',
              fileUrl: 'https://global.example.com/main.png',
            },
            { id: 3, fileType: 'MAIN', fileUrl: '/uploads/main.png' },
            { id: 2, fileType: 'THUMBNAIL', fileUrl: 'sub.png' },
          ],
        },
        {
          id: 12,
          title: null,
          description: ['잘못된 형식'],
          onboardingFiles: [{ id: 1, fileType: 'MAIN_GLOBAL', fileUrl: '' }],
        },
      ],
      onboardingBasicSurveyQuestions: [],
    });

    await expect(service.findOnboardings(30, { language: 'en' })).resolves.toEqual({
      destinationId: 30,
      hasBasicSurvey: false,
      items: [
        {
          id: 11,
          title: '한국어 제목',
          description: 'English description',
          mainImageUrl: 'https://global.example.com/main.png',
          subImageUrl: 'https://cdn.example.com/base/sub.png',
        },
        {
          id: 12,
          title: '',
          description: '',
          mainImageUrl: null,
          subImageUrl: null,
        },
      ],
    });
  });

  it('배포 중 온보딩과 기초 설문이 없으면 빈 결과를 반환한다', async () => {
    findFirstMock.mockResolvedValue({
      id: 30,
      onboardings: [],
      onboardingBasicSurveyQuestions: [],
    });

    await expect(service.findOnboardings(30, { language: 'ko' })).resolves.toEqual({
      destinationId: 30,
      hasBasicSurvey: false,
      items: [],
    });
  });

  it('조회 가능한 대상지가 없으면 NOT_FOUND 오류를 던진다', async () => {
    findFirstMock.mockResolvedValue(null);

    await expect(service.findOnboardings(999, { language: 'ko' })).rejects.toMatchObject({
      status: 404,
      code: 'NOT_FOUND',
      message: '대상지를 찾을 수 없습니다.',
    });
  });

  it('배포 중 기초 설문을 정렬·제한 조건으로 조회하고 질문별 설정을 반환한다', async () => {
    findFirstMock.mockResolvedValue({
      id: 38,
      onboardingBasicSurveyQuestions: [
        {
          id: 36,
          title: { ko: '거주지', en: 'Residence' },
          questionType: 'SINGLE',
          isAiRecommendationEnabled: false,
          onboardingBasicSurveyOptions: [
            { id: 166, optionItem: { ko: '현지에 살아요', en: 'Local resident' } },
          ],
        },
        {
          id: 46,
          title: { ko: '관심 항목', en: '' },
          questionType: 'MULTI',
          isAiRecommendationEnabled: true,
          onboardingBasicSurveyOptions: [
            { id: 192, optionItem: { ko: '맛집', en: '' } },
            { id: 193, optionItem: { ko: '', en: 'Shopping' } },
          ],
        },
      ],
    });

    const result = await service.findBasicSurvey(38, { language: 'en' });

    expect(findFirstMock).toHaveBeenCalledWith({
      where: {
        id: 38,
        isVisible: true,
        isDeleted: false,
        OR: [
          { isAlways: true },
          {
            startAt: { lte: now },
            endAt: { gte: now },
          },
        ],
      },
      select: {
        id: true,
        onboardingBasicSurveyQuestions: {
          where: {
            isVisible: true,
            isDeleted: false,
            deploymentStatus: 'DEPLOYING',
            questionType: { in: ['SINGLE', 'MULTI'] },
            deployedAt: { lte: now },
            OR: [{ deploymentEndedAt: null }, { deploymentEndedAt: { gte: now } }],
            onboardingBasicSurveyOptions: {
              some: {
                isVisible: true,
                isDeleted: false,
                isActive: true,
              },
            },
          },
          orderBy: [{ sortingNumber: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }],
          take: 10,
          select: {
            id: true,
            title: true,
            questionType: true,
            isAiRecommendationEnabled: true,
            onboardingBasicSurveyOptions: {
              where: {
                isVisible: true,
                isDeleted: false,
                isActive: true,
              },
              orderBy: [{ sortingNumber: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }],
              take: 8,
              select: {
                id: true,
                optionItem: true,
              },
            },
          },
        },
      },
    });
    expect(result).toEqual({
      destinationId: 38,
      questionCount: 2,
      questions: [
        {
          id: 36,
          questionType: 'SINGLE',
          aiRecommendationEnabled: false,
          title: 'Residence',
          options: [{ id: 166, label: 'Local resident' }],
        },
        {
          id: 46,
          questionType: 'MULTI',
          aiRecommendationEnabled: true,
          title: '관심 항목',
          options: [
            { id: 192, label: '맛집' },
            { id: 193, label: 'Shopping' },
          ],
        },
      ],
    });
  });

  it('설문 문구가 비어 있으면 빈 문자열과 false를 반환하고 한 번만 경고한다', async () => {
    const warnSpy = jest.spyOn(service['logger'], 'warn').mockImplementation();
    findFirstMock.mockResolvedValue({
      id: 38,
      onboardingBasicSurveyQuestions: [
        {
          id: 47,
          title: null,
          questionType: 'SINGLE',
          isAiRecommendationEnabled: null,
          onboardingBasicSurveyOptions: [{ id: 194, optionItem: { ko: '', en: '' } }],
        },
        {
          id: 48,
          title: { ko: '제외 질문' },
          questionType: null,
          isAiRecommendationEnabled: true,
          onboardingBasicSurveyOptions: [{ id: 195, optionItem: { ko: '선택지' } }],
        },
      ],
    });

    await expect(service.findBasicSurvey(38, { language: 'ko' })).resolves.toEqual({
      destinationId: 38,
      questionCount: 1,
      questions: [
        {
          id: 47,
          questionType: 'SINGLE',
          aiRecommendationEnabled: false,
          title: '',
          options: [{ id: 194, label: '' }],
        },
      ],
    });
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('question:47:title'));
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('option:194:label'));
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('question:48:questionType'));
  });

  it('배포 중 기초 설문이 없으면 빈 질문 목록을 반환한다', async () => {
    findFirstMock.mockResolvedValue({
      id: 38,
      onboardingBasicSurveyQuestions: [],
    });

    await expect(service.findBasicSurvey(38, { language: 'ko' })).resolves.toEqual({
      destinationId: 38,
      questionCount: 0,
      questions: [],
    });
  });

  it('기초 설문 조회 대상지가 없으면 NOT_FOUND 오류를 던진다', async () => {
    findFirstMock.mockResolvedValue(null);

    await expect(service.findBasicSurvey(999, { language: 'ko' })).rejects.toMatchObject({
      status: 404,
      code: 'NOT_FOUND',
      message: '대상지를 찾을 수 없습니다.',
    });
  });

  it('공개·활성 대상지 메타를 조회한다', async () => {
    findFirstMock.mockResolvedValue({
      id: 1,
      name: { ko: '해운대시장', en: 'Haeundae Market' },
      latitude: 35.1587,
      longitude: 129.1604,
      colorCode: '#274FA8',
      startAt: null,
      endAt: null,
      isAlways: true,
      homepageUrl: 'https://example.com',
      mapUrl: null,
      fileUrl: 'https://cdn.example.com/tour-destinations/haeundae.png',
      supportedLanguages: { ko: true, en: true, ja: false },
      isAiRecommendYn: true,
      isFacilityCongestionYn: true,
      isSectionCongestionYn: false,
      isFacilityAddressYn: false,
      isCustomSortingYn: true,
      isVpsContentsYn: false,
    });

    await expect(service.findOne(1, { language: 'en' })).resolves.toEqual({
      id: 1,
      name: 'Haeundae Market',
      latitude: 35.1587,
      longitude: 129.1604,
      colorCode: '#274FA8',
      startAt: null,
      endAt: null,
      isAlways: true,
      homepageUrl: 'https://example.com',
      mapUrl: null,
      fileUrl: 'https://cdn.example.com/tour-destinations/haeundae.png',
      supportedLanguages: ['ko', 'en'],
      isAiRecommendYn: true,
      isFacilityCongestionYn: true,
      isSectionCongestionYn: false,
      isFacilityAddressYn: false,
      isCustomSortingYn: true,
      isVpsContentsYn: false,
    });

    expect(findFirstMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: 1,
          isVisible: true,
          isDeleted: false,
          OR: [
            { isAlways: true },
            {
              startAt: { lte: now },
              endAt: { gte: now },
            },
          ],
        },
      }),
    );
  });

  it('상세 조회 대상지가 없으면 NOT_FOUND를 던진다', async () => {
    findFirstMock.mockResolvedValue(null);

    await expect(service.findOne(999, { language: 'ko' })).rejects.toMatchObject({
      status: 404,
      code: 'NOT_FOUND',
      message: '대상지를 찾을 수 없습니다.',
    });
  });
});
