<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState } from '@/stores/globalStore';
	import { sheetSnapPoint } from '@/stores/uxStore';
	import type { CongestionStatusLevel } from '@/types/congestion';

	let { congestion = 'none' } = $props();

	export const VARIANT_CONFUSION_BG: Record<CongestionStatusLevel, string> = {
		VERY_CROWDED: 'bg-e7352b from-07352b/20',
		CROWDED: 'bg-ff8826 from-ff882/206',
		NORMAL: 'bg-00c922 from-00c922/20',
		RELAXED: 'bg-26b7ff from-26b7ff/20',
		none: '',
	};

	export const CONFUSION_META = [
		{ id: 'VERY_CROWDED', name: m.usr_map_001_06(), color: VARIANT_CONFUSION_BG.VERY_CROWDED, textColor: 'text-e7352b' },
		{ id: 'CROWDED', name: m.usr_map_001_07(), color: VARIANT_CONFUSION_BG.CROWDED, textColor: 'text-ff8826' },
		{ id: 'NORMAL', name: m.usr_map_001_08(), color: VARIANT_CONFUSION_BG.NORMAL, textColor: 'text-00c922' },
		{ id: 'RELAXED', name: m.usr_map_001_09(), color: VARIANT_CONFUSION_BG.RELAXED, textColor: 'text-26b7ff' },
	];

	function getCongestionLabel() {
		switch (congestion) {
			case 'VERY_CROWDED':
				return m.usr_map_001_06({ locale: $langState });
			case 'CROWDED':
				return m.usr_map_001_07({ locale: $langState });
			case 'NORMAL':
				return m.usr_map_001_08({ locale: $langState });
			case 'RELAXED':
				return m.usr_map_001_09({ locale: $langState });
			case 'none':
			default:
				return '';
		}
	}
	const confusionMeta = $derived(CONFUSION_META.find((c) => c.id === congestion));
</script>

{#if congestion !== '' && congestion !== 'none'}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		data-confusion="state"
		class={[
			'absolute top-0 right-5 z-40 min-w-[calc(100dvw-2.5rem)] -translate-y-12 touch-none rounded-lg bg-linear-90 from-0% to-white to-71% opacity-100 shadow-2xs transition-[bottom]  ease-in-out select-none starting:translate-y-5 starting:opacity-0',
			confusionMeta?.color,
		]}
		style:display={$sheetSnapPoint > 80 ? 'none' : ''}
		ontouchmove={(e) => e.stopPropagation()}
	>
		<div class="flex min-h-8 w-full items-center justify-between gap-2 p-2">
			<p class="flex items-center gap-2 px-2 text-sm font-bold text-white">
				{getCongestionLabel()}
			</p>

			<div class="flex items-center gap-1.5 text-sm">
				<p class="flex-none text-slate-500">현재 인원</p>
				<strong
					class={[
						'before flex flex-none items-center gap-1.5  before:h-2 before:w-px before:bg-slate-200',
						confusionMeta?.textColor,
					]}
				>
					99명
				</strong>
			</div>
		</div>
	</div>
{/if}
