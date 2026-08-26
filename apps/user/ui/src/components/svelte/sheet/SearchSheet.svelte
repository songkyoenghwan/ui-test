<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { setPointSheetUi, setSheetScrollRef, sheetMidRatioValue } from '@/src/stores/sheetUiStore';
	import { langState, pickText } from '@/stores/globalStore';
	import { loadGrantedUserPosition, requestUserPosition, routeSelecting, userPosition } from '@/stores/locationStore';
	import {
		assignRoutePlace,
		current,
		loadPoiDetail,
		poiList,
		poiListAll,
		searchResultList,
		startWalkingFromUserLocation,
	} from '@/stores/pageDataStore';
	import { saveRecentFacility } from '@/stores/recentSearchStore';
	import { sheetInstance, updateViewState } from '@/stores/uxStore';
	import Info from '@/svelte/facility/Info.svelte';
	import { calculateDistanceMeters } from '@/utils/distance';
	import { facilityDisplayName } from '@/utils/route-place';
	import {
		sortSearchResults,
		type SearchSort,
		type SearchSortableFacility,
	} from '@/utils/searchSort';

	let scrollEl: HTMLDivElement | null = $state(null);
	const sortList = [
		{ id: 'hours', txt: m.usr_src_101_01({ locale: $langState }) },
		{ id: 'proximity', txt: m.usr_src_101_02({ locale: $langState }) },
		{ id: 'alphabetical', txt: m.usr_src_101_03({ locale: $langState }) },
	];
	let sortState = $state<SearchSort>('hours');
	let changingSort = $state(false);
	const sortableResults = $derived(
		($searchResultList as SearchSortableFacility[]).map((item) => ({
			...item,
			distance:
				$userPosition && item.latitude != null && item.longitude != null
					? calculateDistanceMeters(
							{ latitude: $userPosition.latitude, longitude: $userPosition.longitude },
							{ latitude: item.latitude, longitude: item.longitude },
						)
					: null,
		})),
	);
	const sortedResults = $derived(
		sortSearchResults(sortableResults, sortState, (item) => pickText(item.name, $langState), $langState),
	);

	$effect(() => {
		setSheetScrollRef(scrollEl);
		$sheetInstance?.setSnapPoint($sheetMidRatioValue);
		if (!$userPosition) void loadGrantedUserPosition();
	});

	async function changeSort(next: SearchSort) {
		if (changingSort) return;
		setPointSheetUi('max');

		if (next !== 'proximity') {
			sortState = next;
			return;
		}

		changingSort = true;
		const position = $userPosition ?? (await requestUserPosition());
		if (position) sortState = next;
		changingSort = false;
	}

	const onSelectFacility = (result: SearchSortableFacility) => {
		const poiId = Number(result.poiId);
		if ($routeSelecting !== 'idle') {
			let latitude = result.latitude;
			let longitude = result.longitude;
			if (latitude == null || longitude == null) {
				const poi =
					(Number.isFinite(poiId) ? $poiList.find((entry) => entry.id === poiId) : undefined) ??
					(Number.isFinite(poiId) ? $poiListAll.find((entry) => entry.id === poiId) : undefined);
				if (!poi) return;
				latitude = poi.latitude;
				longitude = poi.longitude;
			}
			assignRoutePlace({
				latitude,
				longitude,
				poiId: Number.isFinite(poiId) && poiId > 0 ? poiId : null,
				name: facilityDisplayName(result.name, $langState),
			});
			return;
		}

		if (!Number.isFinite(poiId) || poiId < 1) return;
		saveRecentFacility({
			facilityId: result.id,
			poiId,
			tourDestinationId: $current.destination,
			name: result.name,
			iconKey: result.category?.iconKey ?? result.category?.parent?.iconKey,
			colorCode:
				result.category?.categoryColorCodes?.colorCode ?? result.category?.parent?.categoryColorCodes?.colorCode,
		});

		current.setKey('facility', result.id);
		current.setKey('poi', poiId);
		updateViewState({
			layout: 'facilities',
			detail: 'facilities',
			search: 'idle',
		});
		void loadPoiDetail(poiId, result.id);
	};

	const startDirections = async (result: SearchSortableFacility) => {
		if (result.latitude == null || result.longitude == null) return;

		await startWalkingFromUserLocation(
			{
				latitude: result.latitude,
				longitude: result.longitude,
				poiId: result.poiId ?? null,
				name: facilityDisplayName(result.name, $langState),
			},
			m.usr_nav_101_03({ locale: $langState }),
		);
	};
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
				checked={sort.id === sortState}
				disabled={changingSort}
				onchange={() => void changeSort(sort.id as SearchSort)}
				class="sr-only"
			/>
			{sort.txt}
		</label>
	{/each}
</fieldset>

<ul class="divide-y-2 divide-slate-200 border-t-2 border-t-slate-200">
	{#each sortedResults as result (result.id)}
		<li class="py-2">
			<div
				role="button"
				tabindex="0"
				class="w-full text-left"
				onclick={() => onSelectFacility(result)}
				onkeydown={(event) => {
					if (event.key === 'Enter' || event.key === ' ') onSelectFacility(result);
				}}
			>
				<Info variant="list" rest={result} onDirections={() => void startDirections(result)} />
			</div>
		</li>
	{/each}
</ul>
