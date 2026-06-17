import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch('/json/db.json');

	if (!res.ok) {
		throw error(500, 'Failed to load db.json');
	}

	const db = await res.json();
	const list = db['CMS-LOC-001'] ?? [];
	const item = list.find((v: any) => v.id === Number(params.id));

	if (!item) {
		throw error(404, 'Not found');
	}

	return {
		item,
	};
};
