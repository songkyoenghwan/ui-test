import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('/api/cms-loc-001');

	if (!res.ok) {
		throw new Error('Failed to load API');
	}

	const list = await res.json();

	return { list };
};
