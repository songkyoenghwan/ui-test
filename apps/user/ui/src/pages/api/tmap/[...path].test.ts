import { afterEach, describe, expect, mock, test } from 'bun:test';

import { GET, POST } from './[...path]';

const originalFetch = globalThis.fetch;
const originalAppKey = process.env.TMAP_APP_KEY;

afterEach(() => {
	globalThis.fetch = originalFetch;
	if (originalAppKey == null) delete process.env.TMAP_APP_KEY;
	else process.env.TMAP_APP_KEY = originalAppKey;
});

describe('TMAP proxy', () => {
	test('GET은 허용되지 않은 보행 경로를 404로 막는다', async () => {
		process.env.TMAP_APP_KEY = 'test-key';
		const response = await GET({
			params: { path: 'routes/pedestrian' },
			request: new Request('http://localhost/api/tmap/routes/pedestrian?version=1'),
		} as never);

		expect(response.status).toBe(404);
		expect(await response.json()).toEqual({ error: 'Tmap API path is not allowed' });
	});

	test('POST routes/pedestrian는 appKey를 넣어 업스트림으로 전달한다', async () => {
		process.env.TMAP_APP_KEY = 'test-key';
		const body = {
			startX: 126.9,
			startY: 37.5,
			endX: 126.91,
			endY: 37.51,
			startName: '%EC%B6%9C%EB%B0%9C',
			endName: '%EB%8F%84%EC%B0%A9',
		};

		globalThis.fetch = mock(async (input, init) => {
			expect(input.toString()).toBe('https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&appKey=test-key');
			expect(init?.method).toBe('POST');
			expect(new Headers(init?.headers).get('appKey')).toBe('test-key');
			expect(init?.body).toBe(JSON.stringify(body));
			return Response.json({ type: 'FeatureCollection', features: [] });
		}) as typeof fetch;

		const response = await POST({
			params: { path: 'routes/pedestrian' },
			request: new Request('http://localhost/api/tmap/routes/pedestrian?version=1', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(body),
			}),
		} as never);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ type: 'FeatureCollection', features: [] });
	});

	test('POST는 허용되지 않은 경로를 404로 막는다', async () => {
		process.env.TMAP_APP_KEY = 'test-key';
		const response = await POST({
			params: { path: 'vectorjs' },
			request: new Request('http://localhost/api/tmap/vectorjs', { method: 'POST' }),
		} as never);

		expect(response.status).toBe(404);
	});
});
