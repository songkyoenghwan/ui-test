<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState, pickText } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import Thumb from '@/svelte/thumb/Thumb.svelte';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';

	let hasProduct = $derived(($facilityCurrent.facilityDetail?.facilityProducts?.length ?? 0) > 0);
</script>

{#if hasProduct}
	<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
		<p class="text-000 flex items-center gap-2 text-base">
			<Icons name="use-guide" cls="size-4 fill-slate-400" />
			{m.usr_map_002_52({ locale: $langState })}
		</p>

		<ul class="inline-flex w-full flex-col divide-y divide-slate-200">
			{#each $facilityCurrent.facilityDetail?.facilityProducts as item (item.id)}
				<li class="inline-flex flex-col py-3">
					<div class="flex items-center justify-between gap-2">
						<div class="">
							<p class="text-000 text-lg leading-tight font-semibold">
								{pickText(item.name, $langState)}
							</p>
						</div>

						{#if item?.facilityProductFiles}
							<Thumb facilityFiles={item?.facilityProductFiles.slice(0, 1) ?? []} />
						{/if}
					</div>

					{#if item.description}
						<p class="mt-2.5 text-sm text-slate-700">
							{pickText(item.description, $langState)}
						</p>
					{/if}

					{#if item.price}
						<p class="mt-3 text-sm font-bold text-slate-700">
							{item.price?.toLocaleString()}
							{item.currency}
						</p>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/if}
