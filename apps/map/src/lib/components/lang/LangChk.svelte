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
	import { initLangStore, langStore, toggleLang } from '$lib/stores/langStore';
	import { createChkLang, type Props } from '$lib/types/lang/langChk.type';
	import { LANGS } from '$lib/types/lang/LangTranslate.type';
	import { untrack } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

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
				{:else if $langStore.lang[item.key]}
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
						checked={$langStore.lang[item.key]}
						change={(e: Event) => {
							lang[item.key] = e.currentTarget.checked;
							toggleLang(item.key);
						}}
					></ui-checkbox>
				{/if}
			{/each}
		</div>
	{/if}
{/if}
