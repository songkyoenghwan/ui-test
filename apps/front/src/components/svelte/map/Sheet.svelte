<script lang="ts">
	import { BottomSheet } from 'svelte-bottom-sheet';
	import type { BottomSheetSettings } from 'svelte-bottom-sheet';
	import TabAi from '@/svelte/sheet/TabAi.svelte';
	import Detail from '@/svelte/sheet/Detail.svelte';
	import BtnDirections from '@/svelte/sheet/BtnDirections.svelte';

	let isSheetOpen = $state(true);
	let mainView = $state<'default' | 'detail' | 'search' | 'route'>('default');

	const SHEET_SETTINGS: Record<string, BottomSheetSettings> = {
		default: {
			maxHeight: 0.99,
			snapPoints: [0.2, 0.45, 0.9],
			startingSnappoint: 0.28,
			disableClosing: true,
		},
		detail: {
			maxHeight: 0.95,
			snapPoints: [0.18, 0.55, 0.95],
			startingSnappoint: 1,
			disableClosing: true,
		},
		search: {
			maxHeight: 0.92,
			snapPoints: [0.12, 0.4, 0.92],
			startingSnappoint: 0,
			disableClosing: true,
		},
		route: {
			maxHeight: 0.95,
			snapPoints: [0.25, 0.6, 0.95],
			startingSnappoint: 1,
			disableClosing: true,
		},
	};

	const sheetSettings = $derived(SHEET_SETTINGS[mainView]);
	let sheet;

	function snapToMiddle() {
		sheet?.setSnapPoint(0.5);
	}

	function openDefaultSheet() {
		isSheetOpen = true;
		queueMicrotask(() => {
			sheet?.setSnapPoint(0.28);
		});
	}
</script>

<BottomSheet bind:isSheetOpen settings={sheetSettings}>
	<BottomSheet.Sheet>
		<BottomSheet.Handle />
		<div class="has-[footer]:pb-17">
			<TabAi />

			<Detail />
			<BtnDirections />
		</div>
	</BottomSheet.Sheet>
</BottomSheet>

<style>
	:global(.handle-container) {
		padding: 4px 0 !important;
		outline: none !important;
	}

	:global(.bottom-sheet-grip) {
		width: 3.75rem !important;
		height: 0.375rem !important;
	}
</style>
