import type { RequestHandler } from './$types';
import { isHttpError, isRedirect } from '@sveltejs/kit';
import { fetcher } from '$lib/utils/fetcher';

export const GET: RequestHandler = async (event) => {
	try {
		const type = event.url.searchParams.get('type');
		const waveId = event.url.searchParams.get('wave_id');

		let url = '';
		if (type === 'uploadFile' || type === 'photo') {
			const completeFileId = event.url.searchParams.get('complete_file_id');
			url = `/web/fileDownLoad?wave_id=${waveId}&complete_file_id=${completeFileId}`;
		} else if (type === 'result') {
			const waveNumber = event.url.searchParams.get('wave_number');
			url = `/web/wavePickingResultFileDownLoad?wave_id=${waveId}&wave_number=${waveNumber}`;
		} else {
			return new Response(null, { status: 400 });
		}

		const response = await fetcher.get(event, url);

		if (!response.ok) {
			return new Response(null, { status: response.status });
		}

		return new Response(response.body, {
			headers: {
				'Content-Type': response.headers.get('content-type') ?? 'application/octet-stream',
				'Content-Disposition': response.headers.get('content-disposition') ?? `attachment; filename="${waveId}"`,
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