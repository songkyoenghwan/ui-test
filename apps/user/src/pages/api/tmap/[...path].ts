import type { APIRoute } from 'astro';

const TMAP_API_BASE = 'https://apis.openapi.sk.com/tmap';
const ALLOWED_TMAP_PATHS = new Set(['vectorjs', 'geo/fullAddrGeo', 'geo/reversegeocoding', 'pois', 'map']);

const getTmapAppKey = () => process.env.TMAP_APP_KEY ?? '';
const normalizePath = (path: string | string[] | undefined) => (Array.isArray(path) ? path.join('/') : path);

const createProxyHeaders = (response: Response, fallbackContentType: string) => {
	const headers = new Headers();
	headers.set('content-type', response.headers.get('content-type') ?? fallbackContentType);

	const cacheControl = response.headers.get('cache-control');
	if (cacheControl) {
		headers.set('cache-control', cacheControl);
	}

	return headers;
};

export const GET: APIRoute = async ({ params, request }) => {
	const path = normalizePath(params.path);

	if (!path || !ALLOWED_TMAP_PATHS.has(path)) {
		return new Response(JSON.stringify({ error: 'Tmap API path is not allowed' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const appKey = getTmapAppKey();
	if (!appKey) {
		return new Response(JSON.stringify({ error: 'TMAP_APP_KEY is not configured' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const requestUrl = new URL(request.url);
	const targetUrl = new URL(`${TMAP_API_BASE}/${path}`);
	targetUrl.search = requestUrl.search;
	targetUrl.searchParams.set('appKey', appKey);

	const response = await fetch(targetUrl, {
		headers: {
			appKey,
		},
	});
	const fallbackContentType = path === 'vectorjs' ? 'application/javascript; charset=utf-8' : 'application/json';
	const headers = createProxyHeaders(response, fallbackContentType);

	if (response.status === 204 || response.status === 304) {
		headers.delete('content-type');
		return new Response(null, {
			status: response.status,
			statusText: response.statusText,
			headers,
		});
	}

	const body = await response.arrayBuffer();

	return new Response(body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
};
