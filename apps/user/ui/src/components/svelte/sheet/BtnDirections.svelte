<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState } from '@/stores/globalStore';
	import { beginWalkingSelection, current, poiList } from '@/stores/pageDataStore';
	import { setSheetBottomArea } from '@/stores/sheetUiStore';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';
	import { facilityDisplayName, placeDisplayName } from '@/utils/route-place';

	const startDistance = (dir: 'start' | 'end') => {
		const selectedPoi = $poiList.find((poi) => poi.id === $current.poi);
		if (!selectedPoi) return;

		const name =
			facilityDisplayName($facilityCurrent?.facility?.name, $langState) ||
			placeDisplayName(selectedPoi.name, '선택한 장소');
		beginWalkingSelection(dir, {
			latitude: selectedPoi.latitude,
			longitude: selectedPoi.longitude,
			poiId: selectedPoi.id,
			name,
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
			onclick={() => void startDistance('start')}
		>
			{m.usr_rec_201_07({ locale: $langState })}
		</button>
		<button
			type="button"
			class="rounded-lg bg-(--base-color) text-lg text-white active:bg-slate-50"
			onclick={() => void startDistance('end')}
		>
			{m.usr_rec_201_08({ locale: $langState })}
		</button>
	</div>
</footer>
