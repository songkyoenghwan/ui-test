import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/tour-destinations');

	if (!res.ok) {
		throw new Error('Failed to load');
	}

	const db = await res.json();

	return {
		list: db ?? [],
	};
};
