import type { APIRoute } from 'astro';

import { isProxyPath, jsonResponse, proxyApi } from '@/server/api-proxy';

export const ALL: APIRoute = async ({ params, request }) => {
	const path = params.path;

	if (!path) {
		return jsonResponse(
			{
				error: 'path is required',
			},
			{ status: 400 },
		);
	}

	if (isProxyPath(path)) {
		return proxyApi(request, path);
	}

	return jsonResponse(
		{
			error: 'API proxy path is not allowed',
			requested: path,
		},
		{ status: 404 },
	);
};
