export type DayItem = {
	name: string;
	txt: string;
	chk: boolean;
};

export type TimeItem = {
	id?: string;
	rest: boolean;
	timeStart: string;
	timeEnd: string;
	restStart: string;
	restEnd: string;
};

export type DayGroup = {
	id?: string;
	weekDay: DayItem[];
	time: TimeItem[];
};

export interface Props {
	itemId?: string;
	selected?: string;
	days?: string[];
	result?: DayGroup[];
	cls?: string;
}
