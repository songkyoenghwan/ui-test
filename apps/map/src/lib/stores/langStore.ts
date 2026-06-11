import { map } from 'nanostores';

export interface LangState {
	zh: boolean;
	ja: boolean;
	th: boolean;
	vi: boolean;
}

// Nanostores Map 스토어 개통 (Svelte 컴포넌트 구독용으로 관례상 $ 기호 명명)
export const langStore = map<LangState>({
	zh: false,
	ja: false,
	th: false,
	vi: false,
});

/**
 * 특정 언어의 활성화 상태를 직결 수정하는 이벤트
 */
export function setLangActive(key: keyof LangState, value: boolean) {
	langStore.setKey(key, value);
}

/**
 * 특정 언어의 상태를 반전(Toggle)시키는 이벤트
 */
export function toggleLang(key: keyof LangState) {
	const currentVal = langStore.get()[key];
	langStore.setKey(key, !currentVal);
}

export function initLangStore(zh: any, ja: any, th: any, vi: any) {
	// 가드레일: 들어오는 값이 문자열 "true" 이거나 실제 참(true)인지 판별하는 파서
	const parseBool = (val: any) => val === true || val === 'true' || val === 'Y';

	langStore.set({
		zh: parseBool(zh),
		ja: parseBool(ja),
		th: parseBool(th),
		vi: parseBool(vi),
	});
}

/**
 * 모든 언어 상태를 초기화(Reset)하는 이벤트
 */
export function resetLangs() {
	langStore.set({
		zh: false,
		ja: false,
		th: false,
		vi: false,
	});
}
