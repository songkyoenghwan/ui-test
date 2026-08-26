<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { categoryState, langState, pickText } from '@/stores/globalStore';
	import { loadGrantedUserPosition, routeSelecting, userPosition } from '@/stores/locationStore';
	import {
		aiRecommendationFacilityItems,
		assignRoutePlace,
		current,
		departureSearchTab,
		keywordSearchError,
		keywordSearchLoading,
		keywordSearchResultList,
		keywordSearchSubmitted,
		loadAiRecommendationFacilities,
		loadKeywordSearch,
		loadPopularSearches,
		loadPoiDetail,
		poiList,
		poiListAll,
		popularSearchFacilityItems,
		recommendList,
		startWalkingFromUserLocation,
	} from '@/stores/pageDataStore';
	import { loadRecentSearches, recentSearchItems, removeRecentSearch, touchRecentSearch } from '@/stores/recentSearchStore';
	import { searchViewState, updateViewState } from '@/stores/uxStore';
	import IconCategory from '@/svelte/icons/IconCategory.svelte';
	import Icons from '@/svelte/icons/Icons.svelte';
	import Info from '@/svelte/facility/Info.svelte';
	import type { FacilityListResponse } from '@/types/facilities';
	import type { SearchLanguage } from '@/types/search';
	import { facilityDisplayName } from '@/utils/route-place';

	let {
		recommendationTab = null,
	}: {
		recommendationTab?: 'ai-recommend' | 'popularity' | null;
	} = $props();

	type VisibleItem = {
		id: string;
		type: 'keyword' | 'facility' | 'recommend' | 'ai-recommend' | 'popularity';
		icon: string;
		color: string;
		name: string;
		keyword?: string;
		facilityId?: number;
		poiId?: number;
	};

	let listEl = $state<HTMLUListElement | null>(null);
	let sentinelEl = $state<HTMLLIElement | null>(null);
	let visibleCount = $state(30);
	let loading = $state(false);
	let visibleItems = $derived.by<VisibleItem[]>(() => {
		if ($searchViewState === 'search' || ($searchViewState === 'departureSearch' && $departureSearchTab === 'recent-searches')) {
			return $recentSearchItems
				.filter((item) => item.tourDestinationId === $current.destination)
				.map((item) =>
					item.type === 'keyword'
						? {
								id: item.id,
								type: item.type,
								icon: 'search',
								color: '#94a3b8',
								name: item.keyword,
								keyword: item.keyword,
							}
						: {
								id: item.id,
								type: item.type,
								icon: item.iconKey ?? '',
								color: item.colorCode ?? '',
								name: pickText(item.name, $langState),
								facilityId: item.facilityId,
								poiId: item.poiId,
							},
				);
		}

		return $searchViewState === 'recommend'
			? ($recommendList ?? []).map((item) => ({
					id: `recommend:${item.id}`,
					type: 'recommend',
					icon: item.category?.iconKey ?? '',
					color: item.category?.categoryColorCodes?.colorCode ?? '',
					name: pickText(item.name, $langState),
				}))
			: [];
	});
	let activeRecommendationTab = $derived(
		recommendationTab ?? ($searchViewState === 'departureSearch' ? $departureSearchTab : null),
	);
	let recommendationFacilities = $derived.by<FacilityListResponse[]>(() => {
		if (activeRecommendationTab === 'ai-recommend') return $aiRecommendationFacilityItems;
		if (activeRecommendationTab === 'popularity') return $popularSearchFacilityItems;
		return [];
	});
	let showRecommendationFacilities = $derived(
		activeRecommendationTab === 'ai-recommend' || activeRecommendationTab === 'popularity',
	);
	let hasRender = $derived(0 < visibleItems.length);
	let hasEmptyKeywordResult = $derived(
		$searchViewState === 'search' &&
			$keywordSearchSubmitted &&
			!$keywordSearchLoading &&
			!$keywordSearchError &&
			$keywordSearchResultList.length === 0,
	);
	let hasMore = $derived(visibleCount < visibleItems.length);
	function loadMore() {
		if (loading || !hasMore) return;

		loading = true;

		setTimeout(() => {
			visibleCount += 20;
			loading = false;
		}, 200);
	}

	$effect(() => {
		loadRecentSearches();
	});

	$effect(() => {
		if (activeRecommendationTab !== 'ai-recommend') return;
		const language: SearchLanguage = ['ko', 'en', 'ja', 'zh', 'th', 'vi'].includes($langState)
			? ($langState as SearchLanguage)
			: 'ko';
		void loadAiRecommendationFacilities({ destinationId: $current.destination, language });
	});

	$effect(() => {
		if (activeRecommendationTab !== 'popularity') return;
		const language: SearchLanguage = ['ko', 'en', 'ja', 'zh', 'th', 'vi'].includes($langState)
			? ($langState as SearchLanguage)
			: 'ko';
		void loadPopularSearches({ destinationId: $current.destination, language });
	});

	$effect(() => {
		if (!showRecommendationFacilities || $userPosition) return;
		void loadGrantedUserPosition();
	});

	$effect(() => {
		const root = listEl;
		const target = sentinelEl;

		if (!root || !target || !hasMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry?.isIntersecting) {
					loadMore();
				}
			},
			{
				root,
				rootMargin: '120px',
				threshold: 0,
			},
		);

		observer.observe(target);

		return () => {
			observer.disconnect();
		};
	});

	const searchResultView = () => {
		updateViewState({
			layout: 'search',
			detail: 'search',
			search: 'searchResult',
		});
	};

	const selectRecentSearch = async (item: VisibleItem) => {
		if (item.type === 'recommend') {
			searchResultView();
			return;
		}

		if ((item.type === 'facility' || item.type === 'popularity') && item.facilityId && item.poiId) {
			if (item.type === 'facility') touchRecentSearch(item.id);
			if ($searchViewState === 'departureSearch' && $routeSelecting !== 'idle') {
				const poi =
					$poiList.find((entry) => entry.id === item.poiId) ?? $poiListAll.find((entry) => entry.id === item.poiId);
				if (!poi) return;
				assignRoutePlace({
					latitude: poi.latitude,
					longitude: poi.longitude,
					poiId: poi.id,
					name: item.name,
				});
				return;
			}
			current.setKey('facility', item.facilityId);
			current.setKey('poi', item.poiId);
			updateViewState({ layout: 'facilities', detail: 'facilities', search: 'idle' });
			void loadPoiDetail(item.poiId, item.facilityId);
			return;
		}

		if (!item.keyword) return;
		categoryState.set(item.keyword);
		const language: SearchLanguage = ['ko', 'en', 'ja', 'zh', 'th', 'vi'].includes($langState)
			? ($langState as SearchLanguage)
			: 'ko';
		const searched = await loadKeywordSearch({
			destinationId: $current.destination,
			keyword: item.keyword,
			language,
		});
		if (searched) searchResultView();
	};

	const selectRecommendationFacility = (item: FacilityListResponse) => {
		const poiId = Number(item.poiId);
		if (!Number.isFinite(poiId) || poiId < 1) return;
		if ($searchViewState === 'departureSearch' && $routeSelecting !== 'idle') {
			if (item.latitude == null || item.longitude == null) return;
			assignRoutePlace({
				latitude: item.latitude,
				longitude: item.longitude,
				poiId,
				name: facilityDisplayName(item.name, $langState),
			});
			return;
		}
		current.setKey('facility', item.id);
		current.setKey('poi', poiId);
		updateViewState({ layout: 'facilities', detail: 'facilities', search: 'idle' });
		void loadPoiDetail(poiId, item.id);
	};

	const startDirections = async (item: FacilityListResponse) => {
		if (item.latitude == null || item.longitude == null) return;
		await startWalkingFromUserLocation(
			{
				latitude: item.latitude,
				longitude: item.longitude,
				poiId: item.poiId ?? null,
				name: facilityDisplayName(item.name, $langState),
			},
			m.usr_nav_101_03({ locale: $langState }),
		);
	};
</script>

{#if showRecommendationFacilities || ['search', 'recommend', 'departureSearch'].includes($searchViewState)}
	{#if showRecommendationFacilities}
		<ul class="h-full min-h-0 divide-y-2 divide-slate-200 overflow-x-clip overflow-y-auto">
			{#each recommendationFacilities as item (item.id)}
				<li class="py-4 first:pt-0">
					<div
						role="button"
						tabindex="0"
						class="w-full text-left"
						onclick={() => selectRecommendationFacility(item)}
						onkeydown={(event) => {
							if (event.key === 'Enter' || event.key === ' ') selectRecommendationFacility(item);
						}}
					>
						<Info
							variant="list"
							rest={item}
							onDirections={
								recommendationTab != null && $searchViewState !== 'departureSearch'
									? () => void startDirections(item)
									: undefined
							}
						/>
					</div>
				</li>
			{/each}
		</ul>
	{:else}
		<ul bind:this={listEl} class="h-full min-h-0 divide-y divide-slate-200 overflow-x-clip overflow-y-auto scroll-smooth">
		{#if hasEmptyKeywordResult}
			<li class="h-full">
				<p class="grid h-full place-content-center bg-slate-50 text-center text-[20px] font-semibold text-slate-700">
					{m.usr_src_001_02({ locale: $langState })}
					<br />
					{m.usr_src_001_03({ locale: $langState })}
				</p>
			</li>
		{:else if hasRender}
			{#each visibleItems as item (item.id)}
				<li
					class="grid gap-1 overflow-clip pr-3 pl-6 has-active:bg-slate-50 has-data-[btn=del]:grid-cols-[minmax(0,1fr)_36px]"
					style:--category-color="red"
				>
					<button
						type="button"
						class="flex min-h-16 w-full items-center gap-2 active:bg-slate-50"
						onclick={() => void selectRecentSearch(item)}
					>
						<IconCategory
							icon={item.icon}
							color={item.color}
							name={item.name}
						/>
					</button>

					<button
						type="button"
						data-btn="del"
						class="flex items-center px-2 active:bg-slate-50"
						onclick={(event) => {
							event.stopPropagation();
							if (item.type === 'keyword' || item.type === 'facility') removeRecentSearch(item.id);
						}}
					>
						<Icons name="close-circle" cls="size-5 stroke-black" />
					</button>
				</li>
			{/each}
		{:else if visibleItems.length === 0}
			<li class="h-full">
				<p class="grid h-full place-content-center bg-slate-50 text-center text-[20px] font-semibold text-slate-700">
					{m.usr_src_001_01({ locale: $langState })}
				</p>
			</li>
		{:else if visibleItems.length === 100}
			<li class="h-full">
				<p class="grid h-full place-content-center bg-slate-50 text-center text-[20px] font-semibold text-slate-700">
					{m.usr_nav_101_08({ locale: $langState })}
					<br />
					{m.usr_nav_101_09({ locale: $langState })}
				</p>
			</li>
		{/if}

		{#if hasMore}
			<li bind:this={sentinelEl} class="flex min-h-12 items-center justify-center text-sm text-slate-400">
				{#if loading}
					Loading...
				{/if}
			</li>
		{/if}
		</ul>
	{/if}
{/if}
