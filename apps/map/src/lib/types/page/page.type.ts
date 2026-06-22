// $lib/types/page/page.type.ts
import * as z from 'zod';

export const viewSchema = z.enum(['reg', 'detail', 'edit']).default('reg').optional();

export const pageSchema = z.object({
	view: viewSchema,
});

export type PagePropsInput = z.input<typeof pageSchema>;
export type PageProps = z.infer<typeof pageSchema>;
