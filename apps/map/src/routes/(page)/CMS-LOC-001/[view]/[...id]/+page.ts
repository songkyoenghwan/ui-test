import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load = (async ({ params, url, fetch }) => {
	const view = params.view;
	const allowedViews = ['reg', 'detail', 'edit'];

	// 1. 뷰 모드 검증
	if (!allowedViews.includes(view)) {
		throw error(404, '잘못된 뷰 모드입니다.');
	}

	// 2. item 변수를 미리 선언 (undefined로 초기화)
	let item = null;

	if (view === 'detail' || view === 'edit') {
		const res = await fetch('/api/cms-loc-001');
		const db = await res.json();
		const pathKey = String(url.pathname.split('/')[1]).toUpperCase();

		const list = db[pathKey] ?? [];

		item = list.find((v) => v.id === String(params.id)) || null;

		// 3. 만약 아이템을 못 찾았다면 404 처리
		if (!item) {
			throw error(404, '데이터를 찾을 수 없습니다.');
		}
	}

	return {
		view,
		id: params.id,
		item,
	};
}) satisfies PageLoad;
