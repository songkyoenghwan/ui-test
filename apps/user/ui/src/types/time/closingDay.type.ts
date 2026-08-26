import * as z from 'zod';

import type { PagePropsInput } from '@/types/page/page.type';

export const ClosingResultSchema = z.object({
	status: z.enum(['none', 'week', 'day']),
	week: z.array(z.string()).optional(),
	allWeek: z.string().optional(),
	dayWeek: z.array(z.string()).optional(),
	day: z.string().optional(),
	view: z.enum(['reg', 'detail']).default('reg'),
});

export type ClosingResult = z.infer<typeof ClosingResultSchema>;

export interface Props {
	result?: ClosingResult;
	checked?: boolean;
	error?: boolean;
	view?: PagePropsInput['view'];
}

export const createClosingResult = (): ClosingResult => ({
	status: 'none',
	week: [],
	allWeek: '',
	dayWeek: [],
	day: '1',
	view: 'reg',
});
