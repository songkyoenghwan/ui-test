<script lang="ts">
	import { createSortedRowModel, createTable, rowSortingFeature, tableFeatures } from '@tanstack/svelte-table';
	import * as m from '@/paraglide/messages';
	import { setSheetScrollRef } from '@/src/stores/sheetUiStore';
	import { langState, pickText } from '@/stores/globalStore';
	import { searchResultList } from '@/stores/pageDataStore';
	import Info from '@/svelte/facility/Info.svelte';
	import Icons from '@/svelte/icons/Icons.svelte';
	import type { FacilityListResponse } from '@/types/facilities';

	let scrollEl: HTMLDivElement | null = $state(null);
	const sortList = [
		{ id: 'hours', txt: m.usr_src_101_01({ locale: $langState }) },
		{ id: 'proximity', txt: m.usr_src_101_02({ locale: $langState }) },
		{ id: 'alphabetical', txt: m.usr_src_101_03({ locale: $langState }) },
	];
	let sortState = $state('hours');
	type SortableFacility = FacilityListResponse & {
		openMinutes?: number;
		distance?: number;
	};

	const features = tableFeatures({
		rowSortingFeature,
		sortedRowModel: createSortedRowModel(),
	});
	const columns = [
		{
			id: 'hours',
			accessorFn: (facility: SortableFacility) => facility.startAt ?? Number.MAX_SAFE_INTEGER,
		},
		{
			id: 'proximity',
			accessorFn: (facility: SortableFacility) => facility.distance ?? Number.MAX_SAFE_INTEGER,
		},
		{
			id: 'alphabetical',
			accessorFn: (facility: SortableFacility) => `${pickText(facility?.name, $langState)}`,
		},
	];
	const tableData = $derived($searchResultList as SortableFacility[]);
	const table = createTable({
		features,
		columns,
		get data() {
			return tableData;
		},
		getRowId: (facility) => String(facility.id),
	});
	const sortedResults = $derived(table.getRowModel().rows.map((row) => row.original));

	$effect(() => {
		setSheetScrollRef(scrollEl);
	});

	$effect(() => {
		table.setSorting([{ id: sortState, desc: false }]);
	});
</script>

<fieldset class="flex gap-2 px-5 py-2" aria-label="정렬 기준">
	{#each sortList as sort}
		<label
			for={sort.id}
			class="cursor-pointer rounded-sm border border-slate-200 bg-white px-3 py-2 has-checked:bg-(--base-color) has-checked:text-white"
		>
			<input
				aria-checked={sort.id === sortState}
				id={sort.id}
				name="facility-sort"
				type="radio"
				value={sort.id}
				bind:group={sortState}
				class="sr-only"
			/>
			{sort.txt}
		</label>
	{/each}
</fieldset>

<ul class="divide-y-2 divide-slate-200 border-t-2 border-t-slate-200">
	{#each sortedResults as result (result.id)}
		<li class="py-2">
			<Info variant="list" rest={result} />
			<div class="grid px-5 py-1">
				<button
					type="button"
					class="text-09235e flex h-10 flex-1 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-100"
				>
					<span>{m.usr_rec_001_07({ locale: $langState })}</span>
					<Icons name="map-start" cls="fill-09235e size-3.25" />
				</button>
			</div>
		</li>
	{/each}
</ul>
