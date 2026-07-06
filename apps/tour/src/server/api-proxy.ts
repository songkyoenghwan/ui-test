const API_BASE = process.env.API_BASE ?? 'http://localhost:3001';
const DEFAULT_PROXY_ROOTS = ['tour-destinations', 'facilities'];

const proxyRoots = new Set(
	(process.env.API_PROXY_ROOTS ?? DEFAULT_PROXY_ROOTS.join(','))
		.split(',')
		.map((path) => path.trim())
		.filter(Boolean),
);

const createProxyHeaders = (request: Request) => {
	const headers = new Headers({
		Accept: request.headers.get('accept') ?? 'application/json',
	});

	const contentType = request.headers.get('content-type');
	if (contentType) {
		headers.set('content-type', contentType);
	}

	const cookie = request.headers.get('cookie');
	if (cookie) {
		headers.set('cookie', cookie);
	}

	const csrfToken = request.headers.get('x-csrf-token');
	if (csrfToken) {
		headers.set('x-csrf-token', csrfToken);
	}

	return headers;
};

const createProxyResponseHeaders = (response: Response) => {
	const headers = new Headers();
	const contentType = response.headers.get('content-type');
	if (contentType) {
		headers.set('content-type', contentType);
	}

	const responseHeaders = response.headers as Headers & { getSetCookie?: () => string[] };
	const setCookies = responseHeaders.getSetCookie?.() ?? [];
	for (const cookie of setCookies) {
		headers.append('set-cookie', cookie);
	}

	return headers;
};

export const jsonResponse = (body: unknown, init: ResponseInit) => {
	const headers = new Headers(init.headers);
	headers.set('Content-Type', 'application/json');

	return new Response(JSON.stringify(body), {
		...init,
		headers,
	});
};

export const isProxyPath = (path: string) => {
	const [root] = path.split('/');
	return Boolean(root && proxyRoots.has(root));
};

export const proxyApi = async (request: Request, path: string) => {
	const requestUrl = new URL(request.url);
	const targetUrl = new URL(`/${path}`, API_BASE);
	targetUrl.search = requestUrl.search;

	const method = request.method.toUpperCase();
	const body = method === 'GET' || method === 'HEAD' ? undefined : await request.arrayBuffer();
	const response = await fetch(targetUrl, {
		method,
		headers: createProxyHeaders(request),
		body,
	});
	const responseBody = await response.text();

	return new Response(responseBody, {
		status: response.status,
		statusText: response.statusText,
		headers: createProxyResponseHeaders(response),
	});
};
