import { CongestionStatus } from '../generated/prisma/enums';
import {
  mapCongestionLevelByThreshold,
  resolveFacilityCongestionStatus,
} from './poi-congestion.util';

describe('poi-congestion.util', () => {
  it('인원/threshold 비율 경계로 혼잡 단계를 나눈다', () => {
    expect(mapCongestionLevelByThreshold(0, 100)).toBe(CongestionStatus.RELAXED);
    expect(mapCongestionLevelByThreshold(39, 100)).toBe(CongestionStatus.RELAXED);
    expect(mapCongestionLevelByThreshold(40, 100)).toBe(CongestionStatus.NORMAL);
    expect(mapCongestionLevelByThreshold(59, 100)).toBe(CongestionStatus.NORMAL);
    expect(mapCongestionLevelByThreshold(60, 100)).toBe(CongestionStatus.CROWDED);
    expect(mapCongestionLevelByThreshold(69, 100)).toBe(CongestionStatus.CROWDED);
    expect(mapCongestionLevelByThreshold(70, 100)).toBe(CongestionStatus.VERY_CROWDED);
    expect(mapCongestionLevelByThreshold(200, 100)).toBe(CongestionStatus.VERY_CROWDED);
  });

  it('인원이나 threshold가 없으면 none이다', () => {
    expect(mapCongestionLevelByThreshold(null, 100)).toBe('none');
    expect(mapCongestionLevelByThreshold(-1, 100)).toBe('none');
    expect(mapCongestionLevelByThreshold(10, null)).toBe('none');
    expect(mapCongestionLevelByThreshold(10, 0)).toBe('none');
  });

  it('overwrite가 있으면 센서 비율보다 우선한다', () => {
    expect(
      resolveFacilityCongestionStatus({
        overwriteCongestionStatus: CongestionStatus.CROWDED,
        countedPeople: 10,
        threshold: 100,
      }),
    ).toBe(CongestionStatus.CROWDED);
  });

  it('overwrite가 없으면 최신 인원과 threshold로 분류한다', () => {
    expect(
      resolveFacilityCongestionStatus({
        overwriteCongestionStatus: null,
        countedPeople: 45,
        threshold: 100,
      }),
    ).toBe(CongestionStatus.NORMAL);
  });
});
