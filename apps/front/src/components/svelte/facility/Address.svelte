<script lang="ts">
	import { langState, pickText } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';
</script>

{#if $facilityCurrent.poisMatch?.address}
	<dl class="flex items-center gap-2 px-5 py-1">
		<dt class="flex items-center gap-1 text-sm font-bold text-black">
			<Icons name="map-pin-filled" cls="size-4 fill-slate-400 stroke-slate-400" />
			24km
		</dt>
		<dd class=" text-sm text-slate-500">{pickText($facilityCurrent.poisMatch?.address, $langState)}</dd>
	</dl>
{/if}
