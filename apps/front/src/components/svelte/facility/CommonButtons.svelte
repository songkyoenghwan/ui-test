<script lang="ts">
	import { langState, pickText } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import type { FacilityDetailResponse } from '@/types/facilities';
	import type { TourDestinationDetailResponse } from '@/types/tour-destinations';

	type Props = {
		facility?: FacilityDetailResponse;
		destination?: TourDestinationDetailResponse | null;
	};

	let { facility, destination }: Props = $props();
</script>

<div class="flex items-center gap-2 px-5 py-1 text-xs **:leading-tight **:tracking-tighter **:break-all">
	{#each destination?.tourDestinationCommonButtons as item, idx (item.id)}
		<a
			href={facility?.facilityButtons?.[idx].buttonUrl}
			target="_blank"
			class="flex h-10 flex-1 items-center justify-between gap-0.5 rounded-lg border border-slate-200 bg-white px-3"
		>
			<span class="flex items-center gap-1">
				{#if item.iconUrl !== '' && item.iconUrl !== undefined && item.iconUrl !== null}
					<picture class="h-4">
						<img alt="" class="h-4" src={item.iconUrl} />
					</picture>
				{/if}
				<span class="line-clamp-2 min-w-0">{pickText(item.buttonName, $langState)}</span>
			</span>
			<Icons name="arrow-left" cls="size-4 rotate-180 stroke-slate-400" />
		</a>
	{/each}
</div>
