import type { InspectionItems } from '@/lib/types/inspection';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET 요청 처리 (데이터 조회)
export const GET: RequestHandler = async () => {
	const mockData: InspectionItems[] = [
		{
			id: 'inspection-1',
			inspectionType: 'N',
			jobNumber: '2026031281000',
			totalOrderCount: 50,
			videoCount: 12,
			videoRecord: false,
			targetQuantity: 100,
			completedQuantity: 45,
			inspectionStatus: '검수 전',
			inspectionVariant: 'wating',
			buttonState: 'details',
			qrImgUrl: 'https://cdn-icons-png.flaticon.com/128/241/241521.png',
			inspected: [
				{
					orderNumber: '202603181000',
					totalProductQuantity: 10,
					quantityInspected: 110,
					state: 'incomplete',
					downloadUrl: '',
					products: [
						{
							location: 'VA01-06-25',
							barcode: '202603181000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 10,
							target: 10,
						},
						{
							location: 'VA01-06-25',
							barcode: '202603181000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 1,
							target: 10,
						},
						{
							location: 'VA01-06-25',
							barcode: '202603181000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 0,
							target: 10,
						},
					],
				},
				{
					orderNumber: '202603181001',
					totalProductQuantity: 10,
					quantityInspected: 110,
					state: 'complete',
					downloadUrl: 'https://www.pexels.com/ko-kr/download/video/4553292/',
					products: [
						{
							location: 'VA01-06-25',
							barcode: '2026031810002',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 10,
							target: 10,
						},
						{
							location: 'VA01-06-25',
							barcode: '2026031812000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 1,
							target: 10,
						},
						{
							location: 'VA01-06-215',
							barcode: '202603181000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 0,
							target: 10,
						},
						{
							location: 'VA01-06-25',
							barcode: '202603181000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 0,
							target: 10,
						},
						{
							location: 'VA01-06-25',
							barcode: '202603181000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 10,
							target: 10,
						},
						{
							location: 'VA01-06-25',
							barcode: '202603181000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 5,
							target: 10,
						},
						{
							location: 'VA01-06-25',
							barcode: '202603181000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 4,
							target: 10,
						},
						{
							location: 'VA01-06-25',
							barcode: '202603181000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 8,
							target: 10,
						},
						{
							location: 'VA01-06-25',
							barcode: '202603181000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 5,
							target: 10,
						},
						{
							location: 'VA01-06-25',
							barcode: '202603181000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 7,
							target: 10,
						},
						{
							location: 'VA01-06-25',
							barcode: '202603181000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 5,
							target: 10,
						},
						{
							location: 'VA01-06-25',
							barcode: '202603181000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 2,
							target: 10,
						},
						{
							location: 'VA01-06-25',
							barcode: '202603181000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 2,
							target: 10,
						},
						{
							location: 'VA01-06-25',
							barcode: '202603181000',
							name: '힌스 무드인핸서 립 글로우LW002 디어 로즈(N)',
							scan: 10,
							target: 10,
						},
					],
				},
			],
		},
		{
			id: 'inspection-2',
			inspectionType: 'SAME',
			jobNumber: '202603181000',
			totalOrderCount: 50,
			videoCount: 12,
			videoRecord: false,
			targetQuantity: 100,
			completedQuantity: 45,
			inspectionStatus: '검수 중',
			inspectionVariant: 'pending',
			buttonState: 'begins',
			qrImgUrl: 'https://cdn-icons-png.flaticon.com/128/241/241521.png',
			inspected: [
				{
					orderNumber: '',
					totalProductQuantity: 20,
					quantityInspected: 30,
					state: 'incomplete',
					downloadUrl: '',
					products: [
						{
							location: '',
							barcode: '',
							name: '',
							scan: 0,
							target: 0,
						},
					],
				},
			],
		},
		{
			id: 'inspection-3',
			inspectionType: 'SAME',
			jobNumber: '202181000',
			totalOrderCount: 50,
			videoCount: 12,
			videoRecord: true,
			targetQuantity: 100,
			completedQuantity: 45,
			inspectionStatus: '검수 완료',
			inspectionVariant: 'succes',
			buttonState: 're',
			qrImgUrl: 'https://cdn-icons-png.flaticon.com/128/241/241521.png',
			inspected: [
				{
					orderNumber: '',
					totalProductQuantity: 10,
					quantityInspected: 10,
					state: 'complete',
					downloadUrl: '',
					products: [
						{
							location: '',
							barcode: '',
							name: '',
							scan: 0,
							target: 0,
						},
					],
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
