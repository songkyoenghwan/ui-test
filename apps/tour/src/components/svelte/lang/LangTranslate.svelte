<svelte:options
	customElement={{
		tag: 'lang-translate',
		shadow: 'none',
		props: {
			open: { type: 'String', reflect: true },
			maxlength: { type: 'String', attribute: 'data-max-length' },
			lang: { type: 'Object' },
			view: { type: 'String' },
			hidden: { type: 'String', attribute: 'data-text-hidden' },
		},
	}}
/>

<script lang="ts">
	import { langStore } from '@/stores/langStore';
	import type { LocalizedText } from '@/types/common/locale';
	import { type LangTranslateKey } from '@/types/lang/LangTranslate.type';
	import type { PagePropsInput } from '@/types/page/page.type';
	import { untrack } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	type LocalizedKey = keyof LocalizedText;

	export interface Props {
		open?: 'open' | 'close';
		lang?: LocalizedText;
		maxlength?: number;
		view?: PagePropsInput['view'];
		hidden: string;
		btnPreview: string;
		onUpdate?: (key: LocalizedKey, txt: string) => void;
	}

	let {
		lang = $bindable(),
		error,
		open = 'close',
		maxlength,
		view = 'reg',
		hidden = '',
		btnPreview = '',
		click,
		onUpdate,
	}: Props = $props();

	export const LANGS: { key: LocalizedKey; label: string }[] = [
		{ key: 'ko', label: '한국어(KO)' },
		{ key: 'en', label: '영어(EN)' },
		{ key: 'zh', label: '중국어(ZH)' },
		{ key: 'ja', label: '일본어(JA)' },
		{ key: 'th', label: '태국어(TH)' },
		{ key: 'vi', label: '베트남어(VI)' },
	];

	export const createTranslateLang = () => ({
		ko: '',
		en: '',
		zh: '',
		ja: '',
		th: '',
		vi: '',
	});

	let itemId = uuidv4();
	let langToggle = $state(false);
	let local = $state(createTranslateLang());
	let isTranslating = $state(false);
	let btnView = $derived($langStore.zh || $langStore.ja || $langStore.th || $langStore.vi);
	const LANG_ORDER: LocalizedKey[] = ['ko', 'en', 'zh', 'ja', 'th', 'vi'];
	const MANY_TRANSLATE_TARGETS: LocalizedKey[] = ['zh', 'ja', 'th', 'vi'];
	function sortLangObject(value?: Partial<LocalizedText> | null): LocalizedText {
		const source = value ?? {};

		return LANG_ORDER.reduce((acc, key) => {
			acc[key] = source[key] ?? '';
			return acc;
		}, createTranslateLang());
	}

	function dispatchUpdate(key: LocalizedKey, txt: string) {
		$host().dispatchEvent(
			new CustomEvent('update', {
				detail: { key, txt },
				bubbles: true,
				composed: true,
			}),
		);
	}

	function getCookie(name: string) {
		return (
			document.cookie
				.split('; ')
				.find((row) => row.startsWith(`${name}=`))
				?.split('=')[1] ?? ''
		);
	}

	function applyTranslatedValue(key: LocalizedKey, value?: string) {
		if (value === undefined) return;

		local[key] = value;
		dispatchUpdate(key, value);
	}

	async function translateFromKo() {
		const sourceText = local.ko.trim();
		if (!sourceText || isTranslating) return;

		isTranslating = true;
		langToggle = false;

		try {
			const enRes = await fetch('/api/google/translate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRF-Token': decodeURIComponent(getCookie('csrfToken')),
				},
				credentials: 'include',
				body: JSON.stringify({
					text: sourceText,
					target: 'en',
					source: 'ko',
				}),
			});

			if (!enRes.ok) {
				throw new Error(`Failed to translate ko to en: ${enRes.status}`);
			}

			const enData = await enRes.json();
			const englishText = enData.data?.translatedText ?? '';
			applyTranslatedValue('en', englishText);

			if (!englishText) return;

			const manyRes = await fetch('/api/google/translate-many', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRF-Token': decodeURIComponent(getCookie('csrfToken')),
				},
				credentials: 'include',
				body: JSON.stringify({
					text: englishText,
					targets: MANY_TRANSLATE_TARGETS,
					source: 'en',
				}),
			});

			if (!manyRes.ok) {
				throw new Error(`Failed to translate en to many: ${manyRes.status}`);
			}

			const manyData = await manyRes.json();
			const translations = manyData.data?.translations ?? {};
			MANY_TRANSLATE_TARGETS.forEach((key) => {
				applyTranslatedValue(key, translations[key]);
			});
		} catch (error) {
			console.error('자동번역 실패:', error);
			alert('자동번역에 실패했습니다.');
		} finally {
			isTranslating = false;
		}
	}

	$effect(() => {
		if (lang && typeof lang === 'object') {
			const langSnap = sortLangObject($state.snapshot(lang));

			untrack(() => {
				local.ko = langSnap.ko ?? '';
				local.en = langSnap.en ?? '';
				local.zh = langSnap.zh ?? '';
				local.ja = langSnap.ja ?? '';
				local.th = langSnap.th ?? '';
				local.vi = langSnap.vi ?? '';
			});
		}
	});

	let hasExtraLang = $derived(!!($langStore.ja || $langStore.zh || $langStore.th || $langStore.vi));

	function isHidden(key: LangTranslateKey) {
		if (key === 'ko') return false;

		if (!hasExtraLang) {
			return key !== 'en';
		}

		if (key === 'en') {
			return langToggle;
		}

		return $langStore[key] ? langToggle : true;
	}

	$effect(() => {
		const snap = $state.snapshot(local);

		untrack(() => {
			if (lang && typeof lang === 'object') {
				lang = sortLangObject(snap);
			}
		});
	});
</script>

{#if local}
	{#if view === 'detail' || view === 'side'}
		<ul class={['flex flex-col', btnPreview === 'btn-name' ? 'gap-1.5 pt-1.5' : view === 'side' ? 'gap-1.5' : '']}>
			{#each LANGS as item}
				{@const key = item.key}

				{#if view === 'side'}
					{#if String(hidden).toUpperCase() !== String(key).toUpperCase()}
						<li class="flex items-center gap-1.5">
							<p class="min-w-5 text-center text-xs text-slate-600">{String(key).toUpperCase()}</p>

							{#if String(local[key]) === ''}
								<p class="text-xs text-slate-500">없음</p>
							{:else}
								<p class="text-xs text-black">{String(local[key]).toUpperCase()}</p>
							{/if}
						</li>
					{/if}
				{:else if $langStore[key] && local[key] !== ''}
					<li
						class={[
							btnPreview === 'btn-name'
								? 'grid grid-cols-[32px_1fr] '
								: 'mt-3 grid grid-cols-[44px_1fr] place-content-center border-t border-t-slate-200 pt-3 first:mt-0 first:border-t-0 first:pt-0',
						]}
					>
						<ui-txt size="sm" txt={String(key).toUpperCase()} cls="text-cms-3 font-semibold text-center"></ui-txt>
						<ui-txt size="sm" txt={local[key].toUpperCase()} cls="text-black"></ui-txt>
					</li>
				{/if}
			{/each}
		</ul>
	{:else}
		<section class="group/lang">
			<ul class="flex flex-col gap-0.5">
				{#each LANGS as item, i (`${itemId}-${i}`)}
					{@const key = item.key}
					<li
						class={[
							'grid grid-cols-[28px_1fr] items-center gap-0.5 has-[ui-btn]:grid-cols-[28px_1fr_80px]',
							isHidden(item.key) && 'hidden',
						]}
					>
						<label for={`${itemId}-${item.key}`} class="label">
							{String(item.key).toUpperCase()}
						</label>
						<input
							type="text"
							id={`${itemId}-${item.key}`}
							class="input-text s {String(key).trim() === '' ? 'error' : ''}"
							placeholder="내용을 입력해 주세요."
							{maxlength}
							bind:value={local[item.key]}
							oninput={(e) => {
								const input = e.currentTarget as HTMLInputElement;
								dispatchUpdate(item.key, input.value);
							}}
						/>
						{#if item.key === 'ko'}
							<ui-btn
								variant="secondary"
								size="md"
								txt="자동번역"
								icon-name="translate"
								class="flex-none"
								cls="stroke-cms-3"
								disabled={isTranslating}
								click={translateFromKo}
								mousedown={() => {
									langToggle = false;
								}}
							></ui-btn>
						{/if}
					</li>
				{/each}
			</ul>

			{#if btnView}
				<div class="mt-2 flex items-center gap-2">
					<ui-btn
						variant="secondary"
						size="md"
						txt="다국어 입력"
						icon-name="arrow-down"
						class="flex-1"
						cls="stroke-cms-3"
						icon-cls={langToggle ? 'size-4' : 'size-4 rotate-180'}
						icon-pos="lt"
						aria-expanded={open === 'close' ? 'false' : 'true'}
						click={(e: Event) => {
							e.preventDefault();
							langToggle = !langToggle;
						}}
					></ui-btn>
				</div>
			{/if}
		</section>
	{/if}
{/if}
