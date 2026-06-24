<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	console.log(data.data.totalCount);
	let inputDel = $state(false);
</script>

<top-tooltip tit="지도를 우클릭하여 위치 변경" class="absolute top-5 left-5 z-5"></top-tooltip>

<div class="grid grid-cols-[1fr_20rem]">
	<section id="map_div" class="grid size-full"></section>

	<section class="map-list">
		<header class="grid grid-cols-2 gap-x-2 gap-y-3 border-b border-b-slate-200 p-5">
			<ui-tit size="lg" tit="위치 목록"></ui-tit>
			<div class="flex items-center justify-end gap-0.5">
				<ui-txt size="sm" cls="font-bold text-slate-500" txt="302"></ui-txt>
				<ui-txt size="sm" txt="개"></ui-txt>
			</div>
			<select name="" id="" class="select" title="">
				<option value="">전체 카테고리</option>
				<option value="">옵션</option>
			</select>
			<select name="" id="" class="select">
				<option value="">노출 + 비노출</option>
				<option value="">옵션</option>
			</select>
			<input-search-del placeholder="위치 검색" class="col-span-2"></input-search-del>
		</header>

		<div class="flex items-center justify-between gap-1 px-5 py-3">
			<select name="" id="" class="select w-30">
				<option value="">최신순</option>
				<option value="">가나다순</option>
			</select>
			<p class="flex items-center gap-1">
				<ui-txt size="sm" txt="검색결과"></ui-txt>
				<ui-txt size="sm" cls="text-cms-3 font-bold" txt={data.data.totalCount}></ui-txt>
			</p>
		</div>

		<div class="flex min-h-0 flex-1 flex-col">
			{#if data.items.length === 0}
				<div class="flex flex-1 flex-col items-center justify-center gap-3 p-5">
					<icon-items data-name="mouse-circle" class="icon stroke-primary fill-primary size-6.5"></icon-items>
					<p class="text-xl text-slate-400">
						지도를 우클릭하면
						<br />
						새 위치가 생성됩니다
					</p>
				</div>
			{:else}
				<ul class="flex flex-1 flex-col overflow-x-clip overflow-y-auto scroll-smooth">
					{#each data.items as item, index (item?.id)}
						<li data-index={index} class="w-full border-b border-b-slate-200">
							<button
								type="button"
								aria-label={item.name.ko}
								class="grid w-full grid-cols-[1fr_minmax(0,40px)] grid-rows-2 gap-x-2 bg-white px-6 py-4 text-left text-sm transition-colors hover:bg-slate-50"
							>
								<span class="order-1 row-span-1 truncate">
									{item.name.ko ?? ''}
								</span>
								<span class="order-3 row-span-1 flex items-center gap-2 divide-x divide-slate-200 font-normal">
									<span class="pr-2 text-black empty:hidden">POI {item?.id ?? ''}</span>
									<span class="flex items-center gap-1 text-slate-500">
										등록시설
										<strong class="flex items-center">
											<span class={item.facilityPoiMappings.length === 0 ? 'text-error' : 'text-cms-3'}>
												{item.facilityPoiMappings.length}
											</span>
											<span class="font-normal">개</span>
										</strong>
									</span>
								</span>

								<strong class="order-2 row-span-2 grid place-items-center">
									{#if item.isOperationInfoSynced}
										<span class="bg-cms-4 rounded-sm px-2 py-0.5 text-xs font-bold text-white">비노출</span>
									{/if}
								</strong>
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</section>
</div>

<div class="map-reg">
	<header class="px-4 py-3">
		<div class="flex">
			<ui-btn
				variant="text"
				size="md"
				icon-name="arrow-left"
				icon-pos="lt"
				icon-cls="size-5 stroke-slate-500"
				cls="text-lg! font-bold"
				txt="위치 등록"
			></ui-btn>
		</div>
	</header>

	<section class="group/map-lang flex flex-col gap-2 border-t border-t-slate-200 px-5 py-3">
		<div class="flex items-center justify-between gap-1">
			<div class="flex flex-col">
				<ui-tit tit="위치명"></ui-tit>
				<hover-tooltip
					btn="15자 이내 권장"
					txt="언어에 따라 표현 길이가 달라질 수 있으므로 \n번역 내용을 확인해주세요. (최대 25자)"
					class="flex"
				></hover-tooltip>
			</div>
			<ui-txt size="sm" txt={`POI ${data.items[0].id ?? '이름없음'}`}></ui-txt>
		</div>
		<div class="flex flex-col gap-4">
			<lang-translate data-max-length="25" view="reg" lang={data.items[0].name}></lang-translate>

			<ul class="flex flex-col gap-1">
				<li class="grid grid-cols-[22px_1fr_22px_1fr] items-center gap-2">
					<label for="map-reg-lat" class="label flex-none">위도</label>
					<input
						type="number"
						name="map-reg-lat"
						id="map-reg-lat"
						class="input-text s"
						placeholder="위도"
						bind:value={data.items[0].lat}
						maxlength="9"
					/>
					<label for="map-reg-lon" class="label flex-none">경도</label>
					<input
						type="number"
						name="map-reg-lon"
						id="map-reg-lon"
						class="input-text s"
						placeholder="경도"
						bind:value={data.items[0].lon}
						maxlength="9"
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
						bind:value={data.items[0].addr}
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
			<input type="checkbox" id="map-reg-top-1" name="map-reg-top-1" class="peer sr-only" />
			<span class="relative hidden text-sm group-has-checked/map-lang:flex">접기</span>
			<span class="text-primary relative flex text-sm group-has-checked/map-lang:hidden">펼치기</span>
		</label>
	</section>

	<section class="flex min-h-0 flex-1 flex-col border-t border-t-slate-200 py-4">
		<header class="grid grid-cols-2 items-center gap-2.5 px-5">
			<h4 class="text-lg font-semibold">매칭된 시설</h4>
			<p class="flex-1 text-right text-slate-500">
				<strong class="text-cms-5 font-bold">{data.items[0].facilityPoiMappings.length}</strong>
				<span>개</span>
			</p>

			<div class="col-span-2 grid grid-cols-2 gap-2.5">
				<ui-btn variant="ghost" size="md" txt="새 시설 등록"></ui-btn>
				<ui-btn variant="primary" size="md" txt="저장"></ui-btn>
			</div>
		</header>
		<ul class="flex flex-1 scrollbar-gutter-stable flex-col gap-2 overflow-x-clip overflow-y-auto scroll-smooth pl-5"></ul>
	</section>

	<footer class="divide-y divide-slate-200 border-t border-t-slate-200 bg-white">
		<div class="bg-white px-5 py-4.5">
			<h4 class="text-lg font-semibold">지도 노출</h4>
		</div>

		<div class="grid grid-cols-[60px_1fr] gap-2 px-5 py-3">
			<ui-btn
				variant="icon"
				size="lg"
				icon-name="trash"
				icon-cls="size-5 stroke-slate-400"
				class="rounded-sm border border-slate-200"
				txt="삭제"
			></ui-btn>
			<ui-btn variant="primary" size="lg" cls="text-lg! font-bold" txt="저장"></ui-btn>
		</div>
	</footer>
</div>
