import type { SupportedLang } from './common/locale';

export type TranslateLang = SupportedLang;

export interface TranslateBody {
	/** 번역할 원본 텍스트 */
	text: string;
	/** 번역 대상 언어 코드 */
	target: TranslateLang;
	/** 원본 언어 코드 (생략 시 자동 감지) */
	source?: TranslateLang;
}

export interface TranslateResponse {
	translatedText: string;
	source: string;
	target: string;
}

export interface TranslateManyBody {
	/** 번역할 원본 텍스트 */
	text: string;
	/** 번역 대상 언어 코드 목록 */
	targets: TranslateLang[];
	/** 원본 언어 코드 (생략 시 자동 감지) */
	source?: TranslateLang;
}

export interface TranslateManyResponse {
	translations: Partial<Record<TranslateLang, string>>;
	source: string;
}
