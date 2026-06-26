// src/routes/api/auth/login/+server.ts
import { json } from '@sveltejs/kit';
import { authenticate } from '$lib/server/external-auth';

export const POST = async () => {
	try {
		const result = await authenticate();

		return json({
			csrfToken: result.csrfToken,
			user: result.user,
			tourDestinations: Array.isArray((result.user as any)?.tourDestinations) ? (result.user as any).tourDestinations : [],
			menus: Array.isArray((result.user as any)?.menus) ? (result.user as any).menus : [],
			raw: result.raw,
		});
	} catch (e) {
		return json(
			{
				message: e instanceof Error ? e.message : 'login failed',
			},
			{ status: 500 },
		);
	}
};
