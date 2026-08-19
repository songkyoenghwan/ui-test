<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { setSheetMidH, sheetMidRatioValue, sheetMaxRatioValue } from '@/src/stores/sheetUiStore';
	import { langState } from '@/stores/globalStore';
	import CommonButtons from '@/svelte/facility/CommonButtons.svelte';
	import ConfusionCurrent from '@/svelte/facility/ConfusionCurrent.svelte';
	import Contact from '@/svelte/facility/Contact.svelte';
	import DetailedInformation from '@/svelte/facility/DetailedInformation.svelte';
	import ExclusiveButton from '@/svelte/facility/ExclusiveButton.svelte';
	import OtherFacilities from '@/svelte/facility/OtherFacilities.svelte';
	import Overview from '@/svelte/facility/Overview.svelte';
	import ProductGuide from '@/svelte/facility/ProductGuide.svelte';
	import Products from '@/svelte/facility/Products.svelte';
	import VehicleNavigation from '@/svelte/facility/VehicleNavigation.svelte';
	import Address from '@/svelte/facility/Address.svelte';
	import OperationInformation from '@/svelte/facility/OperationInformation.svelte';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';
	import { z } from 'zod';
	import { sheetInstance, sheetSnapPoint } from '@/stores/uxStore';

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

	let tabCurrent = $state<TabType>('operations');
	let hasFiles = $derived(($facilityCurrent.facilityDetail?.facilityProductGuideFiles?.length ?? 0) > 0);
	let hasProduct = $derived(($facilityCurrent.facilityDetail?.facilityProducts?.length ?? 0) > 0);
	let tabState = $derived(hasFiles || hasProduct);
	let hiddenState = $derived.by(() => $sheetSnapPoint >= $sheetMaxRatioValue * 100);
	let noneCheck = $derived(
		($facilityCurrent.facilityDetail?.facilityOperatingSchedules?.length ?? 0) === 0 &&
			$facilityCurrent.facilityDetail?.contact === null &&
			($facilityCurrent?.facilityOtherList?.length ?? 0) === 1 &&
			$facilityCurrent.facility?.description === null &&
			($facilityCurrent?.facilityDetail?.facilityButtons.length ?? 0) === 0,
	);
</script>

<Overview />

<div class="pb-1" bind:clientHeight={null, setSheetMidH}>
	<div class={[hiddenState ? 'opacity-0 transition-all delay-5' : '']}>
		<OperationInformation variant="state" />
	</div>

	<Address />

	<VehicleNavigation />

	<CommonButtons />
</div>

<div class="group/max-facility flex flex-1 flex-col">
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
		<div class="peer divide-y-4 divide-slate-100 *:py-4">
			<OperationInformation />

			<ConfusionCurrent />

			<Contact />

			<OtherFacilities />

			<DetailedInformation />

			<ExclusiveButton />
		</div>
	{/if}

	{#if tabState && tabCurrent === 'products'}
		<div class="divide-y-4 divide-slate-100 *:py-4">
			<ProductGuide />

			<Products />
		</div>
	{/if}

	{#if noneCheck}
		<div class="inline-flex flex-1 flex-col items-center justify-center gap-4 border-t border-t-slate-100 bg-slate-50 p-5">
			<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M40.0013 73.3337C58.4013 73.3337 73.3346 58.4003 73.3346 40.0003C73.3346 21.6003 58.4013 6.66699 40.0013 6.66699C21.6013 6.66699 6.66797 21.6003 6.66797 40.0003C6.66797 58.4003 21.6013 73.3337 40.0013 73.3337Z"
					stroke="#CAD5E2"
					stroke-width="5"
					stroke-miterlimit="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M62.9987 16.667L16.332 63.3337"
					stroke="#CAD5E2"
					stroke-width="5"
					stroke-miterlimit="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>

			<p class="text-base font-bold text-slate-500">
				{m.usr_map_002_49({ locale: $langState })}
			</p>
		</div>
	{/if}
</div>
