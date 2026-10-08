import type { RequestHandler } from './$types';
import { isHttpError, isRedirect } from '@sveltejs/kit';
import { fetcher } from '$lib/utils/fetcher';

export const GET: RequestHandler = async (event) => {
    try {
        const response = await fetcher.get(event, `/file/${event.params.fileId}`);

        if (!response.ok) {
            return new Response(null, { status: response.status });
        }

        return new Response(response.body, {
            headers: {
                'Content-Type': response.headers.get('content-type') ?? 'application/octet-stream',
                'Content-Disposition': response.headers.get('content-disposition') ?? `attachment; filename="${event.params.fileId}"`,
                'Content-Length': response.headers.get('content-length') ?? '',
            },
        });
    } catch (err) {
        if (isRedirect(err) || isHttpError(err)) {
            throw err;
        }

        return new Response(null, { status: 500 });
    }
};