import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/cms-map-001');

	if (!res.ok) {
		throw error(res.status, 'Failed to load mock data');
	}

	const db = await res.json();

	return {
		data: db.facilities?.data ?? [],
		items: db.facilities?.data?.items ?? [],
	};
};
