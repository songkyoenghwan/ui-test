<script lang="ts">
	import * as m from '@/paraglide/messages.js';
	import { setSheetMidH } from '@/src/stores/sheetUiStore';
	import { keywordState, langState } from '@/stores/globalStore';
	import {
		aiRecommendationFacilityItems,
		aiRecommendationLoading,
		popularSearchFacilityItems,
	} from '@/stores/pageDataStore';
	import { aiInterest, aiInterestMatching } from '@/stores/uxStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import SearchList from '@/svelte/map/SearchList.svelte';

	let {
		tab,
	}: {
		tab: 'ai-recommend' | 'popularity';
	} = $props();
	let hasSetInitialSnapPoint = $state(false);

	$effect(() => {
		hasSetInitialSnapPoint = true;

		return () => {
			hasSetInitialSnapPoint = false;
		};
	});
</script>

<div class="p-5" bind:clientHeight={null, setSheetMidH}>
	{#if hasSetInitialSnapPoint && tab === 'ai-recommend' && $aiRecommendationFacilityItems.length === 0}
		<div class="flex flex-col items-center justify-center gap-3 text-center">
			<p class="text-[20px] font-bold text-black">{m.usr_rec_001_02({ locale: $langState })}</p>
			{#if $aiRecommendationLoading}
				<svg width="40" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="4" cy="4" r="4" fill="#9D85F2" class="animate-pulse delay-0" />
					<circle cx="20" cy="4" r="4" fill="#9D85F2" class="animate-pulse delay-100" />
					<circle cx="36" cy="4" r="4" fill="#9D85F2" class="animate-pulse delay-200" />
				</svg>
			{/if}
			<p class="text-lg text-slate-400">{m.usr_rec_001_03({ locale: $langState })}</p>
		</div>
	{/if}

	{#if hasSetInitialSnapPoint && $aiInterestMatching}
		<div class="flex min-h-30 flex-col gap-1 text-center">
			<p class="text-[20px] font-bold text-black">{m.usr_rec_001_12({ locale: $langState })}</p>
			<p class="text-base text-slate-400">{m.usr_rec_001_13({ locale: $langState })}</p>
			<div class="flex items-center gap-2 pt-2.5 text-sm">
				<button
					type="button"
					class="flex h-8 flex-[0_0_100px] items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white"
				>
					<Icons name="rotate-left" cls="size-4 stroke-slate-700" />
					<span>{m.usr_rec_001_09({ locale: $langState })}</span>
				</button>
				<button
					type="button"
					class="flex h-8 flex-1 items-center justify-center gap-2 rounded-lg bg-(--base-color) text-white disabled:bg-slate-200 disabled:text-slate-500"
				>
					<Icons name="plus" cls="size-4 fill-white" />
					<span>{m.usr_rec_001_10({ locale: $langState })}</span>
				</button>
			</div>
		</div>
	{/if}

	{#if hasSetInitialSnapPoint && $aiInterest}
		<div class="min-h-30 place-content-center gap-3 text-center">
			<p class="text-[20px] font-bold text-black">{m.usr_rec_001_16({ locale: $langState })}</p>
			<p class="text-base text-slate-400">{m.usr_rec_001_17({ locale: $langState })}</p>
			<div class="flex items-center gap-2 pt-2.5 text-sm">
				<button
					type="button"
					class="flex h-8 flex-1 items-center justify-center gap-2 rounded-lg bg-(--base-color) text-white disabled:bg-slate-200 disabled:text-slate-500"
				>
					<Icons name="map-start" cls="fill-white size-3.5" />
					<span>{m.usr_rec_001_18({ locale: $langState })}</span>
				</button>
			</div>
		</div>
	{/if}

	{#if hasSetInitialSnapPoint && $aiRecommendationFacilityItems.length > 0}
		<p class={['items-center gap-1 text-lg', tab === 'ai-recommend' ? 'flex' : 'hidden']}>
			<Icons name="ai-on" cls="size-4" />
			<strong>{$keywordState}</strong>
			가 많이 찾는 시설이에요
		</p>
	{/if}

	{#if hasSetInitialSnapPoint && $popularSearchFacilityItems.length > 0}
		<div class={['items-center justify-between gap-1', tab === 'popularity' ? 'flex' : 'hidden']}>
			<p class="flex items-center gap-1">
				<Icons name="trending-on" cls="size-4" />
				{m.usr_rec_001_05({ locale: $langState })}
			</p>
			<p class="text-sm text-slate-500">{m.usr_rec_001_06({ locale: $langState })}</p>
		</div>
	{/if}
</div>

<SearchList recommendationTab={tab} />
