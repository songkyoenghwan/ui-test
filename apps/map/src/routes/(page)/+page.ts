import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/menu');

	if (!res.ok) {
		throw new Error('Failed to load db.json');
	}

	const db = await res.json();

	return {
		list: db ?? [],
	};
};
