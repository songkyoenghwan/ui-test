import type { PagePropsInput } from '$lib/types/page/page.type';
import * as z from 'zod';

export const DayWeekSchema = z.object({
	name: z.string(), // 'mon', 'tue' 등
	txt: z.string(), // '월', '화' 등
});

export const OperatingTimeSchema = z.object({
	timeStart: z.string().default('00:00'),
	timeEnd: z.string().default('00:00'),
	rest: z.boolean().optional(),
	error: z.boolean().optional(),
	restStart: z.string().optional(),
	restEnd: z.string().optional(),
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
	view?: PagePropsInput['view'];
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
	time: createDefaultOperatingTime(),
});

export const createDefaultOperatingHourResult = (): OperatingHourResult => ({
	status: 'always',
	cols: [
		{
			dayWeek: [],
			id: '',
			time: {
				error: false,
				rest: false,
				restEnd: '',
				restStart: '',
				timeEnd: '00:00',
				timeStart: '00:00',
			},
		},
	],
	timeError: false,
	weekError: false,
	view: 'reg',
});
