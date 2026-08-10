<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState, mainViewState } from '@/stores/globalStore';
	import {
		sheetBackArea,
		sheetBottomArea,
		sheetHandleArea,
		sheetInstance,
		sheetMaxHeight,
		sheetRatio,
		sheetScrollInstance,
		sheetSnapPoint,
	} from '@/stores/uxStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import BtnDirections from '@/svelte/sheet/BtnDirections.svelte';
	import { round2 } from '@/utils/uxEvent';

	let { viewportH = 0 }: { viewportH: number } = $props();

	let scrollRef: HTMLElement | null = $state(null);
	let h = $state({
		min: 0,
		mid: 0,
		max: 0,
	});
	let minRatio = $derived.by(() => {
		const value = h.min > 0 ? (h.min + $sheetHandleArea) / viewportH : 0.12;
		return round2(value);
	});
	let midRatio = $derived.by(() => {
		const value = h.mid > 0 ? (h.min + h.mid + $sheetBottomArea + $sheetHandleArea) / viewportH : 0;
		return round2(value);
	});
	let maxRatio = $derived.by(() => {
		let value = 0.99;

		if ($mainViewState === 'poi' && $sheetSnapPoint > 90) {
			value = h.mid > 0 ? (viewportH - $sheetBottomArea) / viewportH : 0;
		}

		return round2(value);
	});
	let bottomVisible = $derived($sheetSnapPoint >= minRatio * 100 + 3);

	$effect(() => {
		if (minRatio !== $sheetRatio.min && midRatio !== $sheetRatio.mid) {
			sheetRatio.set({
				min: minRatio,
				mid: midRatio + 0.01,
				max: 0.99,
			});
			$sheetInstance?.setSnapPoint($sheetRatio.mid);
		}

		$inspect($sheetSnapPoint);

		if ($sheetSnapPoint > 90) {
			sheetMaxHeight.set(maxRatio);
		} else {
			sheetMaxHeight.set(0.98);
		}

		sheetScrollInstance.set(scrollRef);
	});
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

<div class="grid h-[calc(100%-30px)] min-h-0 max-w-dvw min-w-0 grid-rows-1 has-[footer]:grid-rows-[1fr_68px]">
	<div bind:this={scrollRef} data-scroll="content" class="flex min-h-0 w-full min-w-0 flex-col overflow-x-clip">
		<div class="flex items-center justify-between gap-2 px-5" bind:clientHeight={h.min}>
			<div class="">
				<p class="text-000 text-[20px] leading-tight font-semibold">
					시설명 시설명 시설명시설명 시설명 시설명시설명 시설명 시설명시설명 시설명 시설명시설명 시설명 시설명
				</p>
				<p class="mt-2.5 text-sm text-slate-700">카테고리명</p>
			</div>

			<picture class="size-17.5 flex-none overflow-clip rounded-sm bg-slate-50">
				<img src="" alt="" />
			</picture>
		</div>

		<div bind:clientHeight={h.mid}>
			<div class="flex flex-col px-5">
				{@render info('map-pin-filled', '24km', '상세주소')}
			</div>

			<div class="grid px-5 py-1">
				<button
					type="button"
					class="text-09235e flex min-h-9 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-100 px-5 py-1"
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
		</div>

		<div>
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
					<strong class="before flex flex-none items-center gap-1.5 before:h-2 before:w-px before:bg-slate-200">
						99명
					</strong>
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

				<ul
					class="scrollbar-hide inline-flex w-full max-w-[clac(100dvw-40px)] snap-x snap-mandatory items-center gap-2 overflow-x-auto"
				>
					<li class="min-h-23.5 w-57.5 flex-none snap-center rounded-lg border border-slate-200 p-3">
						<div class="flex items-center justify-between gap-2">
							<div class="inline-grid flex-1">
								<p class="text-000 min-w-0 truncate text-base leading-tight font-semibold">
									시설명시설명 시설명 시설명
								</p>
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
								<p class="text-000 min-w-0 truncate text-base leading-tight font-semibold">
									시설명시설명 시설명 시설명
								</p>
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
					망원동 막국수 by 해와달 오랜 세월 한결같던 부모님의 손맛, 이제 망원동에서. 강원도 동해에서 정성과 진심으로
					이어온 '해와달 막국수'의 깊은 맛. 그 따뜻한 시간을 그대로 담아, 망원동에서 시작합니다.
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

				<ul
					class="scrollbar-hide inline-flex w-full max-w-[clac(100dvw-40px)] snap-x snap-mandatory items-center gap-2 overflow-x-auto"
				>
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
							고기와 알록달록 채소들에 양념이 쏙 밴 갈비찜, 오이무침, 계란 튀김 * 사진 2인분고기와 알록달록 채소들에
							양념이 쏙 밴 갈비찜, 오이무침, 계란 튀김 * 사진 2인분2인분2인분
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
							고기와 알록달록 채소들에 양념이 쏙 밴 갈비찜, 오이무침, 계란 튀김 * 사진 2인분고기와 알록달록 채소들에
							양념이 쏙 밴 갈비찜, 오이무침, 계란 튀김 * 사진 2인분2인분2인분
						</p>
						<p class="mt-3 text-sm font-bold text-slate-700">15,000원</p>
					</li>
				</ul>
			</div>
		</div>
	</div>

	{#if bottomVisible}
		<BtnDirections />
	{/if}
</div>
