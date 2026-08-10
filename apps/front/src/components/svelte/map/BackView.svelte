<script lang="ts">
	import { mainViewState } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';

	function viewBackHandler() {
		if ($mainViewState === 'poi') {
			mainViewState.set('default');
		}
	}
</script>

<section class={['fixed flex w-full  items-center', $mainViewState === 'poi' ? 'top-5 left-5 z-40' : 'hidden']}>
	<button type="button" class="grid size-10 place-content-center rounded-lg bg-white shadow-2xs" onclick={viewBackHandler}>
		<Icons name="back" cls="size-6 stroke-black" />
	</button>
</section>
