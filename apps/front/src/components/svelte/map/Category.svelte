<script lang="ts">
	import Icons from '@/svelte/icons/Icons.svelte';
	import { langState, mainViewState, pickText } from '@/stores/globalStore';

	let { categories = [] } = $props();
</script>

<section class={['fixed flex w-full max-w-dvw items-center', $mainViewState === 'default' && 'top-16 ']}>
	<ul class="flex h-12 snap-x snap-proximity items-center gap-2 overflow-x-auto scroll-smooth px-5 py-2">
		{#each categories as category (`category-${category.id}`)}
			<li class="flex-none snap-center">
				<label
					for={`category-${category.id}`}
					class={[
						'group/category flex items-center gap-1 rounded-sm bg-white px-2 py-1.5 text-sm leading-none transition-colors has-checked:bg-(--category-color)/10 has-checked:outline has-checked:outline-(--category-color)',
						$mainViewState === 'default' && 'shadow-2xs',
					]}
					style:--category-color={category.categoryColorCodes.colorCode}
				>
					<Icons name={category.iconKey} cls="size-5 fill-(--category-color) stroke-(--category-color)" />
					<input type="radio" name="category-search" id={`category-${category.id}`} class="sr-only" />
					{pickText(category.name, $langState)}
				</label>
			</li>
		{/each}
	</ul>
</section>
