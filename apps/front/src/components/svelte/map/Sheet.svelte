<script lang="ts">
	import {
		sheetMaxRatioValue,
		sheetMidRatioValue,
		sheetMinRatioValue,
		sheetUi,
		setPointSheetUi,
	} from '@/src/stores/sheetUiStore';
	import { detailViewState, mainViewState } from '@/stores/globalStore';
	import { sheetInstance, sheetMaxHeight, sheetSnapPoint, viewportH } from '@/stores/uxStore';
	import ConfusionState from '@/svelte/map/ConfusionState.svelte';
	import ControlGroup from '@/svelte/map/ControlGroup.svelte';
	import Detail from '@/svelte/sheet/Detail.svelte';
	import TabAi from '@/svelte/sheet/TabAi.svelte';
	import { type BottomSheetRef } from '@/utils/uxEvent.type';
	import { tick } from 'svelte';
	import { BottomSheet } from 'svelte-bottom-sheet';
	import type { BottomSheetSettings } from 'svelte-bottom-sheet';
	import type { Attachment } from 'svelte/attachments';

	let sheet: BottomSheetRef | undefined = $state(undefined);
	let rootEl: HTMLDivElement | undefined;
	let initialized = false;

	let prevSnapRatios: number[] | undefined;
	let prevSheetSettings: BottomSheetSettings | undefined;
	let prevMainViewState: string | undefined = $state('');

	let snapRatios = $derived.by(() => {
		const next = [$sheetMinRatioValue, $sheetMidRatioValue, $sheetMaxRatioValue];

		if (prevSnapRatios && prevSnapRatios[0] === next[0] && prevSnapRatios[1] === next[1] && prevSnapRatios[2] === next[2]) {
			return prevSnapRatios;
		}

		prevSnapRatios = next;
		return next;
	});

	const sheetSettings = $derived.by<BottomSheetSettings>(() => {
		const ratios = snapRatios;

		const next: BottomSheetSettings = {
			disableClosing: true,
			autoCloseThreshold: 0,
			maxHeight: 0.99,
			snapPoints: ratios,
			startingSnapPoint: ratios[1],
			closeThreshold: ratios[1],
		};

		if (
			prevSheetSettings &&
			prevSheetSettings.maxHeight === next.maxHeight &&
			prevSheetSettings.startingSnapPoint === next.startingSnapPoint &&
			prevSheetSettings.closeThreshold === next.closeThreshold &&
			prevSheetSettings.snapPoints === next.snapPoints
		) {
			return prevSheetSettings;
		}

		prevSheetSettings = next;
		return next;
	});

	async function keepOpen() {
		if (!$sheetUi.sheetHandleOpen) {
			await tick();
			sheetUi.setKey('sheetHandleOpen', true);
		}
	}

	const bottomValueNow: Attachment = (element) => {
		const handleEl = element;

		if (!handleEl) {
			console.log('handleEl not found');
			return () => {
				return;
			};
		}

		sheetInstance.set(sheet);

		const update = () => {
			const next = Number(handleEl.getAttribute('aria-valuenow') ?? 0);
			sheetSnapPoint.set(next);
		};

		update();

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.type === 'attributes' && mutation.attributeName === 'aria-valuenow') {
					update();
				}
			}
		});

		observer.observe(handleEl, {
			attributes: true,
			attributeFilter: ['aria-valuenow'],
		});

		return () => {
			observer.disconnect();
		};
	};
</script>

<svelte:window bind:innerHeight={$viewportH} />

<div
	bind:this={rootEl}
	data-detail-index={$sheetSnapPoint}
	data-scroll-check={$sheetSnapPoint > 89 ? 'on' : 'off'}
	class={['relative', $mainViewState === 'poi' ? 'pt-17.5' : '']}
>
	<BottomSheet bind:this={sheet} settings={sheetSettings} bind:isSheetOpen={$sheetUi.sheetHandleOpen} onclose={keepOpen}>
		<BottomSheet.Sheet>
			<BottomSheet.Handle {@attach bottomValueNow} />

			{#if $mainViewState === 'ai'}
				<TabAi />
			{/if}

			{#if $mainViewState === 'poi'}
				<ControlGroup />
				<ConfusionState />
				<Detail />
			{/if}
		</BottomSheet.Sheet>
	</BottomSheet>
</div>

<style>
	:global {
		.bottom-sheet {
			overflow: visible !important;
			touch-action: pan-y;
			transition-delay: 1ms;
			transition-duration: 10ms;
		}

		.handle-container {
			padding: 4px 0 !important;
			border-radius: 1.25rem 1.25rem 0 0;
			outline: none !important;
		}

		.bottom-sheet-grip {
			width: 3.75rem !important;
			height: 0.375rem !important;
		}

		[data-scroll-check='off'] {
			[data-scroll='content'] {
				overflow-y: hidden;
			}
		}

		[data-scroll-check='on'] {
			[data-scroll='content'] {
				overflow-y: auto;
			}
		}
	}
</style>
