<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { setSheetMidH, sheetMidRatioValue } from '@/src/stores/sheetUiStore';
	import { langState, pickText } from '@/stores/globalStore';
	import { categoryList, destinationList, facilityList, poiList } from '@/stores/pageDataStore';
	import { sheetInstance } from '@/stores/uxStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import Thumb from '@/svelte/thumb/Thumb.svelte';
	import { z } from 'zod';
	import Contact from '@/svelte/facility/Contact.svelte';
	import DetailedInformation from '@/svelte/facility/DetailedInformation.svelte';
	import CommonButtons from '@/svelte/facility/CommonButtons.svelte';
	import ConfusionCurrent from '@/svelte/facility/ConfusionCurrent.svelte';
	import VehicleNavigation from '@/svelte/facility/VehicleNavigation.svelte';
	import Overview from '@/svelte/facility/Overview.svelte';
	import OtherFacilities from '@/svelte/facility/OtherFacilities.svelte';
	import ExclusiveButton from '@/svelte/facility/ExclusiveButton.svelte';
	import ProductGuide from '@/svelte/facility/ProductGuide.svelte';
	import Products from '@/svelte/facility/Products.svelte';
	import { FacilityOverview } from '@/utils/detail.svelte.ts';

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

	const facilityCurrent = new FacilityOverview({
		facility: () => $facilityList?.[0],
		poiList: () => $poiList,
		destinationList: () => $destinationList,
		categoryList: () => $categoryList,
		facilityList: () => $facilityList,
	});
	let tabCurrent = $state<TabType>('operations');
	let hasFiles = $derived((facilityCurrent.facility?.facilityFiles?.length ?? 0) > 0);
	let hasProduct = $derived(!!facilityCurrent.facility?.facilityFiles);
	let tabState = $derived(hasFiles || hasProduct);
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

<Overview facility={facilityCurrent.facility} categoryMatch={facilityCurrent.categoryMatch} />

<div class="pb-1" bind:clientHeight={null, setSheetMidH}>
	<div class="flex flex-col px-5 py-2">
		{@render info('map-pin-filled', '24km', `${pickText(facilityCurrent.poisMatch?.address, $langState)}`)}
	</div>

	{#if facilityCurrent?.poisMatch?.managementCode}
		<VehicleNavigation facility={facilityCurrent.facility} />
	{/if}

	{#if (facilityCurrent?.destinationMatch?.tourDestinationCommonButtons?.length ?? 0) > 0}
		<CommonButtons facility={facilityCurrent.facility} destination={facilityCurrent.destinationMatch} />
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
		<ConfusionCurrent />

		{#if facilityCurrent.facility?.contact}
			<Contact facility={facilityCurrent.facility} />
		{/if}

		<div class="flex min-h-12.5 items-center gap-2 px-5 py-1">
			<p class="flex items-center gap-2 text-base font-bold text-black">
				<Icons name="clock-filled" cls="size-4 fill-slate-400" />
				운영중
			</p>
		</div>

		{#if (facilityCurrent.otherFacilities?.length ?? 0) > 0}
			<OtherFacilities facility={[...facilityCurrent.otherFacilities]} />
		{/if}

		{#if pickText(facilityCurrent.facility?.description, $langState)}
			<DetailedInformation facility={facilityCurrent.facility} />
		{/if}

		{#if facilityCurrent.facility?.facilityButtons?.length}
			<ExclusiveButton facility={facilityCurrent.facility} />
		{/if}
	</div>
{/if}

{#if tabState && tabCurrent === 'products'}
	<div class="divide-y-4 divide-slate-100 *:py-4">
		{#if (facilityCurrent.facility?.facilityProductGuideFiles.length ?? 0) > 0}
			<ProductGuide facility={facilityCurrent.facility} />
		{/if}

		{#if facilityCurrent.facility?.facilityProducts}
			<Products facility={facilityCurrent.facility} />
		{/if}
	</div>
{/if}
