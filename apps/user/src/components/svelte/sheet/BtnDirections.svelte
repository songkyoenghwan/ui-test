<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { distance, langState, pickText } from '@/stores/globalStore';
	import { setSheetBottomArea } from '@/stores/sheetUiStore';
	import { updateViewState } from '@/stores/uxStore';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';

	const startDistance = (dir: string) => {
		const prev = $distance;

		updateViewState({
			layout: 'directions',
			detail: 'idle',
			search: 'departure',
		});
		distance.set({
			...prev,
			start: dir === 'start' ? pickText($facilityCurrent?.facility?.name, $langState) : '',
			end: dir === 'end' ? pickText($facilityCurrent?.facility?.name, $langState) : '',
		});
	};
</script>

<footer
	bind:clientHeight={null, setSheetBottomArea}
	class="relative grid w-full flex-none gap-2 border-t border-t-slate-200 bg-white px-5 py-3 opacity-100 transition-all transition-discrete starting:opacity-0"
>
	<div class=" grid grid-cols-2 items-center gap-2 *:h-11">
		<button
			type="button"
			class="rounded-lg border border-(--base-color) text-lg text-(--base-color) active:bg-slate-50"
			onclick={() => startDistance('start')}
		>
			{m.usr_rec_201_07({ locale: $langState })}
		</button>
		<button
			type="button"
			class="rounded-lg bg-(--base-color) text-lg text-white active:bg-slate-50"
			onclick={() => startDistance('end')}
		>
			{m.usr_rec_201_08({ locale: $langState })}
		</button>
	</div>
</footer>
