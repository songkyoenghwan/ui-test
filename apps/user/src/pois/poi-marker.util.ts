import { Prisma } from '../generated/prisma/client';
import {
  CONGESTION_LEVEL_NONE,
  FACILITY_OPERATING_STATUS_RANK,
  POI_LANGUAGES,
  type PoiCongestionLevel,
  type PoiLanguage,
} from './constants/poi.constant';
import {
  resolveFacilityOperatingStatus,
  type FacilityOperatingStatusInput,
} from './facility-operating-status.util';
import { PoiViewportItemResponseDto } from './models/poi-viewport-item-response.dto';
import { resolveFacilityCongestionStatus } from './poi-congestion.util';

export const POI_MARKER_SELECT = {
  id: true,
  name: true,
  latitude: true,
  longitude: true,
  tourDestinations: {
    select: {
      isCustomSortingYn: true,
      isFacilityCongestionYn: true,
    },
  },
  facilityPoiMapping: {
    select: {
      sortingNumber: true,
      isVisible: true,
      isDeleted: true,
      facilities: {
        select: {
          id: true,
          name: true,
          isVisible: true,
          isDeleted: true,
          startAt: true,
          endAt: true,
          categoryId: true,
          categories: {
            select: {
              id: true,
              isVisible: true,
              isDeleted: true,
              iconKey: true,
              categoryColorCodes: {
                select: {
                  isVisible: true,
                  isDeleted: true,
                  colorCode: true,
                },
              },
              categoryFile: {
                where: { isVisible: true, isDeleted: false },
                orderBy: { id: 'asc' },
                take: 1,
                select: { fileUrl: true },
              },
              categories: {
                select: {
                  iconKey: true,
                  categoryColorCodes: {
                    select: {
                      isVisible: true,
                      isDeleted: true,
                      colorCode: true,
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
            },
          },
          facilityOperatingSchedule: {
            where: { isVisible: true, isDeleted: false },
            select: {
              dayOfWeek: true,
              openingTime: true,
              closingTime: true,
              facilityBreakSchedule: {
                where: { isVisible: true, isDeleted: false },
                select: {
                  breakStartTime: true,
                  breakEndTime: true,
                },
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
          congestionSectionFacilitiesCongestionSectionIdTocongestionSection: {
            select: {
              isVisible: true,
              isDeleted: true,
              overwriteCongestionStatus: true,
              threshold: true,
              sensorDeviceId: true,
              congestionSensorDevice: {
                select: {
                  congestionData: {
                    where: { isDeleted: false },
                    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
                    take: 1,
                    select: { countedPeople: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.PoiSelect;

export type MarkerPoi = Prisma.PoiGetPayload<{
  select: typeof POI_MARKER_SELECT;
}>;

type MarkerMapping = MarkerPoi['facilityPoiMapping'][number];
type MarkerFacility = NonNullable<MarkerMapping['facilities']>;

interface RankedFacility {
  mapping: MarkerMapping;
  facility: MarkerFacility;
  category: NonNullable<MarkerFacility['categories']>;
  rank: number;
}

export function toPoiViewportItem(
  poi: MarkerPoi,
  language: PoiLanguage,
  now: Date,
): PoiViewportItemResponseDto | null {
  const rankedFacilities = rankMappedFacilities(poi, now);
  const representative = pickRepresentativeFacility(
    rankedFacilities,
    poi.tourDestinations?.isCustomSortingYn === true,
  );
  if (!representative) {
    return null;
  }

  const { facility, category } = representative;
  const parentCategory = category.categories;
  const categoryFile = category.categoryFile[0] ?? parentCategory?.categoryFile[0];

  return {
    id: poi.id,
    name: getLocalizedName(poi.name, language),
    latitude: poi.latitude,
    longitude: poi.longitude,
    facilityId: facility.id,
    facilityName: getLocalizedName(facility.name, language),
    categoryId: category.id,
    categoryIconKey: category.iconKey ?? parentCategory?.iconKey ?? null,
    categoryIconUrl: categoryFile?.fileUrl ?? null,
    categoryColorCode:
      resolveCategoryColorCode(category.categoryColorCodes) ??
      resolveCategoryColorCode(parentCategory?.categoryColorCodes),
    congestionStatus: resolveCongestionStatus(
      facility,
      poi.tourDestinations?.isFacilityCongestionYn === true,
    ),
  };
}

export function pickRepresentativeFacility(
  facilities: RankedFacility[],
  useCustomSorting: boolean,
): RankedFacility | null {
  if (facilities.length === 0) {
    return null;
  }

  return [...facilities].sort((left, right) =>
    compareDestinationFacilityOrder(
      {
        rank: left.rank,
        sortingNumber: left.mapping.sortingNumber,
        facilityId: left.facility.id,
      },
      {
        rank: right.rank,
        sortingNumber: right.mapping.sortingNumber,
        facilityId: right.facility.id,
      },
      useCustomSorting,
    ),
  )[0];
}

/** 대상지 커스텀 정렬: CMS 순 / 아니면 운영 상태 순 → 동률 CMS 순. */
export function compareDestinationFacilityOrder(
  left: { rank: number; sortingNumber: number | null; facilityId: number },
  right: { rank: number; sortingNumber: number | null; facilityId: number },
  useCustomSorting: boolean,
): number {
  if (!useCustomSorting && left.rank !== right.rank) {
    return left.rank - right.rank;
  }

  const leftSort = left.sortingNumber ?? Number.POSITIVE_INFINITY;
  const rightSort = right.sortingNumber ?? Number.POSITIVE_INFINITY;
  if (leftSort !== rightSort) {
    return leftSort - rightSort;
  }

  return left.facilityId - right.facilityId;
}

function rankMappedFacilities(poi: MarkerPoi, now: Date): RankedFacility[] {
  return poi.facilityPoiMapping.flatMap((mapping) => {
    if (!isPublic(mapping)) {
      return [];
    }

    const facility = mapping.facilities;
    if (!isPublic(facility)) {
      return [];
    }

    const category = facility.categories;
    if (!isPublic(category)) {
      return [];
    }

    const status = resolveFacilityOperatingStatus(toOperatingStatusInput(facility), now);
    return [
      {
        mapping,
        facility,
        category,
        rank: FACILITY_OPERATING_STATUS_RANK[status],
      },
    ];
  });
}

function isPublic<T extends { isVisible: boolean | null; isDeleted: boolean | null }>(
  record: T | null | undefined,
): record is T & { isVisible: true; isDeleted: false } {
  return record?.isVisible === true && record.isDeleted === false;
}

function toOperatingStatusInput(facility: MarkerFacility): FacilityOperatingStatusInput {
  return {
    startAt: facility.startAt,
    endAt: facility.endAt,
    operatingSchedules: facility.facilityOperatingSchedule.map((schedule) => ({
      dayOfWeek: schedule.dayOfWeek,
      openingTime: schedule.openingTime,
      closingTime: schedule.closingTime,
      breaks: schedule.facilityBreakSchedule.map((breakTime) => ({
        breakStartTime: breakTime.breakStartTime,
        breakEndTime: breakTime.breakEndTime,
      })),
    })),
    holidays: facility.facilityHolidaySchedule.map((holiday) => ({
      weekOfMonth: holiday.weekOfMonth,
      dayOfWeek: holiday.dayOfWeek,
      holidayType: holiday.holidayType,
      fixedHoliday: holiday.fixedHoliday,
    })),
  };
}

type MarkerCategoryColor = NonNullable<MarkerFacility['categories']>['categoryColorCodes'];

function resolveCategoryColorCode(color: MarkerCategoryColor | undefined): string | null {
  if (!color || color.isVisible !== true || color.isDeleted === true) {
    return null;
  }

  const colorCode = color.colorCode?.trim();
  return colorCode ? colorCode : null;
}

function resolveCongestionStatus(
  facility: MarkerFacility,
  facilityCongestionEnabled: boolean,
): PoiCongestionLevel {
  if (!facilityCongestionEnabled) {
    return CONGESTION_LEVEL_NONE;
  }

  const section = facility.congestionSectionFacilitiesCongestionSectionIdTocongestionSection;
  if (!section || section.isVisible !== true || section.isDeleted === true) {
    return CONGESTION_LEVEL_NONE;
  }

  return resolveFacilityCongestionStatus({
    overwriteCongestionStatus: section.overwriteCongestionStatus,
    countedPeople: section.congestionSensorDevice?.congestionData[0]?.countedPeople,
    threshold: section.threshold,
  });
}

export function getLocalizedName(name: Prisma.JsonValue | null, language: PoiLanguage): string {
  if (!name || typeof name !== 'object' || Array.isArray(name)) {
    return '';
  }

  const translations = name;
  const candidates = [
    translations[language],
    translations.ko,
    ...POI_LANGUAGES.map((fallbackLanguage) => translations[fallbackLanguage]),
  ];
  const localizedName = candidates.find(
    (candidate): candidate is string =>
      typeof candidate === 'string' && candidate.trim().length > 0,
  );

  return localizedName ?? '';
}
