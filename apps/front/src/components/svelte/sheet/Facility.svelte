<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { setSheetMidH, sheetMidRatioValue, sheetMaxRatioValue } from '@/src/stores/sheetUiStore';
	import { langState, pickText } from '@/stores/globalStore';
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
	import { sheetInstance, sheetScrollPoint, sheetSnapPoint } from '@/stores/uxStore';

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
</script>

<Overview />

<div class="pb-1" bind:clientHeight={null, setSheetMidH}>
	<div class={[hiddenState ? ' opacity-0 transition-all delay-10' : '']}>
		<OperationInformation variant="state" />
	</div>

	<Address />

	<VehicleNavigation />

	<CommonButtons />
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
