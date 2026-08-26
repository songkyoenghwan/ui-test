import { Prisma } from '../generated/prisma/client';
import {
  CONGESTION_LEVEL_NONE,
  FACILITY_OPERATING_STATUS_RANK,
  PUBLIC_VISIBILITY,
  type PoiCongestionLevel,
} from './constants/poi.constant';
import type {
  PoiDetailFacilityResponseDto,
  PoiDetailMappingResponseDto,
  PoiDetailResponseDto,
  PoiDetailVpsPopupResponseDto,
} from './dto/poi-detail-response.dto';
import {
  resolveFacilityOperatingStatus,
  type FacilityOperatingStatusInput,
} from './facility-operating-status.util';
import { resolveFacilityCongestionStatus } from './poi-congestion.util';
import { compareDestinationFacilityOrder } from './poi-marker.util';

const publicChildWhere = { ...PUBLIC_VISIBILITY } as const;

const fileSelect = {
  id: true,
  fileUrl: true,
} as const;

export const POI_DETAIL_SELECT = {
  id: true,
  tourDestinationId: true,
  name: true,
  latitude: true,
  longitude: true,
  address: true,
  addressDetail: true,
  managementCode: true,
  tourDestinations: {
    select: {
      isCustomSortingYn: true,
      isFacilityCongestionYn: true,
      isVpsContentsYn: true,
    },
  },
  facilityPoiMapping: {
    where: {
      ...publicChildWhere,
      facilities: {
        is: {
          ...publicChildWhere,
          categories: {
            is: publicChildWhere,
          },
        },
      },
    },
    orderBy: [
      { sortingNumber: { sort: 'asc' as const, nulls: 'last' as const } },
      { id: 'asc' as const },
    ],
    select: {
      id: true,
      facilityId: true,
      sortingNumber: true,
      facilities: {
        select: {
          id: true,
          name: true,
          description: true,
          contact: true,
          startAt: true,
          endAt: true,
          congestionSectionId: true,
          categories: {
            select: {
              id: true,
              name: true,
              iconKey: true,
              categoryColorCodes: {
                select: {
                  id: true,
                  colorCode: true,
                },
              },
              categories: {
                select: {
                  id: true,
                  name: true,
                  iconKey: true,
                  categoryColorCodes: {
                    select: {
                      id: true,
                      colorCode: true,
                    },
                  },
                },
              },
            },
          },
          facilityFile: {
            where: publicChildWhere,
            orderBy: { id: 'asc' as const },
            select: fileSelect,
          },
          facilityOperatingSchedule: {
            where: publicChildWhere,
            orderBy: [{ dayOfWeek: 'asc' as const }, { id: 'asc' as const }],
            select: {
              id: true,
              dayOfWeek: true,
              openingTime: true,
              closingTime: true,
              facilityBreakSchedule: {
                where: publicChildWhere,
                orderBy: { id: 'asc' as const },
                select: {
                  id: true,
                  breakStartTime: true,
                  breakEndTime: true,
                },
              },
            },
          },
          facilityHolidaySchedule: {
            where: publicChildWhere,
            orderBy: { id: 'asc' as const },
            select: {
              id: true,
              holidayType: true,
              weekOfMonth: true,
              dayOfWeek: true,
              fixedHoliday: true,
            },
          },
          facilityButtons: {
            where: publicChildWhere,
            orderBy: [
              { sortingNumber: { sort: 'asc' as const, nulls: 'last' as const } },
              { id: 'asc' as const },
            ],
            select: {
              id: true,
              buttonName: true,
              buttonUrl: true,
              tourDestinationCommonButtonId: true,
            },
          },
          facilityProductGuideFiles: {
            where: publicChildWhere,
            orderBy: [{ displayOrder: 'asc' as const }, { id: 'asc' as const }],
            select: fileSelect,
          },
          facilityProducts: {
            where: publicChildWhere,
            orderBy: [{ displayOrder: 'asc' as const }, { id: 'asc' as const }],
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              currency: true,
              facilityProductFiles: {
                where: publicChildWhere,
                orderBy: { id: 'asc' as const },
                select: fileSelect,
              },
            },
          },
          facilityVpsPopup: {
            where: publicChildWhere,
            orderBy: { id: 'asc' as const },
            select: {
              id: true,
              name: true,
              description: true,
              url: true,
              fileUrl: true,
              poiId: true,
              isVisible: true,
            },
          },
          congestionSectionFacilitiesCongestionSectionIdTocongestionSection: {
            select: {
              isVisible: true,
              isDeleted: true,
              overwriteCongestionStatus: true,
              threshold: true,
              congestionSensorDevice: {
                select: {
                  congestionData: {
                    where: { isDeleted: false },
                    orderBy: [{ createdAt: 'desc' as const }, { id: 'desc' as const }],
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

export type PoiDetailRow = Prisma.PoiGetPayload<{ select: typeof POI_DETAIL_SELECT }>;

type DetailMapping = PoiDetailRow['facilityPoiMapping'][number];
type DetailFacility = NonNullable<DetailMapping['facilities']>;

export function toPoiDetailResponse(
  row: PoiDetailRow,
  now: Date = new Date(),
): PoiDetailResponseDto {
  const destinationCongestionEnabled = row.tourDestinations?.isFacilityCongestionYn === true;
  const destinationVpsEnabled = row.tourDestinations?.isVpsContentsYn === true;
  const useCustomSorting = row.tourDestinations?.isCustomSortingYn === true;

  const sortedMappings = [...row.facilityPoiMapping].sort((left, right) =>
    compareDestinationFacilityOrder(toSortKey(left, now), toSortKey(right, now), useCustomSorting),
  );

  return {
    id: row.id,
    tourDestinationId: row.tourDestinationId,
    name: row.name,
    latitude: row.latitude,
    longitude: row.longitude,
    address: row.address,
    addressDetail: row.addressDetail,
    managementCode: row.managementCode,
    facilityPoiMappings: sortedMappings.map((mapping) =>
      toMappingResponse(mapping, destinationCongestionEnabled, destinationVpsEnabled),
    ),
  };
}

function toSortKey(
  mapping: DetailMapping,
  now: Date,
): { rank: number; sortingNumber: number | null; facilityId: number } {
  const facility = mapping.facilities;
  const status = facility
    ? resolveFacilityOperatingStatus(toOperatingStatusInput(facility), now)
    : null;

  return {
    rank: status ? FACILITY_OPERATING_STATUS_RANK[status] : FACILITY_OPERATING_STATUS_RANK.NO_INFO,
    sortingNumber: mapping.sortingNumber,
    facilityId: mapping.facilityId ?? facility?.id ?? Number.POSITIVE_INFINITY,
  };
}

function toOperatingStatusInput(facility: DetailFacility): FacilityOperatingStatusInput {
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

function toMappingResponse(
  mapping: DetailMapping,
  destinationCongestionEnabled: boolean,
  destinationVpsEnabled: boolean,
): PoiDetailMappingResponseDto {
  return {
    id: mapping.id,
    facilityId: mapping.facilityId,
    sortingNumber: mapping.sortingNumber,
    facility: mapping.facilities
      ? toFacilityResponse(mapping.facilities, destinationCongestionEnabled, destinationVpsEnabled)
      : null,
  };
}

function toFacilityResponse(
  facility: DetailFacility,
  destinationCongestionEnabled: boolean,
  destinationVpsEnabled: boolean,
): PoiDetailFacilityResponseDto {
  const isUsingCongestion = facility.congestionSectionId != null;
  const publicVpsPopups = facility.facilityVpsPopup.map(toVpsPopupResponse);
  const hasVpsPopup = publicVpsPopups.length > 0;

  return {
    id: facility.id,
    name: facility.name,
    description: facility.description,
    contact: facility.contact,
    startAt: facility.startAt,
    endAt: facility.endAt,
    category: facility.categories
      ? {
          id: facility.categories.id,
          name: facility.categories.name,
          iconKey: facility.categories.iconKey ?? facility.categories.categories?.iconKey ?? null,
          categoryColorCodes:
            facility.categories.categoryColorCodes ??
            facility.categories.categories?.categoryColorCodes ??
            null,
          parent: facility.categories.categories
            ? {
                id: facility.categories.categories.id,
                name: facility.categories.categories.name,
              }
            : null,
        }
      : null,
    facilityFiles: facility.facilityFile,
    facilityOperatingSchedules: facility.facilityOperatingSchedule.map((schedule) => ({
      id: schedule.id,
      dayOfWeek: schedule.dayOfWeek,
      openingTime: schedule.openingTime,
      closingTime: schedule.closingTime,
      facilityBreakSchedules: schedule.facilityBreakSchedule,
    })),
    facilityHolidaySchedules: facility.facilityHolidaySchedule,
    facilityButtons: facility.facilityButtons,
    facilityProductGuideFiles: facility.facilityProductGuideFiles,
    facilityProducts: facility.facilityProducts,
    facilityVpsPopups: destinationVpsEnabled && hasVpsPopup ? publicVpsPopups : [],
    congestionStatus: resolveCongestionStatus(facility, destinationCongestionEnabled),
    isUsingCongestion,
    hasVpsPopup,
  };
}

function toVpsPopupResponse(
  popup: DetailFacility['facilityVpsPopup'][number],
): PoiDetailVpsPopupResponseDto {
  return {
    id: popup.id,
    name: popup.name,
    description: popup.description,
    url: popup.url,
    fileUrl: popup.fileUrl,
    poiId: popup.poiId,
    isVisible: popup.isVisible,
  };
}

function resolveCongestionStatus(
  facility: DetailFacility,
  destinationCongestionEnabled: boolean,
): PoiCongestionLevel {
  if (!destinationCongestionEnabled || facility.congestionSectionId == null) {
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
