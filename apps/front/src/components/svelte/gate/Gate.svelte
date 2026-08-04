<script lang="ts">
	import * as m from '@/paraglide/messages.js';
	import { langState } from '@/stores/globalStore';
	import type { GateItem } from '@/svelte/gate/Gate.event.svelte';
	import Icons from '@/svelte/icons/Icons.svelte';

	let { data }: { data: GateItem[] } = $props();
</script>

<header class="flex flex-none flex-col items-center justify-center gap-1 *:text-center *:leading-tight">
	<h2 class="pt-1 text-[26px] font-bold">{m.usr_obd_001_01({ locale: $langState })}</h2>
	<p class="text-lg text-slate-500">{m.usr_obd_001_02({ locale: $langState })}</p>
</header>

<ul class="flex flex-1 flex-wrap gap-3">
	{#each data as item}
		<li class="flex-1 basis-1/4">
			<a
				href={item.href ?? '#'}
				target="_blank"
				rel="noopener noreferrer"
				class="group/link flex h-full flex-col justify-between gap-3 rounded-lg border border-slate-300 bg-white px-1.5 pt-3 pb-1.5 *:leading-tight active:border-slate-100"
			>
				<h3 class="text-center text-base text-black">
					{m[item.name]({ locale: $langState })}
				</h3>

				<picture class="overflow-clip">
					<img src={item.img ?? ''} alt={item.tit ?? ''} class="aspect-square" />
				</picture>

				<div
					class="flex items-center justify-between rounded-sm border border-slate-100 bg-white px-2 py-1 group-hover/link:bg-linear-90 group-hover/link:from-(--base-color) group-hover/link:to-[#0f1f42] group-hover/link:text-white group-active/link:bg-linear-90 group-active/link:from-(--base-color) group-active/link:to-[#0f1f42] group-active/link:text-white pointer-coarse:scale-105"
				>
					<p class="text-[10px] font-medium">{m.usr_obd_002_01({ locale: $langState })}</p>

					<Icons name="arrow-circle" cls="size-2.5 fill-slate-300" />
				</div>
			</a>
		</li>
	{/each}
</ul>
