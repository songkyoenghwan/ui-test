import type { PageServerLoad } from './$types';
import { error, isHttpError, isRedirect } from '@sveltejs/kit';
import { fetcher } from '$lib/utils/fetcher';

export const load: PageServerLoad = async (event) => {
	try {
		const response = await fetcher.get(event, '/das');

		if (!response.ok) {
			error(response.status, { message: '데이터 조회에 실패했습니다.' });
		}

		const result = await response.json();
		const dasItems = result.data.list.map(i => ({
			id: i.id,
			taskNumber: i.task_number,
			status: i.status,
			totalSlipNumberCount: i.total_slip_number_count,
			targetProductCount: i.target_product_count,
			targetSkuCount: i.target_sku_count,
			currentProductCount: i.current_product_count,
			currentSkuCount: i.current_sku_count,
		}));

		return {
			dasItems: dasItems
		};
	} catch (err) {
		if (isRedirect(err) || isHttpError(err)) {
			throw err;
		}

		error(500, '서버 내부 오류가 발생했습니다.');
	}
};
