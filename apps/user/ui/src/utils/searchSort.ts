import type { FacilityListResponse } from '@/types/facilities';
import type { FacilityOperatingStatus } from '@/types/search';

export type SearchSort = 'hours' | 'proximity' | 'alphabetical';

export type SearchSortableFacility = FacilityListResponse & { distance?: number | null };

const STATUS_RANK: Record<FacilityOperatingStatus, number> = {
	OPERATING: 1,
	BREAK: 2,
	BEFORE_OPEN: 3,
	AFTER_CLOSE: 4,
	HOLIDAY: 5,
	OUT_OF_PERIOD: 6,
	NO_INFO: 7,
};

export function sortSearchResults(
	items: SearchSortableFacility[],
	sort: SearchSort,
	nameOf: (item: SearchSortableFacility) => string,
	locale: string,
): SearchSortableFacility[] {
	const collator = new Intl.Collator(locale, { sensitivity: 'base', numeric: true });
	const alphabetical = (left: SearchSortableFacility, right: SearchSortableFacility) =>
		collator.compare(nameOf(left), nameOf(right)) || left.id - right.id;
	const hours = (left: SearchSortableFacility, right: SearchSortableFacility) => {
		const rank = statusRank(left.operation?.status) - statusRank(right.operation?.status);
		if (rank !== 0) return rank;

		if (left.operation?.status === 'BREAK' || left.operation?.status === 'BEFORE_OPEN') {
			const transition = toTime(left.operation.nextTransitionAt) - toTime(right.operation?.nextTransitionAt);
			if (transition !== 0) return transition;
		}

		return alphabetical(left, right);
	};

	return [...items].sort((left, right) => {
		if (sort === 'alphabetical') return alphabetical(left, right);
		if (sort === 'proximity') {
			const distance = (left.distance ?? Number.POSITIVE_INFINITY) - (right.distance ?? Number.POSITIVE_INFINITY);
			return distance || hours(left, right);
		}
		return hours(left, right);
	});
}

function statusRank(status: FacilityOperatingStatus | undefined): number {
	return status ? STATUS_RANK[status] : STATUS_RANK.NO_INFO;
}

function toTime(value: string | null | undefined): number {
	if (!value) return Number.POSITIVE_INFINITY;
	const timestamp = Date.parse(value);
	return Number.isFinite(timestamp) ? timestamp : Number.POSITIVE_INFINITY;
}
