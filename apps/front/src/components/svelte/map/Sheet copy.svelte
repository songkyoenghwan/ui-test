<script lang="ts">
	import { mainViewState } from '@/stores/globalStore';
	import {
		sheetHandleOpen,
		sheetInstance,
		sheetMaxHeight,
		sheetRatio,
		sheetScrollInstance,
		sheetSnapPoint,
	} from '@/stores/uxStore';
	import ConfusionState from '@/svelte/map/ConfusionState.svelte';
	import ControlGroup from '@/svelte/map/ControlGroup.svelte';
	import Detail from '@/svelte/sheet/Detail.svelte';
	import TabAi from '@/svelte/sheet/TabAi.svelte';
	import { type BottomSheetRef } from '@/utils/uxEvent.type';
	import { tick } from 'svelte';
	import { BottomSheet } from 'svelte-bottom-sheet';
	import type { BottomSheetSettings } from 'svelte-bottom-sheet';

	let sheet: BottomSheetRef | undefined = $state(undefined);
	let rootEl: HTMLDivElement | undefined;
	let viewportH = $state<number | 0>(0);
	let snapRatios = $derived([$sheetRatio.min, $sheetRatio.mid, $sheetRatio.max]);

	const sheetSettings = $derived.by<BottomSheetSettings>(() => {
		return {
			disableClosing: true,
			autoCloseThreshold: 0,
			maxHeight: $sheetMaxHeight,
			snapPoints: snapRatios,
			startingSnapPoint: snapRatios[1],
			closeThreshold: snapRatios[1],
		};
	});

	async function keepOpen() {
		if (!$sheetHandleOpen) {
			await tick();
			sheetHandleOpen.set(true);
		}
	}

	$effect(() => {
		if (!rootEl) return;
		sheetInstance.set(sheet);
		sheetInstance.get()?.setSnapPoint(0.01);

		const handleEl = rootEl.querySelector<HTMLElement>('[aria-valuenow]');
		if (!handleEl) return;

		const update = () => {
			const next = Number(handleEl.getAttribute('aria-valuenow') ?? 0);
			sheetSnapPoint.set(next);

			const scrollEl = $sheetScrollInstance;

			if (scrollEl instanceof HTMLElement && scrollEl?.scrollTop > 0) {
				scrollEl.scrollTop = 0;
			}
		};

		update();

		const observer = new MutationObserver(() => {
			update();
		});

		observer.observe(handleEl, {
			attributes: true,
			attributeFilter: ['aria-valuenow'],
		});

		return () => {
			observer.disconnect();
		};
	});

	// $effect(() => {
	// 	if (!rootEl) return;

	// 	if (!initialized) {
	// 		initialized = true;
	// 		sheetInstance.set(sheet);
	// 	}

	// 	let valueObserver: MutationObserver | undefined;
	// 	let mountObserver: MutationObserver | undefined;

	// 	const bindHandle = (handleEl: HTMLElement) => {
	// 		const update = () => {
	// 			const next = Number(handleEl.getAttribute('aria-valuenow') ?? 0);
	// 			sheetSnapPoint.set(next);

	// 			const scrollEl = $sheetScrollInstance;
	// 			if (scrollEl instanceof HTMLElement && scrollEl.scrollTop > 0) {
	// 				scrollEl.scrollTop = 0;
	// 			}
	// 		};

	// 		update();

	// 		valueObserver = new MutationObserver(() => {
	// 			update();
	// 		});

	// 		valueObserver.observe(handleEl, {
	// 			attributes: true,
	// 			attributeFilter: ['aria-valuenow'],
	// 		});
	// 	};

	// 	const tryBind = () => {
	// 		const handleEl = rootEl?.querySelector<HTMLElement>('[aria-valuenow]');

	// 		if (!handleEl) return false;

	// 		bindHandle(handleEl);
	// 		return true;
	// 	};

	// 	queueMicrotask(() => {
	// 		if (tryBind()) return;

	// 		mountObserver = new MutationObserver(() => {
	// 			if (tryBind()) {
	// 				mountObserver?.disconnect();
	// 			}
	// 		});

	// 		if (!rootEl) return;
	// 		mountObserver.observe(rootEl, {
	// 			childList: true,
	// 			subtree: true,
	// 		});
	// 	});

	// 	return () => {
	// 		valueObserver?.disconnect();
	// 		mountObserver?.disconnect();
	// 	};
	// });
</script>

<svelte:window bind:innerHeight={viewportH} />

<div
	bind:this={rootEl}
	data-detail-index={$sheetSnapPoint}
	data-scroll-check={$sheetSnapPoint > 70 ? 'on' : 'off'}
	class={['relative', $mainViewState === 'poi' ? 'pt-17.5' : '']}
>
	<BottomSheet bind:this={sheet} settings={sheetSettings} bind:isSheetOpen={$sheetHandleOpen} onclose={keepOpen}>
		<BottomSheet.Sheet>
			<BottomSheet.Handle />

			{#if $mainViewState === 'ai'}
				<TabAi />
			{/if}

			<ControlGroup />

			{#if $mainViewState === 'default' || $mainViewState === 'poi'}
				<ConfusionState />
				<Detail {viewportH} />
			{/if}
		</BottomSheet.Sheet>
	</BottomSheet>
</div>

<style>
	:global {
		.bottom-sheet {
			overflow: visible !important;
			touch-action: pan-x pan-y;
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
