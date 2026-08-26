import {
  FacilityOperatingStatus,
  NOON_MINUTES,
  SEOUL_TIME_ZONE,
  WEEKDAY_SUNDAY,
} from './constants/poi.constant';

export interface FacilityBreakTimeInput {
  breakStartTime: string | null;
  breakEndTime: string | null;
}

export interface FacilityOperatingScheduleInput {
  dayOfWeek: number | null;
  openingTime: string | null;
  closingTime: string | null;
  breaks: FacilityBreakTimeInput[];
}

export interface FacilityHolidayScheduleInput {
  weekOfMonth: number | null;
  dayOfWeek: number | null;
  holidayType: number | null;
  fixedHoliday: number | null;
}

export interface FacilityOperatingStatusInput {
  startAt: Date | null;
  endAt: Date | null;
  operatingSchedules: FacilityOperatingScheduleInput[];
  holidays: FacilityHolidayScheduleInput[];
}

export interface SeoulDateTime {
  date: string;
  minutes: number;
  weekday: number;
  dayOfMonth: number;
  month: number;
  year: number;
}

export interface FacilityOperatingSnapshot {
  status: FacilityOperatingStatus;
  nextTransitionAt: Date | null;
}

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: WEEKDAY_SUNDAY,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export function resolveFacilityOperatingStatus(
  facility: FacilityOperatingStatusInput,
  now: Date,
): FacilityOperatingStatus {
  const seoul = getSeoulDateTime(now);

  if (isOutOfOperatingPeriod(facility, seoul.date)) {
    return FacilityOperatingStatus.OUT_OF_PERIOD;
  }

  if (isHoliday(facility.holidays, seoul)) {
    return FacilityOperatingStatus.HOLIDAY;
  }

  const todaySchedule = facility.operatingSchedules.find(
    (schedule) => schedule.dayOfWeek === seoul.weekday,
  );
  if (!todaySchedule) {
    return facility.operatingSchedules.length > 0
      ? FacilityOperatingStatus.HOLIDAY
      : FacilityOperatingStatus.NO_INFO;
  }

  const openingMinutes = parseClockToMinutes(todaySchedule.openingTime);
  const closingMinutes = parseClockToMinutes(todaySchedule.closingTime);
  if (openingMinutes === null || closingMinutes === null) {
    return FacilityOperatingStatus.NO_INFO;
  }

  const timeStatus = classifyOpenHours(seoul.minutes, openingMinutes, closingMinutes);
  if (timeStatus !== FacilityOperatingStatus.OPERATING) {
    return timeStatus;
  }

  const onBreak = todaySchedule.breaks.some((breakTime) => {
    const breakStart = parseClockToMinutes(breakTime.breakStartTime);
    const breakEnd = parseClockToMinutes(breakTime.breakEndTime);
    if (breakStart === null || breakEnd === null) {
      return false;
    }

    return isWithinTimeRange(seoul.minutes, breakStart, breakEnd);
  });

  return onBreak ? FacilityOperatingStatus.BREAK : FacilityOperatingStatus.OPERATING;
}

export function resolveFacilityOperatingSnapshot(
  facility: FacilityOperatingStatusInput,
  now: Date,
): FacilityOperatingSnapshot {
  const status = resolveFacilityOperatingStatus(facility, now);
  const seoul = getSeoulDateTime(now);
  const schedule = facility.operatingSchedules.find((item) => item.dayOfWeek === seoul.weekday);

  if (!schedule) {
    return { status, nextTransitionAt: null };
  }

  if (status === FacilityOperatingStatus.BEFORE_OPEN) {
    return {
      status,
      nextTransitionAt: toSeoulInstant(seoul, parseClockToMinutes(schedule.openingTime)),
    };
  }

  if (status === FacilityOperatingStatus.BREAK) {
    const currentBreak = schedule.breaks.find((breakTime) => {
      const start = parseClockToMinutes(breakTime.breakStartTime);
      const end = parseClockToMinutes(breakTime.breakEndTime);
      return start !== null && end !== null && isWithinTimeRange(seoul.minutes, start, end);
    });

    return {
      status,
      nextTransitionAt: toSeoulInstant(
        seoul,
        parseClockToMinutes(currentBreak?.breakEndTime ?? null),
      ),
    };
  }

  if (status === FacilityOperatingStatus.OPERATING) {
    return {
      status,
      nextTransitionAt: toSeoulInstant(seoul, parseClockToMinutes(schedule.closingTime)),
    };
  }

  return { status, nextTransitionAt: null };
}

function toSeoulInstant(seoul: SeoulDateTime, minutes: number | null): Date | null {
  if (minutes === null) return null;

  const dayOffset = minutes <= seoul.minutes ? 1 : 0;
  return new Date(
    Date.UTC(
      seoul.year,
      seoul.month - 1,
      seoul.dayOfMonth + dayOffset,
      Math.floor(minutes / 60) - 9,
      minutes % 60,
    ),
  );
}

export function getSeoulDateTime(now: Date): SeoulDateTime {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: SEOUL_TIME_ZONE,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const read = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? '';

  const weekdayName = read('weekday');
  const year = Number(read('year'));
  const month = Number(read('month'));
  const dayOfMonth = Number(read('day'));
  const hour = Number(read('hour'));
  const minute = Number(read('minute'));

  return {
    date: `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(dayOfMonth).padStart(2, '0')}`,
    minutes: hour * 60 + minute,
    weekday: WEEKDAY_INDEX[weekdayName] ?? WEEKDAY_SUNDAY,
    dayOfMonth,
    month,
    year,
  };
}

export function parseClockToMinutes(value: string | null): number | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim();
  if (!normalized) {
    return null;
  }

  const colonMatch = /^(\d{1,2}):(\d{2})$/.exec(normalized);
  if (colonMatch) {
    return toMinutes(Number(colonMatch[1]), Number(colonMatch[2]));
  }

  const compactMatch = /^(\d{2})(\d{2})$/.exec(normalized);
  if (compactMatch) {
    return toMinutes(Number(compactMatch[1]), Number(compactMatch[2]));
  }

  return null;
}

function toMinutes(hour: number, minute: number): number | null {
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return null;
  }

  return hour * 60 + minute;
}

function isOutOfOperatingPeriod(facility: FacilityOperatingStatusInput, today: string): boolean {
  const startDate = toDateString(facility.startAt);
  const endDate = toDateString(facility.endAt);
  if (!startDate && !endDate) {
    return false;
  }

  if (startDate && today < startDate) {
    return true;
  }

  return Boolean(endDate && today > endDate);
}

function toDateString(value: Date | null): string | null {
  if (!value) {
    return null;
  }

  return getSeoulDateTime(value).date;
}

function isHoliday(holidays: FacilityHolidayScheduleInput[], seoul: SeoulDateTime): boolean {
  return holidays.some((holiday) => matchesHoliday(holiday, seoul));
}

function matchesHoliday(holiday: FacilityHolidayScheduleInput, seoul: SeoulDateTime): boolean {
  if (holiday.dayOfWeek !== null && holiday.dayOfWeek !== seoul.weekday) {
    return false;
  }

  if (holiday.holidayType === 1) {
    return holiday.dayOfWeek === seoul.weekday;
  }

  if (holiday.weekOfMonth === null) {
    return holiday.dayOfWeek === seoul.weekday;
  }

  const occurrence = Math.floor((seoul.dayOfMonth - 1) / 7) + 1;
  if (holiday.weekOfMonth === 5) {
    return isLastWeekdayOfMonth(seoul);
  }

  return holiday.weekOfMonth === occurrence;
}

function isLastWeekdayOfMonth(seoul: SeoulDateTime): boolean {
  const daysInMonth = new Date(seoul.year, seoul.month, 0).getDate();
  return seoul.dayOfMonth + 7 > daysInMonth;
}

function classifyOpenHours(
  nowMinutes: number,
  openingMinutes: number,
  closingMinutes: number,
): FacilityOperatingStatus {
  if (isWithinTimeRange(nowMinutes, openingMinutes, closingMinutes)) {
    return FacilityOperatingStatus.OPERATING;
  }

  const overnight = openingMinutes > closingMinutes;
  if (!overnight) {
    return nowMinutes < openingMinutes
      ? FacilityOperatingStatus.BEFORE_OPEN
      : FacilityOperatingStatus.AFTER_CLOSE;
  }

  return nowMinutes < NOON_MINUTES
    ? FacilityOperatingStatus.AFTER_CLOSE
    : FacilityOperatingStatus.BEFORE_OPEN;
}

function isWithinTimeRange(nowMinutes: number, startMinutes: number, endMinutes: number): boolean {
  if (startMinutes === endMinutes) {
    return false;
  }

  if (startMinutes < endMinutes) {
    return nowMinutes >= startMinutes && nowMinutes < endMinutes;
  }

  return nowMinutes >= startMinutes || nowMinutes < endMinutes;
}
