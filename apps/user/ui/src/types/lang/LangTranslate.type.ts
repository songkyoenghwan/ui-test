import * as z from 'zod';

import type { PagePropsInput } from '@/types/page/page.type';

export const LangField = z.object({
	ko: z.string(),
	en: z.string(),
	zh: z.string().optional(),
	ja: z.string().optional(),
	th: z.string().optional(),
	vi: z.string().optional(),
});
export const langError = z.object({
	ko: z.boolean().optional(),
	en: z.boolean().optional(),
	zh: z.boolean().optional(),
	ja: z.boolean().optional(),
	th: z.boolean().optional(),
	vi: z.boolean().optional(),
});

export const TranslateSchema = z.object({
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
	btnPreview: z.string().optional(),
});

export type TranslateProps = z.infer<typeof TranslateSchema>;
export type TranslateErrorProps = z.infer<typeof langError>;

export type LangTranslateKey = keyof TranslateProps['lang'];

export type ViewStateRecord = Record<LangTranslateKey, boolean>;

export const LANG_KEYS: LangTranslateKey[] = ['ko', 'en', 'zh', 'ja', 'th', 'vi'];

export const LangInfoSchema = z.object({
	key: z.enum([...LANG_KEYS]),
	label: z.string(),
});
export type LangInfo = z.infer<typeof LangInfoSchema>;
export type TranslateLang = z.infer<typeof LangField>;

export const LANGS: LangInfo[] = [
	{ key: 'ko', label: '한국어(KO)' },
	{ key: 'en', label: '영어(EN)' },
	{ key: 'zh', label: '중국어(ZH)' },
	{ key: 'ja', label: '일본어(JA)' },
	{ key: 'th', label: '태국어(TH)' },
	{ key: 'vi', label: '베트남어(VI)' },
];

export const createTranslateLang = (): TranslateLang => ({
	ko: '',
	en: '',
	zh: '',
	ja: '',
	th: '',
	vi: '',
});

export interface Props {
	open?: 'open' | 'close';
	lang?: TranslateLang;
	TranslateErrorProps?: TranslateErrorProps;
	maxlength?: number;
	view?: PagePropsInput['view'];
	btnPreview: string;
}
