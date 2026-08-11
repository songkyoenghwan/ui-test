<script lang="ts">
	import {
		setPointSheetUi,
		setSheetMidH,
		setSheetMinH,
		setSheetScrollRef,
		sheetMidRatioValue,
	} from '@/src/stores/sheetUiStore';
	import { sheetInstance, sheetSnapPoint } from '@/stores/uxStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import * as m from '@/paraglide/messages.js';
	import { langState, pickText, keywordState } from '@/stores/globalStore';

	let tab = $state<'ai-recommend' | 'popularity'>('ai-recommend');
	let scrollEl: HTMLDivElement | null = $state(null);

	$effect(() => {
		setSheetScrollRef(scrollEl);

		$sheetInstance?.setSnapPoint($sheetMidRatioValue);
	});
</script>

<div class="px-6 py-1" bind:clientHeight={null, setSheetMinH}>
	<div class="*:text-cente grid grid-cols-2 rounded-lg bg-slate-100 p-1 *:min-h-8">
		<label
			for="ai-recommend"
			class="flex items-center justify-center gap-1 rounded-lg bg-slate-100 text-black has-checked:bg-white"
		>
			<input
				type="radio"
				bind:group={tab}
				value="ai-recommend"
				id="ai-recommend"
				class="peer sr-only"
				onchange={() => setPointSheetUi('max')}
			/>
			{#if tab === 'ai-recommend'}
				<Icons name="ai-on" cls="size-4" />
			{:else}
				<Icons name="ai-off" cls="size-4 fill-121212" />
			{/if}
			AI 추천 {$sheetSnapPoint}
		</label>
		<label
			for="popularity"
			class="flex items-center justify-center gap-1 rounded-lg bg-slate-100 text-black has-checked:bg-white"
		>
			<input
				type="radio"
				bind:group={tab}
				value="popularity"
				id="popularity"
				class="peer sr-only"
				onchange={() => setPointSheetUi('max')}
			/>
			{#if tab === 'popularity'}
				<Icons name="trending-on" cls="size-4" />
			{:else}
				<Icons name="trending-off" cls="size-4 fill-121212" />
			{/if}
			인기
		</label>
	</div>
</div>

<div bind:this={scrollEl} bind:clientHeight={null, setSheetMidH}>
	<div class="grid min-h-30 place-content-center gap-3 text-center">
		<p class="text-[20px] font-bold text-black">{m.usr_rec_001_02({ locale: $langState })}</p>
		<p class="text-lg text-slate-400">{m.usr_rec_001_03({ locale: $langState })}</p>
	</div>

	<div class="grid min-h-30 place-content-center gap-3 text-center">
		<p class="text-[20px] font-bold text-black">{m.usr_rec_001_12({ locale: $langState })}</p>
		<p class="text-base text-slate-400">{m.usr_rec_001_13({ locale: $langState })}</p>
		<div class="flex items-center gap-2 pt-2.5 text-sm">
			<button
				type="button"
				class="flex h-8 flex-[0_0_100px] items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white"
			>
				<Icons name="rotate-left" cls="size-4 stroke-slate-700" />
				<span>{m.usr_rec_001_09({ locale: $langState })}</span>
			</button>
			<button
				type="button"
				class="flex h-8 flex-1 items-center justify-center gap-2 rounded-lg bg-(--base-color) text-white disabled:bg-slate-200 disabled:text-slate-500"
			>
				<Icons name="plus" cls="size-4 fill-white" />
				<span>{m.usr_rec_001_10({ locale: $langState })}</span>
			</button>
		</div>
	</div>

	<div class="grid min-h-30 place-content-center gap-3 text-center">
		<p class="text-[20px] font-bold text-black">{m.usr_rec_001_16({ locale: $langState })}</p>
		<p class="text-base text-slate-400">{m.usr_rec_001_17({ locale: $langState })}</p>
		<div class="flex items-center gap-2 pt-2.5 text-sm">
			<button
				type="button"
				class="flex h-8 flex-1 items-center justify-center gap-2 rounded-lg bg-(--base-color) text-white disabled:bg-slate-200 disabled:text-slate-500"
			>
				<Icons name="map-start" cls="fill-white size-3.5" />
				<span>{m.usr_rec_001_18({ locale: $langState })}</span>
			</button>
		</div>
	</div>

	<ul class="min-h-px" bind:clientHeight={null, setSheetMidH}>
		<li class={[tab === 'ai-recommend' ? 'flex flex-col' : 'hidden']}>
			<p class="flex items-center gap-1 p-5">
				<Icons name="ai-on" cls="size-4" />
				{$keywordState}가 많이 찾는 시설이에요
			</p>

			<ul>
				<li>
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
				</li>
			</ul>
		</li>
		<li class={[tab === 'popularity' ? 'flex flex-col' : 'hidden']}>
			<div class="flex items-center justify-between gap-1 p-5">
				<p class="flex items-center gap-1">
					<Icons name="trending-on" cls="size-4" />
					{m.usr_rec_001_05({ locale: $langState })}
				</p>

				<p class="text-sm text-slate-500">
					{m.usr_rec_001_06({ locale: $langState })}
				</p>
			</div>
		</li>
	</ul>
</div>
