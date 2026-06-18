import * as z from 'zod';

export const OperatingResultSchema = z.object({
	status: z.enum(['always', 'period']),
	day: z.string().optional(),
});

export type OperatingResult = z.infer<typeof OperatingResultSchema>;

export interface Props {
	itemId?: string;
	result?: OperatingResult;
	checked?: boolean;
	disabled?: boolean;
}

export const createDefaultOperatingResult = (): OperatingResult => ({
	status: 'always',
	day: '',
});
