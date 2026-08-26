<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState, pickText } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
</script>

{#if $langState === 'en'}
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
{/if}
