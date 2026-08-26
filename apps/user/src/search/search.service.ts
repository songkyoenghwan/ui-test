import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '../generated/prisma/client';
import { PoisService } from '../pois/pois.service';
import { CONGESTION_LEVEL_NONE, FacilityOperatingStatus } from '../pois/constants/poi.constant';
import {
  resolveFacilityOperatingSnapshot,
  type FacilityOperatingStatusInput,
} from '../pois/facility-operating-status.util';
import {
  AI_RECOMMENDATION_MAX_ITEMS,
  POPULARITY_MAX_ITEMS,
  SEARCH_MAX_ITEMS,
} from './search.constant';
import { PopularitySearchQueryDto } from './dto/popularity-search-query.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { SearchListResponseDto } from './dto/search-response.dto';

const SEARCH_FACILITY_SELECT = {
  id: true,
  name: true,
  categories: {
    select: {
      id: true,
      name: true,
      iconKey: true,
      categoryColorCodes: {
        select: { colorCode: true },
      },
      categories: {
        select: {
          iconKey: true,
          categoryColorCodes: {
            select: { colorCode: true },
          },
          categoryFile: {
            where: { isVisible: true, isDeleted: false },
            orderBy: { id: 'asc' },
            take: 1,
            select: { fileUrl: true },
          },
        },
      },
      categoryFile: {
        where: { isVisible: true, isDeleted: false },
        orderBy: { id: 'asc' },
        take: 1,
        select: { fileUrl: true },
      },
    },
  },
  facilityFile: {
    where: { isVisible: true, isDeleted: false, fileType: 'MAIN' },
    orderBy: { id: 'asc' },
    take: 1,
    select: { fileUrl: true },
  },
  facilityOperatingStatus: {
    where: { isVisible: true, isDeleted: false },
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
    take: 1,
    select: { status: true, cacheNextRefreshAt: true },
  },
  startAt: true,
  endAt: true,
  facilityOperatingSchedule: {
    where: { isVisible: true, isDeleted: false },
    select: {
      dayOfWeek: true,
      openingTime: true,
      closingTime: true,
      facilityBreakSchedule: {
        where: { isVisible: true, isDeleted: false },
        select: { breakStartTime: true, breakEndTime: true },
      },
    },
  },
  facilityHolidaySchedule: {
    where: { isVisible: true, isDeleted: false },
    select: {
      weekOfMonth: true,
      dayOfWeek: true,
      holidayType: true,
      fixedHoliday: true,
    },
  },
  facilityPoiMapping: {
    where: {
      isVisible: true,
      isDeleted: false,
      pois: { is: { isVisible: true, isDeleted: false } },
    },
    orderBy: [{ sortingNumber: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }],
    take: 1,
    select: {
      poiId: true,
      pois: {
        select: {
          name: true,
          address: true,
          addressDetail: true,
          latitude: true,
          longitude: true,
        },
      },
    },
  },
} satisfies Prisma.FacilitySelect;

@Injectable()
export class SearchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly poisService: PoisService,
  ) {}

  async search(query: SearchQueryDto): Promise<SearchListResponseDto> {
    const now = new Date();
    const nameContains = {
      path: [query.language],
      string_contains: query.keyword,
    };
    const visibility = { isVisible: true, isDeleted: false };

    const items = await this.prisma.facility.findMany({
      where: {
        ...visibility,
        tourDestinationId: query.tourDestinationId,
        facilityPoiMapping: {
          some: {
            ...visibility,
            pois: { is: visibility },
          },
        },
        OR: [
          { name: nameContains },
          {
            categories: {
              is: {
                ...visibility,
                OR: [
                  { name: nameContains },
                  { categories: { is: { ...visibility, name: nameContains } } },
                ],
              },
            },
          },
          {
            facilityKeywordTags: {
              some: {
                ...visibility,
                tourDestinationTags: {
                  is: { ...visibility, name: nameContains },
                },
              },
            },
          },
          {
            facilityProducts: {
              some: { ...visibility, name: nameContains },
            },
          },
          {
            facilityPoiMapping: {
              some: {
                ...visibility,
                pois: {
                  is: {
                    ...visibility,
                    OR: [
                      { name: nameContains },
                      { address: nameContains },
                      { addressDetail: nameContains },
                    ],
                  },
                },
              },
            },
          },
        ],
      },
      orderBy: { id: 'asc' },
      take: SEARCH_MAX_ITEMS,
      select: SEARCH_FACILITY_SELECT,
    });

    return this.toSearchListResponse(items, query.tourDestinationId, query.language, now);
  }

  async popularity(
    query: PopularitySearchQueryDto,
    random: () => number = Math.random,
  ): Promise<SearchListResponseDto> {
    // TODO(search-popularity): AnalyticsEvent의 facility_view 집계 계약이 확정되면
    // 최근 한 달 노출 횟수 DESC → 가나다순으로 상위 10개를 반환하도록 교체한다.
    return this.randomFacilities(query, POPULARITY_MAX_ITEMS, random, true);
  }

  async aiRecommendations(
    query: PopularitySearchQueryDto,
    random: () => number = Math.random,
  ): Promise<SearchListResponseDto> {
    // TODO(ai-recommendation): 기초 설문 응답과 사용자가 수동으로 추가한 AI 추천 태그를
    // 함께 사용해 적합도를 계산하고, 적합도 DESC 기준 1~5개 응답으로 교체한다.
    // 현재 공개 POI 연결 시설 랜덤 조회는 API/UI 연결 확인을 위한 임시 기능이다.
    return this.randomFacilities(query, AI_RECOMMENDATION_MAX_ITEMS, random);
  }

  private async randomFacilities(
    query: PopularitySearchQueryDto,
    limit: number,
    random: () => number,
    randomizeCount = false,
  ): Promise<SearchListResponseDto> {
    const now = new Date();
    const items = await this.prisma.facility.findMany({
      where: {
        isVisible: true,
        isDeleted: false,
        tourDestinationId: query.tourDestinationId,
        facilityPoiMapping: {
          some: {
            isVisible: true,
            isDeleted: false,
            pois: { is: { isVisible: true, isDeleted: false } },
          },
        },
      },
      select: SEARCH_FACILITY_SELECT,
    });
    const maximumCount = Math.min(limit, items.length);
    const itemCount =
      randomizeCount && maximumCount > 0 ? Math.floor(random() * maximumCount) + 1 : maximumCount;
    const randomItems = shuffle(items, random).slice(0, itemCount);

    return this.toSearchListResponse(randomItems, query.tourDestinationId, query.language, now);
  }

  private async toSearchListResponse(
    items: SearchFacility[],
    tourDestinationId: number,
    language: SearchQueryDto['language'],
    now: Date,
  ): Promise<SearchListResponseDto> {
    const facilityIds = items.map((item) => item.id);
    const { items: pois } = await this.poisService.findManyByFacilityIds({
      tourDestinationId,
      facilityIds,
      language,
    });

    const facilities = items.map((item) => {
      const mapping = item.facilityPoiMapping[0];
      const marker = pois.find((poi) => poi.facilityId === item.id && poi.id === mapping?.poiId);
      const operation = resolveSearchOperation(item, now);

      return {
        id: item.id,
        name: item.name,
        category: item.categories
          ? {
              id: item.categories.id,
              name: item.categories.name,
              iconKey: item.categories.iconKey ?? item.categories.categories?.iconKey ?? null,
              categoryColorCodes:
                item.categories.categoryColorCodes ??
                item.categories.categories?.categoryColorCodes ??
                null,
            }
          : null,
        poiId: mapping?.poiId ?? null,
        poiName: mapping?.pois?.name ?? null,
        address: mapping?.pois?.address ?? null,
        addressDetail: mapping?.pois?.addressDetail ?? null,
        latitude: mapping?.pois?.latitude ?? null,
        longitude: mapping?.pois?.longitude ?? null,
        thumbnailUrl:
          item.facilityFile?.[0]?.fileUrl ??
          item.categories?.categoryFile?.[0]?.fileUrl ??
          item.categories?.categories?.categoryFile?.[0]?.fileUrl ??
          null,
        congestionStatus: marker?.congestionStatus ?? CONGESTION_LEVEL_NONE,
        operation,
      };
    });

    return {
      items: facilities,
      pois,
    };
  }
}

type SearchFacility = Prisma.FacilityGetPayload<{
  select: typeof SEARCH_FACILITY_SELECT;
}>;

const OPERATING_STATUSES = new Set<string>(Object.values(FacilityOperatingStatus));

function shuffle<T>(items: T[], random: () => number): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const targetIndex = Math.floor(random() * (index + 1));
    const current = shuffled[index];
    const target = shuffled[targetIndex];
    if (current === undefined || target === undefined) continue;
    shuffled[index] = target;
    shuffled[targetIndex] = current;
  }

  return shuffled;
}

function resolveSearchOperation(
  facility: SearchFacility,
  now: Date,
): { status: FacilityOperatingStatus; nextTransitionAt: Date | null } {
  const cached = facility.facilityOperatingStatus?.[0];
  if (
    cached?.status &&
    OPERATING_STATUSES.has(cached.status) &&
    cached.cacheNextRefreshAt &&
    cached.cacheNextRefreshAt > now
  ) {
    return {
      status: cached.status as FacilityOperatingStatus,
      nextTransitionAt: cached.cacheNextRefreshAt,
    };
  }

  return resolveFacilityOperatingSnapshot(toOperatingStatusInput(facility), now);
}

function toOperatingStatusInput(facility: SearchFacility): FacilityOperatingStatusInput {
  return {
    startAt: facility.startAt,
    endAt: facility.endAt,
    operatingSchedules: (facility.facilityOperatingSchedule ?? []).map((schedule) => ({
      dayOfWeek: schedule.dayOfWeek,
      openingTime: schedule.openingTime,
      closingTime: schedule.closingTime,
      breaks: (schedule.facilityBreakSchedule ?? []).map((breakTime) => ({
        breakStartTime: breakTime.breakStartTime,
        breakEndTime: breakTime.breakEndTime,
      })),
    })),
    holidays: (facility.facilityHolidaySchedule ?? []).map((holiday) => ({
      weekOfMonth: holiday.weekOfMonth,
      dayOfWeek: holiday.dayOfWeek,
      holidayType: holiday.holidayType,
      fixedHoliday: holiday.fixedHoliday,
    })),
  };
}
