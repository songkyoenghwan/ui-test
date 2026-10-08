import { env } from '$env/dynamic/public';
import type { LayoutServerLoad } from './(page)/$types';

export const load = (async () => {
	return {
		// PUBLIC_SOCKET_URL: env.PUBLIC_SOCKET_URL
	};
}) satisfies LayoutServerLoad;
