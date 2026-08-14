<script lang="ts">
	import { setSheetMinH } from '@/src/stores/sheetUiStore';
	import { langState, pickText } from '@/stores/globalStore';
	import IconCategory from '@/svelte/icons/IconCategory.svelte';
	import Thumb from '@/svelte/thumb/Thumb.svelte';
	import type { FacilityListResponse, FacilityDetailResponse } from '@/types/facilities';

	type Props = {
		list?: FacilityListResponse | null;
		detail?: FacilityDetailResponse | null;
	};

	let { list, detail }: Props = $props();

	$inspect(list);
</script>

<div class="flex items-center justify-between gap-2 px-5" bind:clientHeight={null, setSheetMinH}>
	<div class="inline-flex flex-col gap-2">
		<p class="text-000 text-[20px] leading-tight font-semibold">
			{pickText(list?.name, $langState)}
		</p>

		<IconCategory
			icon={list?.category?.iconKey ?? ''}
			color={list?.category?.categoryColorCodes?.colorCode ?? ''}
			name={pickText(list?.category?.name, $langState)}
		/>
	</div>

	<Thumb facilityFiles={detail?.facilityFiles?.slice(0, 1) ?? []} />
</div>
