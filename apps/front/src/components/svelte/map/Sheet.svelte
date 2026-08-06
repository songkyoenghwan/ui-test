<script lang="ts">
	import { mainViewState, detailViewState } from '@/stores/globalStore';
	import { BottomSheet } from 'svelte-bottom-sheet';
	import type { BottomSheetSettings } from 'svelte-bottom-sheet';
	import TabAi from '@/svelte/sheet/TabAi.svelte';
	import Detail from '@/svelte/sheet/Detail.svelte';
	import BtnDirections from '@/svelte/sheet/BtnDirections.svelte';
	import { tick } from 'svelte';

	type BottomSheetRef = {
		setSnapPoint: (point: number, throwEvent?: boolean) => boolean;
	};

	let sheet: BottomSheetRef | undefined;
	let rootEl: HTMLDivElement | undefined;
	let sheetEl: HTMLElement | null = null;
	let bottomSheetHeight = $state(0);
	let isSheetOpen = $state(false);
	let sheetHandleH = $state(30);
	let contentH = $state(30);
	let viewportH = $state(0);
	let maxH = $state(0.99);

	let currentSnapPoint = $state<number | null>(null);
	let currentSnapIndex = $state(0);
	let initialSnapRatios = $state<number[]>([]);

	function round2(value: number) {
		return Math.round(value * 100) / 100;
	}

	let minRatio = $derived.by(() => {
		const value = viewportH > 0 ? Math.min(Math.max(contentH / viewportH, 0.15), maxH) : 0.15;

		return round2(value);
	});
	let midRatio = $derived.by(() => {
		return round2(Math.min(Math.max(minRatio + 0.2, minRatio), maxH));
	});

	let snapRatios = $derived([minRatio, midRatio, maxH]);

	const sheetSettings = $derived.by<BottomSheetSettings>(() => {
		return {
			disableClosing: true,
			autoCloseThreshold: 0,
			maxHeight: maxH,
			snapPoints: snapRatios,
			startingSnapPoint: snapRatios[0],
			closeThreshold: snapRatios[0],
		};
	});

	async function keepOpen() {
		if (!isSheetOpen) {
			isSheetOpen = true;
			await tick();
		}
	}

	// $effect(() => {
	// 	if (initialSnapRatios.length > 0) return;
	// 	if (viewportH <= 0) return;

	// 	initialSnapRatios = [minRatio, midRatio, maxH];
	// });

	// $effect(() => {
	// 	if (!rootEl) return;

	// 	const target = rootEl.querySelector<HTMLElement>('.bottom-sheet');
	// 	if (!target) return;

	// 	sheetEl = target;

	// 	const observer = new ResizeObserver((entries) => {
	// 		const entry = entries[0];
	// 		contentH = entry.contentRect.height;
	// 	});

	// 	observer.observe(target);

	// 	return () => observer.disconnect();
	// });

	$inspect(initialSnapRatios);
</script>

<svelte:window bind:innerHeight={viewportH} />

<div bind:this={rootEl} data-detail-index={currentSnapIndex} bind:clientHeight={contentH}>
	<BottomSheet bind:this={sheet} bind:isSheetOpen settings={sheetSettings} onclose={keepOpen}>
		<BottomSheet.Sheet>
			<div bind:clientHeight={sheetHandleH}>
				<BottomSheet.Handle />
			</div>

			<div class="has-[footer]:pb-20" role="region" aria-label="하단 시트 콘텐츠" data-height={bottomSheetHeight}>
				{#if $mainViewState === 'ai'}
					<TabAi />
				{/if}
				<Detail viewIndex={currentSnapIndex} />

				{#if currentSnapIndex !== 0}
					<BtnDirections />
				{/if}
			</div>
		</BottomSheet.Sheet>
	</BottomSheet>
</div>

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
