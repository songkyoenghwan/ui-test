<script lang="ts">
	import { setSheetMinH } from '@/src/stores/sheetUiStore';
	import { langState, pickText } from '@/stores/globalStore';
	import IconCategory from '@/svelte/icons/IconCategory.svelte';
	import Thumb from '@/svelte/thumb/Thumb.svelte';
	import type { FacilityDetailResponse } from '@/types/facilities';
	import type { CategoryDetailResponse } from '@/types/categories';

	type Props = {
		facility?: FacilityDetailResponse;
		categoryMatch?: CategoryDetailResponse;
	};

	let { facility, categoryMatch }: Props = $props();
</script>

<div class="flex items-center justify-between gap-2 px-5" bind:clientHeight={null, setSheetMinH}>
	<div class="inline-flex flex-col gap-2">
		<p class="text-000 text-[20px] leading-tight font-semibold">
			{pickText(facility?.name, $langState)}
		</p>

		<IconCategory
			icon={categoryMatch?.iconKey ?? ''}
			color={categoryMatch?.categoryColorCodes?.colorCode ?? ''}
			name={pickText(categoryMatch?.name, $langState)}
		/>
	</div>

	<Thumb facilityFiles={facility?.facilityFiles?.slice(0, 1) ?? []} />
</div>
