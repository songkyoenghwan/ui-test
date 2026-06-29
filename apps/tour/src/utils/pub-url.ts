export async function fetchAuth(path = '') {
	const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/${path}}`);
	return res.json();
}
