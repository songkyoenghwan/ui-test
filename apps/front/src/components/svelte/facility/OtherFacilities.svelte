<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState, pickText } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import Thumb from '@/svelte/thumb/Thumb.svelte';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';
	import { current } from '@/stores/pageDataStore';
</script>

{#if ($facilityCurrent?.facilityOtherList?.length ?? 0) > 1}
	<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
		<p class="text-000 flex items-center gap-2 text-base">
			<Icons name="building" cls="size-4 fill-slate-400" />
			이 위치에 다른 시설
		</p>

		<ul
			class="scrollbar-hide inline-flex w-full max-w-[clac(100dvw-40px)] snap-x snap-mandatory items-center gap-2 overflow-x-auto"
		>
			{#each $facilityCurrent?.facilityOtherList as item (item?.id)}
				{#if item?.id !== $current.facility}
					<li class="min-h-23.5 w-57.5 flex-none snap-center rounded-lg border border-slate-200 p-3">
						<div class="flex items-center justify-between gap-2">
							<div class="inline-grid flex-1">
								<p class="text-000 min-w-0 truncate text-base leading-tight font-semibold">
									{pickText(item?.name, $langState)}
								</p>
								<p class="mt-1 truncate text-sm text-slate-700">
									{pickText(item?.category?.name, $langState)}
								</p>
								<p class="mt-3.5 text-sm font-bold">{m.usr_map_002_11({ locale: $langState })}</p>
							</div>

							{#if item?.facilityFiles}
								<Thumb facilityFiles={item.facilityFiles} />
							{/if}
						</div>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
{/if}
