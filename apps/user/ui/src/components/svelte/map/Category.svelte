<script lang="ts">
	import { categoryState, langState, pickText } from '@/stores/globalStore';
	import { categoryList, current, loadKeywordSearch } from '@/stores/pageDataStore';
	import { layoutViewState, updateViewState } from '@/stores/uxStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import type { CategoryResponse } from '@/types/categories';
	import type { SearchLanguage } from '@/types/search';

	const sortedCategories = $derived.by(() => {
		if (!$categoryList.length) return [];

		return [...$categoryList].sort((a, b) => Number(b.isEventCategory) - Number(a.isEventCategory));
	});

	const onCategoryHandler = async (category: CategoryResponse) => {
		const keyword = `${pickText(category?.name, $langState)}`;
		categoryState.set(keyword);

		const language: SearchLanguage = ['ko', 'en', 'ja', 'zh', 'th', 'vi'].includes($langState)
			? ($langState as SearchLanguage)
			: 'ko';
		const searched = await loadKeywordSearch({
			destinationId: $current.destination,
			keyword,
			language,
		});

		if (!searched) return;

		updateViewState({
			layout: 'search',
			detail: 'search',
			search: 'searchResult',
		});
	};
</script>

<ul
	class={[
		'category-scroll scrollbar-hide relative flex h-12 touch-pan-x snap-x snap-proximity items-center gap-2 overflow-x-auto scroll-smooth px-5 ',
		$layoutViewState === 'default' && 'py-2',
		$layoutViewState === 'search' && 'bg-white pb-2',
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
				]}
				style:--category-color={category?.categoryColorCodes?.colorCode}
			>
				<div
					class={[
						'flex h-full flex-1 items-center gap-1 rounded-lg border px-2 py-1',
						category.isEventCategory ? 'border-(--category-color)! bg-(--category-color)/10' : 'bg-white',
						$layoutViewState === 'default' && 'border-white shadow-2xs',
						$layoutViewState === 'search' && 'border-slate-200',
					]}
				>
					<Icons name={String(category.iconKey)} cls="size-5 fill-(--category-color) stroke-(--category-color)" />
					<input
						type="radio"
						name="category-search"
						id={`category-${category.id}`}
						class="sr-only"
						value={category.iconKey}
						onchange={(e: Event) => {
							const input = e.currentTarget as HTMLInputElement;

							if (input.checked) {
								void onCategoryHandler(category);
							}
						}}
					/>
					{pickText(category.name, $langState)}
				</div>
			</label>
		</li>
	{/each}
</ul>

<style>
	.category-scroll {
		scroll-behavior: smooth;
		scroll-snap-type: x proximity;
		-webkit-overflow-scrolling: touch;
		overscroll-behavior-x: contain;
		touch-action: pan-x;
	}
</style>
