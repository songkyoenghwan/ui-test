<script lang="ts">
	import { categoryState, langState, pickText } from '@/stores/globalStore';
	import { categoryList, searchResultList } from '@/stores/pageDataStore';
	import { layoutViewState, searchViewState, updateViewState } from '@/stores/uxStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import Recommended from '@/svelte/map/Recommended.svelte';
	import { facilityList } from '@/stores/pageDataStore';
	import type { CategoryDetailResponse } from '@/types/categories';

	const sortedCategories = $derived.by(() => {
		if (!$categoryList.length) return [];

		return [...$categoryList].sort((a, b) => Number(b.isEventCategory) - Number(a.isEventCategory));
	});

	const onCategoryHandler = (category: CategoryDetailResponse) => {
		const findFa = ($facilityList ?? []).filter((f) => f?.category?.iconKey === category.iconKey);

		categoryState.set(`${pickText(category?.name, $langState)}`);
		searchResultList.set(findFa);

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
			'fixed top-16 z-60 grid w-full max-w-dvw items-center transition-all starting:divide-transparent',
			($searchViewState === 'recommend' || $searchViewState === 'result') &&
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
								'group/category flex min-h-8 flex-col items-center gap-1 rounded-lg bg-white text-sm leading-none transition-colors',
								$layoutViewState === 'default' && 'shadow-2xs',
								$layoutViewState === 'ai' && 'shadow-2xs',
							]}
							style:--category-color={category?.categoryColorCodes?.colorCode}
						>
							<div
								class={[
									'flex h-full flex-1 items-center gap-1 rounded-lg border px-2 py-1',
									category.isEventCategory ? 'border-(--category-color)! bg-(--category-color)/10' : 'bg-white',
									$layoutViewState === 'default' && 'border-white shadow-2xs',
									$layoutViewState === 'ai' && 'border-white shadow-2xs',
									$layoutViewState === 'search' && 'border-slate-200',
								]}
							>
								<Icons
									name={String(category.iconKey)}
									cls="size-5 fill-(--category-color) stroke-(--category-color)"
								/>
								<input
									type="radio"
									name="category-search"
									id={`category-${category.id}`}
									class="sr-only"
									value={category.iconKey}
									onchange={(e: Event) => {
										const input = e.currentTarget as HTMLInputElement;

										if (input.checked) {
											onCategoryHandler(category);
										}
									}}
								/>
								{pickText(category.name, $langState)}
							</div>
						</label>
					</li>
				{/each}
			</ul>
		{/if}

		{#if $searchViewState === 'recommend' || $searchViewState === 'result'}
			<Recommended />
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
