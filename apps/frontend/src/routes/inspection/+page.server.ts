import type { PageServerLoad } from './$types';
import { error, isHttpError, isRedirect } from '@sveltejs/kit';
import { fetcher } from '$lib/utils/fetcher';

export const load: PageServerLoad = async (event) => {
	try {
		const response = await fetcher.get(event, '/wave/inspection');

		if (!response.ok) {
			error(response.status, { message: '데이터 조회에 실패했습니다.' });
		}

		const result = await response.json();
		const waves = result.data.list.map(i => ({
			waveId: i.wave_id,
			waveNumber: i.wave_number,
			status: i.status,
			completeDt: i.complete_dt,
			inspectionType: i.inspection_type,
			firstStartDt: i.first_start_dt,
			lastEndDt: i.last_end_dt,
			totalSlipNumberCount: i.total_slip_number_count,
			totalProductCount: i.total_product_count,
			totalInspectionInProgressCount: i.total_inspection_in_progress_count,
			totalInspectionCompletedCount: i.total_inspection_completed_count,
			totalInspectionSkippedCount: i.total_inspection_skipped_count,
			totalInspectionCompletedProductCount: i.total_inspection_completed_product_count,
			totalFileCount: i.total_file_count,
		}));

		return {
			waves: waves
		};
	} catch (err) {
		if (isRedirect(err) || isHttpError(err)) {
			throw err;
		}

		error(500, '서버 내부 오류가 발생했습니다.');
	}
};
