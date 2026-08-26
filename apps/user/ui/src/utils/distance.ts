export interface GeoCoordinates {
	latitude: number;
	longitude: number;
}

const EARTH_RADIUS_METERS = 6_371_000;

/** 두 위경도 좌표 사이의 Haversine 직선거리를 미터로 반환한다. */
export function calculateDistanceMeters(from: GeoCoordinates, to: GeoCoordinates): number | null {
	if (!isValidCoordinates(from) || !isValidCoordinates(to)) return null;

	const toRadians = (degree: number) => (degree * Math.PI) / 180;
	const latitudeDelta = toRadians(to.latitude - from.latitude);
	const longitudeDelta = toRadians(to.longitude - from.longitude);
	const a =
		Math.sin(latitudeDelta / 2) ** 2 +
		Math.cos(toRadians(from.latitude)) * Math.cos(toRadians(to.latitude)) * Math.sin(longitudeDelta / 2) ** 2;

	return EARTH_RADIUS_METERS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistance(distanceMeters: number | null | undefined): string | null {
	if (distanceMeters == null || !Number.isFinite(distanceMeters) || distanceMeters < 0) return null;
	return distanceMeters < 1_000 ? `${Math.floor(distanceMeters)}m` : `${(distanceMeters / 1_000).toFixed(1)}km`;
}

function isValidCoordinates(coordinates: GeoCoordinates): boolean {
	return (
		Number.isFinite(coordinates.latitude) &&
		Number.isFinite(coordinates.longitude) &&
		coordinates.latitude >= -90 &&
		coordinates.latitude <= 90 &&
		coordinates.longitude >= -180 &&
		coordinates.longitude <= 180
	);
}
