<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import Thumb from '@/svelte/thumb/Thumb.svelte';
	import type { FacilityDetailResponse } from '@/types/facilities';

	type Props = {
		facility?: FacilityDetailResponse | undefined;
	};
	let { facility }: Props = $props();
</script>

<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
	<p class="text-000 flex items-center gap-2 text-base">
		<Icons name="use-guide" cls="size-4 fill-slate-400" />
		{m.usr_map_002_51({ locale: $langState })}
	</p>

	<Thumb variant="guide" facilityFiles={facility?.facilityProductGuideFiles ?? []} />
</div>
