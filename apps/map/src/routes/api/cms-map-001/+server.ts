export const GET = async ({ fetch }) => {
	const res = await fetch('/json/facilities.json');
	if (!res.ok) {
		return new Response('Failed to load db.json', { status: 500 });
	}

	const data = await res.json();
	return new Response(JSON.stringify(data), {
		headers: { 'content-type': 'application/json' },
	});
};
