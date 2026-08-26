import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '../generated/prisma/client';
import { PoisService } from '../pois/pois.service';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  const findMany = jest.fn((args: Prisma.FacilityFindManyArgs) => {
    void args;
    return Promise.resolve([]);
  });
  const findManyByFacilityIds = jest.fn();

  beforeEach(async () => {
    findMany.mockClear();
    findManyByFacilityIds.mockReset();
    findManyByFacilityIds.mockResolvedValue({ items: [] });
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: PrismaService,
          useValue: { facility: { findMany } },
        },
        { provide: PoisService, useValue: { findManyByFacilityIds } },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('다섯 가지 검색 유형을 포함해 대상지의 공개 시설을 조회한다', async () => {
    findMany.mockResolvedValue([
      {
        id: 7,
        name: { ko: '망원시장 안내소', en: 'Mangwon Market Information Center' },
        categories: {
          name: { ko: '관광 안내' },
          iconKey: 'information',
          categoryColorCodes: { colorCode: '#274FA8' },
        },
        facilityPoiMapping: [
          {
            poiId: 12,
            pois: {
              name: { ko: '망원시장 입구' },
              address: { ko: '서울 마포구 동교로9길 56' },
              addressDetail: { ko: '1층' },
              latitude: 37.556,
              longitude: 126.905,
            },
          },
        ],
      },
    ]);

    await expect(
      service.search({ tourDestinationId: 3, keyword: '망원', language: 'ko' }),
    ).resolves.toMatchObject({
      items: [
        {
          id: 7,
          name: { ko: '망원시장 안내소', en: 'Mangwon Market Information Center' },
          category: {
            name: { ko: '관광 안내' },
            iconKey: 'information',
            categoryColorCodes: { colorCode: '#274FA8' },
          },
          poiId: 12,
          address: { ko: '서울 마포구 동교로9길 56' },
          addressDetail: { ko: '1층' },
          operation: { status: 'NO_INFO', nextTransitionAt: null },
          congestionStatus: 'none',
        },
      ],
      pois: [],
    });
    expect(findManyByFacilityIds).toHaveBeenCalledWith({
      tourDestinationId: 3,
      facilityIds: [7],
      language: 'ko',
    });

    const args = findMany.mock.calls[0]?.[0];
    expect(args?.take).toBe(500);
    expect(args?.where).toMatchObject({
      tourDestinationId: 3,
      isVisible: true,
      isDeleted: false,
      facilityPoiMapping: {
        some: {
          isVisible: true,
          isDeleted: false,
          pois: {
            is: {
              isVisible: true,
              isDeleted: false,
            },
          },
        },
      },
    });
    const where = args?.where;
    expect(Array.isArray(where?.OR)).toBe(true);
    expect(where?.OR).toHaveLength(5);
    expect(JSON.stringify(where)).toContain('facilityProducts');
    expect(JSON.stringify(where)).toContain('facilityKeywordTags');
    expect(JSON.stringify(where)).toContain('categories');
    expect(JSON.stringify(where)).toContain('facilityPoiMapping');
  });

  it('하위 카테고리 시설은 부모 아이콘과 색을 쓴다', async () => {
    findMany.mockResolvedValue([
      {
        id: 194,
        name: { ko: '123' },
        categories: {
          name: { ko: '2-3 하위' },
          iconKey: null,
          categoryColorCodes: null,
          categories: {
            iconKey: 'binoculars',
            categoryColorCodes: { colorCode: '#FF983D' },
          },
        },
        facilityPoiMapping: [{ poiId: 73 }],
      },
    ]);

    await expect(
      service.search({ tourDestinationId: 37, keyword: '123', language: 'ko' }),
    ).resolves.toMatchObject({
      items: [
        {
          id: 194,
          category: {
            iconKey: 'binoculars',
            categoryColorCodes: { colorCode: '#FF983D' },
          },
          poiId: 73,
        },
      ],
    });
  });

  it('매칭 시설의 POI 마커를 함께 반환한다', async () => {
    findMany.mockResolvedValue([
      {
        id: 7,
        name: { ko: '망원시장 안내소' },
        categories: null,
        facilityPoiMapping: [{ poiId: 12 }],
      },
    ]);
    findManyByFacilityIds.mockResolvedValue({
      items: [
        {
          id: 12,
          name: '망원시장 입구',
          latitude: 37.556,
          longitude: 126.905,
          facilityId: 7,
          categoryId: 3,
          categoryIconKey: 'information',
          categoryIconUrl: null,
          categoryColorCode: '#274FA8',
          congestionStatus: 'none',
        },
      ],
    });

    await expect(
      service.search({ tourDestinationId: 3, keyword: '망원', language: 'ko' }),
    ).resolves.toMatchObject({
      items: [{ id: 7, poiId: 12 }],
      pois: [{ id: 12, facilityId: 7 }],
    });
  });

  it('매칭 시설이 없으면 pois는 빈 배열이다', async () => {
    findMany.mockResolvedValue([]);

    await expect(
      service.search({ tourDestinationId: 3, keyword: '없는검색', language: 'ko' }),
    ).resolves.toEqual({ items: [], pois: [] });
    expect(findManyByFacilityIds).toHaveBeenCalledWith({
      tourDestinationId: 3,
      facilityIds: [],
      language: 'ko',
    });
  });

  it('인기 시설은 공개 POI 연결 후보를 무작위로 섞어 1~10개 반환한다', async () => {
    findMany.mockResolvedValue(
      Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        name: { ko: `${index + 1} 시설` },
        categories: null,
        facilityPoiMapping: [{ poiId: index + 101, pois: null }],
      })),
    );

    const random = jest.fn().mockReturnValueOnce(0.4).mockReturnValue(0);
    const result = await service.popularity({ tourDestinationId: 37, language: 'ko' }, random);

    expect(findMany.mock.calls.at(-1)?.[0]?.where).toEqual({
      isVisible: true,
      isDeleted: false,
      tourDestinationId: 37,
      facilityPoiMapping: {
        some: {
          isVisible: true,
          isDeleted: false,
          pois: { is: { isVisible: true, isDeleted: false } },
        },
      },
    });
    const facilityIds = result.items.map((item) => item.id);
    expect(facilityIds).toHaveLength(5);
    expect(new Set(facilityIds).size).toBe(5);
  });

  it('AI 추천 시설은 공개 POI 연결 후보를 무작위로 섞어 최대 5개 반환한다', async () => {
    findMany.mockResolvedValue(
      Array.from({ length: 8 }, (_, index) => ({
        id: index + 1,
        name: { ko: `${index + 1} 시설` },
        categories: null,
        facilityPoiMapping: [{ poiId: index + 101, pois: null }],
      })),
    );

    const result = await service.aiRecommendations(
      { tourDestinationId: 37, language: 'ko' },
      () => 0,
    );

    expect(result.items).toHaveLength(5);
    expect(new Set(result.items.map((item) => item.id)).size).toBe(5);
    expect(findMany.mock.calls.at(-1)?.[0]?.where).toMatchObject({
      tourDestinationId: 37,
      facilityPoiMapping: {
        some: {
          isVisible: true,
          isDeleted: false,
          pois: { is: { isVisible: true, isDeleted: false } },
        },
      },
    });
  });

  it('만료되지 않은 운영 상태 캐시를 우선 사용한다', async () => {
    const cacheNextRefreshAt = new Date('2099-01-01T00:00:00.000Z');
    findMany.mockResolvedValue([
      {
        id: 7,
        name: { ko: '안내소' },
        categories: null,
        facilityFile: [],
        facilityOperatingStatus: [{ status: 'BREAK', cacheNextRefreshAt }],
        facilityOperatingSchedule: [],
        facilityHolidaySchedule: [],
        startAt: null,
        endAt: null,
        facilityPoiMapping: [{ poiId: 12, pois: null }],
      },
    ]);

    await expect(
      service.search({ tourDestinationId: 3, keyword: '안내', language: 'ko' }),
    ).resolves.toMatchObject({
      items: [
        {
          operation: {
            status: 'BREAK',
            nextTransitionAt: cacheNextRefreshAt,
          },
        },
      ],
    });
  });

  it('만료된 운영 상태 캐시는 스케줄 계산 결과로 대체한다', async () => {
    findMany.mockResolvedValue([
      {
        id: 7,
        name: { ko: '안내소' },
        categories: null,
        facilityFile: [],
        facilityOperatingStatus: [
          { status: 'OPERATING', cacheNextRefreshAt: new Date('2000-01-01T00:00:00.000Z') },
        ],
        facilityOperatingSchedule: [],
        facilityHolidaySchedule: [],
        startAt: null,
        endAt: null,
        facilityPoiMapping: [{ poiId: 12, pois: null }],
      },
    ]);

    await expect(
      service.search({ tourDestinationId: 3, keyword: '안내', language: 'ko' }),
    ).resolves.toMatchObject({
      items: [{ operation: { status: 'NO_INFO', nextTransitionAt: null } }],
    });
  });
});
