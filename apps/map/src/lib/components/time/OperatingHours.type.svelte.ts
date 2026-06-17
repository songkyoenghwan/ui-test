export type DayItem = {
	name: string;
	txt: string;
	chk: boolean;
	error?: false;
};

export type TimeItem = {
	id?: string;
	rest: boolean;
	timeStart: string;
	timeEnd: string;
	restStart: string;
	restEnd: string;
	error?: false;
};

export type DayGroup = {
	id?: string;
	dayWeek: DayItem[];
	time: TimeItem[];
};

interface HourResult {
	status: 'always' | 'week';
	cols: DayGroup[];
	timeError: boolean;
	weekError: boolean;
}
export interface Props {
	itemId?: string;
	result?: HourResult;
	selected?: string;
	rest?: string;
	days?: string[];
	cls?: string;
}
