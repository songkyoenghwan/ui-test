export type SupportedLang = 'ko' | 'en' | 'ja' | 'zh' | 'vi' | 'th';

/** 지원 언어별 활성화 여부 */
export type SupportedLanguages = Record<SupportedLang, boolean>;

type RequiredLang = 'ko' | 'en';
type OptionalLang = Exclude<SupportedLang, RequiredLang>;

/** 다국어 텍스트 — ko·en 필수, 나머지 선택 */
export type LocalizedText = Record<RequiredLang, string> & Partial<Record<OptionalLang, string>>;
