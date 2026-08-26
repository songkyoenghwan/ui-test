import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { CongestionStatus } from '../generated/prisma/enums';
import { POI_DETAIL_SELECT } from './poi-detail.util';
import { buildFacilityKeywordWhere } from './poi-search.util';
import { PoisService } from './pois.service';

describe('PoisService', () => {
  let service: PoisService;
  const findMany = jest.fn();
  const findFirst = jest.fn();

  beforeEach(async () => {
    findMany.mockReset();
    findFirst.mockReset();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PoisService,
        { provide: PrismaService, useValue: { poi: { findMany, findFirst } } },
      ],
    }).compile();

    service = module.get<PoisService>(PoisService);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('대상지 POI 마커 목록을 조회한다', async () => {
    findMany.mockResolvedValue([]);
    const now = new Date('2026-08-19T03:30:00.000Z');
    jest.useFakeTimers();
    jest.setSystemTime(now);

    await expect(
      service.findMany({
        tourDestinationId: 7,
        language: 'ko',
      }),
    ).resolves.toEqual({ items: [] });

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          tourDestinationId: 7,
          isVisible: true,
          isDeleted: false,
          tourDestinations: {
            is: {
              isVisible: true,
              isDeleted: false,
              OR: [{ isAlways: true }, { startAt: { lte: now }, endAt: { gte: now } }],
            },
          },
          facilityPoiMapping: {
            some: {
              isVisible: true,
              isDeleted: false,
              facilities: {
                is: {
                  isVisible: true,
                  isDeleted: false,
                  categories: {
                    is: {
                      isVisible: true,
                      isDeleted: false,
                    },
                  },
                },
              },
            },
          },
        },
        take: 500,
      }),
    );
  });

  it('시설 ID가 없으면 POI 조회 없이 빈 목록을 반환한다', async () => {
    await expect(
      service.findManyByFacilityIds({
        tourDestinationId: 7,
        facilityIds: [],
        language: 'ko',
      }),
    ).resolves.toEqual({ items: [] });
    expect(findMany).not.toHaveBeenCalled();
  });

  it('시설 ID로 매칭된 POI 마커만 조회한다', async () => {
    findMany.mockResolvedValue([]);
    const now = new Date('2026-08-19T03:30:00.000Z');
    jest.useFakeTimers();
    jest.setSystemTime(now);

    await expect(
      service.findManyByFacilityIds({
        tourDestinationId: 7,
        facilityIds: [7, 9],
        language: 'ko',
      }),
    ).resolves.toEqual({ items: [] });

    const calls = findMany.mock.calls as unknown as Array<
      [
        {
          where?: {
            tourDestinationId?: number;
            facilityPoiMapping?: { some?: { facilityId?: { in: number[] } } };
          };
        },
      ]
    >;
    const args = calls[0]?.[0];
    expect(args?.where?.tourDestinationId).toBe(7);
    expect(args?.where?.facilityPoiMapping?.some?.facilityId).toEqual({ in: [7, 9] });
  });

  it('keyword가 있으면 시설 측 매칭만 매핑 where에 넣는다', async () => {
    findMany.mockResolvedValue([]);
    const now = new Date('2026-08-19T03:30:00.000Z');
    jest.useFakeTimers();
    jest.setSystemTime(now);
    const facilityKeywordWhere = buildFacilityKeywordWhere('안내', 'ko');

    await expect(
      service.findMany({
        tourDestinationId: 1,
        language: 'ko',
        keyword: '안내',
      }),
    ).resolves.toEqual({ items: [] });

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          tourDestinationId: 1,
          isVisible: true,
          isDeleted: false,
          tourDestinations: {
            is: {
              isVisible: true,
              isDeleted: false,
              OR: [{ isAlways: true }, { startAt: { lte: now }, endAt: { gte: now } }],
            },
          },
          facilityPoiMapping: {
            some: {
              isVisible: true,
              isDeleted: false,
              facilities: {
                is: {
                  isVisible: true,
                  isDeleted: false,
                  categories: {
                    is: {
                      isVisible: true,
                      isDeleted: false,
                    },
                  },
                  AND: [facilityKeywordWhere],
                },
              },
            },
          },
        },
      }),
    );
  });

  it('공개 카테고리 시설이 있는 POI 마커를 조회한다', async () => {
    findMany.mockResolvedValue([]);
    const now = new Date('2026-08-19T03:30:00.000Z');
    jest.useFakeTimers();
    jest.setSystemTime(now);

    await expect(
      service.findMany({
        tourDestinationId: 1,
        language: 'ko',
      }),
    ).resolves.toEqual({ items: [] });

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          tourDestinationId: 1,
          isVisible: true,
          isDeleted: false,
          tourDestinations: {
            is: {
              isVisible: true,
              isDeleted: false,
              OR: [{ isAlways: true }, { startAt: { lte: now }, endAt: { gte: now } }],
            },
          },
          facilityPoiMapping: {
            some: {
              isVisible: true,
              isDeleted: false,
              facilities: {
                is: {
                  isVisible: true,
                  isDeleted: false,
                  categories: {
                    is: {
                      isVisible: true,
                      isDeleted: false,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: { id: 'asc' },
        take: 500,
      }),
    );
  });

  it('공개 POI 상세와 매핑 시설을 반환한다', async () => {
    findFirst.mockResolvedValue({
      id: 5,
      tourDestinationId: 3,
      name: { ko: '서울광장' },
      latitude: 37.5665,
      longitude: 126.978,
      address: { ko: '서울' },
      addressDetail: null,
      managementCode: 'POI-005',
      tourDestinations: {
        isCustomSortingYn: true,
        isFacilityCongestionYn: true,
        isVpsContentsYn: true,
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
            congestionSectionId: 7,
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
            facilityVpsPopup: [
              {
                id: 3,
                name: { ko: 'AR' },
                description: null,
                url: 'https://example.com/vps',
                fileUrl: null,
                poiId: 5,
                isVisible: true,
              },
            ],
            congestionSectionFacilitiesCongestionSectionIdTocongestionSection: {
              isVisible: true,
              isDeleted: false,
              overwriteCongestionStatus: CongestionStatus.NORMAL,
              threshold: 100,
              congestionSensorDevice: { congestionData: [{ countedPeople: 50 }] },
            },
          },
        },
      ],
    });

    await expect(service.findOne(5)).resolves.toEqual({
      id: 5,
      tourDestinationId: 3,
      name: { ko: '서울광장' },
      latitude: 37.5665,
      longitude: 126.978,
      address: { ko: '서울' },
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
            facilityVpsPopups: [
              {
                id: 3,
                name: { ko: 'AR' },
                description: null,
                url: 'https://example.com/vps',
                fileUrl: null,
                poiId: 5,
                isVisible: true,
              },
            ],
            congestionStatus: CongestionStatus.NORMAL,
            isUsingCongestion: true,
            hasVpsPopup: true,
          },
        },
      ],
    });

    expect(findFirst).toHaveBeenCalledWith({
      where: { id: 5, isDeleted: false, isVisible: true },
      select: POI_DETAIL_SELECT,
    });
  });

  it('공개 POI가 없으면 NOT_FOUND를 던진다', async () => {
    findFirst.mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toMatchObject({
      message: 'POI를 찾을 수 없습니다.',
      code: 'NOT_FOUND',
    });
  });
});
