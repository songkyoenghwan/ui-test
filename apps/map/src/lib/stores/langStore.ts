import { map } from 'nanostores';

export interface LangState {
	lang: {
		zh: boolean;
		ja: boolean;
		th: boolean;
		vi: boolean;
	};
}

export interface LangAll {
	ko?: { value: string; error: boolean };
	en?: { value: string; error: boolean };
	zh?: { value: string; error: boolean };
	ja?: { value: string; error: boolean };
	th?: { value: string; error: boolean };
	vi?: { value: string; error: boolean };
}

// Nanostores Map 스토어 개통 (Svelte 컴포넌트 구독용으로 관례상 $ 기호 명명)
export const langStore = map<LangState>({
	lang: {
		zh: false,
		ja: false,
		th: false,
		vi: false,
	},
});

type LangSubKey = keyof LangState['lang'];

/**
 * 특정 언어의 활성화 상태를 직결 수정하는 이벤트
 */
export function setLangActive(key: LangSubKey, value: boolean) {
	const currentLang = langStore.get().lang;

	langStore.setKey('lang', {
		...currentLang,
		[key]: value,
	});
}

/**
 * 특정 언어의 상태를 반전(Toggle)시키는 이벤트
 */
export function toggleLang(key: LangSubKey) {
	const currentLang = langStore.get().lang;

	langStore.setKey('lang', {
		...currentLang,
		[key]: !currentLang[key],
	});
}

export function initLangStore(lang: { zh: boolean; ja: boolean; th: boolean; vi: boolean }) {
	langStore.set({
		lang: {
			zh: Boolean(lang.zh),
			ja: Boolean(lang.ja),
			th: Boolean(lang.th),
			vi: Boolean(lang.vi),
		},
	});
}

/**
 * 모든 언어 상태를 초기화(Reset)하는 이벤트
 */
export function resetLangs() {
	langStore.set({
		lang: {
			zh: false,
			ja: false,
			th: false,
			vi: false,
		},
	});
}
