import type { RequestEvent } from "@sveltejs/kit";
import { fetcher } from '$lib/utils/fetcher';
import { createSingleFlight } from '$lib/utils/singleFlight';

const PUBLIC_PATHS = ['/login', '/logout'];

const cookieOptions = {
    path: '/',
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
} as const;

export const isPublicPath = (path: string): boolean => {
    return PUBLIC_PATHS.includes(path);
};

export const setAuthCookies = (event: RequestEvent, accessToken: string, refreshToken: string, accessTokenExpiresIn: number, refreshTokenExpiresIn: number) => {
    event.cookies.set('access_token', accessToken, { ...cookieOptions, maxAge: accessTokenExpiresIn });
    event.cookies.set('refresh_token', refreshToken, { ...cookieOptions, maxAge: refreshTokenExpiresIn });
};

const performRefreshAccessToken = async (event: RequestEvent): Promise<boolean> => {
	try {
		const response = await fetcher.post(event, '/auth/refresh');

		if (!response.ok) {
			return false;
		}

		const result = await response.json();
		const {
			access_token: accessToken,
			refresh_token: refreshToken,
			access_token_expires_in: accessTokenExpiresIn,
			refresh_token_expires_in: refreshTokenExpiresIn,
		} = result.data;

		setAuthCookies(event, accessToken, refreshToken, accessTokenExpiresIn, refreshTokenExpiresIn);

		return true;
	} catch {
		return false;
	}
};

export const refreshAccessToken = createSingleFlight(performRefreshAccessToken);
