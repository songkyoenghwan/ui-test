export interface OperatingScheduleBody {
	/** 요일. 0=일요일, 1=월요일, 2=화요일, 3=수요일, 4=목요일, 5=금요일, 6=토요일 */
	dayOfWeek?: number;
	/** 운영 시작 시간. HH:mm 형식 */
	openingTime?: string;
	/** 운영 종료 시간. HH:mm 형식 */
	closingTime?: string;
}

export interface HolidayScheduleBody {
	/** 반복 주차. 1=첫째 주, 2=둘째 주, 3=셋째 주, 4=넷째 주, 5=다섯째 주 */
	weekOfMonth?: number;
	/** 요일. 0=일요일, 1=월요일, 2=화요일, 3=수요일, 4=목요일, 5=금요일, 6=토요일 */
	dayOfWeek?: number;
	/** 매월 고정 휴무일인 경우에만 값 존재. 예: 1=매월 1일 */
	fixedHoliday?: number;
	/** 휴무 유형 코드 (0=요일, 1=날짜) */
	holidayType?: number;
}

export interface OperatingScheduleResponse {
	/** 운영 스케줄 ID */
	id: number;
	/** 요일. 0=일요일, 1=월요일, 2=화요일, 3=수요일, 4=목요일, 5=금요일, 6=토요일 */
	dayOfWeek: number | null;
	/** 운영 시작 시간. HH:mm 형식 */
	openingTime: string | null;
	/** 운영 종료 시간. HH:mm 형식 */
	closingTime: string | null;
}

export interface HolidayScheduleResponse {
	/** 휴무 스케줄 ID */
	id: number;
	/** 반복 주차. 1=첫째 주, 2=둘째 주, 3=셋째 주, 4=넷째 주, 5=다섯째 주 */
	weekOfMonth: number | null;
	/** 요일. 0=일요일, 1=월요일, 2=화요일, 3=수요일, 4=목요일, 5=금요일, 6=토요일 */
	dayOfWeek: number | null;
	/** 매월 고정 휴무일인 경우에만 값 존재. 예: 1=매월 1일 */
	fixedHoliday: number | null;
	/** 휴무 유형 코드 (0=요일, 1=날짜) */
	holidayType: number | null;
}
