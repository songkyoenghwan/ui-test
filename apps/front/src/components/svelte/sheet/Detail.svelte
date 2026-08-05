<script lang="ts">
	import * as m from '@/paraglide/messages';
	import Icons from '@/svelte/icons/Icons.svelte';
	import { langState, mainViewState } from '@/stores/globalStore';
</script>

{#snippet info(icon: string, tit: string, txt: string)}
	<dl class="flex items-center gap-2 py-1.5">
		<dt class="flex items-center gap-1 text-sm font-bold text-black">
			<Icons name={icon} cls="size-4 fill-slate-400 stroke-slate-400" />
			{tit}
		</dt>
		<dd class=" text-sm text-slate-500">{txt}</dd>
	</dl>
{/snippet}

<div class="flex items-center justify-between gap-2 px-5">
	<div class="">
		<p class="text-000 text-[20px] leading-tight font-semibold">시설명 시설명 시설명</p>
		<p class="mt-2.5 text-sm text-slate-700">카테고리명</p>
	</div>

	<picture class="size-17.5 flex-none overflow-clip rounded-sm bg-slate-50">
		<img src="" alt="" />
	</picture>
</div>

<div class="flex flex-col px-5">
	{@render info('map-pin-filled', '24km', '상세주소')}
</div>

<div class="grid px-5 py-1">
	<button
		type="button"
		class="text-09235e flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-100 px-5 py-3"
	>
		<span class="flex items-center gap-2">
			<Icons name="mdi-car" cls="size-4 fill-09235e" />
			{m.usr_map_002_43({ locale: $langState })}
		</span>
		<Icons name="map-start" cls="size-4 fill-09235e" />
	</button>
</div>

<div class="flex items-center gap-2 px-5 py-1 text-xs **:leading-tight **:tracking-tighter **:break-all">
	<a
		href=""
		target="_blank"
		class="flex h-10 flex-1 items-center justify-between gap-0.5 rounded-lg border border-slate-200 bg-white pl-2"
	>
		<span class="flex items-center gap-1">
			<picture class="h-4 max-w-4">
				<img alt="" class="h-4" src="https://cdn.pixabay.com/photo/2026/07/23/07/03/07-03-03-60_1280.jpg" />
			</picture>
			<span class="line-clamp-2 min-w-0">회사소개서</span>
		</span>
		<Icons name="arrow-left" cls="size-4 rotate-180 stroke-slate-400" />
	</a>
	<a
		href=""
		target="_blank"
		class="flex h-10 flex-1 items-center justify-between gap-0.5 rounded-lg border border-slate-200 bg-white pl-2"
	>
		<span class="flex items-center gap-1">
			<picture class="h-4 max-w-4">
				<img alt="" class="h-4" src="https://cdn.pixabay.com/photo/2026/07/23/07/03/07-03-03-60_1280.jpg" />
			</picture>
			<span class="line-clamp-2 min-w-0">회사소개서</span>
		</span>
		<Icons name="arrow-left" cls="size-4 rotate-180 stroke-slate-400" />
	</a>
	<a
		href=""
		target="_blank"
		class="flex h-10 flex-1 items-center justify-between gap-0.5 rounded-lg border border-slate-200 bg-white pl-2"
	>
		<span class="flex items-center gap-1">
			<span class="line-clamp-2 min-w-0">회사소개서회사소개서회사소개서</span>
		</span>
		<Icons name="arrow-left" cls="size-4 rotate-180 stroke-slate-400" />
	</a>
</div>

<div class="flex min-h-12.5 items-center justify-between gap-2 px-5 py-1">
	<p class="flex items-center gap-2 text-base font-bold">
		<Icons name="circle-ring" cls="size-4 fill-09235e" />

		{m.usr_map_001_06({ locale: $langState })}
		{m.usr_map_001_07({ locale: $langState })}
		{m.usr_map_001_08({ locale: $langState })}
		{m.usr_map_001_09({ locale: $langState })}
	</p>

	<div class="flex items-center gap-1.5 text-sm">
		<p class="flex-none text-slate-400">현재 인원</p>
		<strong class="before flex flex-none items-center gap-1.5 before:h-2 before:w-px before:bg-slate-200">99명</strong>
	</div>
</div>

<div class="flex min-h-12.5 items-center gap-2 px-5 py-1">
	<Icons name="call" cls="size-4 fill-slate-400" />
	<a href="tel:" class="text-base text-black">02-1111-1111</a>
	<button type="button" class="text-2877ff text-sm active:bg-slate-50">
		{m.usr_map_002_47({ locale: $langState })}
	</button>
</div>

<div class="flex min-h-12.5 items-center gap-2 px-5 py-1">
	<p class="flex items-center gap-2 text-base font-bold text-black">
		<Icons name="clock-filled" cls="size-4 fill-slate-400" />
		운영중
	</p>
</div>

<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
	<p class="text-000 flex items-center gap-2 text-base">
		<Icons name="building" cls="size-4 fill-slate-400" />
		이 위치에 다른 시설
	</p>

	<ul class="inline-flex w-full snap-x snap-mandatory items-center gap-2 overflow-x-auto">
		<li class="min-h-23.5 w-57.5 flex-none snap-center rounded-lg border border-slate-200 p-3">
			<div class="flex items-center justify-between gap-2">
				<div class="inline-grid flex-1">
					<p class="text-000 min-w-0 truncate text-base leading-tight font-semibold">시설명시설명 시설명 시설명</p>
					<p class="mt-1 truncate text-sm text-slate-700">카테고리명카테고리명카테고리명</p>
					<p class="mt-3.5 text-sm font-bold">{m.usr_map_002_11({ locale: $langState })}</p>
				</div>

				<picture class="size-17.5 flex-none overflow-clip rounded-sm bg-slate-50">
					<img src="" alt="" />
				</picture>
			</div>
		</li>
		<li class="min-h-23.5 w-57.5 flex-none snap-center rounded-lg border border-slate-200 p-3">
			<div class="flex items-center justify-between gap-2">
				<div class="inline-grid flex-1">
					<p class="text-000 min-w-0 truncate text-base leading-tight font-semibold">시설명시설명 시설명 시설명</p>
					<p class="mt-1 truncate text-sm text-slate-700">카테고리명카테고리명카테고리명</p>
					<p class="mt-3.5 text-sm font-bold">{m.usr_map_002_11({ locale: $langState })}</p>
				</div>

				<picture class="size-17.5 flex-none overflow-clip rounded-sm bg-slate-50">
					<img src="" alt="" />
				</picture>
			</div>
		</li>
	</ul>
</div>

<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
	<p class="text-000 flex items-center gap-2 text-base">
		<Icons name="chat" cls="size-4 fill-slate-400" />
		상세 정보
	</p>

	<div class="rounded-lg bg-slate-100 p-3 text-xs whitespace-pre-line text-slate-700">
		망원동 막국수 by 해와달 오랜 세월 한결같던 부모님의 손맛, 이제 망원동에서. 강원도 동해에서 정성과 진심으로 이어온 '해와달
		막국수'의 깊은 맛. 그 따뜻한 시간을 그대로 담아, 망원동에서 시작합니다.
	</div>
</div>

<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
	<p class="text-000 flex items-center gap-2 text-base">
		<Icons name="add-info" cls="size-4 fill-slate-400" />
		시설 정보 더보기
	</p>

	<div class="grid gap-2">
		<a
			href=""
			target="_blank"
			class="flex h-9 flex-1 items-center justify-center gap-0.5 rounded-lg border border-slate-200 bg-slate-50 px-2 text-sm"
		>
			$시설 버튼명$
		</a>
	</div>
</div>

<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
	<p class="text-000 flex items-center gap-2 text-base">
		<Icons name="use-guide" cls="size-4 fill-slate-400" />
		{m.usr_map_002_51({ locale: $langState })}
	</p>

	<ul class="inline-flex w-full snap-x snap-mandatory items-center gap-2 overflow-x-auto">
		<li class="size-25 flex-none snap-center rounded-lg">
			<picture class="grid size-full flex-none overflow-clip rounded-lg bg-slate-50">
				<img
					src="https://cdn.pixabay.com/photo/2026/07/23/07/03/07-03-03-60_1280.jpg"
					class="h-full object-cover"
					alt=""
				/>
			</picture>
		</li>
		<li class="size-25 flex-none snap-center rounded-lg">
			<picture class="grid size-full flex-none overflow-clip rounded-lg bg-slate-50">
				<img
					src="https://cdn.pixabay.com/photo/2026/07/23/07/03/07-03-03-60_1280.jpg"
					class="h-full object-cover"
					alt=""
				/>
			</picture>
		</li>
		<li class="size-25 flex-none snap-center rounded-lg">
			<picture class="grid size-full flex-none overflow-clip rounded-lg bg-slate-50">
				<img
					src="https://cdn.pixabay.com/photo/2026/07/23/07/03/07-03-03-60_1280.jpg"
					class="h-full object-cover"
					alt=""
				/>
			</picture>
		</li>
		<li class="size-25 flex-none snap-center rounded-lg">
			<picture class="grid size-full flex-none overflow-clip rounded-lg bg-slate-50">
				<img
					src="https://cdn.pixabay.com/photo/2026/07/23/07/03/07-03-03-60_1280.jpg"
					class="h-full object-cover"
					alt=""
				/>
			</picture>
		</li>
	</ul>
</div>

<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
	<p class="text-000 flex items-center gap-2 text-base">
		<Icons name="use-guide" cls="size-4 fill-slate-400" />
		{m.usr_map_002_52({ locale: $langState })}
	</p>

	<ul class="inline-flex w-full flex-col divide-y divide-slate-200">
		<li class="inline-flex flex-col py-3">
			<div class="flex items-center justify-between gap-2">
				<div class="">
					<p class="text-000 text-lg leading-tight font-semibold">시설명 시설명 시설명</p>
				</div>

				<picture class="size-17.5 flex-none overflow-clip rounded-sm bg-slate-50">
					<img src="" alt="" />
				</picture>
			</div>
			<p class="mt-2.5 text-sm text-slate-700">
				고기와 알록달록 채소들에 양념이 쏙 밴 갈비찜, 오이무침, 계란 튀김 * 사진 2인분고기와 알록달록 채소들에 양념이 쏙
				밴 갈비찜, 오이무침, 계란 튀김 * 사진 2인분2인분2인분
			</p>
			<p class="mt-3 text-sm font-bold text-slate-700">15,000원</p>
		</li>
		<li class="inline-flex flex-col py-3">
			<div class="flex items-center justify-between gap-2">
				<div class="">
					<p class="text-000 text-lg leading-tight font-semibold">시설명 시설명 시설명</p>
				</div>

				<picture class="size-17.5 flex-none overflow-clip rounded-sm bg-slate-50">
					<img src="" alt="" />
				</picture>
			</div>
			<p class="mt-2.5 text-sm text-slate-700">
				고기와 알록달록 채소들에 양념이 쏙 밴 갈비찜, 오이무침, 계란 튀김 * 사진 2인분고기와 알록달록 채소들에 양념이 쏙
				밴 갈비찜, 오이무침, 계란 튀김 * 사진 2인분2인분2인분
			</p>
			<p class="mt-3 text-sm font-bold text-slate-700">15,000원</p>
		</li>
	</ul>
</div>
