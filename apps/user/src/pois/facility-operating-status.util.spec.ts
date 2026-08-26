import { FacilityOperatingStatus } from './constants/poi.constant';
import {
  parseClockToMinutes,
  resolveFacilityOperatingSnapshot,
  resolveFacilityOperatingStatus,
  type FacilityOperatingStatusInput,
} from './facility-operating-status.util';

describe('facility-operating-status.util', () => {
  const wednesdayAfternoon = new Date('2026-08-19T05:00:00.000Z');

  const weekdaySchedule = (dayOfWeek: number) => ({
    dayOfWeek,
    openingTime: '09:00',
    closingTime: '18:00',
    breaks: [{ breakStartTime: '12:00', breakEndTime: '13:00' }],
  });

  const baseFacility = (
    overrides: Partial<FacilityOperatingStatusInput> = {},
  ): FacilityOperatingStatusInput => ({
    startAt: null,
    endAt: null,
    operatingSchedules: [0, 1, 2, 3, 4, 5, 6].map(weekdaySchedule),
    holidays: [],
    ...overrides,
  });

  it('09:00과 1100 시간 문자열을 분으로 변환한다', () => {
    expect(parseClockToMinutes('09:00')).toBe(540);
    expect(parseClockToMinutes('1100')).toBe(660);
    expect(parseClockToMinutes('1730')).toBe(1050);
    expect(parseClockToMinutes('')).toBeNull();
  });

  it('운영 시간 안이면 운영 중이다', () => {
    expect(resolveFacilityOperatingStatus(baseFacility(), wednesdayAfternoon)).toBe(
      FacilityOperatingStatus.OPERATING,
    );
  });

  it('휴게 구간이면 휴게 시간이다', () => {
    expect(
      resolveFacilityOperatingStatus(baseFacility(), new Date('2026-08-19T03:10:00.000Z')),
    ).toBe(FacilityOperatingStatus.BREAK);
  });

  it('개장 전이면 운영 전이다', () => {
    expect(
      resolveFacilityOperatingStatus(baseFacility(), new Date('2026-08-18T23:30:00.000Z')),
    ).toBe(FacilityOperatingStatus.BEFORE_OPEN);
  });

  it('폐장 후면 운영 종료이다', () => {
    expect(
      resolveFacilityOperatingStatus(baseFacility(), new Date('2026-08-19T10:00:00.000Z')),
    ).toBe(FacilityOperatingStatus.AFTER_CLOSE);
  });

  it('오늘이 휴무 스케줄이면 휴무이다', () => {
    expect(
      resolveFacilityOperatingStatus(
        baseFacility({
          holidays: [{ weekOfMonth: 3, dayOfWeek: 3, holidayType: 0, fixedHoliday: null }],
        }),
        wednesdayAfternoon,
      ),
    ).toBe(FacilityOperatingStatus.HOLIDAY);
  });

  it('오늘 스케줄이 없고 다른 요일 스케줄이 있으면 휴무이다', () => {
    expect(
      resolveFacilityOperatingStatus(
        baseFacility({
          operatingSchedules: [weekdaySchedule(1)],
        }),
        wednesdayAfternoon,
      ),
    ).toBe(FacilityOperatingStatus.HOLIDAY);
  });

  it('운영 기간 밖이면 미운영이다', () => {
    expect(
      resolveFacilityOperatingStatus(
        baseFacility({
          startAt: new Date('2026-08-20T00:00:00.000Z'),
          endAt: new Date('2026-08-30T00:00:00.000Z'),
        }),
        wednesdayAfternoon,
      ),
    ).toBe(FacilityOperatingStatus.OUT_OF_PERIOD);
  });

  it('스케줄이 없으면 운영 정보 없음이다', () => {
    expect(
      resolveFacilityOperatingStatus(baseFacility({ operatingSchedules: [] }), wednesdayAfternoon),
    ).toBe(FacilityOperatingStatus.NO_INFO);
  });

  it('운영 전이면 다음 운영 시작 시각을 반환한다', () => {
    expect(
      resolveFacilityOperatingSnapshot(baseFacility(), new Date('2026-08-18T23:30:00.000Z')),
    ).toEqual({
      status: FacilityOperatingStatus.BEFORE_OPEN,
      nextTransitionAt: new Date('2026-08-19T00:00:00.000Z'),
    });
  });

  it('휴게 중이면 휴게 종료 시각을 반환한다', () => {
    expect(
      resolveFacilityOperatingSnapshot(baseFacility(), new Date('2026-08-19T03:10:00.000Z')),
    ).toEqual({
      status: FacilityOperatingStatus.BREAK,
      nextTransitionAt: new Date('2026-08-19T04:00:00.000Z'),
    });
  });

  it('운영 중이면 운영 종료 시각을 반환한다', () => {
    expect(resolveFacilityOperatingSnapshot(baseFacility(), wednesdayAfternoon)).toEqual({
      status: FacilityOperatingStatus.OPERATING,
      nextTransitionAt: new Date('2026-08-19T09:00:00.000Z'),
    });
  });
});
