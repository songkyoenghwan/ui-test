import * as z from 'zod';

export const DayWeekSchema = z.object({
	name: z.string(), // 'mon', 'tue' 등
	txt: z.string(), // '월', '화' 등
});

export const OperatingTimeSchema = z.object({
	timeStart: z.string().default('00:00'),
	timeEnd: z.string().default('00:00'),
	rest: z.boolean(),
	error: z.boolean(),
	restStart: z.string(),
	restEnd: z.string(),
});

export const OperatingHourColsSchema = z.object({
	id: z.string(),
	dayWeek: z.array(z.string()).optional(),
	time: z.array(OperatingTimeSchema),
});

export const OperatingHourResultSchema = z.object({
	status: z.enum(['always', 'week']),
	cols: z.array(OperatingHourColsSchema).optional(),
	timeError: z.boolean().optional(),
	weekError: z.boolean().optional(),
	view: z.enum(['reg', 'detail']).default('reg'),
});

export type DayWeek = z.infer<typeof DayWeekSchema>;
export type OperatingTime = z.infer<typeof OperatingTimeSchema>;
export type OperatingHourCols = z.infer<typeof OperatingHourColsSchema>;
export type OperatingHourResult = z.infer<typeof OperatingHourResultSchema>;

export interface Props {
	itemId?: string;
	result?: OperatingHourResult;
	rest?: string;
	error?: boolean;
	view?: 'reg' | 'detail';
}

export const createDefaultOperatingTime = (): OperatingTime => ({
	timeStart: '00:00',
	timeEnd: '00:00',
	rest: false,
	error: false,
	restStart: '',
	restEnd: '',
});

export const createDefaultOperatingHourCol = (id: string): OperatingHourCols => ({
	id,
	dayWeek: [],
	time: [createDefaultOperatingTime()], // 위에서 만든 시간 팩토리를 조립합니다.
});

export const createDefaultOperatingHourResult = (): OperatingHourResult => ({
	status: 'always',
	cols: [],
	timeError: false,
	weekError: false,
	view: 'reg',
});
