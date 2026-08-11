<script lang="ts">
	import * as m from '@/paraglide/messages';
	import {
		setSheetMidH,
		setSheetMinH,
		setSheetScrollRef,
		sheetMidRatioValue,
		sheetMinRatioValue,
	} from '@/src/stores/sheetUiStore';
	import { langState } from '@/stores/globalStore';
	import { sheetInstance, sheetSnapPoint } from '@/stores/uxStore';
	import Icons from '@/svelte/icons/Icons.svelte';

	let scrollEl: HTMLDivElement | null = $state(null);
	let bottomVisible = $derived($sheetSnapPoint >= $sheetMinRatioValue * 100 + 2);

	$effect(() => {
		setSheetScrollRef(scrollEl);
		$sheetInstance?.setSnapPoint($sheetMidRatioValue);
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
	<div bind:this={scrollEl} data-scroll="content" class="flex min-h-0 w-full min-w-0 flex-col overflow-x-clip">
		<div class="flex items-center justify-between gap-2 px-5" bind:clientHeight={null, setSheetMinH}>
			<div class="inline-flex flex-col">
				<p class="text-000 text-[20px] leading-tight font-semibold">
					{$sheetSnapPoint} 시설명 시설명 시 시설명
				</p>
				<p class="mt-2.5 text-sm text-slate-700">카테고리명</p>
			</div>

			<picture class="size-17.5 flex-none overflow-clip rounded-sm bg-slate-50">
				<img src="" alt="" />
			</picture>
		</div>

		<div bind:clientHeight={null, setSheetMidH}>
			<div class="flex flex-col px-5">
				{@render info('map-pin-filled', '24km', '상세주소')}
			</div>
		</div>
	</div>
</div>
