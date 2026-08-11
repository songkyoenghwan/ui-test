<script lang="ts">
	import { layoutViewState } from '@/stores/uxStore';
	import Icons from '@/svelte/icons/Icons.svelte';

	function viewBackHandler() {
		if ($layoutViewState === 'facilities') {
			layoutViewState.set('ai');
		}
	}
</script>

<section class={['fixed inline-flex items-center', $layoutViewState === 'facilities' ? 'top-5 left-5 z-40' : 'hidden']}>
	<button
		type="button"
		class="relative grid size-10 place-content-center rounded-lg bg-white opacity-100 shadow-2xs transition-all transition-discrete starting:opacity-0"
		onclick={viewBackHandler}
	>
		<Icons name="back" cls="size-6 stroke-black" />
	</button>
</section>
