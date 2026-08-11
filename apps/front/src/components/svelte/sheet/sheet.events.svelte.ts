import {
	sheetBottomArea,
	sheetHandleArea,
	sheetInstance,
	sheetMaxHeight,
	sheetRatio,
	sheetScrollInstance,
	sheetSnapPoint,
} from '@/stores/uxStore';
import { round2 } from '@/utils/uxEvent';

type Params = {
	getViewportH: () => number;
	getlayoutViewState: () => string;
};

export function createSheetController({ getViewportH, getlayoutViewState }: Params) {
	let scrollRef: HTMLElement | null = $state(null);

	let h = $state({
		min: 0,
		mid: 0,
		max: 0,
	});

	let minRatio = $derived.by(() => {
		const viewportH = getViewportH();
		const value = h.min > 0 ? (h.min + sheetHandleArea.get()) / viewportH : 0.12;
		return round2(value);
	});

	let midRatio = $derived.by(() => {
		const viewportH = getViewportH();
		const value = h.mid > 0 ? (h.min + h.mid + sheetBottomArea.get() + sheetHandleArea.get()) / viewportH : 0;

		console.log(getViewportH());
		return round2(value);
	});

	let maxRatio = $derived.by(() => {
		const viewportH = getViewportH();
		let value = 0.99;

		if (getlayoutViewState() === 'poi' && sheetSnapPoint.get() > 90) {
			value = h.mid > 0 ? (viewportH - sheetHandleArea.get()) / viewportH : 0;
		}

		return round2(value);
	});

	let bottomVisible = $derived(sheetSnapPoint.get() >= minRatio * 100 + 3);

	$effect(() => {
		if (minRatio !== sheetRatio.get().min || midRatio !== sheetRatio.get().mid) {
			const next = {
				min: minRatio,
				mid: midRatio + 0.01,
				max: 0.99,
			};

			sheetRatio.set(next);
			sheetInstance.get?.()?.setSnapPoint(next.mid);
		}

		sheetMaxHeight.set(sheetSnapPoint.get() > 90 ? maxRatio : 0.98);
		sheetScrollInstance.set(scrollRef);
	});

	return {
		h,
		setMinHeight(value: number) {
			h.min = value;
		},
		setMidHeight(value: number) {
			h.mid = value;
		},
		setMaxHeight(value: number) {
			h.max = value;
		},
		setScrollRef(node: HTMLElement | null) {
			scrollRef = node;
		},
		get minRatio() {
			return minRatio;
		},
		get midRatio() {
			return midRatio;
		},
		get maxRatio() {
			return maxRatio;
		},
		get bottomVisible() {
			return bottomVisible;
		},
	};
}
