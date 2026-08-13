<script lang="ts">
	import {
		setSheetScrollRef,
		sheetMaxRatioValue,
		sheetMidRatioValue,
		sheetMinRatioValue,
		sheetUi,
	} from '@/src/stores/sheetUiStore';
	import {
		detailViewState,
		layoutViewState,
		searchViewState,
		sheetInstance,
		sheetSnapPoint,
		viewDri,
		viewportH,
		sheetScrollPoint,
	} from '@/stores/uxStore';
	import ConfusionState from '@/svelte/map/ConfusionState.svelte';
	import ControlGroup from '@/svelte/map/ControlGroup.svelte';
	import Facility from '@/svelte/sheet/Facility.svelte';
	import Search from '@/svelte/sheet/Search.svelte';
	import TabAi from '@/svelte/sheet/TabAi.svelte';
	import BtnDirections from '@/svelte/sheet/BtnDirections.svelte';
	import { type BottomSheetRef } from '@/utils/uxEvent.type';
	import { tick } from 'svelte';
	import { BottomSheet } from 'svelte-bottom-sheet';
	import type { BottomSheetSettings } from 'svelte-bottom-sheet';
	import type { Attachment } from 'svelte/attachments';

	let sheet: BottomSheetRef | undefined = $state(undefined);
	let rootEl: HTMLDivElement | undefined;
	let scrollEl: HTMLDivElement | null = $state(null);

	let prevSnapRatios: number[] | undefined;
	let prevSheetSettings: BottomSheetSettings | undefined;

	let bottomVisible = $derived($sheetSnapPoint >= $sheetMinRatioValue * 100 + 2);

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
			return () => {
				return;
			};
		}

		sheetInstance.set(sheet);

		const update = () => {
			const next = Number(handleEl.getAttribute('aria-valuenow') ?? 0);

			if (sheet !== undefined) {
				sheetSnapPoint.set(next);
			}
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

	const bottomScroll: Attachment = (element) => {
		let prev = $sheetSnapPoint;

		const stop = $effect.root(() => {
			$effect(() => {
				const current = $sheetSnapPoint;
				const contentEl = element as HTMLDivElement | null;

				if (contentEl && prev < $sheetScrollPoint && contentEl.scrollTop > 0) {
					contentEl.scrollTo({ top: 0, behavior: 'smooth' });
				}

				prev = current;
			});
		});

		return () => {
			stop();
		};
	};

	$effect(() => {
		setSheetScrollRef(scrollEl);
	});

	$inspect($viewDri);
</script>

<svelte:window bind:innerHeight={$viewportH} />

{#snippet detailContent()}
	{#if $detailViewState === 'facilities'}
		<ConfusionState />
		<Facility />
	{/if}

	{#if $detailViewState === 'search'}
		<Search />
	{/if}

	{#if $detailViewState === 'path'}
		path
	{/if}

	{#if $detailViewState === 'directions'}
		directions
	{/if}
{/snippet}

{#snippet scrollWrap()}
	<div class="grid h-[calc(100%-30px)] min-h-0 max-w-dvw min-w-0 grid-rows-1 has-[footer]:grid-rows-[1fr_68px]">
		<div
			bind:this={scrollEl}
			{@attach bottomScroll}
			data-scroll="content"
			class="flex min-h-0 w-full min-w-0 flex-col overflow-x-clip"
		>
			{@render detailContent()}
		</div>

		{#if bottomVisible}
			<BtnDirections />
		{/if}
	</div>
{/snippet}

{#if $searchViewState !== 'result'}
	<div
		bind:this={rootEl}
		data-detail-index={$sheetSnapPoint}
		data-scroll-check={$sheetSnapPoint > $sheetScrollPoint - 1 ? 'on' : 'off'}
		class={['relative']}
	>
		<BottomSheet bind:this={sheet} settings={sheetSettings} bind:isSheetOpen={$sheetUi.sheetHandleOpen} onclose={keepOpen}>
			<BottomSheet.Sheet>
				<BottomSheet.Handle {@attach bottomValueNow} />

				{#if $detailViewState === 'idle' || $detailViewState === 'ai' || $detailViewState === 'facilities' || $detailViewState === 'search' || $detailViewState === 'path' || $detailViewState === 'directions'}
					<ControlGroup />
				{/if}

				{#if $detailViewState === 'ai'}
					<TabAi />
				{:else}
					{@render scrollWrap()}
				{/if}
			</BottomSheet.Sheet>
		</BottomSheet>
	</div>
{/if}

<style>
	:global {
		.bottom-sheet {
			overflow: visible !important;
			touch-action: pan-y;
			transition-delay: 0.1ms;
			transition-duration: 100ms;
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
				scroll-behavior: smooth;
			}
		}

		[data-scroll-check='on'] {
			[data-scroll='content'] {
				overflow-y: auto;
			}
		}
	}
</style>
