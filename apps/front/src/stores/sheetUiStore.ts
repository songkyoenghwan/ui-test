import { layoutViewState, sheetInstance, sheetScrollInstance, viewportH } from '@/stores/uxStore';
import { round2 } from '@/utils/uxEvent';
import { computed, map } from 'nanostores';

export const sheetUi = map({
	sheetHandleArea: 30,
	sheetBottomArea: 68,
	sheetBackArea: 70,
	sheetMaxHeight: 1,
	sheetHandleOpen: false,
	scrollRef: null as HTMLElement | null,
	sheetMinHeight: 0,
	sheetMidHeight: 0,
	sheetMinRatio: 0.1,
	sheetMidRatio: 0.18,
	sheetMaxRatio: 0.99,
});

export const sheetMinRatioValue = computed([sheetUi, viewportH], (state, vh) => {
	if (state.sheetMinHeight <= 0) return state.sheetMinRatio;
	return round2((state.sheetMinHeight + state.sheetHandleArea) / vh);
});

export const sheetMidRatioValue = computed([sheetUi, viewportH], (state, vh) => {
	if (state.sheetMidHeight <= 0 || vh <= 0) return state.sheetMidRatio;

	return round2((state.sheetMidHeight + state.sheetMinHeight + state.sheetBottomArea + state.sheetHandleArea) / vh);
});

export const sheetMaxRatioValue = computed([sheetUi, layoutViewState, viewportH, sheetMidRatioValue], (state, view, vh) => {
	if (state.sheetMidHeight <= 0 && vh <= 0) return state.sheetMaxRatio;
	if (view === 'facilities') {
		return round2((vh - state.sheetBackArea) / vh);
	} else if (view === 'search') {
		return round2((vh - state.sheetBackArea) / vh);
	}
	return round2(state.sheetMaxRatio);
});

export function setSheetScrollRef(node: HTMLElement | null) {
	sheetUi.setKey('scrollRef', node);
	sheetScrollInstance.set(node);
}

export function setSheetMinH(value: number) {
	if (sheetUi.get().sheetMinHeight === value) return;
	sheetUi.setKey('sheetMinHeight', value);
}

export function setSheetMidH(value: number) {
	if (sheetUi.get().sheetMidHeight === value) return;
	sheetUi.setKey('sheetMidHeight', value);
}

export function setSheetMaxH(value: number) {
	if (sheetUi.get().sheetMaxHeight === value) return;
	sheetUi.setKey('sheetMaxHeight', value);
}

export function setSheetMinRatioValue(value: number) {
	if (sheetUi.get().sheetMinRatio === value) return;
	sheetUi.setKey('sheetMinRatio', value);
}

export function setSheetMidRatioValue(value: number) {
	if (sheetUi.get().sheetMidRatio === value) return;
	sheetUi.setKey('sheetMidRatio', value);
}

export function setSheetMaxRatioValue(value: number) {
	if (sheetUi.get().sheetMaxRatio === value) return;
	sheetUi.setKey('sheetMaxRatio', value);
}

export function setSheetBottomArea(value: number) {
	if (sheetUi.get().sheetBottomArea === value) return;
	sheetUi.setKey('sheetBottomArea', value);
}

export function setPointSheetUi(next: 'min' | 'mid' | 'max') {
	const instance = sheetInstance.get();
	if (!instance) return;

	const pointMap = {
		min: sheetMinRatioValue.get(),
		mid: sheetMidRatioValue.get(),
		max: sheetMaxRatioValue.get(),
	};

	const point = pointMap[next];
	if (!Number.isFinite(point)) return;
	instance.setSnapPoint(point);
}

export function resetSheetUi() {
	sheetUi.set({
		sheetHandleArea: 30,
		sheetBottomArea: 68,
		sheetBackArea: 70,
		sheetMaxHeight: 0.99,
		sheetHandleOpen: false,
		scrollRef: null as HTMLElement | null,
		sheetMinHeight: 0,
		sheetMidHeight: 0,
		sheetMinRatio: 0.01,
		sheetMidRatio: 0.15,
		sheetMaxRatio: 0.99,
	});
}
