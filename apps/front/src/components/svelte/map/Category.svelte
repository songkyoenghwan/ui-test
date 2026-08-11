<script lang="ts">
	import { langState, pickText, categoryState } from '@/stores/globalStore';
	import { searchViewState, layoutViewState, updateViewState } from '@/stores/uxStore';

	import Icons from '@/svelte/icons/Icons.svelte';
	import IconCategory from '@/svelte/icons/IconCategory.svelte';

	let { categories = [] } = $props();

	const sortedCategories = $derived([...categories].sort((a, b) => Number(b.isEventCategory) - Number(a.isEventCategory)));

	let listEl = $state<HTMLUListElement | null>(null);
	let sentinelEl = $state<HTMLLIElement | null>(null);

	let allItems = $state(
		Array.from({ length: 30 }, (_, i) => ({
			id: i,
			name: `만원동 막국수 ${i}`,
		})),
	);

	let visibleCount = $state(30);
	let loading = $state(false);

	let visibleItems = $derived(allItems.slice(0, visibleCount));
	let hasMore = $derived(visibleCount < allItems.length);
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

	const onCategoryHandler = () => {
		updateViewState({
			layout: 'search',
			detail: 'search',
			search: 'searchResult',
		});
	};

	const searchResultView = () => {
		updateViewState({
			layout: 'search',
			detail: 'search',
			search: 'searchResult',
		});
	};
</script>

{#if $layoutViewState === 'default' || $layoutViewState === 'ai' || $layoutViewState === 'search'}
	<section
		class={[
			'fixed top-16 z-40 grid w-full max-w-dvw items-center transition-all starting:divide-transparent',
			$searchViewState === 'result' &&
				'h-[calc(100dvh-4rem)] min-h-0 grid-rows-[48px_minmax(0,1fr)] divide-y-4 divide-slate-200 bg-white',
		]}
	>
		{#if $searchViewState !== 'searchResult'}
			<ul
				class={[
					'category-scroll scrollbar-hide relative flex h-12 touch-pan-x snap-x snap-proximity items-center gap-2 overflow-x-auto scroll-smooth px-5 transition-all',

					$layoutViewState === 'default' && 'py-2',
					$layoutViewState === 'ai' && 'py-2',
					$layoutViewState === 'search' && 'pb-2',
				]}
				onpointerdown={(e) => e.stopPropagation()}
				ontouchstart={(e) => e.stopPropagation()}
				ontouchmove={(e) => e.stopPropagation()}
				onwheel={(e) => e.stopPropagation()}
			>
				{#each sortedCategories as category (`category-${category.id}`)}
					<li class="flex-none snap-center">
						<label
							for={`category-${category.id}`}
							class={[
								'group/category flex items-center gap-1 rounded-sm border  px-2 py-1.5 text-sm leading-none transition-colors has-checked:bg-(--category-color)/10 has-checked:outline has-checked:outline-(--category-color)',
								category.isEventCategory ? 'border-(--category-color)! bg-(--category-color)/10' : 'bg-white',
								$layoutViewState === 'default' && 'border-white shadow-2xs',
								$layoutViewState === 'ai' && 'border-white shadow-2xs',
								$layoutViewState === 'search' && 'border-slate-200',
							]}
							style:--category-color={category.categoryColorCodes.colorCode}
						>
							<Icons name={category.iconKey} cls="size-5 fill-(--category-color) stroke-(--category-color)" />
							<input
								type="radio"
								name="category-search"
								id={`category-${category.id}`}
								class="sr-only"
								value={category.iconKey}
								bind:group={$categoryState}
								onchange={(e: Event) => {
									const input = e.currentTarget as HTMLInputElement;

									if (input.checked) {
										onCategoryHandler();
									}
								}}
							/>
							{pickText(category.name, $langState)}
						</label>
					</li>
				{/each}
			</ul>
		{/if}

		{#if $searchViewState === 'result'}
			<ul bind:this={listEl} class="h-full min-h-0 divide-y divide-slate-200 overflow-x-clip overflow-y-auto scroll-smooth">
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

				{#if hasMore}
					<li bind:this={sentinelEl} class="flex min-h-12 items-center justify-center text-sm text-slate-400">
						{#if loading}
							불러오는 중...
						{/if}
					</li>
				{/if}
			</ul>

			<p class="grid h-full place-content-center bg-slate-50 text-[20px] font-semibold text-slate-700">
				최근 검색 이력이 없어요
			</p>
			<p class="grid h-full place-content-center bg-slate-50 text-[20px] font-semibold text-slate-700">
				검색 결과가 없습니다.
				<br />
				다른 검색어를 입력해주세요.
			</p>
		{/if}
	</section>
{/if}

<style>
	.category-scroll {
		scroll-behavior: smooth;
		scroll-snap-type: x proximity;
		-webkit-overflow-scrolling: touch;
		overscroll-behavior-x: contain;
		touch-action: pan-x;
	}
</style>
