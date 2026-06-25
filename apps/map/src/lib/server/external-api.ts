// src/lib/server/external-api.ts
import { API_BASE } from '$env/static/private';
import { authenticate, clearAuthCache } from '$lib/server/external-auth';

export const externalFetch = async (path: string, init: RequestInit = {}) => {
	let { cookie, csrfToken } = await authenticate();

	const request = async () =>
		fetch(`${API_BASE}${path}`, {
			...init,
			headers: {
				Accept: 'application/json',
				...(csrfToken ? { 'x-csrf-token': csrfToken } : {}),
				...(cookie ? { Cookie: cookie } : {}),
				...(init.headers ?? {}),
			},
		});

	let res = await request();

	if (res.status === 401) {
		clearAuthCache();
		({ cookie, csrfToken } = await authenticate());
		res = await request();
	}

	return res;
};
