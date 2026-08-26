import { calculateDistanceMeters } from './distance';

export interface RoutePlace {
	latitude: number;
	longitude: number;
	poiId: number | null;
	name: string;
}

export const ROUTE_PLACE_OVERLAP_METERS = 5;

export function areRoutePlacesOverlapping(a: RoutePlace | null | undefined, b: RoutePlace | null | undefined): boolean {
	if (!a || !b) return false;
	if (a.poiId != null && b.poiId != null && Number(a.poiId) === Number(b.poiId)) return true;

	const meters = calculateDistanceMeters(a, b);
	return meters != null && meters <= ROUTE_PLACE_OVERLAP_METERS;
}

export function placeDisplayName(value: unknown, fallback = ''): string {
	if (typeof value === 'string' && value.trim()) return value.trim();
	if (!value || typeof value !== 'object') return fallback;

	const record = value as Record<string, unknown>;
	for (const key of ['ko', 'en', 'ja', 'zh', 'th', 'vi']) {
		const text = record[key];
		if (typeof text === 'string' && text.trim()) return text.trim();
	}

	return fallback;
}

export function facilityDisplayName(name: unknown, lang = 'ko', fallback = ''): string {
	if (typeof name === 'string' && name.trim()) return name.trim();
	if (name && typeof name === 'object') {
		const localized = (name as Record<string, unknown>)[lang];
		if (typeof localized === 'string' && localized.trim()) return localized.trim();
	}

	return placeDisplayName(name, fallback);
}
