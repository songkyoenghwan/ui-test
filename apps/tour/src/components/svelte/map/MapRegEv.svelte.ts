export interface Place {
	id: string;
	tit: string;
	top: string;
	bottom: string;
	category?: string;
}

export function removePlaceById(places: Place[], id: string): Place[] {
	return places.filter((place) => place.id !== id);
}
