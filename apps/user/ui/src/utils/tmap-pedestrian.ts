import type {
	MappedWalkingRoute,
	TmapPedestrianFeature,
	TmapPedestrianResponse,
	WalkingPathPoint,
	WalkingTurn,
} from '@/types/tmap-pedestrian';

const AVERAGE_STEP_METERS = 0.7;

export function mapPedestrianFeatures(payload: unknown): MappedWalkingRoute | null {
	const features = getFeatures(payload);
	if (!features.length) return null;

	const path: WalkingPathPoint[] = [];
	const turns: WalkingTurn[] = [];
	let totalDistance = 0;
	let totalTimeSeconds = 0;

	for (const feature of features) {
		const properties = feature.properties ?? {};
		const geometryType = feature.geometry?.type;
		const coordinates = feature.geometry?.coordinates;

		if (geometryType === 'LineString' && Array.isArray(coordinates)) {
			for (const point of coordinates) {
				const mapped = toPathPoint(point);
				if (mapped) path.push(mapped);
			}
		}

		if (geometryType === 'Point' && typeof properties.description === 'string' && properties.description.trim()) {
			turns.push({ description: properties.description.trim() });
		}

		totalDistance = readNumber(properties.totalDistance) || totalDistance;
		totalTimeSeconds = readNumber(properties.totalTime) || totalTimeSeconds;
	}

	if (path.length < 2) return null;

	return {
		path,
		turns,
		totalDistance: Math.round(totalDistance),
		totalTimeMinutes: Math.max(0, Math.round(totalTimeSeconds / 60)),
		step: Math.max(0, Math.round(totalDistance / AVERAGE_STEP_METERS)),
	};
}

export type PedestrianFailure = 'far' | 'disabled';

export function classifyPedestrianError(status: number, body: unknown): PedestrianFailure {
	const text = collectErrorText(body);
	if (status === 413 || /멀|거리|too far|over the|exceed/i.test(text)) return 'far';
	return 'disabled';
}

function getFeatures(payload: unknown): TmapPedestrianFeature[] {
	if (!payload || typeof payload !== 'object') return [];
	const record = payload as TmapPedestrianResponse & { features?: TmapPedestrianFeature[] };
	return Array.isArray(record.features) ? record.features : [];
}

function toPathPoint(value: unknown): WalkingPathPoint | null {
	if (!Array.isArray(value) || value.length < 2) return null;
	const longitude = Number(value[0]);
	const latitude = Number(value[1]);
	if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
	return { latitude, longitude };
}

function readNumber(value: number | string | undefined): number {
	const parsed = typeof value === 'number' ? value : Number(value);
	return Number.isFinite(parsed) ? parsed : 0;
}

function collectErrorText(body: unknown): string {
	if (!body || typeof body !== 'object') return '';
	const record = body as TmapPedestrianResponse;
	return [record.error?.code, record.error?.message, record.errorCode, record.errorMessage]
		.filter((value): value is string => typeof value === 'string')
		.join(' ');
}
