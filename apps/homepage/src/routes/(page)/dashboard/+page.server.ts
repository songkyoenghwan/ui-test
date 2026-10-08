import { error, isHttpError, isRedirect } from '@sveltejs/kit';
import { fetcher } from '$lib/utils/fetcher';
import type { PageServerLoad } from './$types';

const pct = (current: number, total: number): number => (total > 0 ? Math.round((current / total) * 100) : 0);

const avgPer = (...pers: number[]): number => (pers.length ? Math.round(pers.reduce((a, b) => a + b, 0) / pers.length) : 0);

type WorkerLocation = {
	user_id: string;
	user_name: string;
	supply_bin: string;
};

const fixedWorkerSlots = [
	{ id: 'GLASS-01', userId: 'pantos_01' },
	{ id: 'GLASS-02', userId: 'pantos_02' },
	{ id: 'GLASS-03', userId: 'pantos_03' },
	{ id: 'GLASS-04', userId: 'pantos_04' },
] as const;

const isFixedWorker = (worker: WorkerLocation, slot: (typeof fixedWorkerSlots)[number]): boolean =>
	worker.user_id.trim().toLowerCase() === slot.userId;

const toAreaId = (supplyBin?: string): string => supplyBin?.trim().toUpperCase().split('-').slice(0, 2).join('-') ?? '';

const getWorkerLine = (areaId: string): 'line-a' | 'line-b' | '' => {
	const section = Number(areaId.split('-')[1]);
	if (!Number.isInteger(section)) return '';
	return section % 2 === 0 ? 'line-b' : 'line-a';
};

// export const load: PageServerLoad = async (event) => {
// 	try {
// 		// 지표별 엔드포인트 병렬 호출
// 		const [summaryRes, productivityRes, hourlyRes, delayedRes, backlogRes, workerLocationRes] = await Promise.all([
// 			fetcher.get(event, '/web/dashboard/summary'),
// 			fetcher.get(event, '/web/dashboard/productivity'),
// 			fetcher.get(event, '/web/dashboard/hourly'),
// 			fetcher.get(event, '/web/dashboard/delayed'),
// 			fetcher.get(event, '/web/dashboard/backlog'),
// 			fetcher.get(event, '/task/worker/location'),
// 		]);

// 		for (const res of [summaryRes, productivityRes, hourlyRes, delayedRes, backlogRes, workerLocationRes]) {
// 			if (!res.ok) {
// 				error(res.status, { message: '대시보드 데이터 조회에 실패했습니다.' });
// 			}
// 		}

// 		const summary = (await summaryRes.json()).data; // 1행 객체
// 		const productivity = (await productivityRes.json()).data;
// 		const hourly = (await hourlyRes.json()).data.list; // 6행
// 		const delayed = (await delayedRes.json()).data.list;
// 		const backlog = (await backlogRes.json()).data.list;
// 		const workerLocations = (((await workerLocationRes.json()).data?.list ?? []) as WorkerLocation[]).slice(0, 4);

// 		// ===== 현황: 피킹 =====
// 		const picking = {
// 			tit: '현황',
// 			view: {
// 				order: {
// 					current: summary.pick_completed_order_count,
// 					total: summary.pick_total_order_count,
// 					per: pct(summary.pick_completed_order_count, summary.pick_total_order_count),
// 				},
// 				pcs: {
// 					current: summary.pick_completed_pcs,
// 					total: summary.pick_total_pcs,
// 					per: pct(summary.pick_completed_pcs, summary.pick_total_pcs),
// 				},
// 				inspect: {
// 					current: summary.pick_completed_sku_count,
// 					total: summary.pick_total_sku_count,
// 					per: pct(summary.pick_completed_sku_count, summary.pick_total_sku_count),
// 				},
// 			},
// 			total: avgPer(
// 				pct(summary.pick_completed_order_count, summary.pick_total_order_count),
// 				pct(summary.pick_completed_pcs, summary.pick_total_pcs),
// 				pct(summary.pick_completed_sku_count, summary.pick_total_sku_count),
// 			),
// 		};

// 		// ===== 현황: 검수 =====
// 		const inspection = {
// 			tit: '검수',
// 			view: {
// 				order: {
// 					current: summary.insp_completed_order_count,
// 					total: summary.insp_total_order_count,
// 					per: pct(summary.insp_completed_order_count, summary.insp_total_order_count),
// 				},
// 				pcs: {
// 					current: summary.insp_completed_pcs,
// 					total: summary.insp_total_pcs,
// 					per: pct(summary.insp_completed_pcs, summary.insp_total_pcs),
// 				},
// 				inspect: {
// 					current: summary.insp_completed_sku_count,
// 					total: summary.insp_total_sku_count,
// 					per: pct(summary.insp_completed_sku_count, summary.insp_total_sku_count),
// 				},
// 			},
// 			total: avgPer(
// 				pct(summary.insp_completed_order_count, summary.insp_total_order_count),
// 				pct(summary.insp_completed_pcs, summary.insp_total_pcs),
// 				pct(summary.insp_completed_sku_count, summary.insp_total_sku_count),
// 			),
// 			waiting: summary.insp_waiting_order_count ?? 0,
// 		};

// 		// ===== 생산성 =====
// 		const productivityView = {
// 			list: [
// 				{ color: 'before:bg-primary', txt: '피킹 UPH', total: productivity.pick_uph },
// 				{ color: 'before:bg-primary', txt: '라인당 피킹', second: Math.round(Number(productivity.pick_sec_per_line) || 0) },
// 				{ color: 'before:bg-pending-frg', txt: '검수 UPH', total: productivity.insp_uph },
// 				{ color: 'before:bg-pending-frg', txt: '검수시간/PCS', second: Math.round(Number(productivity.insp_sec_per_pcs) || 0) },
// 			],
// 			tbl: [
// 				{ account: 'picker_01', current: 'picking', uph: 120 },
// 				{ account: 'picker_02', current: 'inspection', uph: 10 },
// 				{ account: 'picker_03', current: 'offline', uph: 3 },
// 			],
// 		};

// 		// ===== 시간대별 차트 =====
// 		const chartBar = hourly.map((h) => ({
// 			time: String(h.hour).padStart(2, '0'),
// 			picking: Number(h.pick_uph) || 0,
// 			inspection: Number(h.insp_uph) || 0,
// 		}));
// 		const chartLine = hourly.map((h) => ({
// 			date: String(h.hour).padStart(2, '0'),
// 			picking: Number(h.pick_uph) || 0,
// 			inspection: Number(h.insp_uph) || 0,
// 		}));

// 		// ===== 예외관리 =====
// 		const exception = {
// 			list: [
// 				{ color: 'before:bg-primary', txt: '피킹 지연 상품', sku: delayed.length },
// 				{ color: 'before:bg-pending-frg text-pending-frg', txt: '검수 적체 30분+', case: backlog.length },
// 			],
// 			delay: delayed.map((d) => ({
// 				sku: `${d.product_code}(${d.product_name})`,
// 				location: d.supply_bin ?? '-',
// 				second: Math.round(d.avg_sec),
// 			})),
// 			waiting: backlog.map((b) => ({
// 				wave: b.slip_number ?? b.wave_number,
// 				second: b.waiting_minutes * 60,
// 			})),
// 		};

// 		const simulation = fixedWorkerSlots.map((fixedSlot) => {
// 			const workerLocation = workerLocations.find((worker) => isFixedWorker(worker, fixedSlot));
// 			const currentAreaId = toAreaId(workerLocation?.supply_bin);

// 			return {
// 				id: fixedSlot.id,
// 				name: workerLocation?.user_name,
// 				line: getWorkerLine(currentAreaId),
// 				current_state: currentAreaId,
// 				supply_bin: workerLocation?.supply_bin ?? '',
// 				route: [],
// 			};
// 		});

// 		return {
// 			picking,
// 			inspection,
// 			productivity: productivityView,
// 			chartBar,
// 			chartLine,
// 			exception,
// 			simulation,
// 		};
// 	} catch (err) {
// 		if (isRedirect(err) || isHttpError(err)) {
// 			throw err;
// 		}
// 		error(500, '서버 내부 오류가 발생했습니다.');
// 	}
// };
