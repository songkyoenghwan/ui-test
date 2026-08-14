import { categoryList, destinationList, facility, facilityDetail, facilityList, poiList } from '@/stores/pageDataStore';
import type { CategoryDetailResponse } from '@/types/categories';
import type { FacilityDetailResponse, FacilityListResponse } from '@/types/facilities';
import type { PoiDetailResponse } from '@/types/pois';
import type { TourDestinationDetailResponse } from '@/types/tour-destinations';

export class FacilityOverview {
	currentFacilityId = $state<number | null>(null);

	get facility() {
		return facility.get();
	}

	get facilityDetail() {
		return facilityDetail.get();
	}

	get facilityList() {
		return facilityList.get();
	}

	get poiList() {
		return poiList.get();
	}

	get destinationList() {
		return destinationList.get();
	}

	get categoryList() {
		return categoryList.get();
	}

	poisMatch = $derived.by(() => {
		const facility = this.facility;
		const poiList = this.poiList;

		if (!facility?.id || !poiList.length) return null;

		return poiList.find((p) => p.facilityPoiMappings?.some((mapping) => mapping.facilityId === facility.id)) ?? null;
	});

	destinationMatch = $derived.by(() => {
		const destinationList = this.destinationList;
		const poisMatch = this.poisMatch;

		if (!destinationList.length || !poisMatch?.tourDestinationId) return null;

		return destinationList.find((p) => p.id === poisMatch.tourDestinationId) ?? null;
	});

	categoryMatch = $derived.by(() => {
		const facility = this.facility;
		const categoryList = this.categoryList;

		if (!categoryList.length) return undefined;

		return categoryList.find((p) => p.id === facility?.category?.id);
	});

	get currentFacility() {
		const id = this.currentFacilityId;
		const facilityList = this.facilityList;

		if (id == null) return null;

		return facilityList?.find((p) => Number(p.id) === Number(id)) ?? null;
	}

	get currentFacilityDetail() {
		const id = this.currentFacilityId;
		const facilityList = this.facilityList;

		if (id == null) return null;

		return facilityList?.find((p) => Number(p.id) === Number(id)) ?? null;
	}

	otherFacilityList = $derived.by(() => {
		const facility = this.facility;
		const facilityList = this.facilityList;
		const poisMatch = this.poisMatch;

		if (!poisMatch || !facility?.id) return [];

		const facilityIds = (poisMatch.facilityPoiMappings ?? []).map((mapping) => mapping.facilityId);

		if (facilityList === null) return [];
		return facilityList.filter((facilityItem) => facilityIds.includes(facilityItem.id) && facilityItem.id !== facility.id);
	});

	otherFacilities = $derived.by(() => {
		const facility = this.facility;
		const facilityList = this.facilityList;
		const poisMatch = this.poisMatch;

		if (!poisMatch || !facility?.id || !facilityList?.length) return [];

		return facilityList.filter(
			(facilityItem) =>
				facilityItem.id !== facility.id &&
				(poisMatch.facilityPoiMappings ?? []).some((mapping) => mapping.facilityId === facilityItem.id),
		);
	});
}
