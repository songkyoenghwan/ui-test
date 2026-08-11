<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState } from '@/stores/globalStore';
	import { layoutViewState, searchViewState } from '@/stores/uxStore';
	import { sheetSnapPoint } from '@/stores/uxStore';
	import { confusionLists } from '@/utils/uxEvent.type';
</script>

{#if $layoutViewState === 'default' || $layoutViewState === 'facilities'}
	<div
		data-confusion="state"
		class={[
			'absolute top-0 right-5 z-40 min-w-[calc(100dvw-2.5rem)] -translate-y-12 rounded-lg bg-linear-90 from-0% to-white to-71% opacity-100 shadow-2xs transition-[bottom]  ease-in-out starting:translate-y-5 starting:opacity-0',
			confusionLists[0].color,
		]}
		style:display={$sheetSnapPoint > 80 ? 'none' : ''}
	>
		<div class="flex min-h-8 w-full items-center justify-between gap-2 p-2">
			<p class="flex items-center gap-2 px-2 text-sm font-bold text-white">
				{m.usr_map_001_06({ locale: $langState })}
				{m.usr_map_001_07({ locale: $langState })}
				{m.usr_map_001_08({ locale: $langState })}
				{m.usr_map_001_09({ locale: $langState })}
			</p>

			<div class="flex items-center gap-1.5 text-sm">
				<p class="flex-none text-slate-500">현재 인원</p>
				<strong
					class={[
						'before flex flex-none items-center gap-1.5  before:h-2 before:w-px before:bg-slate-200',
						confusionLists[0].textColor,
					]}
				>
					99명
				</strong>
			</div>
		</div>
	</div>
{/if}
