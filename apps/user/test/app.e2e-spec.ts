import { Controller, Get, INestApplication, Query } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { RequestHandler } from 'express';
import { AppModule } from '../src/app.module';
import { ApiErrorResponse } from '../src/common/interfaces/api-response.interface';
import { PaginationQueryDto } from '../src/common/pagination/pagination-query.dto';
import { configureApplication } from '../src/config/application';
import { PrismaService } from '../src/database/prisma.service';
import { CongestionStatus } from '../src/generated/prisma/enums';

@Controller('runtime-test')
class RuntimeTestController {
  @Get('pagination')
  pagination(@Query() query: PaginationQueryDto): PaginationQueryDto {
    return query;
  }
}

describe('공통 HTTP 런타임 (e2e)', () => {
  let app: INestApplication<App>;
  let queryRawMock: jest.Mock;
  let poiFindManyMock: jest.Mock;
  let poiFindFirstMock: jest.Mock;
  let poiCountMock: jest.Mock;
  let tourDestinationFindFirstMock: jest.Mock;
  let onboardingSubmissionFindUniqueMock: jest.Mock;
  let onboardingSubmissionCreateMock: jest.Mock;
  let surveyAnswerCreateManyMock: jest.Mock;
  let categoryFindManyMock: jest.Mock;
  let facilityFindManyMock: jest.Mock;

  beforeEach(async () => {
    process.env.NODE_ENV = 'test';
    process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
    process.env.CORS_ALLOWED_ORIGINS = 'http://localhost:3000';
    process.env.AWS_S3_PUBLIC_BASE_URL = 'https://cdn.example.com/base/';

    queryRawMock = jest.fn().mockResolvedValue([{ result: 1 }]);
    poiFindManyMock = jest.fn().mockResolvedValue([]);
    poiFindFirstMock = jest.fn().mockResolvedValue(null);
    poiCountMock = jest.fn().mockResolvedValue(0);
    onboardingSubmissionFindUniqueMock = jest.fn().mockResolvedValue(null);
    onboardingSubmissionCreateMock = jest.fn().mockImplementation(({ data }) =>
      Promise.resolve({
        ...data,
        visitorOnboardingBasicSurveyAnswers: [],
      }),
    );
    surveyAnswerCreateManyMock = jest.fn().mockResolvedValue({ count: 1 });
    categoryFindManyMock = jest.fn().mockResolvedValue([
      {
        id: 1,
        name: null,
        iconKey: null,
        parentId: null,
        sortingNumber: null,
        isEventCategory: null,
        isAiRecommendationEnabled: null,
        categoryColorCodes: {
          id: 1,
          paletteNumber: null,
          sortingNumber: null,
          colorCode: null,
        },
        _count: { facilities: 1 },
      },
    ]);
    facilityFindManyMock = jest.fn().mockResolvedValue([]);
    const tourDestinationFindManyMock = jest.fn().mockResolvedValue([
      {
        id: 1,
        name: { ko: '해운대시장', en: 'Haeundae Market' },
        fileUrl: 'https://cdn.example.com/tour-destinations/haeundae.png',
        supportedLanguages: { ko: true, en: true },
        onboardings: [{ id: 10 }],
        onboardingBasicSurveyQuestions: [{ id: 20 }],
      },
    ]);
    tourDestinationFindFirstMock = jest.fn().mockResolvedValue({
      id: 30,
      onboardings: [
        {
          id: 10,
          title: { ko: '한국어 제목', en: 'English title' },
          description: { ko: '한국어 설명', en: 'English description' },
          onboardingFiles: [
            {
              id: 2,
              fileType: 'MAIN_GLOBAL',
              fileUrl: 'https://global.example.com/main.png',
            },
            { id: 1, fileType: 'THUMBNAIL', fileUrl: '/uploads/sub.png' },
          ],
        },
      ],
      onboardingBasicSurveyQuestions: [
        {
          id: 20,
          title: { ko: '거주지', en: 'Residence' },
          questionType: 'SINGLE',
          isAiRecommendationEnabled: true,
          onboardingBasicSurveyOptions: [
            { id: 201, optionItem: { ko: '현지에 살아요', en: 'Local resident' } },
          ],
        },
      ],
    });
    const tourDestinationCountMock = jest.fn().mockResolvedValue(1);
    const prismaMock = {
      $connect: jest.fn(),
      $disconnect: jest.fn(),
      $runCommandRaw: jest.fn().mockRejectedValue(new Error('Use the mongodb provider')),
      $queryRawUnsafe: queryRawMock,
      poi: {
        findMany: poiFindManyMock,
        findFirst: poiFindFirstMock,
        count: poiCountMock,
      },
      category: {
        findMany: categoryFindManyMock,
      },
      facility: {
        findMany: facilityFindManyMock,
      },
      $transaction: jest.fn(),
      tourDestination: {
        findMany: tourDestinationFindManyMock,
        findFirst: tourDestinationFindFirstMock,
        count: tourDestinationCountMock,
      },
      analyticsVisitor: {
        upsert: jest.fn().mockResolvedValue({ id: 1 }),
      },
      onboardingSurveySubmission: {
        findUnique: onboardingSubmissionFindUniqueMock,
        create: onboardingSubmissionCreateMock,
      },
      visitorOnboardingBasicSurveyAnswer: {
        createMany: surveyAnswerCreateManyMock,
      },
      analyticsVisitorSurveyStatus: {
        upsert: jest.fn().mockResolvedValue({ id: 1 }),
      },
    };
    prismaMock.$transaction.mockImplementation(
      (argument: Promise<unknown>[] | ((transaction: typeof prismaMock) => Promise<unknown>)) =>
        typeof argument === 'function' ? argument(prismaMock) : Promise.all(argument),
    );
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [RuntimeTestController],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    await configureApplication(app as NestExpressApplication, {
      enableSwagger: true,
      apiReferenceFactory: () =>
        ((_, response) => {
          response.type('html').send('<div>@scalar/api-reference</div>');
        }) as RequestHandler,
    });
    await app.init();
  });

  it('성공 응답을 success/data로 감싸고 요청 ID를 전달한다', async () => {
    await request(app.getHttpServer())
      .get('/api/v1')
      .set('x-request-id', 'e2e-request-1')
      .expect(200)
      .expect('x-request-id', 'e2e-request-1')
      .expect({ success: true, data: 'Hello World!' });
  });

  it('잘못된 페이지네이션 값을 공통 오류 계약으로 반환한다', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/runtime-test/pagination?page=0&pageSize=101')
      .expect(400);
    const body = response.body as ApiErrorResponse;

    expect(body).toMatchObject({
      success: false,
      statusCode: 400,
      code: 'VALIDATION_ERROR',
      message: '요청 값이 올바르지 않습니다.',
    });
    expect(Array.isArray(body.details.page)).toBe(true);
    expect(Array.isArray(body.details.pageSize)).toBe(true);
  });

  it('페이지네이션 기본값을 변환해 적용한다', () => {
    return request(app.getHttpServer())
      .get('/api/v1/runtime-test/pagination')
      .expect(200)
      .expect({ success: true, data: { page: 1, pageSize: 10 } });
  });

  it('대상지 ID로 공개된 POI 목록을 마커 형태로 조회한다', async () => {
    poiFindManyMock.mockResolvedValueOnce([
      {
        id: 5,
        name: { ko: '서울광장' },
        latitude: 37.5665,
        longitude: 126.978,
        tourDestinations: {
          isCustomSortingYn: true,
          isFacilityCongestionYn: true,
        },
        facilityPoiMapping: [
          {
            sortingNumber: 1,
            isVisible: true,
            isDeleted: false,
            facilities: {
              id: 11,
              name: { ko: '안내소' },
              isVisible: true,
              isDeleted: false,
              startAt: null,
              endAt: null,
              categoryId: 2,
              categories: {
                id: 2,
                isVisible: true,
                isDeleted: false,
                iconKey: 'info',
                categoryColorCodes: {
                  isVisible: true,
                  isDeleted: false,
                  colorCode: '#111111',
                },
                categoryFile: [{ fileUrl: 'https://cdn.example.com/categories/info.png' }],
              },
              facilityOperatingSchedule: [],
              facilityHolidaySchedule: [],
              congestionSectionFacilitiesCongestionSectionIdTocongestionSection: {
                isVisible: true,
                isDeleted: false,
                overwriteCongestionStatus: CongestionStatus.NORMAL,
                threshold: 100,
                sensorDeviceId: 8,
                congestionSensorDevice: {
                  congestionData: [{ countedPeople: 10 }],
                },
              },
            },
          },
        ],
      },
    ]);

    await request(app.getHttpServer())
      .get('/api/v1/pois?tourDestinationId=3')
      .expect(200)
      .expect({
        success: true,
        data: {
          items: [
            {
              id: 5,
              name: '서울광장',
              latitude: 37.5665,
              longitude: 126.978,
              facilityId: 11,
              facilityName: '안내소',
              categoryId: 2,
              categoryIconKey: 'info',
              categoryIconUrl: 'https://cdn.example.com/categories/info.png',
              categoryColorCode: '#111111',
              congestionStatus: 'NORMAL',
            },
          ],
        },
      });

    const [[listCall]] = poiFindManyMock.mock.calls as unknown as Array<
      [
        {
          where: { tourDestinationId: number; facilityPoiMapping: { some: unknown } };
          take: number;
        },
      ]
    >;
    expect(listCall.where.tourDestinationId).toBe(3);
    expect(listCall.where.facilityPoiMapping.some).toBeDefined();
    expect(listCall.take).toBe(500);
  });

  it('POI 목록 keyword 검색 시 시설 측 매칭 where로 마커를 조회한다', async () => {
    poiFindManyMock.mockResolvedValueOnce([]);

    await request(app.getHttpServer())
      .get('/api/v1/pois?tourDestinationId=3&keyword=%EC%95%88%EB%82%B4&language=ko')
      .expect(200)
      .expect({ success: true, data: { items: [] } });

    const [[callArg]] = poiFindManyMock.mock.calls as unknown as Array<
      [
        {
          where: {
            tourDestinationId: number;
            facilityPoiMapping: { some: { facilities: { is: { AND?: unknown[] } } } };
          };
        },
      ]
    >;
    expect(callArg.where.tourDestinationId).toBe(3);
    expect(callArg.where.facilityPoiMapping.some.facilities.is.AND).toHaveLength(1);
  });

  it('POI ID로 공개된 POI 상세와 매핑 시설을 조회한다', async () => {
    poiFindFirstMock.mockResolvedValueOnce({
      id: 5,
      tourDestinationId: 3,
      name: { ko: '서울광장' },
      latitude: 37.5665,
      longitude: 126.978,
      address: { ko: '서울특별시 중구' },
      addressDetail: null,
      managementCode: 'POI-005',
      tourDestinations: {
        isCustomSortingYn: true,
        isFacilityCongestionYn: false,
        isVpsContentsYn: false,
      },
      facilityPoiMapping: [
        {
          id: 1,
          facilityId: 11,
          sortingNumber: 1,
          facilities: {
            id: 11,
            name: { ko: '안내소' },
            description: null,
            contact: null,
            startAt: null,
            endAt: null,
            congestionSectionId: null,
            categories: {
              id: 2,
              name: { ko: '안내' },
              iconKey: 'info',
              categoryColorCodes: { id: 9, colorCode: '#111111' },
              categories: null,
            },
            facilityFile: [],
            facilityOperatingSchedule: [],
            facilityHolidaySchedule: [],
            facilityButtons: [],
            facilityProductGuideFiles: [],
            facilityProducts: [],
            facilityVpsPopup: [],
            congestionSectionFacilitiesCongestionSectionIdTocongestionSection: null,
          },
        },
      ],
    });

    await request(app.getHttpServer())
      .get('/api/v1/pois/5')
      .expect(200)
      .expect({
        success: true,
        data: {
          id: 5,
          tourDestinationId: 3,
          name: { ko: '서울광장' },
          latitude: 37.5665,
          longitude: 126.978,
          address: { ko: '서울특별시 중구' },
          addressDetail: null,
          managementCode: 'POI-005',
          facilityPoiMappings: [
            {
              id: 1,
              facilityId: 11,
              sortingNumber: 1,
              facility: {
                id: 11,
                name: { ko: '안내소' },
                description: null,
                contact: null,
                startAt: null,
                endAt: null,
                category: {
                  id: 2,
                  name: { ko: '안내' },
                  iconKey: 'info',
                  categoryColorCodes: { id: 9, colorCode: '#111111' },
                  parent: null,
                },
                facilityFiles: [],
                facilityOperatingSchedules: [],
                facilityHolidaySchedules: [],
                facilityButtons: [],
                facilityProductGuideFiles: [],
                facilityProducts: [],
                facilityVpsPopups: [],
                congestionStatus: 'none',
                isUsingCongestion: false,
                hasVpsPopup: false,
              },
            },
          ],
        },
      });

    expect(poiFindFirstMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 5, isDeleted: false, isVisible: true },
      }),
    );
  });

  it('존재하지 않는 POI 상세는 NOT_FOUND로 응답한다', async () => {
    poiFindFirstMock.mockResolvedValueOnce(null);

    await request(app.getHttpServer()).get('/api/v1/pois/999').expect(404).expect({
      success: false,
      statusCode: 404,
      code: 'NOT_FOUND',
      message: 'POI를 찾을 수 없습니다.',
      details: {},
    });
  });

  it('관광지 상세 메타를 공통 응답으로 반환한다', async () => {
    tourDestinationFindFirstMock.mockResolvedValueOnce({
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
      supportedLanguages: { ko: true, en: true },
      isAiRecommendYn: true,
      isFacilityCongestionYn: true,
      isSectionCongestionYn: false,
      isFacilityAddressYn: false,
      isCustomSortingYn: true,
      isVpsContentsYn: false,
    });

    await request(app.getHttpServer())
      .get('/api/v1/tour-destinations/1?language=en')
      .expect(200)
      .expect({
        success: true,
        data: {
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
        },
      });
  });

  it('존재하지 않는 관광지 상세는 NOT_FOUND로 응답한다', async () => {
    tourDestinationFindFirstMock.mockResolvedValueOnce(null);

    await request(app.getHttpServer()).get('/api/v1/tour-destinations/999').expect(404).expect({
      success: false,
      statusCode: 404,
      code: 'NOT_FOUND',
      message: '대상지를 찾을 수 없습니다.',
      details: {},
    });
  });

  it('광집사 진입 관광지 목록을 공통 응답으로 반환한다', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/tour-destinations/entry?page=1&pageSize=10&language=en')
      .expect(200)
      .expect({
        success: true,
        data: {
          items: [
            {
              id: 1,
              name: 'Haeundae Market',
              thumbnailUrl: 'https://cdn.example.com/tour-destinations/haeundae.png',
              hasOnboarding: true,
              hasBasicSurvey: true,
              supportedLanguages: ['ko', 'en'],
            },
          ],
          totalCount: 1,
          page: 1,
          pageSize: 10,
          totalPages: 1,
        },
      });
  });

  it('대상지 ID로 공개된 카테고리 목록을 조회한다', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/categories?tourDestinationId=3')
      .expect(200)
      .expect({
        success: true,
        data: [
          {
            id: 1,
            name: null,
            iconKey: null,
            parentId: null,
            sortingNumber: null,
            isEventCategory: null,
            isAiRecommendationEnabled: null,
            categoryColorCodes: {
              id: 1,
              paletteNumber: null,
              sortingNumber: null,
              colorCode: null,
            },
            _count: { facilities: 1 },
          },
        ],
      });

    expect(categoryFindManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          tourDestinationId: 3,
          isVisible: true,
          isDeleted: false,
          parentId: null,
          facilities: {
            some: {
              isVisible: true,
              isDeleted: false,
            },
          },
        },
      }),
    );
  });

  it('대상지 ID가 없거나 올바르지 않으면 POI 조회를 거부한다', async () => {
    await request(app.getHttpServer()).get('/api/v1/pois').expect(400);
    await request(app.getHttpServer()).get('/api/v1/pois?tourDestinationId=0').expect(400);

    expect(poiFindManyMock).not.toHaveBeenCalled();
  });

  it('인기 시설 검색을 공통 응답으로 반환한다', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/search/popularity?tourDestinationId=37&language=ko')
      .expect(200)
      .expect({ success: true, data: { items: [], pois: [] } });

    expect(facilityFindManyMock).toHaveBeenCalledTimes(1);
  });

  it('AI 추천 시설 검색을 공통 응답으로 반환한다', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/search/ai-recommendations?tourDestinationId=37&language=ko')
      .expect(200)
      .expect({ success: true, data: { items: [], pois: [] } });

    expect(facilityFindManyMock).toHaveBeenCalledTimes(1);
  });

  it('인기 시설 검색의 잘못된 대상지와 언어를 거부한다', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/search/popularity?tourDestinationId=0&language=fr')
      .expect(400);

    expect(facilityFindManyMock).not.toHaveBeenCalled();
  });

  it('대상지 POI 마커를 공통 응답으로 반환한다', async () => {
    poiFindManyMock.mockResolvedValueOnce([
      {
        id: 12,
        name: { ko: '해운대시장 입구' },
        latitude: 35.158,
        longitude: 129.16,
        tourDestinations: {
          isCustomSortingYn: true,
          isFacilityCongestionYn: true,
        },
        facilityPoiMapping: [
          {
            sortingNumber: 1,
            isVisible: true,
            isDeleted: false,
            facilities: {
              id: 45,
              name: { ko: '해운대 횟집' },
              isVisible: true,
              isDeleted: false,
              startAt: null,
              endAt: null,
              categoryId: 3,
              categories: {
                id: 3,
                isVisible: true,
                isDeleted: false,
                iconKey: 'food',
                categoryColorCodes: {
                  isVisible: true,
                  isDeleted: false,
                  colorCode: '#FF8A00',
                },
                categoryFile: [{ fileUrl: 'https://cdn.example.com/categories/food.png' }],
              },
              facilityOperatingSchedule: [],
              facilityHolidaySchedule: [],
              congestionSectionFacilitiesCongestionSectionIdTocongestionSection: {
                isVisible: true,
                isDeleted: false,
                overwriteCongestionStatus: CongestionStatus.CROWDED,
                threshold: 100,
                sensorDeviceId: 8,
                congestionSensorDevice: {
                  congestionData: [{ countedPeople: 10 }],
                },
              },
            },
          },
        ],
      },
    ]);

    await request(app.getHttpServer())
      .get('/api/v1/pois?tourDestinationId=1')
      .expect(200)
      .expect({
        success: true,
        data: {
          items: [
            {
              id: 12,
              name: '해운대시장 입구',
              latitude: 35.158,
              longitude: 129.16,
              facilityId: 45,
              facilityName: '해운대 횟집',
              categoryId: 3,
              categoryIconKey: 'food',
              categoryIconUrl: 'https://cdn.example.com/categories/food.png',
              categoryColorCode: '#FF8A00',
              congestionStatus: 'CROWDED',
            },
          ],
        },
      });
  });

  it('대상지 ID가 없거나 올바르지 않으면 카테고리 조회를 거부한다', async () => {
    await request(app.getHttpServer()).get('/api/v1/categories').expect(400);
    await request(app.getHttpServer()).get('/api/v1/categories?tourDestinationId=0').expect(400);

    expect(categoryFindManyMock).not.toHaveBeenCalled();
  });

  it('광집사 진입 API의 잘못된 페이지네이션과 언어를 400으로 반환한다', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/tour-destinations/entry?page=0&language=fr')
      .expect(400);
    const body = response.body as ApiErrorResponse;

    expect(body).toMatchObject({
      success: false,
      statusCode: 400,
      code: 'VALIDATION_ERROR',
    });
    expect(Array.isArray(body.details.page)).toBe(true);
    expect(Array.isArray(body.details.language)).toBe(true);
  });

  it('관광지 온보딩 목록을 공통 응답으로 반환한다', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/tour-destinations/30/onboardings?language=en')
      .expect(200)
      .expect({
        success: true,
        data: {
          destinationId: 30,
          hasBasicSurvey: true,
          items: [
            {
              id: 10,
              title: 'English title',
              description: 'English description',
              mainImageUrl: 'https://global.example.com/main.png',
              subImageUrl: 'https://cdn.example.com/base/uploads/sub.png',
            },
          ],
        },
      });
  });

  it('온보딩 API의 잘못된 대상지 ID와 언어를 각각 400으로 반환한다', async () => {
    const invalidIdResponse = await request(app.getHttpServer())
      .get('/api/v1/tour-destinations/0/onboardings?language=ko')
      .expect(400);
    const invalidIdBody = invalidIdResponse.body as ApiErrorResponse;

    expect(invalidIdBody).toMatchObject({
      success: false,
      statusCode: 400,
      code: 'VALIDATION_ERROR',
    });
    expect(Array.isArray(invalidIdBody.details.destinationId)).toBe(true);

    const invalidLanguageResponse = await request(app.getHttpServer())
      .get('/api/v1/tour-destinations/30/onboardings?language=fr')
      .expect(400);
    const invalidLanguageBody = invalidLanguageResponse.body as ApiErrorResponse;

    expect(invalidLanguageBody).toMatchObject({
      success: false,
      statusCode: 400,
      code: 'VALIDATION_ERROR',
    });
    expect(Array.isArray(invalidLanguageBody.details.language)).toBe(true);
  });

  it('조회 가능한 대상지가 없으면 온보딩 API에서 404를 반환한다', async () => {
    tourDestinationFindFirstMock.mockResolvedValueOnce(null);

    await request(app.getHttpServer())
      .get('/api/v1/tour-destinations/999/onboardings')
      .expect(404)
      .expect({
        success: false,
        statusCode: 404,
        code: 'NOT_FOUND',
        message: '대상지를 찾을 수 없습니다.',
        details: {},
      });
  });

  it('배포 중 온보딩이 없으면 빈 목록을 반환한다', async () => {
    tourDestinationFindFirstMock.mockResolvedValueOnce({
      id: 30,
      onboardings: [],
      onboardingBasicSurveyQuestions: [],
    });

    await request(app.getHttpServer())
      .get('/api/v1/tour-destinations/30/onboardings')
      .expect(200)
      .expect({
        success: true,
        data: {
          destinationId: 30,
          hasBasicSurvey: false,
          items: [],
        },
      });
  });

  it('관광지 기초 설문을 공통 응답으로 반환한다', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/tour-destinations/30/onboarding/basic-survey?language=en')
      .expect(200)
      .expect({
        success: true,
        data: {
          destinationId: 30,
          questionCount: 1,
          questions: [
            {
              id: 20,
              questionType: 'SINGLE',
              aiRecommendationEnabled: true,
              title: 'Residence',
              options: [{ id: 201, label: 'Local resident' }],
            },
          ],
        },
      });
  });

  it('기초 설문 API의 잘못된 대상지 ID와 언어를 각각 400으로 반환한다', async () => {
    const invalidIdResponse = await request(app.getHttpServer())
      .get('/api/v1/tour-destinations/0/onboarding/basic-survey?language=ko')
      .expect(400);
    const invalidIdBody = invalidIdResponse.body as ApiErrorResponse;

    expect(invalidIdBody).toMatchObject({
      success: false,
      statusCode: 400,
      code: 'VALIDATION_ERROR',
    });
    expect(Array.isArray(invalidIdBody.details.destinationId)).toBe(true);

    const invalidLanguageResponse = await request(app.getHttpServer())
      .get('/api/v1/tour-destinations/30/onboarding/basic-survey?language=fr')
      .expect(400);
    const invalidLanguageBody = invalidLanguageResponse.body as ApiErrorResponse;

    expect(invalidLanguageBody).toMatchObject({
      success: false,
      statusCode: 400,
      code: 'VALIDATION_ERROR',
    });
    expect(Array.isArray(invalidLanguageBody.details.language)).toBe(true);
  });

  it('조회 가능한 대상지가 없으면 기초 설문 API에서 404를 반환한다', async () => {
    tourDestinationFindFirstMock.mockResolvedValueOnce(null);

    await request(app.getHttpServer())
      .get('/api/v1/tour-destinations/999/onboarding/basic-survey')
      .expect(404)
      .expect({
        success: false,
        statusCode: 404,
        code: 'NOT_FOUND',
        message: '대상지를 찾을 수 없습니다.',
        details: {},
      });
  });

  it('배포 중 기초 설문이 없으면 빈 질문 목록을 반환한다', async () => {
    tourDestinationFindFirstMock.mockResolvedValueOnce({
      id: 30,
      onboardingBasicSurveyQuestions: [],
    });

    await request(app.getHttpServer())
      .get('/api/v1/tour-destinations/30/onboarding/basic-survey')
      .expect(200)
      .expect({
        success: true,
        data: {
          destinationId: 30,
          questionCount: 0,
          questions: [],
        },
      });
  });

  it('기초 설문 스킵을 200 공통 응답으로 저장한다', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/tour-destinations/30/onboarding/basic-survey/skip')
      .send({
        submissionId: 'e29053d2-c7af-4eba-8765-b23d9d060072',
        visitorId: '7074e8be-1c93-41c0-8e4f-a2569f780cbc',
        languageCode: 'ko',
      })
      .expect(200)
      .expect((response) => {
        const body = response.body as { data: { skippedAt: unknown } };
        expect(body).toMatchObject({
          success: true,
          data: {
            submissionId: 'e29053d2-c7af-4eba-8765-b23d9d060072',
            visitorId: '7074e8be-1c93-41c0-8e4f-a2569f780cbc',
            destinationId: 30,
            languageCode: 'ko',
            status: 'SKIPPED',
            submittedAt: null,
          },
        });
        expect(body.data.skippedAt).toEqual(expect.any(String));
      });

    expect(surveyAnswerCreateManyMock).not.toHaveBeenCalled();
  });

  it('기초 설문 답변을 200 공통 응답으로 저장한다', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/tour-destinations/30/onboarding/basic-survey/answers')
      .send({
        submissionId: 'e29053d2-c7af-4eba-8765-b23d9d060072',
        visitorId: '7074e8be-1c93-41c0-8e4f-a2569f780cbc',
        languageCode: 'en',
        answers: [{ questionId: 20, optionIds: [201] }],
      })
      .expect(200)
      .expect((response) => {
        const body = response.body as { data: { submittedAt: unknown } };
        expect(body).toMatchObject({
          success: true,
          data: {
            submissionId: 'e29053d2-c7af-4eba-8765-b23d9d060072',
            visitorId: '7074e8be-1c93-41c0-8e4f-a2569f780cbc',
            destinationId: 30,
            languageCode: 'en',
            status: 'SUBMITTED',
            skippedAt: null,
          },
        });
        expect(body.data.submittedAt).toEqual(expect.any(String));
      });

    expect(surveyAnswerCreateManyMock).toHaveBeenCalledWith({
      data: [
        expect.objectContaining({
          onboardingBasicSurveyQuestionId: 20,
          onboardingBasicSurveyOptionId: 201,
          questionSnapshot: { ko: '거주지', en: 'Residence' },
          optionSnapshot: { ko: '현지에 살아요', en: 'Local resident' },
        }),
      ],
    });
  });

  it('스킵·제출 DTO의 UUID, 언어, 답변 배열 오류를 400으로 반환한다', async () => {
    const skipResponse = await request(app.getHttpServer())
      .post('/api/v1/tour-destinations/30/onboarding/basic-survey/skip')
      .send({
        submissionId: 'not-a-uuid',
        visitorId: 'not-a-uuid',
        languageCode: 'fr',
      })
      .expect(400);
    expect(skipResponse.body).toMatchObject({
      success: false,
      statusCode: 400,
      code: 'VALIDATION_ERROR',
    });

    const answersResponse = await request(app.getHttpServer())
      .post('/api/v1/tour-destinations/30/onboarding/basic-survey/answers')
      .send({
        submissionId: 'e29053d2-c7af-4eba-8765-b23d9d060072',
        visitorId: '7074e8be-1c93-41c0-8e4f-a2569f780cbc',
        languageCode: 'ko',
        answers: [],
      })
      .expect(400);
    expect(answersResponse.body).toMatchObject({
      success: false,
      statusCode: 400,
      code: 'VALIDATION_ERROR',
    });
  });

  it('질문 유형의 답변 개수 규칙 위반을 400 BAD_REQUEST로 반환한다', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/tour-destinations/30/onboarding/basic-survey/answers')
      .send({
        submissionId: 'e29053d2-c7af-4eba-8765-b23d9d060072',
        visitorId: '7074e8be-1c93-41c0-8e4f-a2569f780cbc',
        languageCode: 'ko',
        answers: [{ questionId: 20, optionIds: [201, 202] }],
      })
      .expect(400);

    expect(response.body).toMatchObject({
      success: false,
      statusCode: 400,
      code: 'BAD_REQUEST',
    });
  });

  it('제출 대상지가 유효하지 않으면 404를 반환한다', async () => {
    tourDestinationFindFirstMock.mockResolvedValueOnce(null);

    await request(app.getHttpServer())
      .post('/api/v1/tour-destinations/999/onboarding/basic-survey/skip')
      .send({
        submissionId: 'e29053d2-c7af-4eba-8765-b23d9d060072',
        visitorId: '7074e8be-1c93-41c0-8e4f-a2569f780cbc',
        languageCode: 'ko',
      })
      .expect(404)
      .expect({
        success: false,
        statusCode: 404,
        code: 'NOT_FOUND',
        message: '대상지를 찾을 수 없습니다.',
        details: {},
      });
  });

  it('활성 설문이 없으면 스킵·제출을 409로 거부한다', async () => {
    tourDestinationFindFirstMock.mockResolvedValueOnce({
      id: 30,
      onboardingBasicSurveyQuestions: [],
    });

    await request(app.getHttpServer())
      .post('/api/v1/tour-destinations/30/onboarding/basic-survey/skip')
      .send({
        submissionId: 'e29053d2-c7af-4eba-8765-b23d9d060072',
        visitorId: '7074e8be-1c93-41c0-8e4f-a2569f780cbc',
        languageCode: 'ko',
      })
      .expect(409)
      .expect({
        success: false,
        statusCode: 409,
        code: 'CONFLICT',
        message: '현재 제출할 수 있는 기초 설문이 없습니다.',
        details: {},
      });
  });

  it('같은 submissionId의 다른 payload를 409로 거부한다', async () => {
    onboardingSubmissionFindUniqueMock.mockResolvedValue({
      submissionId: 'e29053d2-c7af-4eba-8765-b23d9d060072',
      visitorId: '7074e8be-1c93-41c0-8e4f-a2569f780cbc',
      tourDestinationId: 30,
      languageCode: 'ko',
      status: 'SKIPPED',
      submittedAt: null,
      skippedAt: new Date(),
      visitorOnboardingBasicSurveyAnswers: [],
    });

    await request(app.getHttpServer())
      .post('/api/v1/tour-destinations/30/onboarding/basic-survey/answers')
      .send({
        submissionId: 'e29053d2-c7af-4eba-8765-b23d9d060072',
        visitorId: '7074e8be-1c93-41c0-8e4f-a2569f780cbc',
        languageCode: 'en',
        answers: [{ questionId: 20, optionIds: [201] }],
      })
      .expect(409)
      .expect((response) => {
        expect(response.body).toMatchObject({
          success: false,
          statusCode: 409,
          code: 'CONFLICT',
        });
      });
  });

  it('404 오류를 공통 오류 계약으로 반환한다', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/missing').expect(404);
    const body = response.body as ApiErrorResponse;

    expect(body).toEqual({
      success: false,
      statusCode: 404,
      code: 'NOT_FOUND',
      message: 'Cannot GET /api/v1/missing',
      details: {},
    });
  });

  it('헬스 체크 응답은 공통 응답 래핑에서 제외한다', async () => {
    await request(app.getHttpServer())
      .get('/health/live')
      .expect(200)
      .expect((response) => {
        const body = response.body as Record<string, unknown>;
        expect(body.status).toBe('ok');
        expect(body.success).toBeUndefined();
      });

    await request(app.getHttpServer())
      .get('/health/ready')
      .expect(200)
      .expect((response) => {
        const body = response.body as Record<string, unknown>;
        expect(body).toMatchObject({
          status: 'ok',
          info: { database: { status: 'up' } },
        });
      });

    queryRawMock.mockRejectedValueOnce(new Error('database unavailable'));
    await request(app.getHttpServer())
      .get('/health/ready')
      .expect(503)
      .expect((response) => {
        const body = response.body as Record<string, unknown>;
        expect(body.status).toBe('error');
        expect(body.success).toBeUndefined();
      });
  });

  it('Scalar UI와 OpenAPI JSON을 제공한다', async () => {
    await request(app.getHttpServer())
      .get('/docs')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(({ text }) => expect(text).toContain('@scalar/api-reference'));

    await request(app.getHttpServer())
      .get('/docs/json')
      .expect(200)
      .expect((response) => {
        const body = response.body as {
          info: { title: string };
          paths: Record<string, Record<string, unknown>>;
          servers: unknown[];
          components: { schemas: Record<string, unknown> };
        };
        expect(body.info.title).toBe('Visit Servant API');
        expect(body.servers).toEqual([]);
        expect(body.paths).toHaveProperty('/api/v1');
        expect(body.paths['/api/v1/search']).toHaveProperty('get');
        expect(body.paths['/api/v1/search/popularity']).toHaveProperty('get');
        expect(JSON.stringify(body.paths['/api/v1/search'])).toContain(
          '#/components/schemas/SearchListResponseDto',
        );
        expect(JSON.stringify(body.components.schemas.SearchListResponseDto)).toContain(
          '#/components/schemas/PoiViewportItemResponseDto',
        );
        expect(body.paths['/api/v1/pois']).toHaveProperty('get');
        expect(JSON.stringify(body.paths['/api/v1/pois'])).toContain('keyword');
        expect(JSON.stringify(body.paths['/api/v1/pois'])).toContain(
          '#/components/schemas/PoiViewportListResponseDto',
        );
        expect(body.paths).not.toHaveProperty('/api/v1/pois/markers');
        expect(body.paths['/api/v1/pois/{id}']).toHaveProperty('get');
        expect(JSON.stringify(body.paths['/api/v1/pois/{id}'])).toContain(
          '#/components/schemas/PoiDetailResponseDto',
        );
        const detailParams = (
          (
            body.paths['/api/v1/pois/{id}'].get as {
              parameters?: Array<{ name: string; in: string }>;
            }
          ).parameters ?? []
        ).map((param) => `${param.in}:${param.name}`);
        expect(detailParams).toEqual(expect.arrayContaining(['path:id']));
        expect(detailParams.some((param) => param === 'query:keyword')).toBe(false);
        expect(detailParams.some((param) => param === 'query:language')).toBe(false);
        expect(body.paths['/api/v1/categories']).toHaveProperty('get');
        expect(JSON.stringify(body.paths['/api/v1/categories'])).toContain(
          '#/components/schemas/CategoryResponseDto',
        );
        const categoryOperation = body.paths['/api/v1/categories'].get as {
          responses: {
            '200': {
              content: {
                'application/json': {
                  schema: { properties: { data: unknown } };
                };
              };
            };
          };
        };
        expect(
          categoryOperation.responses['200'].content['application/json'].schema.properties.data,
        ).toEqual({
          type: 'array',
          items: { $ref: '#/components/schemas/CategoryResponseDto' },
        });
        expect(body.components.schemas).toHaveProperty('CategoryColorCodeResponseDto');
        expect(body.components.schemas).toHaveProperty('CategoryFacilitiesCountResponseDto');
        expect(JSON.stringify(body.components.schemas.CategoryResponseDto)).toContain(
          '#/components/schemas/CategoryColorCodeResponseDto',
        );
        expect(JSON.stringify(body.components.schemas.CategoryResponseDto)).toContain(
          '#/components/schemas/CategoryFacilitiesCountResponseDto',
        );
        expect(body.paths).toHaveProperty('/api/v1/tour-destinations/entry');
        expect(body.paths).toHaveProperty('/api/v1/tour-destinations/{destinationId}');
        expect(body.paths).toHaveProperty('/api/v1/tour-destinations/{destinationId}/onboardings');
        expect(body.paths).toHaveProperty(
          '/api/v1/tour-destinations/{destinationId}/onboarding/basic-survey',
        );
        expect(body.paths).toHaveProperty(
          '/api/v1/tour-destinations/{destinationId}/onboarding/basic-survey/skip',
        );
        expect(body.paths).toHaveProperty(
          '/api/v1/tour-destinations/{destinationId}/onboarding/basic-survey/answers',
        );
        expect(JSON.stringify(body.paths['/api/v1/tour-destinations/entry'])).toContain(
          '#/components/schemas/TourDestinationEntryResponseDto',
        );
        expect(JSON.stringify(body.paths['/api/v1/tour-destinations/{destinationId}'])).toContain(
          '#/components/schemas/TourDestinationDetailResponseDto',
        );
        expect(
          JSON.stringify(body.paths['/api/v1/tour-destinations/{destinationId}/onboardings']),
        ).toContain('#/components/schemas/TourDestinationOnboardingResponseDto');
        expect(
          JSON.stringify(
            body.paths['/api/v1/tour-destinations/{destinationId}/onboarding/basic-survey'],
          ),
        ).toContain('#/components/schemas/TourDestinationBasicSurveyResponseDto');
        expect(
          JSON.stringify(
            body.paths['/api/v1/tour-destinations/{destinationId}/onboarding/basic-survey/skip'],
          ),
        ).toContain('#/components/schemas/BasicSurveySubmissionResponseDto');
        expect(
          body.paths['/api/v1/tour-destinations/{destinationId}/onboarding/basic-survey/skip'].post,
        ).toHaveProperty('responses.409');
        expect(
          JSON.stringify(
            body.paths['/api/v1/tour-destinations/{destinationId}/onboarding/basic-survey/answers'],
          ),
        ).toContain('#/components/schemas/BasicSurveySubmitDto');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
