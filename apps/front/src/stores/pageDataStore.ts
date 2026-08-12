import type { CategoryDetailResponse } from '@/types/categories';
import type { FacilityDetailResponse, FacilityListResponse } from '@/types/facilities';
import type { PoiDetailResponse } from '@/types/pois';
import type { TourDestinationDetailResponse } from '@/types/tour-destinations';
import { atom, map } from 'nanostores';

export const searchList = atom([]);
export const searchResultList = atom<FacilityListResponse[]>([]);
export const categoryList = atom<CategoryDetailResponse[]>([]);
export const destinationList = atom<TourDestinationDetailResponse[]>([]);
export const poiList = atom<PoiDetailResponse[]>([]);
export const facilityList = atom<FacilityDetailResponse[] | null>(null);
export const pathList = atom([]);
export const recommendList = atom([]);
export const distance = map({
	start: '',
	end: '',
	step: 0,
	totalDistance: 0,
	time: 0,
});
