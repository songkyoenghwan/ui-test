import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const params = new URLSearchParams({
		tourDestinationId: url.searchParams.get('tourDestinationId') ?? '1',
		page: url.searchParams.get('page') ?? '1',
		pageSize: url.searchParams.get('pageSize') ?? '30',
	});

	const res = await fetch(`/api/cms-map-001`);

	if (!res.ok) {
		throw error(res.status, 'Failed to load facilities');
	}

	const db = await res.json();

	return {
		items: db?.items ?? [],
		totalCount: db?.totalCount ?? 0,
		page: db?.page ?? 1,
		pageSize: db?.pageSize ?? 30,
		totalPages: db?.totalPages ?? 1,
		matchingStatus: db?.matchingStatus ?? { totalCount: 0, matched: 0, unmatched: 0 },
	};
};
