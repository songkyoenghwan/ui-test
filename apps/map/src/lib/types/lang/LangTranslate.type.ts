import * as z from 'zod';

export const LangField = z.object({
	value: z.string(),
	error: z.boolean(),
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

export type LangTranslateKey = keyof TranslateProps['lang'];

export type ViewStateRecord = Record<LangTranslateKey, boolean>;

export const LANG_KEYS: LangTranslateKey[] = ['ko', 'en', 'zh', 'ja', 'th', 'vi'];

export const LangInfoSchema = z.object({
	key: z.enum([...LANG_KEYS]),
	label: z.string(),
});
export type LangInfo = z.infer<typeof LangInfoSchema>;

export const LANGS: LangInfo[] = [
	{ key: 'ko', label: '한국어(KO)' },
	{ key: 'en', label: '영어(EN)' },
	{ key: 'zh', label: '중국어(ZH)' },
	{ key: 'ja', label: '일본어(JA)' },
	{ key: 'th', label: '태국어(TH)' },
	{ key: 'vi', label: '베트남어(VI)' },
];

export const createTranslateLang = (): TranslateProps['lang'] => ({
	ko: { value: '', error: false },
	en: { value: '', error: false },
	zh: { value: '', error: false },
	ja: { value: '', error: false },
	th: { value: '', error: false },
	vi: { value: '', error: false },
});

export interface Props {
	open?: 'open' | 'close';
	lang?: TranslateProps['lang'];
	maxlength?: number;
	view?: 'reg' | 'detail';
	btnPreview: string;
}
