export const GET = async ({ fetch }) => {
	const res = await fetch('/json/api-1.json');
	if (!res.ok) {
		return new Response('Failed to load db.json', { status: 500 });
	}

	const list = await res.json();
	return new Response(JSON.stringify(list), {
		headers: { 'content-type': 'application/json' },
	});
};
