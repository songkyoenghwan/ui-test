<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState, pickText } from '@/stores/globalStore';
	import { current, loadPoiDetail } from '@/stores/pageDataStore';
	import IconCategory from '@/svelte/icons/IconCategory.svelte';
	import Icons from '@/svelte/icons/Icons.svelte';
	import Thumb from '@/svelte/thumb/Thumb.svelte';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';

	const onSelectOtherFacility = (facilityId: number) => {
		const poiId = $current.poi;
		if (!Number.isFinite(poiId) || poiId < 1) return;
		void loadPoiDetail(poiId, facilityId);
	};
</script>

{#if ($facilityCurrent?.facilityOtherList?.length ?? 0) > 0}
	<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
		<p class="text-000 flex items-center gap-2 text-base">
			<Icons name="building" cls="size-4 fill-slate-400" />
			{m.usr_map_002_59({ locale: $langState })}
		</p>

		<ul
			class="scrollbar-hide inline-flex w-full max-w-[clac(100dvw-40px)] snap-x snap-mandatory items-center gap-2 overflow-x-auto"
		>
			{#each $facilityCurrent?.facilityOtherList as item (item?.id)}
				{#if item?.id !== $current.facility}
					<li class="min-h-23.5 w-57.5 flex-none snap-center rounded-lg border border-slate-200 p-3">
						<div
							class="flex h-full items-center justify-between gap-2"
							onclick={() => onSelectOtherFacility(item.id)}
						>
							<div class="inline-flex h-full min-h-17.5 min-w-0 flex-1 flex-col gap-1">
								<p
									class="text-000 min-w-0 truncate text-base leading-[1.1] font-semibold"
									data-category-id={item?.category?.id}
								>
									{pickText(item?.name, $langState)}
								</p>
								<IconCategory
									icon={item?.category?.iconKey ?? item?.category?.parent?.iconKey ?? ''}
									color={item?.category?.categoryColorCodes?.colorCode ??
										item?.category?.parent?.categoryColorCodes?.colorCode ??
										''}
									name={pickText(item?.category?.name, $langState)}
								/>

								<p class="mt-auto text-xs font-bold">{m.usr_map_002_11({ locale: $langState })}</p>
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
