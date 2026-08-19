<script lang="ts">
	import { setSheetMinH } from '@/src/stores/sheetUiStore';
	import { langState, pickText } from '@/stores/globalStore';
	import IconCategory from '@/svelte/icons/IconCategory.svelte';
	import Thumb from '@/svelte/thumb/Thumb.svelte';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';

	let { rest } = $props();
</script>

<div class="flex items-center justify-between gap-2 px-5">
	<div class="inline-flex flex-col gap-2">
		<p class="text-000 text-[20px] leading-tight font-semibold">
			{pickText(rest?.name, $langState)}
		</p>

		<IconCategory
			icon={rest?.category?.iconKey ?? ''}
			color={rest?.category?.categoryColorCodes?.colorCode ?? ''}
			name={pickText(rest?.category?.name, $langState)}
		/>
	</div>

	<Thumb facilityFiles={rest.facilityDetail?.facilityFiles?.slice(0, 1) ?? []} />
</div>
