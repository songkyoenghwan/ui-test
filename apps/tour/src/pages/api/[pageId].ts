import type { APIRoute } from 'astro';

import { cmsPageData } from '@/data/cmsData';

export const GET: APIRoute = async ({ params }) => {
	const { pageId } = params ?? {};
	const pageConfig = cmsPageData[pageId as string];

	if (!pageConfig) {
		return new Response(
			JSON.stringify({
				error: 'CMS Not Found',
				requested: pageId,
				available: Object.keys(cmsPageData),
			}),
			{ status: 404, headers: { 'Content-Type': 'application/json' } },
		);
	}

	const lists = typeof pageConfig.getList === 'function' ? pageConfig.getList() : pageConfig.getList;

	return new Response(
		JSON.stringify({
			...pageConfig,
			getList: lists,
		}),
		{ status: 200, headers: { 'Content-Type': 'application/json' } },
	);
};

// PATCH: 데이터 일부 수정 (예: 비고 수정, 보관방법 변경)
export const PATCH: APIRoute = async ({ params, request }) => {
	const routeId = params.id; // URL의 [id] 부분 (예: CMS_04_3)
	const body = await request.json();
	const { id, updateData } = body;

	// 더미 응답 생성
	return new Response(
		JSON.stringify({
			success: true,
			message: `[${routeId}]의 ${id} 항목 정보가 수정되었습니다.`,
			updatedItem: { id, ...updateData },
		}),
		{
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		},
	);
};

// POST: 신규 데이터 생성
export const POST: APIRoute = async ({ request, params }) => {
	const { pageId } = params;
	const body = await request.json();
	const page = cmsPageData[pageId as string];

	if (!page || !page.addData) return new Response(null, { status: 404 });

	const newItem = {
		...body,
		id: `LOC_${Math.floor(Math.random() * 10000)}`,
		chk: false,
	};
	page.addData(newItem);

	return new Response(
		JSON.stringify({
			success: true,
			message: '새로운 로케이션이 등록되었습니다.',
			newData: newItem,
		}),
		{ status: 201 },
	);
};

// DELETE: 데이터 삭제
export const DELETE: APIRoute = async ({ request }) => {
	const url = new URL(request.url);
	const id = url.searchParams.get('id');

	return new Response(
		JSON.stringify({
			success: true,
			message: `${id} 항목이 삭제되었습니다.`,
		}),
		{ status: 200 },
	);
};
