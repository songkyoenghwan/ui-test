import type { PageServerLoad } from './$types';
import { error, isHttpError, isRedirect } from '@sveltejs/kit';
import { fetcher } from '$lib/utils/fetcher';

export const load: PageServerLoad = async (event) => {
	try {
		const response = await fetcher.get(event, `/wave/${event.params.waveId}/inspection`);

		if (!response.ok) {
			error(response.status, { message: '데이터 조회에 실패했습니다.' });
		}

		const result = await response.json();
		const {
			wave_id,
			wave_number,
			status,
			inspection_type,
			product_codes,
			product_names,
			total_product_count,
			first_file_id,
			products,
		} = result.data;
		const tasks = result.data.list.map((i) => ({
			slipNumber: i.slip_number,
			startDt: i.start_dt,
			endDt: i.end_dt,
			fileId: i.file_id,
			currentSkuCount: i.current_sku_count,
			targetSkuCount: i.target_sku_count,
			totalProductCount: i.total_product_count,
			totalInspectionCompletedProductCount: i.total_inspection_completed_product_count,
		}));

		event.depends('refresh:inspection');

		return {
			waveDetail: {
				waveId: wave_id,
				waveNumber: wave_number,
				status: status,
				inspectionType: inspection_type,
				tasks: tasks,
				productCodes: product_codes,
				productNames: product_names,
				totalProductCount: total_product_count,
				firstFileId: first_file_id,
				products: products,
			},
		};
	} catch (err) {
		if (isRedirect(err) || isHttpError(err)) {
			throw err;
		}

		return error(500, '서버 내부 오류가 발생했습니다.');
	}
};
