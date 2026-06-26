// src/routes/api/facilities/+server.ts
import { json } from '@sveltejs/kit';
import { externalFetch } from '$lib/server/external-api';

export const GET = async ({ url }) => {
	const apiUrl = new URL('http://dummy');
	for (const [key, value] of url.searchParams.entries()) {
		if (value !== '') apiUrl.searchParams.set(key, value);
	}

	const res = await externalFetch(`/facilities?${apiUrl.searchParams.toString()}`);

	const text = await res.text();

	return new Response(text, {
		status: res.status,
		headers: {
			'content-type': res.headers.get('content-type') ?? 'application/json',
		},
	});
};
