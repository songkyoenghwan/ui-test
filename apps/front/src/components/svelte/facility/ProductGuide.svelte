<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import Thumb from '@/svelte/thumb/Thumb.svelte';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';

	let hasFiles = $derived(($facilityCurrent.facilityDetail?.facilityProductGuideFiles?.length ?? 0) > 0);
</script>

{#if hasFiles}
	<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
		<p class="text-000 flex items-center gap-2 text-base">
			<Icons name="use-guide" cls="size-4 fill-slate-400" />
			{m.usr_map_002_51({ locale: $langState })}
		</p>

		<Thumb variant="guide" facilityFiles={$facilityCurrent?.facilityDetail?.facilityProductGuideFiles ?? []} />
	</div>
{/if}
