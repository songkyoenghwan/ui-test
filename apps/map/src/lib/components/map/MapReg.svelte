<svelte:options
	customElement={{
		tag: 'map-reg',
		shadow: 'none',
		props: {
			poi: { type: 'String', reflect: true },
			ko: { type: 'String', reflect: true },
			en: { type: 'String', reflect: true },
			zh: { type: 'String', reflect: true },
			ja: { type: 'String', reflect: true },
			th: { type: 'String', reflect: true },
			vi: { type: 'String', reflect: true },
			lat: { type: 'String', reflect: true },
			lon: { type: 'String', reflect: true },
			addr: { type: 'String', reflect: true },
			place: { type: 'Array' },
		},
	}}
/>

<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import Sortable from 'sortablejs';

	let { id = '', poi = '', ko = '', en = '', zh = '', ja = '', th = '', vi = '', lat = '', lon = '', addr = '', place = [] } = $props();

	const handleSortable: Attachment<HTMLElement> = (el) => {
		const animation = new Sortable(el, {
			handle: '.handle',
			animation: 150,
			onEnd: (evt) => {
				// const newPlace = Array.from(evt.to.children).map((item: HTMLElement) => {});
				// // place를 업데이트 → 외부에 전달
				// place = newPlace;
			},
		});

		return () => {
			animation.destroy(); // sortable 종료
		};
	};
</script>

<header class="map-reg__header" {id} data-section-id={id}>
	<div class="flex items-center justify-between gap-1">
		<h3 class="text-lg font-semibold">위치 등록</h3>
		<div class="flex-none">
			<button type="button" class="button icon size-8 px-1">
				<span class="sr-only">삭제</span>
				<icon-list data-name="input-del" class="icon stroke-f5f5f5 bg-f5f5f5 size-6 rounded-lg fill-slate-600"></icon-list>
			</button>
		</div>
	</div>
</header>

<section class="map-reg__top group/map-lang border-t border-t-slate-200">
	<div class="hidden flex-col space-y-2 group-has-checked/map-lang:flex">
		<div class="flex items-end justify-between gap-1">
			<h4 class="text-base font-semibold">위치명</h4>
			<div class="flex-none">
				<p class="flex-1 text-slate-600">{poi}</p>
			</div>
		</div>
		<ul class="flex flex-col gap-2">
			<li class="grid grid-cols-[28px_1fr_80px] items-center gap-1">
				<label for="map-reg-ko" class="label text-primary">KO</label>
				<input type="text" name="map-reg-ko" id="map-reg-ko" class="input-text s outline-primary outline" placeholder="내용을 입력하세요." bind:value={ko} />
				<button type="button" class="button primary-outline s flex-none">
					<span>자동번역</span>
					<icon-list data-name="translate" class="icon stroke-primary size-4"></icon-list>
				</button>
			</li>
			<li class="grid grid-cols-[28px_1fr] items-center gap-0.5">
				<label for="map-reg-en" class="label">EN</label>
				<input type="text" name="map-reg-en" id="map-reg-en" class="input-text s" placeholder="영어로 입력해 주세요." bind:value={en} />
			</li>
		</ul>
		<div class="flex items-center gap-2">
			<button type="button" class="button primary-outline s flex-1">
				<span>다국어 입력</span>
			</button>
		</div>
		<ul class="flex flex-col gap-2 pt-2">
			<li class="grid grid-cols-[22px_1fr_22px_1fr] items-center gap-2">
				<label for="map-reg-lat" class="label">위도</label>
				<input type="text" name="map-reg-lat" id="map-reg-lat" class="input-text s" placeholder="위도" bind:value={lat} />
				<label for="map-reg-lon" class="label">경도</label>
				<input type="text" name="map-reg-lon" id="map-reg-lon" class="input-text s" placeholder="경도" bind:value={lon} />
			</li>
			<li class="grid grid-cols-[22px_1fr] items-center gap-2">
				<label for="" class="label">주소</label>
				<input type="text" name="" id="" class="input-text s" placeholder="주소" readonly bind:value={addr} />
			</li>
		</ul>
	</div>

	<label for="map-reg-top-1" class="icon hover:bg-primary/20 inline-flex h-7 flex-none items-center justify-end gap-2 rounded-r-sm px-1 text-slate-400">
		<icon-list data-name="arrow-down" class="icon relative size-4 h-12 rotate-0 stroke-slate-400 transition-transform group-has-checked/map-lang:rotate-180"></icon-list>
		<input type="checkbox" id="map-reg-top-1" name="map-reg-top-1" class="peer sr-only" checked />
		<span class="relative hidden text-sm group-has-checked/map-lang:flex">접기</span>
		<span class="relative flex text-sm group-has-checked/map-lang:hidden">펼치기</span>
	</label>
</section>

<section class="flex min-h-0 flex-1 flex-col border-t border-t-slate-200 bg-slate-50 py-4">
	<header class="gap-1 px-5">
		<div class="flex items-end justify-between gap-1">
			<h4 class="text-lg font-semibold">매칭된 시설</h4>
			<div class="flex-none">
				<p class="flex-1 text-slate-500">
					<strong class="font-bold">{place.length}</strong>
					<span>개</span>
				</p>
			</div>
		</div>
		<p class="text-xs text-slate-400">* 다중 등록할 경우, 운영 상태 순으로 우선 정렬되어 노출됩니다</p>

		<div class="flex w-full items-center gap-2 py-3">
			<button type="button" class="button s primary-outline flex-1">
				<span>새 시설 등록</span>
			</button>
			<button type="button" class="button s primary flex-1">
				<span>등록된 시설 매칭</span>
			</button>
		</div>
	</header>

	<ul {@attach handleSortable} class="flex flex-1 scrollbar-gutter-stable flex-col gap-2 overflow-x-clip overflow-y-auto scroll-smooth pl-5">
		{#each place as item}
			{@render placeItem(item)}
		{/each}
	</ul>
</section>

<footer class="divide-y divide-slate-200 border-t border-t-slate-200 bg-white">
	<div class="bg-white px-5 py-4.5">
		<h4 class="text-lg font-semibold">지도 노출</h4>
	</div>

	<div class="flex w-full items-center gap-2 px-5 py-4.5">
		<button type="button" class="button ghost m flex-[0_9_60px]">
			<span class="sr-only">삭제</span>
			<icon-list data-name="arrow-down" class="icon relative size-4 rotate-0 stroke-slate-400 transition-transform group-has-checked/map-lang:rotate-180"></icon-list>
		</button>
		<button type="button" class="button primary m flex-1">
			<span>저장</span>
		</button>
	</div>
</footer>

{#snippet placeItem(item)}
	<li class="grid w-full grid-cols-[24px_35px_1fr_24px] items-center gap-1 rounded-sm border border-slate-200 bg-white pr-1">
		<button type="button" class="button icon handle">
			<span class="sr-only">button</span>
			<icon-list data-name="drag-dots" class="icon fill-d9d9d9 hover:fill-primary size-4"></icon-list>
		</button>

		<picture class="flex size-8.75 overflow-clip rounded-sm bg-slate-50">
			<img src=" " alt="" class="size-full" />
		</picture>

		<div class="grid w-full space-y-0.5 py-2 pl-1">
			<p class="truncate text-sm text-slate-600">{item.tit ?? ''}</p>
			<p class="flex items-center gap-1 text-xs font-normal text-slate-400">
				<span>{item.top ?? ''}</span>
				<span>&#47;</span>
				<span>{item.bottom ?? ''}</span>
			</p>
		</div>

		<button type="button" class="button icon px-1">
			<span class="sr-only">삭제</span>
			<icon-list data-name="input-del" class="icon stroke-error fill-error size-4"></icon-list>
		</button>
	</li>
{/snippet}
