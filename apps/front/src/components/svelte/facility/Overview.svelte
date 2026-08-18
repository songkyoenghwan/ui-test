<script lang="ts">
	import { setSheetMinH } from '@/src/stores/sheetUiStore';
	import { langState, pickText } from '@/stores/globalStore';
	import IconCategory from '@/svelte/icons/IconCategory.svelte';
	import Thumb from '@/svelte/thumb/Thumb.svelte';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';
</script>

<div class="flex items-center justify-between gap-2 px-5" bind:clientHeight={null, setSheetMinH}>
	<div class="inline-flex flex-col gap-2">
		<p class="text-000 text-[20px] leading-tight font-semibold">
			{pickText($facilityCurrent?.facility?.name, $langState)}
		</p>

		<IconCategory
			icon={$facilityCurrent?.facility?.category?.iconKey ?? ''}
			color={$facilityCurrent?.facility?.category?.categoryColorCodes?.colorCode ?? ''}
			name={pickText($facilityCurrent?.facility?.category?.name, $langState)}
		/>
	</div>

	<Thumb facilityFiles={$facilityCurrent?.facilityDetail?.facilityFiles?.slice(0, 1) ?? []} />
</div>
