// src/lib/server/external-auth.ts
import { API_BASE, API_BASIC_PASSWORD, API_BASIC_USER } from '$env/static/private';

let cachedCookie = '';
let cachedCsrfToken = '';
let cachedUser: Record<string, unknown> | null = null;
let authenticatedAt = 0;

const AUTH_TTL = 1000 * 60 * 20;

type LoginResult = {
	cookie: string;
	csrfToken: string;
	user: Record<string, unknown> | null;
	raw: unknown;
};

export const authenticate = async (): Promise<LoginResult> => {
	const now = Date.now();

	if (cachedCookie && now - authenticatedAt < AUTH_TTL) {
		return {
			cookie: cachedCookie,
			csrfToken: cachedCsrfToken,
			user: cachedUser,
			raw: {
				data: {
					csrfToken: cachedCsrfToken,
					user: cachedUser,
				},
			},
		};
	}

	const loginRes = await fetch(`${API_BASE}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			loginAccount: API_BASIC_USER,
			password: API_BASIC_PASSWORD,
		}),
	});

	if (!loginRes.ok) {
		throw new Error(`Login failed with status: ${loginRes.status}`);
	}

	const loginData = await loginRes.json();

	cachedCsrfToken = loginData?.data?.csrfToken ?? '';
	cachedUser = loginData?.data?.user ?? null;

	if (typeof loginRes.headers.getSetCookie === 'function') {
		cachedCookie = loginRes.headers
			.getSetCookie()
			.map((cookie) => cookie.split(';')[0])
			.join('; ');
	} else {
		const rawCookie = loginRes.headers.get('set-cookie') ?? '';
		cachedCookie = rawCookie
			.split(',')
			.map((cookie) => cookie.split(';')[0].trim())
			.join('; ');
	}

	authenticatedAt = now;

	return {
		cookie: cachedCookie,
		csrfToken: cachedCsrfToken,
		user: cachedUser,
		raw: loginData,
	};
};

export const clearAuthCache = () => {
	cachedCookie = '';
	cachedCsrfToken = '';
	cachedUser = null;
	authenticatedAt = 0;
};
