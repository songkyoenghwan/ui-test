import type { FacilityOperatingStatus } from '@/types/search';

const SEOUL_TIME_ZONE = 'Asia/Seoul';

export function formatOperatingStatus(input: { status: FacilityOperatingStatus; nextTransitionAt: string | null }): string {
	const time = formatTransitionTime(input.nextTransitionAt);

	switch (input.status) {
		case 'OUT_OF_PERIOD':
			return '미운영';
		case 'HOLIDAY':
			return '오늘 휴무';
		case 'OPERATING':
			return time ? `운영 중 · ${time} 운영 종료` : '운영 중';
		case 'BREAK':
			return time ? `휴게 시간 · ${time} 운영 재시작` : '휴게 시간';
		case 'BEFORE_OPEN':
			return time ? `운영 전 · ${time} 운영 시작` : '운영 전';
		case 'AFTER_CLOSE':
			return '오늘 운영 종료';
		case 'NO_INFO':
			return '운영 정보 없음';
	}
}

function formatTransitionTime(value: string | null): string | null {
	if (!value) return null;
	const date = new Date(value);
	if (!Number.isFinite(date.getTime())) return null;

	return new Intl.DateTimeFormat('ko-KR', {
		timeZone: SEOUL_TIME_ZONE,
		hour: '2-digit',
		minute: '2-digit',
		hourCycle: 'h23',
	}).format(date);
}
