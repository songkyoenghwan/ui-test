import type { CategoryDetailResponse } from '@/types/categories';
import type { FacilityDetailResponse, FacilityListResponse } from '@/types/facilities';
import type { PoiDetailResponse, PoiListResponse } from '@/types/pois';
import type { TourDestinationDetailResponse, TourDestinationListResponse } from '@/types/tour-destinations';
import { atom, map } from 'nanostores';
import { z } from 'zod';

export const CurrentSchema = z.object({
	destination: z.number(),
	poi: z.number(),
	facility: z.number(),
});

export type Current = z.infer<typeof CurrentSchema>;

export const current = map<Current>({
	destination: 1,
	poi: 0,
	facility: 0,
});

export const searchList = atom([]);
export const searchResultList = atom<FacilityListResponse[]>([]);
export const categoryList = atom<CategoryDetailResponse[]>([]);
export const destinationDetail = atom<TourDestinationDetailResponse | null>(null);
export const destinationList = atom<TourDestinationListResponse[]>([]);
export const poiDetail = atom<PoiDetailResponse[]>([]);
export const poiList = atom<PoiListResponse[]>([]);
export const facility = atom<FacilityListResponse | null>(null);
export const facilityDetail = atom<FacilityDetailResponse | null>(null);
export const facilityList = atom<FacilityListResponse[] | null>(null);
export const facilityOtherList = atom<FacilityDetailResponse[] | null>(null);
export const otherFacilityDetails = atom<FacilityDetailResponse[]>([]);
export const pathList = atom([]);
export const recommendList = atom([]);
export const distance = map({
	start: '',
	end: '',
	step: 0,
	totalDistance: 0,
	time: 0,
});

export async function loadDestination(destinationId: number) {
	const [resDestination, resPoi, resFacility] = await Promise.all([
		fetch(`/api/tour-destinations/${destinationId}`, {
			credentials: 'include',
		}),
		fetch(`/api/pois?tourDestinationId=${destinationId}`, {
			credentials: 'include',
		}),
		fetch(`/api/facilities?tourDestinationId=${destinationId}&page=1&pageSize=100`, {
			credentials: 'include',
		}),
	]);

	if (!resDestination.ok) throw new Error('Failed to fetch destination');
	if (!resPoi.ok) throw new Error('Failed to fetch POIs');
	if (!resFacility.ok) throw new Error('Failed to fetch facilities');

	const [destinationData, poiData, facilityData] = await Promise.all([
		resDestination.json(),
		resPoi.json(),
		resFacility.json(),
	]);

	current.setKey('destination', destinationId);
	destinationDetail.set(destinationData?.data ?? null);
	poiList.set(poiData?.data?.items ?? []);
	facilityList.set(facilityData?.data?.items ?? []);
}

export async function currentDetail() {
	try {
		const response = await fetch(`/api/facilities/${current.get().facility}`);
		if (!response.ok) throw new Error(`${response.status}`);

		const json = await response.json();
		const detailData = json.data ?? null;
		const currentFacilityDetail = detailData ?? {};
		const currentFacility = facilityList.get()?.find((f) => Number(f.id) === Number(current.get().facility)) ?? null;
		const matchedPoi =
			poiList
				.get()
				.find((poi) => poi.facilityPoiMappings?.some((mapping) => Number(mapping.facilityId) === current.get().facility))
				?.facilityPoiMappings ?? [];
		const otherDetails = await Promise.all(
			matchedPoi.map(async (mapping) => {
				const res = await fetch(`/api/facilities/${mapping.facilityId}`);
				if (!res.ok) return null;

				const otherJson = await res.json();
				return otherJson.data ?? null;
			}),
		);
		facility.set(currentFacility);
		facilityDetail.set(currentFacilityDetail);
		facilityOtherList.set(otherDetails.filter(Boolean));
	} catch {
		facilityOtherList.set([]);
	}
}
