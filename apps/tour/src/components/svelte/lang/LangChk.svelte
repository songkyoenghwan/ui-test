<svelte:options
	customElement={{
		tag: 'lang-chk',
		shadow: 'none',
		props: {
			lang: { type: 'Object', reflect: true },
			view: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	import { initLangStore, langStore, toggleLang } from '@/stores/langStore';
	import type { SupportedLanguages } from '@/types/common/locale';
	import type { PagePropsInput } from '@/types/page/page.type';
	import { untrack } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	type SupportedLanguagesKey = keyof SupportedLanguages;

	export const createChkLang = (): SupportedLanguages => ({
		ko: true,
		en: true,
		zh: false,
		ja: false,
		th: false,
		vi: false,
	});

	export interface Props {
		lang?: SupportedLanguages;
		view?: PagePropsInput['view'];
	}

	export const LANGS: { key: SupportedLanguagesKey; label: string }[] = [
		{ key: 'ko', label: '한국어(KO)' },
		{ key: 'en', label: '영어(EN)' },
		{ key: 'zh', label: '중국어(ZH)' },
		{ key: 'ja', label: '일본어(JA)' },
		{ key: 'th', label: '태국어(TH)' },
		{ key: 'vi', label: '베트남어(VI)' },
	];

	let { lang = $bindable(createChkLang()), view = 'reg' }: Props = $props();

	$effect(() => {
		const snap = $state.snapshot(lang);

		untrack(() => {
			initLangStore({
				zh: snap.zh,
				ja: snap.ja,
				th: snap.th,
				vi: snap.vi,
			});
		});
	});
</script>

{#if lang}
	{#if view === 'detail'}
		<div class="flex flex-wrap items-center gap-5">
			{#each LANGS as item}
				{#if item.key === 'ko' || item.key === 'en'}
					<ui-txt txt={item.label} size="sm" class="flex-none" cls="text-black"></ui-txt>
				{:else if $langStore?.[item.key]}
					<ui-txt txt={item.label} size="sm" class="flex-none" cls="text-black"></ui-txt>
				{/if}
			{/each}
		</div>
	{:else if view === 'reg' || view === 'edit'}
		<div class="flex flex-wrap items-center justify-end gap-5">
			{#each LANGS as item}
				{#if item.key === 'ko' || item.key === 'en'}
					<ui-txt txt={item.label} class="flex-none"></ui-txt>
				{:else}
					<ui-checkbox
						item-id={`lang-chk-${uuidv4()}`}
						txt={item.label}
						class="flex-none"
						checked={$langStore[item.key]}
						change={(e: Event) => {
							const input = e.currentTarget as HTMLInputElement;
							lang[item.key as keyof SupportedLanguages] = input.checked;
							toggleLang(item.key as SupportedLanguagesKey);
						}}
					></ui-checkbox>
				{/if}
			{/each}
		</div>
	{/if}
{/if}
