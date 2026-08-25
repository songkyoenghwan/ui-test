import * as m from '@/paraglide/messages';

export type BottomSheetRef = {
	setSnapPoint: (point: number, throwEvent?: boolean) => boolean;
};
export type BottomSheetSnapPoint = number;
export type BottomSheetOpenState = boolean;

export type VariantConfusion = 'crowded' | 'busy' | 'moderate' | 'relaxed' | 'none';

export const VARIANT_CONFUSION_BG: Record<VariantConfusion, string> = {
	crowded: 'bg-e7352b from-07352b/20',
	busy: 'bg-ff8826 from-ff882/206',
	moderate: 'bg-00c922 from-00c922/20',
	relaxed: 'bg-26b7ff from-26b7ff/20',
	none: 'bg-slate-500',
};

export const confusionLists = [
	{ id: 'crowded', name: m.usr_map_001_06(), color: VARIANT_CONFUSION_BG.crowded, textColor: 'text-e7352b' },
	{ id: 'busy', name: m.usr_map_001_07(), color: VARIANT_CONFUSION_BG.busy, textColor: 'text-ff8826' },
	{ id: 'moderate', name: m.usr_map_001_08(), color: VARIANT_CONFUSION_BG.moderate, textColor: 'text-00c922' },
	{ id: 'relaxed', name: m.usr_map_001_09(), color: VARIANT_CONFUSION_BG.relaxed, textColor: 'text-26b7ff' },
];
