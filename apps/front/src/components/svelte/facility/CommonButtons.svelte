<script lang="ts">
	import { langState, pickText } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';

	const rendered = $derived(
		$facilityCurrent?.facilityDetail?.facilityButtons?.some((c) => c.tourDestinationCommonButtonId != null) ?? false,
	);
</script>

{#if rendered}
	<div class="flex items-center gap-2 px-5 py-1 text-xs **:leading-tight **:tracking-tighter **:break-all">
		{#each $facilityCurrent?.facilityDetail?.facilityButtons as item (item.id)}
			{@const iconImg = $facilityCurrent?.destinationDetail?.tourDestinationCommonButtons?.find(
				(icon) => icon.id === item.tourDestinationCommonButtonId,
			)}

			{#if item.tourDestinationCommonButtonId}
				<a
					href={item?.buttonUrl}
					target="_blank"
					class="flex h-10 flex-1 items-center justify-between gap-0.5 rounded-lg border border-slate-200 bg-white px-3"
				>
					<span class="flex items-center gap-1">
						{#if iconImg?.iconUrl !== '' && iconImg?.iconUrl !== null}
							<picture class="h-4">
								<img alt="" class="h-4" src={iconImg?.iconUrl} />
							</picture>
						{/if} -
						<span class="line-clamp-2 min-w-0">{pickText(item.buttonName, $langState)}</span>
					</span>
					<Icons name="arrow-left" cls="size-4 rotate-180 stroke-slate-400" />
				</a>
			{/if}
		{/each}
	</div>
{/if}
