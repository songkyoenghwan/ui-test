import { atom, map } from 'nanostores';

import type { RoutePlace } from '@/utils/route-place';

export type { RoutePlace };

export interface UserPosition {
	latitude: number;
	longitude: number;
}

export type LocationPermission = PermissionState | 'unknown' | 'unsupported';
export type RouteSelecting = 'start' | 'end' | 'idle';

export const userPosition = atom<UserPosition | null>(null);
export const locationLoading = atom(false);
export const locationPermission = atom<LocationPermission>('unknown');
export const routeSelecting = atom<RouteSelecting>('idle');
export const routeEndpoints = map<{
	start: RoutePlace | null;
	end: RoutePlace | null;
}>({ start: null, end: null });

export async function loadGrantedUserPosition(): Promise<UserPosition | null> {
	if (typeof navigator === 'undefined') return null;
	if (!navigator.geolocation || !navigator.permissions) {
		locationPermission.set('unsupported');
		return null;
	}

	try {
		const permission = await navigator.permissions.query({ name: 'geolocation' });
		locationPermission.set(permission.state);
		if (permission.state !== 'granted') return null;
		return await readCurrentPosition();
	} catch {
		locationPermission.set('unsupported');
		return null;
	}
}

export async function requestUserPosition(): Promise<UserPosition | null> {
	if (typeof navigator === 'undefined' || !navigator.geolocation) {
		locationPermission.set('unsupported');
		window.alert('현재 기기에서는 위치 정보를 사용할 수 없습니다.');
		return null;
	}

	let permission: PermissionState | null = null;
	try {
		if (navigator.permissions) {
			permission = (await navigator.permissions.query({ name: 'geolocation' })).state;
			locationPermission.set(permission);
		}
	} catch {
		permission = null;
	}

	if (permission === 'denied') {
		window.alert('가까운순을 사용하려면 브라우저 설정에서 위치 정보 접근을 허용해 주세요.');
		return null;
	}
	if (permission === 'prompt') {
		window.alert('가까운순을 사용하려면 위치 정보 접근을 허용해 주세요.');
	}

	locationLoading.set(true);
	try {
		return await readCurrentPosition();
	} catch (error) {
		if (isGeolocationPermissionDenied(error)) {
			locationPermission.set('denied');
		}
		window.alert('현재 위치를 확인하지 못했습니다. 위치 권한을 확인해 주세요.');
		return null;
	} finally {
		locationLoading.set(false);
	}
}

function isGeolocationPermissionDenied(error: unknown): boolean {
	return typeof error === 'object' && error !== null && 'code' in error && error.code === 1;
}

async function readCurrentPosition(): Promise<UserPosition> {
	const position = await new Promise<GeolocationPosition>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, {
			enableHighAccuracy: true,
			timeout: 10_000,
			maximumAge: 30_000,
		});
	});
	const result = {
		latitude: position.coords.latitude,
		longitude: position.coords.longitude,
	};
	userPosition.set(result);
	locationPermission.set('granted');
	return result;
}
