<script lang="ts">
	import { restorePreviousViewState, detailViewState, updateViewState } from '@/stores/uxStore';
	import Icons from '@/svelte/icons/Icons.svelte';

	function viewBackHandler() {
		if (restorePreviousViewState()) return;

		updateViewState({
			layout: 'default',
			detail: 'ai',
			search: 'default',
		});
	}
</script>

{#if $detailViewState === 'facilities'}
	<section class={['fixed top-5 left-5 z-40 inline-flex items-center']}>
		<button
			type="button"
			class="relative grid size-10 place-content-center rounded-lg bg-white opacity-100 shadow-2xs transition-all transition-discrete starting:opacity-0"
			onclick={viewBackHandler}
		>
			<Icons name="back" cls="size-6 stroke-black" />
		</button>
	</section>
{/if}

{#if $detailViewState === 'directions'}
	<section class={['fixed top-5 right-5 z-40 inline-flex items-center']}>
		<button
			type="button"
			class="relative grid size-10 place-content-center rounded-lg bg-white opacity-100 shadow-2xs transition-all transition-discrete starting:opacity-0"
			onclick={viewBackHandler}
		>
			<Icons name="close-circle" cls="size-5 stroke-black" />
		</button>
	</section>
{/if}
