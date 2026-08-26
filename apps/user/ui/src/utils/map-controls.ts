export const TOUR_DESTINATION_MAP_ZOOM = 16;

export const MAP_CONTROLS_REFRESH_EVENT = 'map-controls:refresh';
export const MAP_CONTROLS_CENTER_EVENT = 'map-controls:center';

export type MapCenterController = {
	defaultCenter?: { lat: number; lng: number };
	defaultZoom?: number;
	setCenter: (lat: number, lng: number) => void;
	setZoom: (zoom: number) => void;
} | null;

export type TourDestinationCenter = {
	latitude?: unknown;
	longitude?: unknown;
} | null;

/** 대상지 중심좌표로 맵을 이동한다. 유효 좌표가 없으면 false. */
export function applyTourDestinationCenter(
	map: MapCenterController,
	tourDestination: TourDestinationCenter,
	zoom = TOUR_DESTINATION_MAP_ZOOM,
): boolean {
	if (!map) return false;

	const lat = Number(tourDestination?.latitude);
	const lng = Number(tourDestination?.longitude);
	if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;

	map.defaultCenter = { lat, lng };
	map.defaultZoom = zoom;
	map.setCenter(lat, lng);
	map.setZoom(zoom);
	return true;
}

/** mapController.defaultCenter 로 복귀할 때 사용 */
export function applyStoredMapCenter(map: MapCenterController, zoom = TOUR_DESTINATION_MAP_ZOOM): boolean {
	if (!map?.defaultCenter) return false;
	const { lat, lng } = map.defaultCenter;
	if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
	map.defaultZoom = zoom;
	map.setCenter(lat, lng);
	map.setZoom(zoom);
	return true;
}
