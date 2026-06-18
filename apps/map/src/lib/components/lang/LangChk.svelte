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
	import { initLangStore, langStore, toggleLang } from '$lib/stores/langStore';

	let { lang = $bindable(createChkLang()), view = 'reg' }: Props = $props();

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
{:else}
	<ui-txt txt="한국어(KO)" class="flex-none"></ui-txt>
	<ui-txt txt="영어(EN)" class="flex-none"></ui-txt>
	<ui-checkbox
		item-id="lang-zh"
		txt="중국어(ZH)"
		class="flex-none"
		checked={$langStore.lang.zh}
		change={() => toggleLang('zh')}
	></ui-checkbox>

	<ui-checkbox
		item-id="lang-ja"
		txt="일본어(JA)"
		class="flex-none"
		checked={$langStore.lang.ja}
		change={() => toggleLang('ja')}
	></ui-checkbox>

	<ui-checkbox
		item-id="lang-th"
		txt="태국어(TH)"
		class="flex-none"
		checked={$langStore.lang.th}
		change={() => toggleLang('th')}
	></ui-checkbox>

	<ui-checkbox
		item-id="lang-vi"
		txt="베트남어(VI)"
		class="flex-none"
		checked={$langStore.lang.vi}
		change={() => toggleLang('vi')}
	></ui-checkbox>
{/if}
