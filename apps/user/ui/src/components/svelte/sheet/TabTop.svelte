<script lang="ts">
	import * as m from '@/paraglide/messages.js';
	import { setPointSheetUi } from '@/src/stores/sheetUiStore';
	import { langState } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import { searchViewState, detailViewState } from '@/stores/uxStore';
	import type { DepartureSearchTab } from '@/types/search';

	let {
		tabState = $bindable<DepartureSearchTab>('ai-recommend'),
		showAiRecommendationTab = true,
	}: {
		tabState?: DepartureSearchTab;
		showAiRecommendationTab?: boolean;
	} = $props();

	const changeHandler = () => {
		if ($detailViewState === 'ai') {
			setPointSheetUi('max');
		}
	};
</script>

{#snippet tabElm()}
	<div
		class={[
			'grid rounded-lg bg-slate-100 p-1 *:min-h-8 *:text-center',
			$searchViewState === 'departureSearch'
				? showAiRecommendationTab
					? 'grid-cols-3'
					: 'grid-cols-2'
				: 'grid-cols-2',
		]}
	>
		{#if $searchViewState === 'departureSearch'}
			<label class="flex items-center justify-center gap-1 rounded-sm bg-slate-100 text-black has-checked:bg-white">
				<input type="radio" bind:group={tabState} value="recent-searches" class="peer sr-only" />
				{#if tabState === 'recent-searches'}
					<Icons name="search-status-on" cls="size-4" />
				{:else}
					<Icons name="search-status-off" cls="size-4 fill-121212" />
				{/if}
				{m.usr_nav_101_04({ locale: $langState })}
			</label>
		{/if}
		{#if showAiRecommendationTab}
			<label class="flex items-center justify-center gap-1 rounded-sm bg-slate-100 text-black has-checked:bg-white">
				<input type="radio" bind:group={tabState} value="ai-recommend" class="peer sr-only" onclick={changeHandler} />
				{#if tabState === 'ai-recommend'}
					<Icons name="ai-on" cls="size-4" />
				{:else}
					<Icons name="ai-off" cls="size-4 fill-121212" />
				{/if}
				{m.usr_rec_001_01({ locale: $langState })}
			</label>
		{/if}
		<label class="flex items-center justify-center gap-1 rounded-sm bg-slate-100 text-black has-checked:bg-white">
			<input type="radio" bind:group={tabState} value="popularity" class="peer sr-only" onclick={changeHandler} />
			{#if tabState === 'popularity'}
				<Icons name="trending-on" cls="size-4" />
			{:else}
				<Icons name="trending-off" cls="size-4 fill-121212" />
			{/if}
			{m.usr_rec_001_04({ locale: $langState })}
		</label>
	</div>
{/snippet}

{#if $detailViewState === 'ai'}
	{@render tabElm()}
{/if}

{#if ['departureSearch'].includes($searchViewState)}
	<div class="z-1 grid w-full max-w-dvw items-center bg-white px-5 pt-1 pb-3 transition-all starting:divide-transparent">
		{@render tabElm()}
	</div>
{/if}
