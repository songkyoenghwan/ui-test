<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState, pickText } from '@/stores/globalStore';
	import { recommendList, searchList } from '@/stores/pageDataStore';
	import { searchViewState, updateViewState } from '@/stores/uxStore';
	import IconCategory from '@/svelte/icons/IconCategory.svelte';
	import Icons from '@/svelte/icons/Icons.svelte';

	let listEl = $state<HTMLUListElement | null>(null);
	let sentinelEl = $state<HTMLLIElement | null>(null);
	let visibleCount = $state(30);
	let loading = $state(false);
	let visibleItems = $derived.by(() => {
		if ($searchViewState === 'searchResult') return $searchList ?? [];
		if ($searchViewState === 'recommend') return $recommendList ?? [];
		return [];
	});
	let hasRender = $derived(0 < visibleItems.length);
	let hasMore = $derived(visibleCount < visibleItems.length);
	function loadMore() {
		if (loading || !hasMore) return;

		loading = true;

		setTimeout(() => {
			visibleCount += 20;
			loading = false;
		}, 200);
	}

	$effect(() => {
		const root = listEl;
		const target = sentinelEl;

		if (!root || !target || !hasMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry?.isIntersecting) {
					loadMore();
				}
			},
			{
				root,
				rootMargin: '120px',
				threshold: 0,
			},
		);

		observer.observe(target);

		return () => {
			observer.disconnect();
		};
	});

	const searchResultView = () => {
		updateViewState({
			layout: 'search',
			detail: 'search',
			search: 'searchResult',
		});
	};
</script>

<ul bind:this={listEl} class="h-full min-h-0 divide-y divide-slate-200 overflow-x-clip overflow-y-auto scroll-smooth">
	{#if hasRender}
		{#each visibleItems as item (item.id)}
			<li
				class="grid gap-1 overflow-clip pr-3 pl-6 has-active:bg-slate-50 has-data-[btn=del]:grid-cols-[minmax(0,1fr)_36px]"
				style:--category-color="red"
			>
				<button
					type="button"
					class="flex min-h-16 w-full items-center gap-2 active:bg-slate-50"
					onclick={searchResultView}
				>
					<IconCategory
						icon={item?.category?.iconKey ?? ''}
						color={item?.category?.categoryColorCodes?.colorCode ?? ''}
						name={pickText(item?.name, $langState)}
					/>
				</button>

				<button type="button" data-btn="del" class="flex items-center px-2 active:bg-slate-50">
					<Icons name="close-circle" cls="size-5 stroke-black" />
				</button>
			</li>
		{/each}
	{:else if visibleItems.length === 0}
		<li class="h-full">
			<p class="grid h-full place-content-center bg-slate-50 text-center text-[20px] font-semibold text-slate-700">
				{m.usr_src_001_01({ locale: $langState })}
			</p>
		</li>
	{:else if visibleItems.length === 100}
		<li class="h-full">
			<p class="grid h-full place-content-center bg-slate-50 text-center text-[20px] font-semibold text-slate-700">
				{m.usr_nav_101_08({ locale: $langState })}
				<br />
				{m.usr_nav_101_09({ locale: $langState })}
			</p>
		</li>
	{/if}

	{#if hasMore}
		<li bind:this={sentinelEl} class="flex min-h-12 items-center justify-center text-sm text-slate-400">
			{#if loading}
				Loading...
			{/if}
		</li>
	{/if}
</ul>
