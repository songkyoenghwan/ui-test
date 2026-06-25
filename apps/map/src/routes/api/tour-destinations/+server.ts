import { externalFetch } from '$lib/server/external-api';

export const GET = async ({ params }) => {
	const res = await externalFetch(`/tour-destinations/${params.id}`);
	const text = await res.text();

	return new Response(text, {
		status: res.status,
		headers: {
			'content-type': res.headers.get('content-type') ?? 'application/json',
		},
	});
};
