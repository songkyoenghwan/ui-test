import { formatDate, isValidDate } from '$lib/utils/date';
import { fetcher } from '$lib/utils/fetcher';
import type { Actions } from './(page)/$types';
import { fail, type RequestEvent } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		const formData = await event.request.formData();
		const workType = formData.get('workType') as string;
		const inspectionType = formData.get('inspectionType') as string;
		const waveNumber = formData.get('waveNumber') as string;
		const waveDate = formData.get('waveDate') as string;
		const file = formData.get('file') as File;

		// 1. 작업 종류
		if (!workType) {
			return fail(400, { message: '⚠️ 작업 종류를 입력해주세요.' });
		}

		if (workType === '피킹') {
			if (!inspectionType) {
				return fail(400, { message: '⚠️ 검수 유형을 입력해주세요.' });
			}
			if (!waveNumber) {
				return fail(400, { message: '⚠️ 작업 번호를 입력해주세요.' });
			}
			if (!waveDate) {
				return fail(400, { message: '⚠️ 날짜를 선택해주세요.' });
			}
			if (!isValidDate(waveDate)) {
				return fail(400, { message: '❌ 올바른 날짜를 입력해주세요.' });
			}
			if (!file || file.size === 0) {
				return fail(400, { message: '⚠️ 파일을 업로드 해주세요.' });
			}

			try {
				formData.set('waveDate', formatDate(waveDate));
				const response = await fetcher.post(event, '/web/waveExcelDataUpload', formData);
				const data = await response.json();

				if (!response.ok) {
					const message = data.error_msg || '작업지시서 업로드에 실패했습니다.';
					return fail(400, { message });
				}

				const rows = data.data?.rows?.length || 0;

				return { message: '✅ Upload successful! Rows: {rows}'.replace('{rows}', rows) };
			} catch (error) {
				return fail(500, { message: '데이터 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' });
			}
		} else if (workType === 'DAS') {
			if (!waveNumber) {
				return fail(400, { message: '⚠️ 작업 번호를 입력해주세요.' });
			}
			if (!waveDate) {
				return fail(400, { message: '⚠️ 날짜를 선택해주세요.' });
			}
			if (!isValidDate(waveDate)) {
				return fail(400, { message: '❌ 올바른 날짜를 입력해주세요.' });
			}
			if (!file || file.size === 0) {
				return fail(400, { message: '⚠️ 파일을 업로드 해주세요.' });
			}

			try {
				formData.set('waveDate', formatDate(waveDate));
				const response = await fetcher.post(event, '/das', formData);
				const data = await response.json();

				if (!response.ok) {
					const message = data.error_msg || '작업지시서 업로드에 실패했습니다.';
					return fail(400, { message });
				}

				const rows = data.data?.rows?.length || 0;

				return { message: '✅ Upload successful! Rows: {rows}'.replace('{rows}', rows) };
			} catch (error) {
				return fail(500, { message: '데이터 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' });
			}
		}
	},
};
