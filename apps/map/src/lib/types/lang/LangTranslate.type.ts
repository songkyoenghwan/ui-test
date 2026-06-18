import * as z from 'zod';

export const LangField = z.object({
	value: z.string(),
	error: z.boolean(),
});

export const TranslateSchema = z.object({
	itemId: z.uuid(),
	open: z.enum(['open', 'close']).default('close'),
	lang: z.object({
		ko: LangField,
		en: LangField,
		zh: LangField,
		ja: LangField,
		th: LangField,
		vi: LangField,
	}),
	maxlength: z.number().optional(),
	view: z.enum(['reg', 'detail']).default('reg'),
});

export type TranslateProps = z.infer<typeof TranslateSchema>;

export type LangTranslateKey = keyof TranslateProps['lang'];

export type ViewStateRecord = Record<LangTranslateKey, boolean>;

export const LANG_KEYS: LangTranslateKey[] = ['ko', 'en', 'zh', 'ja', 'th', 'vi'];

export const createTranslateLang = (): TranslateProps['lang'] => ({
	ko: { value: '', error: false },
	en: { value: '', error: false },
	zh: { value: '', error: false },
	ja: { value: '', error: false },
	th: { value: '', error: false },
	vi: { value: '', error: false },
});

export interface Props {
	itemId?: string;
	open?: 'open' | 'close';
	lang?: TranslateProps['lang'];
	maxlength?: number;
	view?: 'reg' | 'detail';
}
