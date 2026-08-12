<script lang="ts">
	import { searchList } from '@/stores/pageDataStore';
	import { searchViewState, updateViewState } from '@/stores/uxStore';

	import Icons from '@/svelte/icons/Icons.svelte';
	import IconCategory from '@/svelte/icons/IconCategory.svelte';

	let listEl = $state<HTMLUListElement | null>(null);
	let sentinelEl = $state<HTMLLIElement | null>(null);
	let visibleCount = $state(30);
	let loading = $state(false);
	let visibleItems = $derived($searchList.slice(0, visibleCount));
	let hasRender = $derived(0 < $searchList.length);
	let hasMore = $derived(visibleCount < $searchList.length);
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
					class="flex min-h-16 w-full items-center gap-2 pl-3 active:bg-slate-50"
					onclick={searchResultView}
				>
					<IconCategory icon="binoculars" color="red" />
					<span>{item.name}</span>
				</button>

				<button type="button" data-btn="del" class="flex items-center px-2 active:bg-slate-50">
					<Icons name="close-circle" cls="size-5 stroke-black" />
				</button>
			</li>
		{/each}
	{:else}
		<li class="h-full">
			<p class="grid h-full place-content-center bg-slate-50 text-[20px] font-semibold text-slate-700">
				최근 검색 이력이 없어요
			</p>
			<p class="grid h-full place-content-center bg-slate-50 text-[20px] font-semibold text-slate-700">
				검색 결과가 없습니다.
				<br />
				다른 검색어를 입력해주세요.
			</p>
		</li>
	{/if}

	{#if hasMore}
		<li bind:this={sentinelEl} class="flex min-h-12 items-center justify-center text-sm text-slate-400">
			{#if loading}
				불러오는 중...
			{/if}
		</li>
	{/if}
</ul>
