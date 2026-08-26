import { CongestionStatus } from '../../generated/prisma/enums';
import {
  TOUR_DESTINATION_LANGUAGES,
  type TourDestinationLanguage,
} from '../../tour-destinations/constants/tour-destination.constant';

export const POI_LANGUAGES = TOUR_DESTINATION_LANGUAGES;
export type PoiLanguage = TourDestinationLanguage;

export const POI_MARKER_MAX_ITEMS = 500;

export const CONGESTION_LEVEL_NONE = 'none';

export const POI_CONGESTION_LEVELS = [
  CongestionStatus.VERY_CROWDED,
  CongestionStatus.CROWDED,
  CongestionStatus.NORMAL,
  CongestionStatus.RELAXED,
  CONGESTION_LEVEL_NONE,
] as const;

export type PoiCongestionLevel = (typeof POI_CONGESTION_LEVELS)[number];

export const PUBLIC_VISIBILITY = {
  isVisible: true,
  isDeleted: false,
} as const;

export const SEOUL_TIME_ZONE = 'Asia/Seoul';

export enum FacilityOperatingStatus {
  OPERATING = 'OPERATING',
  BREAK = 'BREAK',
  BEFORE_OPEN = 'BEFORE_OPEN',
  AFTER_CLOSE = 'AFTER_CLOSE',
  HOLIDAY = 'HOLIDAY',
  OUT_OF_PERIOD = 'OUT_OF_PERIOD',
  NO_INFO = 'NO_INFO',
}

export const FACILITY_OPERATING_STATUS_RANK: Record<FacilityOperatingStatus, number> = {
  [FacilityOperatingStatus.OPERATING]: 1,
  [FacilityOperatingStatus.BREAK]: 2,
  [FacilityOperatingStatus.BEFORE_OPEN]: 3,
  [FacilityOperatingStatus.AFTER_CLOSE]: 4,
  [FacilityOperatingStatus.HOLIDAY]: 5,
  [FacilityOperatingStatus.OUT_OF_PERIOD]: 6,
  [FacilityOperatingStatus.NO_INFO]: 7,
};

export const WEEKDAY_SUNDAY = 0;
export const NOON_MINUTES = 12 * 60;
