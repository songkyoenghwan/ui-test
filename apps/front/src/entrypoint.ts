import { sheetSnapPoint } from '@/stores/uxStore';
import mask from '@alpinejs/mask';
import persist from '@alpinejs/persist';
import sort from '@alpinejs/sort';
import { NanoStores } from '@nanostores/alpine';
import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
	Alpine.plugin(NanoStores);
	Alpine.plugin(sort);
	Alpine.plugin(persist);

	Alpine.store('ux', {
		sheetSnapPoint: sheetSnapPoint.get(),
		setSheetSnapPoint(value: number) {
			sheetSnapPoint.set(value);
		},
	});

	sheetSnapPoint.subscribe((value) => {
		Alpine.store('ux').sheetSnapPoint = value;
	});
};
