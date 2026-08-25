<script lang="ts">
	import * as m from '@/paraglide/messages.js';
	import { setPointSheetUi } from '@/src/stores/sheetUiStore';
	import { langState } from '@/stores/globalStore';
	import { detailViewState, searchViewState, updateViewState, searchFormViewState } from '@/stores/uxStore';
	import Icons from '@/svelte/icons/Icons.svelte';

	type TabState = 'ai-recommend' | 'popularity' | 'recent-searches' | '';

	let { tabState = $bindable<TabState>('ai-recommend') } = $props();

	const changeHandler = (nextTab: Exclude<TabState, ''>) => {
		tabState = nextTab;

		if ($detailViewState === 'ai') {
			setPointSheetUi('max');
		}

		if ($searchViewState === 'departureSearch') {
			updateViewState({
				layout: 'search',
				detail: 'idle',
				search: 'departureSearch',
			});

			searchFormViewState.set(
				nextTab === 'recent-searches' ? 'search' : nextTab === 'ai-recommend' ? 'recommend' : 'popularity',
			);
		}
	};

	$effect(() => {
		if ($searchViewState !== 'departureSearch') return;

		if ($searchFormViewState === 'recommend') {
			tabState = 'ai-recommend';
			return;
		}

		if ($searchFormViewState === 'popularity') {
			tabState = 'popularity';
			return;
		}

		tabState = 'recent-searches';
		if ($searchFormViewState !== 'search') {
			searchFormViewState.set('search');
		}
	});
</script>

{#snippet tabElm()}
	<div
		class={[
			'grid rounded-lg bg-slate-100 p-1 *:min-h-8 *:text-center',
			$searchViewState === 'departureSearch' ? 'grid-cols-3' : 'grid-cols-2',
		]}
	>
		{#if $searchViewState === 'departureSearch'}
			<label class="flex items-center justify-center gap-1 rounded-sm bg-slate-100 text-black has-checked:bg-white">
				<input
					type="radio"
					bind:group={tabState}
					value="recent-searches"
					class="peer sr-only"
					onchange={() => changeHandler('recent-searches')}
				/>
				{#if tabState === 'recent-searches'}
					<Icons name="search-status-on" cls="size-4" />
				{:else}
					<Icons name="search-status-off" cls="size-4 fill-121212" />
				{/if}
				{m.usr_nav_101_04({ locale: $langState })}
			</label>
		{/if}
		<label class="flex items-center justify-center gap-1 rounded-sm bg-slate-100 text-black has-checked:bg-white">
			<input
				type="radio"
				bind:group={tabState}
				value="ai-recommend"
				class="peer sr-only"
				onchange={() => changeHandler('ai-recommend')}
			/>
			{#if tabState === 'ai-recommend'}
				<Icons name="ai-on" cls="size-4" />
			{:else}
				<Icons name="ai-off" cls="size-4 fill-121212" />
			{/if}
			{m.usr_rec_001_01({ locale: $langState })}
		</label>
		<label class="flex items-center justify-center gap-1 rounded-sm bg-slate-100 text-black has-checked:bg-white">
			<input
				type="radio"
				bind:group={tabState}
				value="popularity"
				class="peer sr-only"
				onchange={() => changeHandler('popularity')}
			/>
			{#if tabState === 'popularity'}
				<Icons name="trending-on" cls="size-4" />
			{:else}
				<Icons name="trending-off" cls="size-4 fill-121212" />
			{/if}
			{m.usr_rec_001_04({ locale: $langState })}
		</label>
	</div>
{/snippet}

{#if ['ai'].includes($detailViewState)}
	{@render tabElm()}
{/if}

{#if ['departureSearch'].includes($searchViewState)}
	<div class="z-1 grid w-full max-w-dvw items-center bg-white px-5 pt-1 pb-3 transition-all starting:divide-transparent">
		{@render tabElm()}
	</div>
{/if}
