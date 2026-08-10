<script lang="ts">
	import { langState, mainViewState, pickText } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';

	let { categories = [] } = $props();
</script>

{#if $mainViewState === 'default' || $mainViewState === 'poi' || $mainViewState === 'ai' || $mainViewState === 'search'}
	<section class={['fixed top-16 z-40 flex w-full max-w-dvw items-center']}>
		<ul
			class="category-scroll scrollbar-hide flex h-12 touch-pan-x snap-x snap-proximity items-center gap-2 overflow-x-auto scroll-smooth px-5 py-2"
			onpointerdown={(e) => e.stopPropagation()}
			ontouchstart={(e) => e.stopPropagation()}
			ontouchmove={(e) => e.stopPropagation()}
			onwheel={(e) => e.stopPropagation()}
		>
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
