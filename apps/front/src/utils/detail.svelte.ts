import type { CategoryDetailResponse } from '@/types/categories';
import type { FacilityDetailResponse } from '@/types/facilities';
import type { PoiDetailResponse } from '@/types/pois';
import type { TourDestinationDetailResponse } from '@/types/tour-destinations';

export class FacilityOverview {
	#getFacility;
	#getPoiList;
	#getDestinationList;
	#getCategoryList;
	#getFacilityList;

	constructor(params: {
		facility: () => FacilityDetailResponse | undefined;
		poiList: () => readonly PoiDetailResponse[];
		destinationList: () => readonly TourDestinationDetailResponse[];
		categoryList: () => readonly CategoryDetailResponse[];
		facilityList: () => readonly FacilityDetailResponse[] | null;
	}) {
		this.#getFacility = params.facility;
		this.#getPoiList = params.poiList;
		this.#getDestinationList = params.destinationList;
		this.#getCategoryList = params.categoryList;
		this.#getFacilityList = params.facilityList;
	}

	get facility() {
		return this.#getFacility();
	}

	get poiList() {
		return this.#getPoiList();
	}

	get destinationList() {
		return this.#getDestinationList();
	}

	get categoryList() {
		return this.#getCategoryList();
	}

	get facilityList() {
		return this.#getFacilityList();
	}

	poisMatch = $derived.by(() => {
		const facility = this.#getFacility();
		const poiList = this.#getPoiList();

		if (!facility?.id || !poiList.length) return null;

		return poiList.find((p) => p.facilityPoiMappings?.some((mapping) => mapping.facilityId === facility.id)) ?? null;
	});

	destinationMatch = $derived.by(() => {
		const destinationList = this.#getDestinationList();
		const poisMatch = this.poisMatch;

		if (!destinationList.length || !poisMatch?.tourDestinationId) return null;

		return destinationList.find((p) => p.id === poisMatch.tourDestinationId) ?? null;
	});

	categoryMatch = $derived.by(() => {
		const facility = this.#getFacility();
		const categoryList = this.#getCategoryList();

		if (!categoryList.length) return undefined;

		return categoryList.find((p) => p.id === facility?.category?.id);
	});

	otherFacilityList = $derived.by(() => {
		const facility = this.#getFacility();
		const facilityList = this.#getFacilityList();
		const poisMatch = this.poisMatch;

		if (!poisMatch || !facility?.id) return [];

		const facilityIds = (poisMatch.facilityPoiMappings ?? []).map((mapping) => mapping.facilityId);

		if (facilityList === null) return [];
		return facilityList.filter((facilityItem) => facilityIds.includes(facilityItem.id) && facilityItem.id !== facility.id);
	});

	otherFacilities = $derived.by(() => {
		const facility = this.#getFacility();
		const facilityList = this.#getFacilityList();
		const poisMatch = this.poisMatch;

		if (!poisMatch || !facility?.id || !facilityList?.length) return [];

		return facilityList.filter(
			(facilityItem) =>
				facilityItem.id !== facility.id &&
				(poisMatch.facilityPoiMappings ?? []).some((mapping) => mapping.facilityId === facilityItem.id),
		);
	});
}
