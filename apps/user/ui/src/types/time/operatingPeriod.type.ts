import * as z from 'zod';

import type { PagePropsInput } from '@/types/page/page.type';

export const OperatingResultSchema = z.object({
	status: z.enum(['always', 'period']),
	day: z.string().optional(),
	view: z.enum(['reg', 'detail']).default('reg').optional(),
	re: z.string().optional(),
});

export type OperatingResult = z.infer<typeof OperatingResultSchema>;

export const createDefaultOperatingResult = (): OperatingResult => ({
	status: 'always',
	day: '',
});

export interface Props {
	result?: OperatingResult;
	checked?: boolean;
	disabled?: boolean;
	view?: PagePropsInput['view'];
	re?: string;
}
