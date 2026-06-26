import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = false;

export const load = (async ({ params, url, fetch }) => {
	const view = params.view;
	const allowedViews = ['reg', 'detail', 'edit'];

	// 1. 뷰 모드 검증
	if (!allowedViews.includes(view)) {
		throw error(404, '잘못된 뷰 모드입니다.');
	}

	// 2. item 변수를 미리 선언 (undefined로 초기화)
	let item = null;
	let pageId = '';

	if (view === 'detail' || view === 'edit') {
		const res = await fetch('/api/cms-loc-001');
		const db = await res.json();
		const pathKey = String(url.pathname.split('/')[1]).toUpperCase();

		const list = db[pathKey] ?? [];

		item = list.find((v) => v.id === String(params.id)) || null;
		pageId = item.id;

		// 3. 만약 아이템을 못 찾았다면 404 처리
		if (!item) {
			throw error(404, '데이터를 찾을 수 없습니다.');
		}
	} else {
		pageId = '';
	}

	return {
		view,
		id: pageId,
		item,
		myTabs: ['1. 대상지 정보', '2. 커스텀 항목'],
	};
}) satisfies PageLoad;
