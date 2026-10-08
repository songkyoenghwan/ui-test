import type { PageServerLoad, Actions } from './$types';
import { fetcher } from '$lib/utils/fetcher';
import { error, fail, isHttpError, isRedirect } from '@sveltejs/kit';
import { defaultFormatDate } from '$lib/utils/domUtils'
import { JOB_STATUS } from '$lib/constants/options'

/**
 * 작업 상태 → 한글명
 */
function stateToName(jobStatus) {
	switch (jobStatus) {
		case "B": return "작업진행전";
		case "P": return "작업진행중";
		case "C": return "작업완료";
		default:  return "-";
	}
}

export const load: PageServerLoad = async (event) => {
	try {
		const searchText = event.url.searchParams.get('search_txt') ?? '';
		const response = await fetcher.get(event, `/web/selectWebSiteWaveList?search_txt=${searchText}`);

		if (!response.ok) {
			error(response.status, { message: '데이터 조회에 실패했습니다.' });
		}

		const result = await response.json();
		const pickings = result.data.list.map(i => ({
			waveId: i.wave_id,
			waveNumber: i.wave_number,
			progressRate: i.progress_rate,
			taskStatus: i.task_status,
			uploadFileId: i.upload_file_id,
			completeFileId: i.complete_file_id,
			jobStatus: JOB_STATUS.find(o => o.value === i.task_status)?.label ?? '-',
			colorClass: i.task_status === "C" ? "status-complete" : "status-before",
			jobUserName: i.task_status === "C"
				? i.complete_user_name
				: i.task_status === "P"
					? i.start_user_name
					: "-",
			startDt: i.task_status === "B" ? "-" : defaultFormatDate(i.start_dt),
			taskBoxMatchingDt: defaultFormatDate(i.task_box_matching_dt),
			endDt: i.task_status === "C" ? defaultFormatDate(i.complete_dt) : "-",
			completeFileSize: i.complete_file_size,
		}));

		return { pickings };
	} catch (err) {
		if (isRedirect(err) || isHttpError(err)) {
			throw err;
		}

		error(500, '서버 내부 오류가 발생했습니다.');
	}
};


export const actions: Actions = {
	deleteWave: async (event) => {
		const formData = await event.request.formData();
		const waveId = formData.get('waveId');
		const waveNumber = formData.get('waveNumber');

		const response = await fetcher.post(event, '/web/delete', {
			wave_id: waveId,
			wave_number: waveNumber
		});

		if (!response.ok) {
			if (response.status === 404) {
				return fail(400, { message: '웨이브 정보가 존재하지 않습니다.' });
			}
			return fail(500, { message: '데이터 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' });
		}
	},
};
