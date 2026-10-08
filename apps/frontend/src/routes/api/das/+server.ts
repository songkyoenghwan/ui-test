import type { DasItems } from '@/lib/types/das';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET 요청 처리 (데이터 조회)
export const GET: RequestHandler = async () => {
	const mockData: DasItems[] = [
		{
			id: 'das-1',
			jobNumber: '2026031281000',
			totalOrderCount: 50,
			videoCount: 12,
			videoRecord: true,
			targetQuantity: 100,
			completedQuantity: 45,
			dasStatus: '대기',
			dasVariant: 'wating',
			buttonState: 'details',
			qrImgUrl: 'https://cdn-icons-png.flaticon.com/128/241/241521.png',
			dasWorkStatus: [
				{
					orderNumber: '123dd12',
					boxNumber: '10',
					barcode: '4809642485891',
					productName: '힌스 로 글로우 젤 틴트 R008레어 (24 블루 다이브 에디션)',
					totalProductQuantity: 10,
					quantityInspected: 30,
					state: 'complete',
				},
				{
					orderNumber: '22',
					boxNumber: '10',
					barcode: '8809642485891',
					productName: '힌스 로 글로우 젤 틴트 R008레어 (24 블루 다이브 에디션)',
					totalProductQuantity: 10,
					quantityInspected: 30,
					state: 'incomplete',
				},
			],
		},
		{
			id: 'das-2',
			jobNumber: '2023181000',
			totalOrderCount: 50,
			videoCount: 12,
			videoRecord: false,
			targetQuantity: 100,
			completedQuantity: 45,
			dasStatus: '진행 중',
			dasVariant: 'pending',
			buttonState: 'begins',
			qrImgUrl: 'https://cdn-icons-png.flaticon.com/128/241/241521.png',
			dasWorkStatus: [
				{
					orderNumber: '12312',
					boxNumber: '10',
					barcode: '6809642485891',
					productName: '힌스 로 글로우 젤 틴트 R008레어 (24 블루 다이브 에디션)',
					totalProductQuantity: 10,
					quantityInspected: 30,
					state: 'complete',
				},
			],
		},
		{
			id: 'das-3',
			jobNumber: '2026032181000',
			totalOrderCount: 50,
			videoCount: 12,
			videoRecord: true,
			targetQuantity: 100,
			completedQuantity: 45,
			dasStatus: '분류 완료',
			dasVariant: 'succes',
			buttonState: 're',
			qrImgUrl: 'https://cdn-icons-png.flaticon.com/128/241/241521.png',
			dasWorkStatus: [
				{
					orderNumber: '-',
					boxNumber: '10',
					barcode: '8809642485891',
					productName: '힌스 로 글로우 젤 틴트 R008레어 (24 블루 다이브 에디션)',
					totalProductQuantity: 10,
					quantityInspected: 30,
					state: 'complete',
				},
			],
		},
	];

	// SvelteKit의 json 헬퍼를 사용하여 응답
	return json(mockData);
};

// POST 요청 처리 (데이터 생성)
export const POST: RequestHandler = async ({ request }) => {
	const { name } = await request.json(); // 클라이언트에서 보낸 JSON 파싱

	return json({ success: true, message: '생성 완료' }, { status: 201 });
};
