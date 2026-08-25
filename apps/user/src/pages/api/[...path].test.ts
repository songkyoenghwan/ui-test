import { afterEach, describe, expect, mock, test } from 'bun:test';

import { ALL } from './[...path]';

const originalFetch = globalThis.fetch;

afterEach(() => {
	globalThis.fetch = originalFetch;
	delete process.env.UI_API_V1_PATHS;
	delete process.env.UI_API_V1_TARGET;
	delete process.env.UI_API_LEGACY_TARGET;
	delete process.env.UI_API_LEGACY_LOGIN_ACCOUNT;
	delete process.env.UI_API_LEGACY_PASSWORD;
});

describe('API proxy fallback', () => {
	test('forwards an explicit v1 categories request to the Nest API', async () => {
		process.env.UI_API_V1_TARGET = 'http://v1.test';

		globalThis.fetch = mock(async (input) => {
			expect(input.toString()).toBe('http://v1.test/api/v1/categories?tourDestinationId=3');
			return Response.json({ success: true, data: [] });
		}) as typeof fetch;

		const response = await ALL({
			request: new Request('http://localhost/api/v1/categories?tourDestinationId=3'),
		} as never);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ success: true, data: [] });
	});

	test('falls back to the legacy API when a managed v1 path returns 404', async () => {
		process.env.UI_API_V1_PATHS = '/categories';
		process.env.UI_API_V1_TARGET = 'http://v1.test';
		process.env.UI_API_LEGACY_TARGET = 'http://legacy.test';
		process.env.UI_API_LEGACY_LOGIN_ACCOUNT = 'test-account';
		process.env.UI_API_LEGACY_PASSWORD = 'test-password';

		const requestedUrls: string[] = [];
		globalThis.fetch = mock(async (input, init) => {
			const url = input.toString();
			requestedUrls.push(url);

			if (url === 'http://v1.test/api/v1/categories/42') {
				return new Response(null, { status: 404 });
			}
			if (url === 'http://legacy.test/auth/login') {
				return Response.json({ accessToken: 'legacy-access-token' });
			}
			if (url === 'http://legacy.test/categories/42') {
				expect(new Headers(init?.headers).get('authorization')).toBe('Bearer legacy-access-token');
				return Response.json({ id: 42, source: 'legacy' });
			}

			throw new Error(`Unexpected request: ${url}`);
		}) as typeof fetch;

		const response = await ALL({ request: new Request('http://localhost/api/categories/42') } as never);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ id: 42, source: 'legacy' });
		expect(requestedUrls).toEqual([
			'http://v1.test/api/v1/categories/42',
			'http://legacy.test/auth/login',
			'http://legacy.test/categories/42',
		]);
	});
});
