<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	console.log(data);
	let inputDel = $state(false);
</script>

<top-tooltip tit="지도를 우클릭하여 위치 변경" class="absolute top-5 left-5 z-5"></top-tooltip>

<div class="grid grid-cols-[1fr_20rem]">
	<section id="map_div" class="grid size-full"></section>

	<section class="map-list divide-y divide-slate-200">
		<header class="grid grid-cols-2 gap-x-2 gap-y-3 p-5">
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
		<div class="map-list-body">
			<div class="flex items-end justify-between gap-1 px-5">
				<select name="" id="" class="select w-30">
					<option value="">최신순</option>
					<option value="">가나다순</option>
				</select>
				<p class="flex-none text-slate-500">
					<span>검색결과</span>
					<strong class="text-primary font-bold">300</strong>
				</p>
			</div>

			<div class="flex min-h-0 flex-1 flex-col">
				<!-- <div class="flex flex-1 flex-col items-center justify-center gap-3 p-5 text-center">
				<icon-items data-name="mouse-circle" class="icon stroke-primary fill-primary size-6.5"></icon-items>
				<p class="text-xl text-slate-400">
					지도를 우클릭하면
					<br />
					새 위치가 생성됩니다
				</p>
			</div> -->

				<ul class="flex flex-1 scrollbar-gutter-stable flex-col gap-2 overflow-x-clip overflow-y-auto scroll-smooth pl-5">
					{#each data.items as item, index (item?.id)}
						<li data-index={index} class="w-full">
							<button
								type="button"
								aria-label={item.poi}
								class="grid w-full grid-cols-[1fr_minmax(0,40px)] grid-rows-2 space-y-1 rounded-sm border border-slate-200 bg-white px-4 py-3"
							>
								<span class="order-1 col-span-1 row-span-1 truncate text-left text-base">
									{item.name.ko ?? ''}
								</span>
								<strong
									class="order-3 col-span-1 row-span-1 flex items-center gap-2 divide-x divide-slate-200 font-normal"
								>
									<span class="pr-2 text-slate-600">{item.poi}</span>
									<strong class="flex items-center font-normal">
										<span class="flex gap-1 pr-2 text-slate-400">등록시설</span>
										<!-- {#if typeof item.places === 'number'}
										<span class={item.places === 0 ? 'text-error' : 'text-primary'}>
											{item.places}
										</span>
									{:else}
										<span class={item.places.length === 0 ? 'text-error' : 'text-primary'}>
											{item.places.length}
										</span>
									{/if} -->
										<span>개</span>
									</strong>
								</strong>

								<strong class="order-2 row-span-2 grid place-items-center">
									<!-- {#if item.exposure}
									<span class="text-primary text-sm font-bold">비노출</span>
								{/if} -->
								</strong>
							</button>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>
</div>

<map-reg class="map-reg" open="close" id="" poi="" ko="" en="" zh="" ja="" th="" vi="" lat="" lon="" addr=""></map-reg>
