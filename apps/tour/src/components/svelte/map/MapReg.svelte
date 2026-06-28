<svelte:options
	customElement={{
		tag: 'map-reg',
		shadow: 'none',
		props: {
			open: { type: 'String', reflect: true },
			result: { type: 'Object' },
		},
	}}
/>

<script lang="ts">
	import { removePlaceById, type Place } from '@/svelte/map/MapRegEv.svelte';
	import { onlyNumber } from '@/utils/inputEv';
	import Sortable from 'sortablejs';
	import type { Attachment } from 'svelte/attachments';

	let { id = '', open = 'close', result = {} } = $props();

	const handleSortable: Attachment<HTMLElement> = (el) => {
		const animation = new Sortable(el, {
			handle: '.handle',
			animation: 150,
			onEnd: (evt) => {
				const newSort = Array.from(evt.from.children).map((item: Element) => {
					const el = item as HTMLElement;
					const { id, tit, top, bottom, category } = el.dataset;
					return {
						id: id ?? '',
						tit: tit ?? '',
						top: top ?? '',
						bottom: bottom ?? '',
						category: category ?? '',
					} satisfies Place;
				});

				places = newSort;
			},
		});

		return () => {
			animation.destroy(); // sortable 종료
		};
	};

	let posToggle = $state(false);
	let langToggle = $state(true);

	function dispatch(type: string) {
		$host().dispatchEvent(new CustomEvent(type));
	}
</script>

{#snippet placeItem(place: Place = { id: '', tit: '', top: '', bottom: '', category: '' })}
	<li
		id={place.id}
		data-id={place.id}
		data-tit={place.tit}
		data-top={place.tit}
		data-bottom={place.bottom}
		data-category={place.category}
		class="grid w-full grid-cols-[24px_35px_1fr_24px] items-center gap-1 rounded-sm border border-slate-200 bg-white pr-1"
	>
		<button type="button" class="button icon handle">
			<span class="sr-only">button</span>
			<icon-list data-name="drag-dots" class="icon fill-d9d9d9 hover:fill-primary size-4"></icon-list>
		</button>

		<picture class="flex size-8.75 overflow-clip rounded-sm bg-slate-50">
			<img src=" " alt="" class="size-full" />
		</picture>

		<div class="grid w-full space-y-0.5 py-2 pl-1">
			<p class="truncate text-sm text-slate-600">{place.tit ?? ''}</p>
			<p class="flex items-center gap-1 text-xs font-normal text-slate-400">
				<span>{place.top ?? ''}</span>
				<span>&#47;</span>
				<span>{place.bottom ?? ''}</span>
			</p>
		</div>

		<button
			type="button"
			class="button icon px-1"
			aria-label="시설 삭제"
			onclick={() => {
				result.places = removePlaceById(result.places, place.id);
			}}
		>
			<span class="sr-only">삭제</span>
			<icon-list data-name="input-del" class="icon stroke-error fill-error size-4"></icon-list>
		</button>
	</li>
{/snippet}

{#if open === 'open'}
	<header class="map-reg__header" {id} data-section-id={id}>
		<div class="flex items-center justify-between gap-1">
			<h3 class="text-lg font-semibold">위치 등록</h3>
			<div class="flex-none">
				<button
					type="button"
					class="button icon size-8 px-1"
					onclick={(e) => {
						e.preventDefault();
						open = 'close';
					}}
				>
					<span class="sr-only">삭제</span>
					<icon-list
						data-name="input-del"
						class="icon stroke-f5f5f5 bg-f5f5f5 size-6 rounded-lg fill-slate-600"
					></icon-list>
				</button>
			</div>
		</div>
	</header>

	<section class="map-reg__top group/map-lang border-t border-t-slate-200">
		<div class="flex items-end justify-between gap-1">
			<div class="">
				<ui-tit tit="위치명"></ui-tit>
				<hover-tooltip
					class="inline-flex gap-2"
					btn="15자 이내 권장"
					txt="언어에 따라 표현 길이가 달라질 수 있으므로 \n번역 내용을 확인해주세요. (최대 25자)"
				></hover-tooltip>
			</div>
			<p class="flex-none text-slate-600">{result.id ?? '이름없음'}</p>
		</div>
		<div class=" flex-col space-y-2 group-has-checked/map-lang:flex">
			<lang-translate data-max-length="25" view="reg"></lang-translate>

			<ul class="flex flex-col gap-2 pt-2">
				<li class="grid grid-cols-[22px_1fr_22px_1fr] items-center gap-2">
					<label for="map-reg-lat" class="label flex-none">위도</label>
					<input
						type="text"
						name="map-reg-lat"
						id="map-reg-lat"
						class="input-text s"
						placeholder="위도"
						bind:value={result.lat}
						maxlength="9"
						oninput={(e) => {
							onlyNumber(e);
						}}
					/>
					<label for="map-reg-lon" class="label flex-none">경도</label>
					<input
						type="text"
						name="map-reg-lon"
						id="map-reg-lon"
						class="input-text s"
						placeholder="경도"
						bind:value={result.lon}
						maxlength="9"
						oninput={(e) => {
							onlyNumber(e);
						}}
					/>
				</li>
				<li class="grid grid-cols-[22px_1fr] items-center gap-2">
					<label for="map-reg-addr" class="label flex-none">주소</label>
					<input
						type="text"
						name="map-reg-addr"
						id="map-reg-addr"
						class="input-text s"
						placeholder="주소"
						readonly
						bind:value={result.addr}
					/>
				</li>
			</ul>
		</div>

		<label
			for="map-reg-top-1"
			class="icon hover:bg-primary/20 focus-within:outline-primary inline-flex h-7 flex-none items-center justify-end gap-2 rounded-r-sm px-1 text-slate-400 focus-within:outline"
		>
			<icon-list
				data-name="arrow-down"
				class="icon stroke-primary relative size-4 rotate-0 rounded-sm transition-transform group-has-checked/map-lang:rotate-180 group-has-checked/map-lang:stroke-slate-400"
			></icon-list>
			<input type="checkbox" id="map-reg-top-1" name="map-reg-top-1" class="peer sr-only" bind:checked={posToggle} />
			<span class="relative hidden text-sm group-has-checked/map-lang:flex">접기</span>
			<span class="text-primary relative flex text-sm group-has-checked/map-lang:hidden">펼치기</span>
		</label>
	</section>

	<section class="flex min-h-0 flex-1 flex-col border-t border-t-slate-200 py-4">
		<header class="gap-1 px-5">
			<div class="flex items-end justify-between gap-1">
				<h4 class="text-lg font-semibold">매칭된 시설</h4>
				<div class="flex-none">
					<p class="flex-1 text-slate-500">
						<strong class="font-bold">{result.facilityPoiMappings.length}</strong>
						<span>개</span>
					</p>
				</div>
			</div>

			<div class="flex w-full items-center gap-2 py-3">
				<button type="button" class="button s secondary flex-1">
					<span>새 시설 등록</span>
				</button>
				<button type="button" class="button s primary flex-1">
					<span>등록된 시설 매칭</span>
				</button>
			</div>
		</header>

		<ul
			{@attach handleSortable}
			class="flex flex-1 scrollbar-gutter-stable flex-col gap-2 overflow-x-clip overflow-y-auto scroll-smooth pl-5"
		>
			{#each result.places as place (place.id)}
				{@render placeItem(place)}
			{/each}
		</ul>
	</section>

	<footer class="divide-y divide-slate-200 border-t border-t-slate-200 bg-white">
		<div class="bg-white px-5 py-4.5">
			<h4 class="text-lg font-semibold">지도 노출</h4>
		</div>

		<div class="flex w-full items-center gap-2 px-5 py-4.5">
			<button type="button" class="button ghost m flex-[0_9_60px]" onclick={() => dispatch('pos-del')}>
				<span class="sr-only">삭제</span>
				<icon-list data-name="trash" class="icon relative size-4 stroke-slate-400 transition-transform"></icon-list>
			</button>
			<button type="button" class="button primary m flex-1" onclick={() => dispatch('pos-save')}>
				<span>저장</span>
			</button>
		</div>
	</footer>
{/if}
