<script lang="ts">
	import { ParaglideMessage } from '@inlang/paraglide-js-svelte';
	import type { Snippet } from 'svelte';
	import * as m from '@/paraglide/messages';
	import { distance, langState } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import { setSheetMinH } from '@/src/stores/sheetUiStore';
	import Info from '@/svelte/facility/Info.svelte';
	import { facilityList } from '@/stores/pageDataStore';
</script>

<div class="flex flex-col gap-2 px-5 pt-1 pb-4" bind:clientHeight={null, setSheetMinH}>
	<p class="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-base">
		<ParaglideMessage message={m.usr_rec_201_02} inputs={{ mm: String($distance.step.toLocaleString() ?? 0) }}>
			{#snippet strong({ children }: { children?: Snippet })}
				<span class="text-267cd1 flex items-center gap-2 text-xl font-semibold">
					<Icons name="walking" cls="size-8 fill-267cd1" />
					{@render children?.()}
				</span>
			{/snippet}
		</ParaglideMessage>
	</p>

	<div class="grid grid-cols-2 divide-x divide-slate-200 text-slate-500 *:min-h-6">
		<p class="flex items-center gap-2 px-5">
			<ParaglideMessage message={m.usr_rec_201_03} inputs={{ mm: String($distance.totalDistance ?? 0) }}>
				{#snippet strong({ children }: { children?: Snippet })}
					<span class="text-black">
						{@render children?.()}
					</span>
				{/snippet}
			</ParaglideMessage>
		</p>
		<p class="flex items-center gap-2 px-5">
			<ParaglideMessage message={m.usr_rec_201_04} inputs={{ time: String($distance.time ?? 0) }}>
				{#snippet strong({ children }: { children?: Snippet })}
					<span class="text-black">
						{@render children?.()}
					</span>
				{/snippet}
			</ParaglideMessage>
		</p>
	</div>

	<div class="flex w-full items-center">
		<button type="button" class="flex min-h-10 flex-1 justify-between rounded-lg border border-slate-50 p-3">
			{m.usr_rec_201_05({ locale: $langState })}
			<Icons name="rotate-left" cls="size-4 stroke-slate-500" />
		</button>
	</div>
</div>

{#snippet distanceElm()}
	<div class="grid min-h-10 grid-cols-2 items-center bg-slate-50 px-5 py-1 text-black">
		<div class="itmes-center inline-flex justify-center gap-2">
			<strong class="text-267cd1">3,340</strong>
			<p>걸음</p>
		</div>

		<div class="itmes-center inline-flex justify-center gap-2">
			<p>895m</p>
			&middot;
			<p>30분</p>
		</div>
	</div>
{/snippet}

<div class="divide-y divide-slate-200 border-y-5 border-y-slate-200">
	<div
		class="relative before:absolute before:top-1/3 before:left-8 before:h-30 before:w-0.75 before:border-l-4 before:border-dashed before:border-slate-300"
	>
		<button type="button" class="grid w-full min-w-0 grid-cols-[30px_1fr_8px] items-center px-5 py-4">
			<picture>
				<img src="/images/poi/poi-start-ko.png" alt={m.usr_rec_201_07({ locate: $langState })} />
			</picture>

			<Info
				variant="detail"
				rest={facilityList.get()?.[0]?.facility || undefined}
				detail={facilityList.get()?.[0]?.facility || undefined}
			/>
			<Icons name="arrow-right-link" cls="w-2 h-3.5 stroke-slate-500" />
		</button>

		{@render distanceElm()}
	</div>

	<div
		class="relative before:absolute before:top-1/3 before:left-8 before:h-30 before:w-0.75 before:border-l-4 before:border-dashed before:border-slate-300"
	>
		<button type="button" class="grid w-full min-w-0 grid-cols-[30px_1fr_8px] items-center px-5 py-4">
			<span class="grid min-h-7.5 min-w-7.5 place-content-center rounded-sm bg-(--base-color) text-lg text-white">1</span>
			<span class="text-000 truncate text-left text-base">월드컵로7길</span>
			<Icons name="arrow-right-link" cls="w-2 h-3.5 stroke-slate-500" />
		</button>

		{@render distanceElm()}
	</div>

	<div class="relative">
		<button type="button" class="grid min-w-0 grid-cols-[30px_1fr] items-center gap-4 px-5 py-4">
			<picture>
				<img src="/images/poi/poi-end-ko.png" alt={m.usr_rec_201_08({ locate: $langState })} />
			</picture>
			<span class="text-000 truncate text-left text-base">월드컵로7길</span>
		</button>
	</div>
</div>
