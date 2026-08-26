import type { APIRoute } from 'astro';

const TMAP_API_BASE = 'https://apis.openapi.sk.com/tmap';
export const ALLOWED_TMAP_GET_PATHS = new Set(['vectorjs', 'geo/fullAddrGeo', 'geo/reversegeocoding', 'pois', 'map']);
export const ALLOWED_TMAP_POST_PATHS = new Set(['routes/pedestrian']);

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

const jsonError = (status: number, error: string) =>
	new Response(JSON.stringify({ error }), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});

const proxyTmap = async (method: 'GET' | 'POST', path: string | undefined, request: Request) => {
	const allowed = method === 'GET' ? ALLOWED_TMAP_GET_PATHS : ALLOWED_TMAP_POST_PATHS;
	if (!path || !allowed.has(path)) {
		return jsonError(404, 'Tmap API path is not allowed');
	}

	const appKey = getTmapAppKey();
	if (!appKey) {
		return jsonError(500, 'TMAP_APP_KEY is not configured');
	}

	const requestUrl = new URL(request.url);
	const targetUrl = new URL(`${TMAP_API_BASE}/${path}`);
	targetUrl.search = requestUrl.search;
	targetUrl.searchParams.set('appKey', appKey);

	const headers: Record<string, string> = { appKey };
	if (method === 'POST') {
		headers.accept = request.headers.get('accept') ?? 'application/json';
		headers['content-type'] = request.headers.get('content-type') ?? 'application/json';
	}

	const response = await fetch(targetUrl, {
		method,
		headers,
		body: method === 'POST' ? await request.text() : undefined,
	});
	const fallbackContentType = path === 'vectorjs' ? 'application/javascript; charset=utf-8' : 'application/json';
	const responseHeaders = createProxyHeaders(response, fallbackContentType);

	if (response.status === 204 || response.status === 304) {
		responseHeaders.delete('content-type');
		return new Response(null, {
			status: response.status,
			statusText: response.statusText,
			headers: responseHeaders,
		});
	}

	const body = await response.arrayBuffer();
	return new Response(body, {
		status: response.status,
		statusText: response.statusText,
		headers: responseHeaders,
	});
};

export const GET: APIRoute = async ({ params, request }) => proxyTmap('GET', normalizePath(params.path), request);

export const POST: APIRoute = async ({ params, request }) => proxyTmap('POST', normalizePath(params.path), request);
