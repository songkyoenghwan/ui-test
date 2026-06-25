import { error } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const res = await fetch('/api/auth/login', {
		method: 'POST',
	});

	if (!res.ok) {
		throw error(res.status, 'Failed to authenticate');
	}

	const db = await res.json();

	return {
		csrfToken: db?.csrfToken ?? '',
		user: db?.user ?? null,
		tourDestinations: db?.tourDestinations ?? [],
		menus: db?.menus ?? [],
	};
};
