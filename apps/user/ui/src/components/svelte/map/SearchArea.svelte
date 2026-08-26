<script lang="ts">
	import { searchViewState } from '@/stores/uxStore';
	import SearchList from '@/svelte/map/SearchList.svelte';
	import Category from '@/svelte/map/Category.svelte';
	import TabTop from '@/svelte/sheet/TabTop.svelte';
	import { departureSearchTab, destinationDetail } from '@/stores/pageDataStore';

	let showAiRecommendationTab = $derived($destinationDetail?.isAiRecommendYn === true);

	$effect(() => {
		if (!showAiRecommendationTab && $departureSearchTab === 'ai-recommend') {
			departureSearchTab.set('recent-searches');
		}
	});
</script>

{#if ['default', 'search', 'departureSearch'].includes($searchViewState)}
	<section
		class={[
			'fixed top-16 z-40 grid w-full max-w-dvw items-center transition-all transition-discrete duration-5 starting:divide-transparent',
			($searchViewState === 'search' || $searchViewState === 'recommend' || $searchViewState === 'departureSearch') &&
				'h-[calc(100dvh-4rem)] min-h-0 grid-rows-[48px_minmax(0,1fr)] divide-y-4 divide-slate-200 bg-white',
		]}
	>
		{#if ['default', 'search'].includes($searchViewState)}
			<Category />
		{/if}

		{#if ['departureSearch'].includes($searchViewState)}
			<TabTop bind:tabState={$departureSearchTab} {showAiRecommendationTab} />
		{/if}

		<SearchList />
	</section>
{/if}
