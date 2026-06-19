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
	import { createChkLang, type Props } from '$/lib/types/lang/langChk.type';
	import { LANGS } from '$/lib/types/lang/LangTranslate.type';
	import { initLangStore, langStore, toggleLang } from '$lib/stores/langStore';
	import { v4 as uuidv4 } from 'uuid';

	let { lang = $bindable(), view = 'reg' }: Props = $props();

	$effect.pre(() => {
		if (lang == null) {
			lang = createChkLang();
		}
	});

	$effect(() => {
		if (lang) {
			initLangStore({
				zh: lang.zh,
				ja: lang.ja,
				th: lang.th,
				vi: lang.vi,
			});
		}
	});
</script>

{#if lang}
	{#if view === 'detail'}
		<ui-txt txt="한국어(KO)" size="sm" class="flex-none" cls="text-black"></ui-txt>
		<ui-txt txt="영어(EN)" size="sm" class="flex-none" cls="text-black"></ui-txt>
		{#if lang?.zh}
			<ui-txt txt="중국어(ZH)" size="sm" class="flex-none" cls="text-black"></ui-txt>
		{/if}

		{#if lang?.ja}
			<ui-txt txt="일본어(JA)" size="sm" class="flex-none" cls="text-black"></ui-txt>
		{/if}

		{#if lang?.th}
			<ui-txt txt="태국어(TH)" size="sm" class="flex-none" cls="text-black"></ui-txt>
		{/if}

		{#if lang?.vi}
			<ui-txt txt="베트남어(VI)" size="sm" class="flex-none" cls="text-black"></ui-txt>
		{/if}
	{:else if view === 'reg'}
		{#each LANGS as lang}
			{#if lang.key === 'ko' || lang.key === 'en'}
				<ui-txt txt={lang.label} class="flex-none"></ui-txt>
			{:else}
				<ui-checkbox
					item-id={`lang-${uuidv4()}`}
					txt={lang.label}
					class="flex-none"
					checked={$langStore.lang[lang.key]}
					change={() => toggleLang(lang.key)}
				></ui-checkbox>
			{/if}
		{/each}
	{/if}
{/if}
