import { CongestionStatus } from '../generated/prisma/enums';
import { CONGESTION_LEVEL_NONE, type PoiCongestionLevel } from './constants/poi.constant';

const CONGESTION_STATUSES = new Set<CongestionStatus>(Object.values(CongestionStatus));

export function mapCongestionLevelByThreshold(
  countedPeople: number | null | undefined,
  threshold: number | null | undefined,
): PoiCongestionLevel {
  if (
    countedPeople == null ||
    !Number.isFinite(countedPeople) ||
    countedPeople < 0 ||
    threshold == null ||
    !Number.isFinite(threshold) ||
    threshold <= 0
  ) {
    return CONGESTION_LEVEL_NONE;
  }

  const pct = (countedPeople / threshold) * 100;
  if (pct < 40) {
    return CongestionStatus.RELAXED;
  }
  if (pct < 60) {
    return CongestionStatus.NORMAL;
  }
  if (pct < 70) {
    return CongestionStatus.CROWDED;
  }

  return CongestionStatus.VERY_CROWDED;
}

export function resolveFacilityCongestionStatus(input: {
  overwriteCongestionStatus?: CongestionStatus | null;
  countedPeople?: number | null;
  threshold?: number | null;
}): PoiCongestionLevel {
  if (input.overwriteCongestionStatus && CONGESTION_STATUSES.has(input.overwriteCongestionStatus)) {
    return input.overwriteCongestionStatus;
  }

  return mapCongestionLevelByThreshold(input.countedPeople, input.threshold);
}
