import { pageSchema, type PagePropsInput } from '$lib/types/page/page.type';
import * as z from 'zod';

export const LangChkField = z.object({
	ko: z.literal(true),
	en: z.literal(true),
	zh: z.boolean(),
	ja: z.boolean(),
	th: z.boolean(),
	vi: z.boolean(),
});

export const LangChkSchema = z.object({
	lang: LangChkField,
	view: pageSchema,
});

export type LangChkProps = z.infer<typeof LangChkSchema>;

export const createChkLang = (): LangChkProps['lang'] => ({
	ko: true,
	en: true,
	zh: false,
	ja: false,
	th: false,
	vi: false,
});

export interface Props {
	lang?: LangChkProps['lang'];
	view?: PagePropsInput['view'];
}
