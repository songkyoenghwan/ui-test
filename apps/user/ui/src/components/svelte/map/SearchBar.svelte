<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { categoryState, langState } from '@/stores/globalStore';
	import { requestUserPosition, routeSelecting, userPosition } from '@/stores/locationStore';
	import {
		assignRoutePlace,
		current,
		departureSearchTab,
		destinationDetail,
		keywordSearchSubmitted,
		loadKeywordSearch,
	} from '@/stores/pageDataStore';
	import { searchViewState, updateViewState, restorePreviousViewState } from '@/stores/uxStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import TabTop from '@/svelte/sheet/TabTop.svelte';
	import type { SearchLanguage } from '@/types/search';

	let { name = '' } = $props();

	let showAiRecommendationTab = $derived($destinationDetail?.isAiRecommendYn === true);

	const onSearchHandler = () => {
		if ($routeSelecting !== 'idle') {
			keywordSearchSubmitted.set(false);
			departureSearchTab.set('recent-searches');
		}
		updateViewState({
			layout: 'search',
			detail: 'idle',
			search: $routeSelecting !== 'idle' ? 'departureSearch' : 'search',
		});
	};

	const submitSearchHandler = async () => {
		const language: SearchLanguage = ['ko', 'en', 'ja', 'zh', 'th', 'vi'].includes($langState)
			? ($langState as SearchLanguage)
			: 'ko';
		const searched = await loadKeywordSearch({
			destinationId: $current.destination,
			keyword: $categoryState,
			language,
		});

		if (!searched) return;

		updateViewState({
			layout: 'search',
			detail: 'search',
			search: 'searchResult',
		});
	};

	const backViewSearchHandler = () => {
		categoryState.set('');
		const language: SearchLanguage = ['ko', 'en', 'ja', 'zh', 'th', 'vi'].includes($langState)
			? ($langState as SearchLanguage)
			: 'ko';
		void loadKeywordSearch({
			destinationId: $current.destination,
			keyword: '',
			language,
		});

		if (restorePreviousViewState()) return;

		updateViewState({
			layout: 'default',
			detail: 'ai',
			search: 'default',
		});
	};

	const useCurrentPosition = async () => {
		const position = $userPosition ?? (await requestUserPosition());
		if (!position) return;
		assignRoutePlace({
			latitude: position.latitude,
			longitude: position.longitude,
			poiId: null,
			name: m.usr_nav_101_03({ locale: $langState }),
		});
	};

	$effect(() => {
		if ($searchViewState === 'departureSearch') {
			departureSearchTab.set('recent-searches');
		}
	});
</script>

{#if ['default', 'ai', 'search', 'searchResult', 'departure', 'departureSearch'].includes($searchViewState)}
	<header
		class={[
			'fixed top-0 left-0 z-40 flex h-16 w-full max-w-dvw items-center gap-1 px-3 py-3',
			$searchViewState === 'default' && 'bg-linear-90 from-(--base-color) to-[#07235e] pr-1 pl-5',
			$searchViewState === 'search' && 'bg-white pr-5 pl-2',
			$searchViewState === 'searchResult' && 'bg-white pr-5 pl-2',
			$searchViewState === 'departure' && 'gap-3 bg-white',
			$searchViewState === 'departureSearch' && 'gap-3 bg-white',
		]}
	>
		<div
			class={[
				'relative flex h-10 min-w-0 flex-1 items-center rounded-lg',
				$searchViewState === 'default' && 'bg-white/10 px-3',
				$searchViewState === 'search' && 'gap-1 bg-transparent',
				$searchViewState === 'searchResult' && 'gap-1.5 bg-transparent',
			]}
		>
			{#if ['search', 'searchResult', 'departureSearch'].includes($searchViewState)}
				<button
					type="button"
					class="relative grid size-10 place-content-center rounded-lg bg-white opacity-100 transition-all transition-discrete starting:opacity-0"
					onclick={backViewSearchHandler}
				>
					<Icons name="back" cls="size-6 stroke-black" />
				</button>
			{:else}
				<label for="searchMapInput" aria-label="search" class="flex-none">
					<Icons name="search" cls="size-5 fill-white" />
				</label>
			{/if}
			<input
				type="text"
				id="searchMapInput"
				class={[
					'h-full min-w-0 flex-1 px-2 outline-none placeholder:text-slate-400',
					$searchViewState === 'search' ||
					$searchViewState === 'searchResult' ||
					$searchViewState === 'departureSearch'
						? 'rounded-sm border border-slate-200'
						: 'text-white',
				]}
				autocomplete="off"
				placeholder={$searchViewState === 'departureSearch' ||
				($searchViewState === 'searchResult' && $routeSelecting !== 'idle')
					? $routeSelecting === 'end'
						? m.usr_nav_101_02({ locale: $langState })
						: m.usr_nav_101_01({ locale: $langState })
					: m.usr_map_001_01({ name: name }, { locale: $langState })}
				bind:value={$categoryState}
				onclick={() => onSearchHandler()}
				onkeydown={(event) => {
					if (event.key === 'Enter') void submitSearchHandler();
				}}
			/>

			{#if $categoryState.trim() !== ''}
				<div class="absolute top-0 right-0 z-1">
					<button
						type="button"
						class="grid size-10 cursor-pointer place-content-center rounded-lg"
						aria-label="검색어 지우기"
						onclick={(event) => {
							event.stopPropagation();
							categoryState.set('');
						}}
					>
						<Icons name="close-circle" cls="size-4 stroke-black" />
						<span class="sr-only">검색어 지우기</span>
					</button>
				</div>
			{/if}
		</div>

		{#if $searchViewState === 'default'}
			<button type="button" class="grid h-10 w-9 place-content-center rounded-lg active:bg-white/10">
				<Icons name="menu" cls="size-5 stroke-white" />
			</button>
		{/if}

		{#if $searchViewState === 'departureSearch' || ($searchViewState === 'searchResult' && $routeSelecting !== 'idle')}
			<button
				type="button"
				class="flex h-10 flex-none items-center justify-center gap-1 rounded-lg border border-(--base-color) px-3 text-(--base-color) active:bg-white/10"
				onclick={() => void useCurrentPosition()}
			>
				<Icons name="map-start" cls="fill-(--base-color) size-3.25" />
				{m.usr_nav_101_03({ locale: $langState })}
			</button>
		{/if}
	</header>
{/if}

{#if $searchViewState === 'departureSearch'}
	<TabTop bind:tabState={$departureSearchTab} {showAiRecommendationTab} />
{/if}
