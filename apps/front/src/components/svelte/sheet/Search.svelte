<script lang="ts">
	import {
		setSheetMidH,
		setSheetMinH,
		setSheetScrollRef,
		sheetMidRatioValue,
		sheetMinRatioValue,
	} from '@/src/stores/sheetUiStore';
	import { sheetInstance, sheetSnapPoint } from '@/stores/uxStore';
	import { searchResultList } from '@/stores/pageDataStore';
	import Info from '@/svelte/facility/Info.svelte';

	let scrollEl: HTMLDivElement | null = $state(null);

	$effect(() => {
		setSheetScrollRef(scrollEl);
		$sheetInstance?.setSnapPoint($sheetMidRatioValue);
	});
</script>

{#each $searchResultList as result}
	<Info rest={result} />
{/each}
