import { persistentAtom } from '@nanostores/persistent';

export const currentTourDestinationId = persistentAtom<number>('currentTourDestinationId', 1, {
	encode: JSON.stringify,
	decode: JSON.parse,
});
export function getCurrentTourDestinationId() {
	return currentTourDestinationId.get();
}

export function setCurrentTourDestinationId(id: number) {
	currentTourDestinationId.set(id);
}

export function watchCurrentTourDestinationId(callback: (id: number) => void) {
	return currentTourDestinationId.subscribe(callback);
}
