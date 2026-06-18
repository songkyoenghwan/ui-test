import * as z from 'zod';

export const DayWeekSchema = z.object({
	name: z.string(), // 'mon', 'tue' 등
	txt: z.string(), // '월', '화' 등
});

export const OperatingTimeSchema = z.object({
	timeStart: z.string(),
	timeEnd: z.string(),
	rest: z.boolean(),
	error: z.boolean(),
	restStart: z.string(),
	restEnd: z.string(),
});

export const OperatingHourColsSchema = z.object({
	id: z.string(),
	dayWeek: z.array(z.string()).optional(),
	time: OperatingTimeSchema,
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

export const createDefaultOperatingHourResult = (): OperatingHourResult => ({
	status: 'always',
	cols: [],
	timeError: false,
	weekError: false,
	view: 'reg',
});
