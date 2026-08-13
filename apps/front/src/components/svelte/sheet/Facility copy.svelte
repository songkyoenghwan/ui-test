<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { setSheetMidH, setSheetMinH, sheetMidRatioValue } from '@/src/stores/sheetUiStore';
	import { langState, pickText } from '@/stores/globalStore';
	import { categoryList, destinationList, facilityList, poiList } from '@/stores/pageDataStore';
	import { sheetInstance } from '@/stores/uxStore';
	import IconCategory from '@/svelte/icons/IconCategory.svelte';
	import Icons from '@/svelte/icons/Icons.svelte';
	import Thumb from '@/svelte/thumb/Thumb.svelte';
	import type { FacilityDetailResponse } from '@/types/facilities';
	import type { PoiDetailResponse } from '@/types/pois';
	import { z } from 'zod';
	import Overview from '@/src/components/svelte/facility/Overview.svelte';
	import { FacilityOverviewModel } from '@/utils/detail.svelte.ts';

	const TabTypeSchema = z.enum(['operations', 'products']);
	type TabType = z.infer<typeof TabTypeSchema>;
	const TabItemSchema = z.object({
		id: TabTypeSchema,
		txt: z.string(),
	});
	type TabItem = z.infer<typeof TabItemSchema>;
	const tabs = $state<TabItem[]>([
		{
			id: 'operations',
			txt: m.usr_map_002_08({ locale: $langState }),
		},
		{
			id: 'products',
			txt: m.usr_map_002_50({ locale: $langState }),
		},
	]);

	$effect(() => {
		$sheetInstance?.setSnapPoint($sheetMidRatioValue);
	});

	let facility: FacilityDetailResponse | undefined = $derived($facilityList?.[0]);
	let poisMatch: PoiDetailResponse | null = $derived.by(() => {
		if (!facility?.id || !$poiList.length) return null;

		return $poiList.find((p) => p.facilityPoiMappings?.some((mapping) => mapping.facilityId === facility.id)) ?? null;
	});
	let destinationMatch = $derived.by(() => {
		if (!$destinationList.length || !poisMatch?.tourDestinationId) return null;

		return $destinationList.find((p) => p.id === poisMatch.tourDestinationId) ?? null;
	});
	let categoryMatch = $derived.by(() => {
		if (!$categoryList.length) return undefined;

		return $categoryList.find((p) => p.id === facility?.category?.id);
	});
	let otherFacilities = $derived.by(() => {
		if (!poisMatch || !facility?.id) return [];

		const facilityIds = (poisMatch.facilityPoiMappings ?? []).map((mapping) => mapping.facilityId);

		return $facilityList?.filter((facilityItem) => facilityIds.includes(facilityItem.id) && facilityItem.id !== facility.id);
	});
	let tabCurrent = $state<TabType>('operations');
	let hasFiles = $derived((facility?.facilityFiles?.length ?? 0) > 0);
	let hasProduct = $derived(!!facility?.facilityFiles);
	let tabState = $derived(hasFiles || hasProduct);

	const overviewModel = new FacilityOverviewModel({
		facility: () => facility,
		poiList: () => $poiList,
		destinationList: () => $destinationList,
		categoryList: () => $categoryList,
		facilityList: () => $facilityList,
	});
</script>

{#snippet info(icon: string, tit: string, txt: string)}
	<dl class="flex items-center gap-2 py-1.5">
		<dt class="flex items-center gap-1 text-sm font-bold text-black">
			<Icons name={icon} cls="size-4 fill-slate-400 stroke-slate-400" />
			{tit}
		</dt>
		<dd class=" text-sm text-slate-500">{txt}</dd>
	</dl>
{/snippet}

<Overview {facility} {categoryMatch} />

<!-- <div class="flex items-center justify-between gap-2 px-5" bind:clientHeight={null, setSheetMinH}>
	<div class="inline-flex flex-col gap-2">
		<p class="text-000 text-[20px] leading-tight font-semibold">
			{pickText(facility?.name, $langState)}
		</p>

		<IconCategory
			icon={categoryMatch?.iconKey ?? ''}
			color={categoryMatch?.categoryColorCodes?.colorCode ?? ''}
			name={pickText(categoryMatch?.name, $langState)}
		/>
	</div>

	<Thumb facilityFiles={facility?.facilityFiles?.slice(0, 1) ?? []} />
</div> -->

<div class="pb-1" bind:clientHeight={null, setSheetMidH}>
	<div class="flex flex-col px-5 py-2">
		{@render info('map-pin-filled', '24km', `${pickText(poisMatch?.address, $langState)}`)}
	</div>

	<div class="grid px-5 py-1">
		<button
			type="button"
			class="text-09235e flex min-h-9 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-100 px-5 py-1"
		>
			<span class="flex items-center gap-2">
				<Icons name="mdi-car" cls="size-4 fill-09235e" />
				{m.usr_map_002_43({ locale: $langState })}
			</span>
			<Icons name="map-start" cls="size-4 fill-09235e" />
		</button>
	</div>

	{#if (destinationMatch?.tourDestinationCommonButtons?.length ?? 0) > 0}
		<div class="flex items-center gap-2 px-5 py-1 text-xs **:leading-tight **:tracking-tighter **:break-all">
			{#each destinationMatch?.tourDestinationCommonButtons as item, idx (item.id)}
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
	{/if}
</div>

{#if tabState}
	<ul class="grid grid-cols-2">
		{#each tabs as tab (tab.id)}
			<li class="flex items-center justify-center">
				<button
					type="button"
					class="aira-current:font-bold min-h-9 flex-1 border-b-2 border-b-slate-200 text-center text-slate-500 aria-current:border-b-(--base-color) aria-current:text-(--base-color)"
					aria-current={tabCurrent === `${tab.id}`}
					onclick={() => (tabCurrent = `${tab.id}`)}
				>
					{tab.txt}
				</button>
			</li>
		{/each}
	</ul>
{/if}

{#if tabCurrent === 'operations'}
	<div class="divide-y-4 divide-slate-100 *:py-4">
		<div class="flex min-h-12.5 items-center justify-between gap-2 px-5 py-1">
			<p class="flex items-center gap-2 text-base font-bold">
				<Icons name="circle-ring" cls="size-4 fill-09235e" />

				{m.usr_map_001_06({ locale: $langState })}
				{m.usr_map_001_07({ locale: $langState })}
				{m.usr_map_001_08({ locale: $langState })}
				{m.usr_map_001_09({ locale: $langState })}
			</p>

			<div class="flex items-center gap-1.5 text-sm">
				<p class="flex-none text-slate-400">현재 인원</p>
				<strong class="before flex flex-none items-center gap-1.5 before:h-2 before:w-px before:bg-slate-200">
					99명
				</strong>
			</div>
		</div>

		{#if facility?.contact}
			<div class="flex min-h-12.5 items-center gap-2 px-5 py-1">
				<Icons name="call" cls="size-4 fill-slate-400" />
				<a href="tel:" class="text-base text-black">{facility?.contact}</a>
				<button type="button" class="text-2877ff text-sm active:bg-slate-50">
					{m.usr_map_002_47({ locale: $langState })}
				</button>
			</div>
		{/if}

		<div class="flex min-h-12.5 items-center gap-2 px-5 py-1">
			<p class="flex items-center gap-2 text-base font-bold text-black">
				<Icons name="clock-filled" cls="size-4 fill-slate-400" />
				운영중
			</p>
		</div>

		{#if (otherFacilities?.length ?? 0) > 0}
			<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
				<p class="text-000 flex items-center gap-2 text-base">
					<Icons name="building" cls="size-4 fill-slate-400" />
					이 위치에 다른 시설
				</p>

				<ul
					class="scrollbar-hide inline-flex w-full max-w-[clac(100dvw-40px)] snap-x snap-mandatory items-center gap-2 overflow-x-auto"
				>
					{#each otherFacilities as item (item.id)}
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

								{#if item.facilityFiles}
									{#each item.facilityFiles as f (f.id)}
										<picture class="size-17.5 flex-none overflow-clip rounded-sm bg-slate-50">
											<img src={f.fileUrl} alt="" />
										</picture>
									{/each}
								{/if}
							</div>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		{#if pickText(facility?.description, $langState)}
			<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
				<p class="text-000 flex items-center gap-2 text-base">
					<Icons name="chat" cls="size-4 fill-slate-400" />
					상세 정보
				</p>

				<div class="rounded-lg bg-slate-100 p-3 text-xs whitespace-pre-line text-slate-700">
					{pickText(facility?.description, $langState)}
				</div>
			</div>
		{/if}

		{#if facility?.facilityButtons?.length}
			<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
				<p class="text-000 flex items-center gap-2 text-base">
					<Icons name="add-info" cls="size-4 fill-slate-400" />
					시설 정보 더보기
				</p>

				<div class="grid gap-2">
					{#each facility?.facilityButtons as f (f.id)}
						<a
							href={f.buttonUrl}
							target="_blank"
							class="flex h-9 flex-1 items-center justify-center gap-0.5 rounded-lg border border-slate-200 bg-slate-50 px-2 text-sm"
						>
							{pickText(f.buttonName, $langState)}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
{/if}

{#if tabState && tabCurrent === 'products'}
	<div class="divide-y-4 divide-slate-100 *:py-4">
		{#if (facility?.facilityProductGuideFiles.length ?? 0) > 0}
			<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
				<p class="text-000 flex items-center gap-2 text-base">
					<Icons name="use-guide" cls="size-4 fill-slate-400" />
					{m.usr_map_002_51({ locale: $langState })}
				</p>

				<Thumb variant="guide" facilityFiles={facility?.facilityProductGuideFiles ?? []} />
			</div>
		{/if}

		{#if facility?.facilityProducts}
			<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
				<p class="text-000 flex items-center gap-2 text-base">
					<Icons name="use-guide" cls="size-4 fill-slate-400" />
					{m.usr_map_002_52({ locale: $langState })}
				</p>

				<ul class="inline-flex w-full flex-col divide-y divide-slate-200">
					{#each facility?.facilityProducts as item (item.id)}
						<li class="inline-flex flex-col py-3">
							<div class="flex items-center justify-between gap-2">
								<div class="">
									<p class="text-000 text-lg leading-tight font-semibold">
										{pickText(item.name, $langState)}
									</p>
								</div>

								<Thumb facilityFiles={item?.facilityProductFiles ?? []} />
							</div>
							<p class="mt-2.5 text-sm text-slate-700">
								{pickText(item.description, $langState)}
							</p>
							<p class="mt-3 text-sm font-bold text-slate-700">
								{item.price?.toLocaleString()}
								{item.currency}
							</p>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
{/if}
