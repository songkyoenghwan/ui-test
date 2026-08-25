import type { APIRoute } from 'astro';

const DEFAULT_LEGACY_API_TARGET = 'http://192.168.1.120:3001';
const DEFAULT_V1_API_TARGET = 'http://localhost:3011';
const LEGACY_LOGIN_PATH = '/auth/login';
const UPSTREAM_TIMEOUT_MS = 10_000;
const API_PREFIX = '/api';
const V1_API_PREFIX = '/api/v1';

type JsonRecord = Record<string, unknown>;

interface LegacyAuthSession {
	cookie?: string;
	accessToken?: string;
	csrfToken?: string;
}

let legacyAuthSession: LegacyAuthSession | undefined;
let legacyLoginPromise: Promise<LegacyAuthSession> | undefined;

const isRecord = (value: unknown): value is JsonRecord => typeof value === 'object' && value !== null && !Array.isArray(value);

const getRequiredEnv = (key: 'UI_API_LEGACY_LOGIN_ACCOUNT' | 'UI_API_LEGACY_PASSWORD') => {
	const value = process.env[key]?.trim();
	if (!value) {
		throw new Error(`${key} is not configured`);
	}
	return value;
};

const getSetCookieHeaders = (headers: Headers) => {
	const headersWithSetCookie = headers as Headers & { getSetCookie?: () => string[] };
	const setCookieHeaders = headersWithSetCookie.getSetCookie?.();
	if (setCookieHeaders?.length) {
		return setCookieHeaders;
	}

	const setCookie = headers.get('set-cookie');
	return setCookie ? [setCookie] : [];
};

const getCookieHeader = (response: Response) =>
	getSetCookieHeaders(response.headers)
		.map((setCookie) => setCookie.split(';', 1)[0]?.trim())
		.filter((cookie): cookie is string => Boolean(cookie))
		.join('; ');

const getStringValue = (record: JsonRecord, key: string) => {
	const value = record[key];
	return typeof value === 'string' && value.length > 0 ? value : undefined;
};

const getV1Paths = () =>
	(process.env.UI_API_V1_PATHS ?? '')
		.split(',')
		.map((path) => path.trim())
		.filter(Boolean)
		.map((path) => (path.startsWith('/') ? path : `/${path}`));

const isV1ManagedPath = (pathname: string) => {
	const apiPath = pathname.slice(API_PREFIX.length) || '/';
	return getV1Paths().some((v1Path) => apiPath === v1Path || apiPath.startsWith(`${v1Path}/`));
};

const getV1TargetPath = (pathname: string) => `${V1_API_PREFIX}${pathname.slice(API_PREFIX.length)}`;
const getLegacyTargetPath = (pathname: string) => pathname.slice(API_PREFIX.length) || '/';

const loginLegacyApi = async (): Promise<LegacyAuthSession> => {
	const target = process.env.UI_API_LEGACY_TARGET ?? DEFAULT_LEGACY_API_TARGET;
	const loginUrl = new URL(LEGACY_LOGIN_PATH, target);
	const response = await fetch(loginUrl, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			loginAccount: getRequiredEnv('UI_API_LEGACY_LOGIN_ACCOUNT'),
			password: getRequiredEnv('UI_API_LEGACY_PASSWORD'),
		}),
		signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
	});

	if (!response.ok) {
		throw new Error(`Legacy API login failed with status ${response.status}`);
	}

	const responseBody: unknown = await response.json();
	const envelope = isRecord(responseBody) ? responseBody : {};
	const data = isRecord(envelope.data) ? envelope.data : envelope;
	const session: LegacyAuthSession = {
		cookie: getCookieHeader(response) || undefined,
		accessToken: getStringValue(data, 'accessToken'),
		csrfToken: getStringValue(data, 'csrfToken'),
	};

	if (!session.cookie && !session.accessToken) {
		throw new Error('Legacy API login response did not include an auth cookie or access token');
	}

	return session;
};

const getLegacyAuthSession = () => {
	if (legacyAuthSession) {
		return Promise.resolve(legacyAuthSession);
	}
	if (legacyLoginPromise) {
		return legacyLoginPromise;
	}

	legacyLoginPromise = loginLegacyApi()
		.then((session) => {
			legacyAuthSession = session;
			return session;
		})
		.finally(() => {
			legacyLoginPromise = undefined;
		});

	return legacyLoginPromise;
};

const createUpstreamHeaders = (request: Request, session?: LegacyAuthSession) => {
	const headers = new Headers();
	for (const headerName of ['accept', 'accept-language', 'content-type', 'user-agent', 'x-request-id']) {
		const value = request.headers.get(headerName);
		if (value) {
			headers.set(headerName, value);
		}
	}

	if (session?.cookie) {
		headers.set('cookie', session.cookie);
	}
	if (session?.accessToken) {
		headers.set('authorization', `Bearer ${session.accessToken}`);
	}
	if (session?.csrfToken) {
		headers.set('x-csrf-token', session.csrfToken);
	}

	return headers;
};

const fetchUpstream = async (request: Request, target: string, session?: LegacyAuthSession, targetPathname?: string) => {
	const requestUrl = new URL(request.url);
	const targetUrl = new URL(`${targetPathname ?? requestUrl.pathname}${requestUrl.search}`, target);
	const method = request.method.toUpperCase();
	const body = method === 'GET' || method === 'HEAD' ? undefined : await request.arrayBuffer();

	return fetch(targetUrl, {
		method,
		headers: createUpstreamHeaders(request, session),
		body,
		redirect: 'manual',
		signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
	});
};

const createClientResponse = (upstreamResponse: Response, requestMethod: string) => {
	const headers = new Headers(upstreamResponse.headers);
	for (const headerName of ['connection', 'content-length', 'set-cookie', 'transfer-encoding']) {
		headers.delete(headerName);
	}

	const hasBody = requestMethod !== 'HEAD' && upstreamResponse.status !== 204 && upstreamResponse.status !== 304;
	return new Response(hasBody ? upstreamResponse.body : null, {
		status: upstreamResponse.status,
		statusText: upstreamResponse.statusText,
		headers,
	});
};

const createErrorResponse = (message: string, status = 502) =>
	new Response(JSON.stringify({ success: false, message }), {
		status,
		headers: { 'content-type': 'application/json; charset=utf-8' },
	});

const proxyV1Request = async (request: Request, targetPathname?: string) => {
	const target = process.env.UI_API_V1_TARGET ?? DEFAULT_V1_API_TARGET;
	const response = await fetchUpstream(request, target, undefined, targetPathname);
	return createClientResponse(response, request.method);
};

const proxyLegacyRequest = async (request: Request) => {
	const retryRequest = request.clone();
	const targetPathname = getLegacyTargetPath(new URL(request.url).pathname);
	let session = await getLegacyAuthSession();
	let response = await fetchUpstream(
		request,
		process.env.UI_API_LEGACY_TARGET ?? DEFAULT_LEGACY_API_TARGET,
		session,
		targetPathname,
	);

	if (response.status === 401) {
		if (legacyAuthSession === session) {
			legacyAuthSession = undefined;
		}
		session = await getLegacyAuthSession();
		response = await fetchUpstream(
			retryRequest,
			process.env.UI_API_LEGACY_TARGET ?? DEFAULT_LEGACY_API_TARGET,
			session,
			targetPathname,
		);
	}

	return createClientResponse(response, request.method);
};

export const ALL: APIRoute = async ({ request }) => {
	try {
		const requestUrl = new URL(request.url);
		const isExplicitV1Path = requestUrl.pathname === V1_API_PREFIX || requestUrl.pathname.startsWith(`${V1_API_PREFIX}/`);
		if (isExplicitV1Path) {
			return await proxyV1Request(request);
		}
		if (isV1ManagedPath(requestUrl.pathname)) {
			const legacyRequest = request.clone();
			const v1Response = await proxyV1Request(request, getV1TargetPath(requestUrl.pathname));
			if (v1Response.status !== 404) {
				return v1Response;
			}

			await v1Response.body?.cancel();
			return await proxyLegacyRequest(legacyRequest);
		}
		return await proxyLegacyRequest(request);
	} catch (error) {
		const isConfigurationError = error instanceof Error && error.message.endsWith('is not configured');
		return createErrorResponse(
			isConfigurationError ? 'Legacy API credentials are not configured' : 'Upstream API request failed',
			isConfigurationError ? 503 : 502,
		);
	}
};
