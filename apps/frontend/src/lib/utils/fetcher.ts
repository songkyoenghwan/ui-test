// @ts-ignore
import { env } from '$env/dynamic/private';
import { isPublicPath, refreshAccessToken } from '$lib/utils/auth';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

function buildHeaders(event: RequestEvent, options: RequestInit = {}): Headers {
	const xff = event.request.headers.get('x-forwarded-for') || '';
	const client = event.getClientAddress();
	const userAgent = event.request.headers.get('user-agent') || '';
	const cookie = event.cookies
		.getAll()
		.map(({ name, value }) => `${name}=${value}`)
		.join('; ');

	return new Headers({
		...options.headers,
		'X-Device-Type': 'web',
		'X-Forwarded-For': xff ? `${xff}, ${client}` : client,
		'User-Agent': userAgent,
		cookie,
	});
}

const request = async (event: RequestEvent, path: string, options: RequestInit = {}) => {
	const url = `${env.PRIVATE_API_URL}${path}`;
	const headers = buildHeaders(event, options);
	const init = { ...options, headers };

	const response = await event.fetch(url, init);

	// if (!isPublicPath(event.url.pathname) && path !== '/auth/refresh' && response.status === 401) {
	// 	const refreshed = await refreshAccessToken(event);
	// 	if (!refreshed) {
	// 		redirect(303, '/login');
	// 	}

	// 	const retryHeaders = buildHeaders(event, options);
	// 	const retryInit = { ...options, headers: retryHeaders };

	// 	return await event.fetch(url, retryInit);
	// }

	return response;
};

export const fetcher = {
	get: (event: RequestEvent, path: string) => {
		return request(event, path, { method: 'GET' });
	},
	post: (event: RequestEvent, path: string, body?: object | FormData) => {
		const isFormData = body instanceof FormData;
		return request(event, path, {
			method: 'POST',
			body: isFormData ? body : JSON.stringify(body),
			headers: isFormData ? {} : { 'Content-Type': 'application/json' },
		});
	},
};
