<script lang="ts">
	import { langState, mainViewState } from '@/stores/globalStore';
	import { sheetSnapPoint } from '@/stores/uxStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import Confusion from '@/svelte/map/Confusion.svelte';
</script>

{#if $mainViewState === 'default' || $mainViewState === 'poi'}
	<div
		class="ease-in-outstarting:opacity-0 absolute top-0 right-5 z-40 inline-flex -translate-y-24 flex-col justify-end opacity-100 transition-[bottom] transition-discrete duration-0 group-has-data-[confusion=list]/body:-translate-y-37"
		style:display={$sheetSnapPoint > 75 ? 'none' : ''}
	>
		<div
			class="relative inline-flex flex-col justify-end gap-2 opacity-100 transition-all *:grid *:size-10 *:place-content-center *:rounded-full *:bg-white *:shadow-2xs group-has-data-[confusion=state]/body:-translate-y-12 starting:opacity-0"
		>
			<button type="button" class={['active:bg-(--base-color)/10', $sheetSnapPoint > 68 ? 'opacity-0' : '']}>
				<Icons name="refresh" cls="size-5.5 fill-(--base-color) stroke-(--base-color)" />
			</button>
			<button type="button" class={['active:bg-(--base-color)/10', $sheetSnapPoint > 70 ? 'opacity-0' : '']}>
				<Icons name="gps" cls="size-5.5 fill-(--base-color) stroke-(--base-color)" />
			</button>
			<Confusion />
		</div>
	</div>
{/if}
