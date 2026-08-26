<script lang="ts">
	import { sheetSnapPoint } from '@/stores/uxStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import Confusion from '@/svelte/map/Confusion.svelte';
	import { detailViewState } from '@/stores/uxStore';

	/** 부모(Sheet)가 대상지 메타로 넘기는 혼잡 버튼 노출 여부 */
	let { showConfusion = false }: { showConfusion?: boolean } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="ease-in-outstarting:opacity-0 absolute top-0 right-5 z-40 inline-flex -translate-y-24 flex-col justify-end opacity-100 transition-[bottom] transition-discrete duration-0 group-has-data-[confusion=list]/body:-translate-y-37"
	style:display={$sheetSnapPoint > 59 ? 'none' : ''}
	ontouchmove={(e) => e.stopPropagation()}
>
	<div
		class="relative inline-flex flex-col justify-end gap-2 opacity-100 transition-all *:grid *:size-10 *:place-content-center *:rounded-full *:bg-white *:shadow-2xs group-has-data-[confusion=state]/body:-translate-y-12 starting:opacity-0"
	>
		{#if $detailViewState === 'directions'}
			<button type="button" class={['active:bg-(--base-color)/10', $sheetSnapPoint > 56 ? 'opacity-0' : '']}>
				<Icons name="routing" cls="size-5.5 fill-(--base-color) stroke-(--base-color)" />
			</button>
		{:else}
			<button type="button" class={['active:bg-(--base-color)/10', $sheetSnapPoint > 56 ? 'opacity-0' : '']}>
				<Icons name="refresh" cls="size-5.5 fill-(--base-color) stroke-(--base-color)" />
			</button>
		{/if}
		<button type="button" class={['active:bg-(--base-color)/10', $sheetSnapPoint > 58 ? 'opacity-0' : '']}>
			<Icons name="gps" cls="size-5.5 fill-(--base-color) stroke-(--base-color)" />
		</button>
		{#if showConfusion}
			<Confusion />
		{/if}
	</div>
</div>
