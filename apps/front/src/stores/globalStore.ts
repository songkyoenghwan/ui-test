import { persistentAtom } from '@nanostores/persistent';
import { atom, map } from 'nanostores';

import type { LocalizedText, SupportedLanguages } from '@/types/common/locale';
import { type LangTranslateKey } from '@/types/lang/LangTranslate.type';

type LocalizedKey = keyof LocalizedText;

// Nanostores Map 스토어 개통 (Svelte 컴포넌트 구독용으로 관례상 $ 기호 명명)
export const langStore = map<SupportedLanguages>({
	ko: true,
	en: true,
	zh: false,
	ja: false,
	th: false,
	vi: false,
});

/**
 * 특정 언어의 활성화 상태를 직결 수정하는 이벤트
 */
export function setLangActive(key: LangTranslateKey, value: boolean) {
	langStore.setKey(key, value);
}

/**
 * 특정 언어의 상태를 반전(Toggle)시키는 이벤트
 */
export function toggleLang(key: LangTranslateKey) {
	const current = langStore.get();
	const next = !current[key];

	langStore.setKey(key, next);
}

export function initLangStore(lang: { ko: boolean; en: boolean; zh: boolean; ja: boolean; th: boolean; vi: boolean }) {
	langStore.set({
		ko: true,
		en: true,
		zh: Boolean(lang.zh),
		ja: Boolean(lang.ja),
		th: Boolean(lang.th),
		vi: Boolean(lang.vi),
	});
}

/**
 * 모든 언어 상태를 초기화(Reset)하는 이벤트
 */
export function resetLangs() {
	langStore.set({
		ko: true,
		en: true,
		zh: false,
		ja: false,
		th: false,
		vi: false,
	});
}

export const currentTourDestinationId = persistentAtom<number>('currentTourDestinationId', 1, {
	encode: JSON.stringify,
	decode: JSON.parse,
});
export function getCurrentTourDestinationId() {
	return currentTourDestinationId.get();
}

export function setCurrentTourDestinationId(id: number) {
	currentTourDestinationId.set(id);
}

export function watchCurrentTourDestinationId(callback: (id: number) => void) {
	return currentTourDestinationId.subscribe(callback);
}

export const langState = atom('ko');

export const pickText = (text: Partial<LocalizedText>, lang: string) => {
	const key = lang as LocalizedKey;
	return text[key] ?? text.ko ?? '';
};

export const colorState = atom('#274fa8');
export const loadingState = atom(false);
