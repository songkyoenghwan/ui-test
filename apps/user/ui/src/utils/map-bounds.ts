export type MapBounds = {
	minLat: number;
	maxLat: number;
	minLng: number;
	maxLng: number;
};

export type MapSize = {
	width: number;
	height: number;
};

export type OverlayPadding = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

/** 길찾기 경로 화면에서 헤더·안내 패널이 가리는 기본 여백(px). DOM을 못 읽으면 이 값을 쓴다. */
export const WALKING_ROUTE_OVERLAY_FALLBACK: OverlayPadding = {
	top: 80,
	right: 24,
	bottom: 148,
	left: 24,
};

export function boundsFromPoints(points: Array<{ latitude: number; longitude: number }>): MapBounds | null {
	if (points.length === 0) return null;

	let minLat = points[0].latitude;
	let maxLat = points[0].latitude;
	let minLng = points[0].longitude;
	let maxLng = points[0].longitude;
	for (const point of points) {
		minLat = Math.min(minLat, point.latitude);
		maxLat = Math.max(maxLat, point.latitude);
		minLng = Math.min(minLng, point.longitude);
		maxLng = Math.max(maxLng, point.longitude);
	}

	return { minLat, maxLat, minLng, maxLng };
}

export function expandBoundsForOverlayPadding(bounds: MapBounds, mapSize: MapSize, padding: OverlayPadding): MapBounds {
	const width = Math.max(mapSize.width, 1);
	const height = Math.max(mapSize.height, 1);
	const top = Math.max(padding.top, 0);
	const right = Math.max(padding.right, 0);
	const bottom = Math.max(padding.bottom, 0);
	const left = Math.max(padding.left, 0);
	const visibleWidth = Math.max(width - left - right, 1);
	const visibleHeight = Math.max(height - top - bottom, 1);
	const latSpan = Math.max(bounds.maxLat - bounds.minLat, 1e-6);
	const lngSpan = Math.max(bounds.maxLng - bounds.minLng, 1e-6);
	const expandedLatSpan = latSpan * (height / visibleHeight);
	const expandedLngSpan = lngSpan * (width / visibleWidth);

	return {
		minLat: bounds.minLat - (bottom / height) * expandedLatSpan,
		maxLat: bounds.maxLat + (top / height) * expandedLatSpan,
		minLng: bounds.minLng - (left / width) * expandedLngSpan,
		maxLng: bounds.maxLng + (right / width) * expandedLngSpan,
	};
}

export function measureWalkingRouteOverlayPadding(mapEl: HTMLElement | null): OverlayPadding {
	const extra = 12;
	let top = WALKING_ROUTE_OVERLAY_FALLBACK.top - extra;
	let bottom = WALKING_ROUTE_OVERLAY_FALLBACK.bottom - extra;

	if (typeof document === 'undefined' || !mapEl) {
		return { ...WALKING_ROUTE_OVERLAY_FALLBACK };
	}

	const mapRect = mapEl.getBoundingClientRect();
	if (mapRect.height <= 0) {
		return { ...WALKING_ROUTE_OVERLAY_FALLBACK };
	}

	for (const el of document.querySelectorAll('header.fixed')) {
		const rect = el.getBoundingClientRect();
		if (rect.height <= 0) continue;
		if (rect.top <= mapRect.top + 4 && rect.bottom > mapRect.top) {
			top = Math.max(top, rect.bottom - mapRect.top);
		}
	}

	for (const el of document.querySelectorAll('div.fixed.bottom-0')) {
		const rect = el.getBoundingClientRect();
		if (rect.height <= 0 || rect.height > mapRect.height * 0.45) continue;
		if (rect.bottom >= mapRect.bottom - 4) {
			bottom = Math.max(bottom, mapRect.bottom - rect.top);
		}
	}

	return {
		top: top + extra,
		right: WALKING_ROUTE_OVERLAY_FALLBACK.right,
		bottom: bottom + extra,
		left: WALKING_ROUTE_OVERLAY_FALLBACK.left,
	};
}
