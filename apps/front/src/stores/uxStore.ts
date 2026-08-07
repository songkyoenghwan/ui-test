import { type BottomSheetRef } from '@/utils/uxEvent.type';
import { atom, map } from 'nanostores';

export const sheetInstance = atom<BottomSheetRef | undefined>(undefined);
export const sheetScrollInstance = atom<HTMLElement | null>(null);
export const sheetHandleArea = atom<number>(30);
export const sheetBottomArea = atom<number>(68);
export const sheetBackArea = atom<number>(70);
export const sheetRatio = map({
	min: 0.1,
	mid: 0.25,
	max: 0.99,
});
export const sheetMaxHeight = atom(0.99);
export const sheetHandleOpen = atom<boolean>(false);
export const sheetSnapPoint = atom<number>(0);

export const confusionBar = atom(false);
