<script lang="ts">
	import * as m from '@/paraglide/messages';
	import {
		setSheetMidH,
		setSheetMinH,
		setSheetScrollRef,
		sheetMidRatioValue,
		sheetMinRatioValue,
	} from '@/src/stores/sheetUiStore';
	import { langState, pickText } from '@/stores/globalStore';
	import { sheetInstance, sheetSnapPoint } from '@/stores/uxStore';
	import { destinationList, facilityList, poiList } from '@/stores/pageDataStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import BtnDirections from '@/svelte/sheet/BtnDirections.svelte';
	import IconCategory from '@/svelte/icons/IconCategory.svelte';
	import Thumb from '@/svelte/thumb/Thumb.svelte';

	let scrollEl: HTMLDivElement | null = $state(null);
	let bottomVisible = $derived($sheetSnapPoint >= $sheetMinRatioValue * 100 + 2);

	$effect(() => {
		setSheetScrollRef(scrollEl);
		$sheetInstance?.setSnapPoint($sheetMidRatioValue);
	});

	let facility = $derived($facilityList?.[0]);
	let poisMatch = $derived.by(() => {
		if (!facility?.id || !$poiList.length) return [];

		return $poiList.find((p) => p.facilityPoiMappings?.some((mapping) => mapping.facilityId === facility.id));
	});

	let destinationMatch = $derived.by(() => {
		if (!$destinationList.length) return [];

		return $destinationList.find((p) => p.id === poisMatch.tourDestinationId);
	});
	let otherFacilities = $derived.by(() => {
		if (!poisMatch || !$facilityList.length || !facility?.id) return [];

		const facilityIds = (poisMatch.facilityPoiMappings ?? []).map((mapping) => mapping.facilityId);

		return $facilityList.filter((facilityItem) => facilityIds.includes(facilityItem.id) && facilityItem.id !== facility.id);
	});
	let tabCurrent = $state<'operations' | 'products'>('operations');
	let tabState = $derived(facility.facilityFiles?.length > 0 || facility?.product);

	$inspect(destinationMatch);
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

<div class="grid h-[calc(100%-30px)] min-h-0 max-w-dvw min-w-0 grid-rows-1 has-[footer]:grid-rows-[1fr_68px]">
	<div bind:this={scrollEl} data-scroll="content" class="flex min-h-0 w-full min-w-0 flex-col overflow-x-clip">
		<div class="flex items-center justify-between gap-2 px-5" bind:clientHeight={null, setSheetMinH}>
			<div class="inline-flex flex-col gap-2">
				<p class="text-000 text-[20px] leading-tight font-semibold">
					{pickText(facility.name, $langState)}
				</p>

				<IconCategory
					icon={facility.category.iconKey}
					color={facility.category.categoryColorCodes.colorCode}
					name={pickText(facility.category.name, $langState)}
				/>
			</div>

			<Thumb facilityFiles={facility.facilityFiles?.slice(0, 1) ?? []} />
		</div>

		<div bind:clientHeight={null, setSheetMidH}>
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

			{#if destinationMatch?.tourDestinationCommonButtons?.length > 0}
				<div class="flex items-center gap-2 px-5 py-1 text-xs **:leading-tight **:tracking-tighter **:break-all">
					{#each destinationMatch.tourDestinationCommonButtons as item (item.id)}
						<a
							href={item.buttonUrl}
							target="_blank"
							class="flex h-10 flex-1 items-center justify-between gap-0.5 rounded-lg border border-slate-200 bg-white px-3"
						>
							<span class="flex items-center gap-1">
								{#if item.iconUrl}
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

		<ul class="grid grid-cols-2">
			<li class="flex items-center justify-center">
				<button
					type="button"
					class="aira-current:font-bold min-h-9 flex-1 border-b-2 border-b-slate-200 text-center text-slate-500 aria-current:border-b-(--base-color) aria-current:text-(--base-color)"
					aria-current={tabCurrent === 'operations'}
					onclick={() => (tabCurrent = 'operations')}
				>
					{m.usr_map_002_08({ locale: $langState })}
				</button>
			</li>
			<li class="flex items-center justify-center">
				<button
					type="button"
					class="aira-current:font-bold min-h-9 flex-1 border-b-2 border-b-slate-200 text-center text-slate-500 aria-current:border-b-(--base-color) aria-current:text-(--base-color)"
					aria-current={tabCurrent === 'products'}
					onclick={() => (tabCurrent = 'products')}
				>
					{m.usr_map_002_50({ locale: $langState })}
				</button>
			</li>
		</ul>

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

				<div class="flex min-h-12.5 items-center gap-2 px-5 py-1">
					<Icons name="call" cls="size-4 fill-slate-400" />
					<a href="tel:" class="text-base text-black">02-1111-1111</a>
					<button type="button" class="text-2877ff text-sm active:bg-slate-50">
						{m.usr_map_002_47({ locale: $langState })}
					</button>
				</div>

				<div class="flex min-h-12.5 items-center gap-2 px-5 py-1">
					<p class="flex items-center gap-2 text-base font-bold text-black">
						<Icons name="clock-filled" cls="size-4 fill-slate-400" />
						운영중
					</p>
				</div>

				{#if otherFacilities.length > 0}
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
												{pickText(item.name, $langState)}
											</p>
											<p class="mt-1 truncate text-sm text-slate-700">
												{pickText(item.category.name, $langState)}
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

				{#if pickText(facility.description, $langState)}
					<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
						<p class="text-000 flex items-center gap-2 text-base">
							<Icons name="chat" cls="size-4 fill-slate-400" />
							상세 정보
						</p>

						<div class="rounded-lg bg-slate-100 p-3 text-xs whitespace-pre-line text-slate-700">
							{pickText(facility.description, $langState)}
						</div>
					</div>
				{/if}

				{#if facility.facilityButtons.length > 0}
					<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
						<p class="text-000 flex items-center gap-2 text-base">
							<Icons name="add-info" cls="size-4 fill-slate-400" />
							시설 정보 더보기
						</p>

						<div class="grid gap-2">
							{#each facility.facilityButtons as f (f.id)}
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
				{#if facility.facilityFiles.length > 0}
					<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
						<p class="text-000 flex items-center gap-2 text-base">
							<Icons name="use-guide" cls="size-4 fill-slate-400" />
							{m.usr_map_002_51({ locale: $langState })}
						</p>

						<Thumb variant="guide" facilityFiles={facility.facilityFiles ?? []} />
					</div>
				{/if}

				{#if facility.product}
					<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
						<p class="text-000 flex items-center gap-2 text-base">
							<Icons name="use-guide" cls="size-4 fill-slate-400" />
							{m.usr_map_002_52({ locale: $langState })}
						</p>

						<ul class="inline-flex w-full flex-col divide-y divide-slate-200">
							{#each facility.product as item (item.id)}
								<li class="inline-flex flex-col py-3">
									<div class="flex items-center justify-between gap-2">
										<div class="">
											<p class="text-000 text-lg leading-tight font-semibold">
												{pickText(item.name, $langState)}
											</p>
										</div>

										{#if item.fileUrl}
											<picture class="size-17.5 flex-none overflow-clip rounded-sm bg-slate-50">
												<img src={item.fileUrl} alt="" />
											</picture>
										{/if}
									</div>
									<p class="mt-2.5 text-sm text-slate-700">
										{pickText(item.description, $langState)}
									</p>
									<p class="mt-3 text-sm font-bold text-slate-700">15,000원</p>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	{#if bottomVisible}
		<BtnDirections />
	{/if}
</div>
