import type { PageServerLoad } from './$types';
import { error, isHttpError, isRedirect } from '@sveltejs/kit';
import { fetcher } from '$lib/utils/fetcher';

export const load: PageServerLoad = async (event) => {
	try {
		const response = await fetcher.get(event, `/das/${event.params.dasId}`);

		if (!response.ok) {
			error(response.status, { message: '데이터 조회에 실패했습니다.' });
		}

		const result = await response.json();
		const {
			das_id,
			task_number,
			status,
		} = result.data;
		const tasks = result.data.list.map((i) => ({
			dasTaskId: i.das_task_id,
			slipNumber: i.slip_number,
			boxNumber: i.box_number,
			productCode: i.product_code,
			productName: i.product_name,
			targetCount: i.target_count,
			currentCount: i.current_count,
		}));

		tasks.sort((a, b) => (a.currentCount === a.targetCount) - (b.currentCount === b.targetCount))

		event.depends('refresh:das');

		return {
			dasDetail: {
				dasId: das_id,
				taskNumber: task_number,
				status: status,
				tasks: tasks,
			},
		};
	} catch (err) {
		if (isRedirect(err) || isHttpError(err)) {
			throw err;
		}

		return error(500, '서버 내부 오류가 발생했습니다.');
	}
};
