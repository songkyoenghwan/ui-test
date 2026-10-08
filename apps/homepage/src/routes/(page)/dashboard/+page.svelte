<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	import Btns from '@/lib/components/button/Btns.svelte';
	import Icons from '@/lib/components/icons/Icons.svelte';
	import TableGridSection from '@/lib/components/table/TableGridSection.svelte';
	import CounterUp from '@/lib/components/text/CounterUp.svelte';
	import { curveCatmullRom } from 'd3-shape';
	import { Tabs, TabItem, Progressbar, Skeleton } from 'flowbite-svelte';
	import { Tooltip } from 'flowbite-svelte';
	import { BarChart, LineChart, defaultChartPadding } from 'layerchart';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { sineOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';

	let { data }: { data: PageData } = $props();

	const baseTabClass = 'min-w-25 rounded-lg p-card text-xl shadow-sm' as const;
	const activeClass = `${baseTabClass} bg-primary text-white` as const;
	const inactiveClass = `${baseTabClass} bg-slate-100 text-slate-500 hover:bg-slate-200` as const;
	const aiTitClass = 'flex min-h-17.5 items-center border-b border-b-white/20 px-5 text-2xl font-bold text-white max-sm:text-xl 2xl:px-8 2xl:text-4xl 2xl:min-h-18';

	type DashboardView = {
		tit: string;
		view: {
			order: { current: number; total: number; per: number };
			pcs: { current: number; total: number; per: number };
			inspect: { current: number; total: number; per: number };
		};
		total: number;
		waiting?: number;
	};
	type DashboardStatusItem = {
		txt: string;
		color?: string;
		total?: number;
		second?: number;
		sku?: number;
		case?: number;
		times?: number;
	};
	type DashboardStatusView = {
		tit?: string;
		list: DashboardStatusItem[];
		tbl?: { account: string; current: 'picking' | 'inspection' | 'offline' | ''; uph: number }[];
		delay?: { sku: string; location: string; second?: number }[];
		waiting?: { wave: string; second?: number }[];
		skip?: { sku: string; location: string; total?: number }[];
	};
	type AlertItem = { txt: string; sub: string };

	// ===== 모드 토글 (초기값 demo) =====
	let mode = $state<'demo' | 'live'>('live');

	// ===== demo 목업 데이터 =====
	const demoData = {
		picking: {
			tit: '현황',
			view: {
				order: { current: 82, total: 100, per: 82 },
				pcs: { current: 3840, total: 5000, per: 77 },
				inspect: { current: 38, total: 45, per: 84 },
			},
			total: 81,
		},
		inspection: {
			tit: '검수',
			view: {
				order: { current: 40, total: 60, per: 67 },
				pcs: { current: 1920, total: 3000, per: 64 },
				inspect: { current: 30, total: 45, per: 67 },
			},
			total: 66,
			waiting: 12,
		},
		productivity: {
			list: [
				{ color: 'before:bg-primary', txt: '피킹 UPH', total: 240 },
				{ color: 'before:bg-primary', txt: '라인당 피킹', second: 15 },
				{ color: 'before:bg-pending-frg', txt: '검수 UPH', total: 180 },
				{ color: 'before:bg-pending-frg', txt: '검수시간/PCS', second: 20 },
			],
			tbl: [
				{ account: 'picker_01', current: 'picking', uph: 250 },
				{ account: 'picker_02', current: 'inspection', uph: 190 },
				{ account: 'picker_03', current: 'offline', uph: 0 },
			],
		},
		exception: {
			list: [
				{ color: 'before:bg-primary', txt: '피킹 지연 상품', sku: 8 },
				{ color: 'before:bg-pending-frg text-pending-frg', txt: '검수 적체 30분+', case: 3 },
			],
			delay: [
				{ sku: '8800331323289(샘플상품A)', location: 'A-12-03', second: 140 },
				{ sku: '8800331323290(샘플상품B)', location: 'B-04-11', second: 95 },
			],
			waiting: [
				{ wave: 'WAVE-20260119-001', second: 2520 },
				{ wave: 'WAVE-20260119-004', second: 1980 },
			],
			skip: [{ sku: '8800331323291(샘플상품C)', location: 'C-08-02', total: 5 }],
		},
		chartBar: [
			{ time: '09', picking: 3840, inspection: 1920 },
			{ time: '10', picking: 4020, inspection: 2100 },
			{ time: '11', picking: 3600, inspection: 1850 },
			{ time: '12', picking: 4200, inspection: 2200 },
			{ time: '13', picking: 3900, inspection: 1990 },
			{ time: '14', picking: 4100, inspection: 2050 },
		],
		chartLine: [
			{ date: '09', picking: 220, inspection: 170 },
			{ date: '10', picking: 240, inspection: 185 },
			{ date: '11', picking: 210, inspection: 160 },
			{ date: '12', picking: 250, inspection: 190 },
			{ date: '13', picking: 235, inspection: 180 },
			{ date: '14', picking: 245, inspection: 188 },
		],
		simulation: [
			{
				id: 'GLASS-01',
				name: '홍길동',
				line: 'line-a',
				current_state: 'TDL01-03',
				supply_bin: 'TDL01-03-01',
				route: ['TDL01-01', 'TDL01-02', 'TDL01-03', 'TDL01-01', 'TDL01-02', 'TDL01-03'],
			},
			{ id: 'GLASS-02', name: '', line: '', current_state: '', supply_bin: '', route: [] },
			{ id: 'GLASS-03', name: '', line: '', current_state: '', supply_bin: '', route: [] },
			{ id: 'GLASS-04', name: '', line: '', current_state: '', supply_bin: '', route: [] },
		],
	};

	const alertSku: AlertItem[] = [
		{ txt: 'SKU-2210 스킵 6회(재고)', sub: '재고 정합성 점검' },
		{ txt: 'SKU-1096 바코드 스킵 5회', sub: '라벨 재인쇄' },
		{ txt: 'SKU-8841 지연 142초', sub: '로케이션 분리' },
	];

	// ===== mode에 따라 소스 선택 =====
	const picking = $derived(mode === 'demo' ? demoData.picking : data.picking);
	const inspection = $derived(mode === 'demo' ? demoData.inspection : data.inspection);
	const productivity = $derived(mode === 'demo' ? demoData.productivity : data.productivity);
	const exception = $derived(mode === 'demo' ? demoData.exception : data.exception);
	const pickingData = $derived(mode === 'demo' ? demoData.chartBar : data.chartBar);
	const uphData = $derived(mode === 'demo' ? demoData.chartLine : data.chartLine);
	const simulation = $derived(mode === 'demo' ? demoData.simulation : data.simulation);

	const progress = new Tween(0, {
		duration: 600,
		easing: sineOut,
	});

	let closingRiskPrediction = $state(82);
	let maxWidth = $state(500);

	$effect(() => {
		progress.target = (maxWidth * closingRiskPrediction) / 100;
	});

	let pathD = $derived(`M0 15H${progress.current}`);

	// ===== 폴링: live일 때만 =====
	onMount(() => {
		let id: ReturnType<typeof setTimeout> | undefined;
		let stopped = false;

		const poll = async () => {
			try {
				if (mode === 'live') await invalidateAll();
			} finally {
				if (!stopped) id = setTimeout(poll, 2_500);
			}
		};

		id = setTimeout(poll, 2_500);

		return () => {
			stopped = true;
			if (id) clearTimeout(id);
		};
	});

	const formatDuration = (totalSeconds?: number): string => {
		const s = Math.max(0, Math.round(Number(totalSeconds) || 0));
		const h = Math.floor(s / 3600);
		const m = Math.floor((s % 3600) / 60);
		const sec = s % 60;

		const parts: string[] = [];
		if (h > 0) parts.push(`${h}시간`);
		if (m > 0) parts.push(`${m}분`);
		if (sec > 0) parts.push(`${sec}초`);

		return parts.length > 0 ? parts.join(' ') : '0초';
	};

	let selectedKey = $state('ai-analysis');
	let inspectionState = $state(34);
	let morningNum = $state(4);
	let morningNextNum = $state(4);
	let inspectionNum = $state(3);
	let inspectionNextNum = $state(3);
	let inspectionTotal = $derived(Math.min(100, Math.max(0, inspectionState - (morningNextNum - morningNum) * 10 - (inspectionNextNum - inspectionNum) * 9)));

	let simulateState = $state(false);

	let padNumber = (i: number): string => {
		return `TDL01-${String(i + 1).padStart(2, '0')}`;
	};
	let lineArea = $state(
		Array.from({ length: 8 }, (_, i) => {
			const num = i;

			return {
				name: padNumber(num),
				id: padNumber(num),
			};
		}),
	);
	function makeRangeByParity(line: 'a' | 'b', end: number) {
		const range = Array.from({ length: end }, (_, i) => i + 1);

		if (line === 'a') {
			return range.filter((n) => n % 2 !== 0);
		}

		return range.filter((n) => n % 2 === 0);
	}
	let firstLineArea = $derived(lineArea.filter((_, index) => index % 2 !== 0));
	let secondLineArea = $derived(lineArea.filter((_, index) => index % 2 === 0));

	function simulateHandler(e: MouseEvent) {
		e.preventDefault();

		const target = e.currentTarget as HTMLElement | null;
		if (!target) return;

		simulateState = !simulateState;
	}

	function getActiveSimulation(areaId: string) {
		return simulation.find((item) => item.supply_bin?.trim().toUpperCase().split('-').slice(0, 2).join('-') === areaId);
	}

	function refreshHandler(e: MouseEvent) {
		e.preventDefault();

		const target = e.currentTarget as HTMLElement | null;
		if (!target) return;

		target.classList.remove('rotate-720', 'duration-600', 'transition-all');
		void target.offsetWidth;
		target.classList.add('rotate-720', 'duration-600', 'transition-all');
	}

	$effect(() => {
		if (selectedKey !== 'ai-analysis') {
			closingRiskPrediction = 0;
		} else {
			closingRiskPrediction = 82;
		}
	});
</script>

{#snippet dashboardSection(tit: DashboardView['tit'], view: DashboardView['view'], total: DashboardView['total'], waiting?: DashboardView['waiting'])}
	<div class="grid gap-4">
		<h4 class="text-2xl font-bold max-sm:text-xl {waiting === undefined ? 'text-primary' : 'text-pending-frg'}">{tit}</h4>

		<ul class="gap-card grid grid-cols-3 text-(--464646) max-sm:grid-cols-1">
			<li class="bg-primary-50 border-detail-outline grid gap-1 rounded-lg border p-4 shadow-sm">
				<p class="text-lg">Order</p>
				<p class="itmes-center flex flex-wrap text-2xl font-bold max-xl:min-h-16 max-sm:text-xl {waiting === undefined ? 'text-primary' : 'text-pending-frg'}">
					<strong>
						<CounterUp txt={view.order.current ?? 0} />
					</strong>
					&#47;
					<CounterUp txt={view.order.total ?? 0} />
				</p>
				<p>
					<CounterUp txt={view.pcs.per ?? 0} />%
				</p>
			</li>

			<li class="bg-primary-50 border-detail-outline grid gap-1 rounded-lg border p-4 shadow-sm">
				<p class="text-lg">PCS</p>
				<p class=" text-2xl font-bold max-xl:min-h-16 max-sm:text-xl {waiting === undefined ? 'text-primary' : 'text-pending-frg'}">
					<strong>
						<CounterUp txt={view.pcs.current ?? 0} />
					</strong>
					&#47;
					<CounterUp txt={view.pcs.total ?? 0} />
				</p>
				<p>
					<CounterUp txt={view.pcs.per ?? 0} />%
				</p>
			</li>

			<li class="bg-primary-50 border-detail-outline grid gap-1 rounded-lg border p-4 shadow-sm">
				<p class="text-lg">SKU</p>
				<p class="text-2xl font-bold max-xl:min-h-16 max-sm:text-xl {waiting === undefined ? 'text-primary' : 'text-pending-frg'}">
					<strong>
						<CounterUp txt={view.inspect.current ?? 0} />
					</strong>
					&#47;
					<CounterUp txt={view.inspect.total ?? 0} />
				</p>
				<p>
					<CounterUp txt={view.inspect.per ?? 0} />%
				</p>
			</li>
		</ul>

		<div class="space-y-2">
			<Progressbar
				progress={total}
				size="h-4"
				classes={{
					label: `${waiting === undefined ? 'bg-[#a72b2a]' : 'bg-[#006ecc]'} font-medium text-center leading-none rounded-full text-white`,
				}}
				class=" overflow-hidden"
				animate
				labelInside
				tweenDuration={1000}
				easing={sineOut}
			/>

			<div class="flex items-center gap-2 has-data-[tag=waiting]:text-orange-600">
				<p>종합 <CounterUp txt={total ?? 0} />%</p>
				{#if waiting !== undefined}
					<p data-tag="waiting">검수 대기 오더 {waiting}건</p>
				{/if}
			</div>
		</div>
	</div>
{/snippet}

{#snippet dashboardStatus(list: DashboardStatusView['list'], tit?: DashboardStatusView['tit'])}
	<div class="grid gap-4">
		{#if tit}
			<h4 class="text-default text-2xl font-bold max-sm:text-xl">{tit}</h4>
		{/if}
		<ul class="gap-card flex items-center text-(--464646) max-sm:grid-cols-1">
			{#each list as item, i (`status-${i}`)}
				<li
					class={[
						'bg-primary-50 border-detail-outline flex h-full flex-1 gap-3 rounded-lg border  p-4 shadow-sm before:flex before:h-full before:w-2 before:rounded-md',
						item.color,
					]}
				>
					<div class="grid gap-1">
						<p class="text-666 text-lg">{item.txt}</p>
						<p class={[' text-2xl font-bold max-sm:text-xl', item.color ? item.color : 'text-primary']}>
							<strong>
								<CounterUp txt={item.total ?? item.second ?? item.sku ?? item.case ?? item.times ?? 0} />
							</strong>

							<strong>
								{#if item.second}
									초
								{:else if item.sku}
									SKU
								{:else if item.case}
									건
								{:else if item.times}
									회
								{/if}
							</strong>
						</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
{/snippet}

{#snippet nameArea(name: string)}
	<p
		class={[
			'flex flex-none items-center gap-1.5 rounded-full bg-white/20 px-2.5 text-base font-bold transition-all xl:gap-1.5 xl:px-5 xl:py-1 xl:text-2xl starting:scale-0 starting:opacity-0',
		]}
	>
		<Icons name="people" cls="fill-white size-5 xl:size-8 flex-none" />
		{name !== '' ? name : '미배정'}
	</p>
{/snippet}

{#snippet areaCol(range: number[], id: string, name: string)}
	{#if range}{/if}

	{@const activeSimulation = getActiveSimulation(id)}
	<li
		class={[
			'relative inline-flex min-h-12.5 items-center justify-between gap-1 rounded-sm border px-3 py-1 opacity-100 transition-colors xl:px-5 starting:opacity-0',
			activeSimulation ? 'border-white bg-linear-90 from-[#240102] to-[#a11f26]' : 'border-white/30',
		]}
	>
		<p class={['flex-none text-xl font-bold xl:text-4xl', activeSimulation ? 'text-white' : 'text-white/50']}>{name}</p>

		{#if activeSimulation}
			<div class={['inline-flex items-center gap-1.5 xl:gap-2.5']}>
				{@render nameArea(activeSimulation?.name)}

				<Btns
					icon="refresh-circle"
					text="새로고침"
					variant="icon-only"
					iconColor="fill-white group-disabled/btn:opacity-30 size-6 xl:size-8"
					cls="disabled:bg-transparent hover:bg-transparent disabled:hover:bg-transparent animate-spin"
					onclick={refreshHandler}
				/>
				<Tooltip placement="top" class="bg-primary border-primary border text-white min-[1440px]:hidden">새로고침</Tooltip>
			</div>
		{/if}
	</li>
{/snippet}

<section
	class="bg-bkg p-section max-sm:p-card relative flex h-full min-h-0 flex-col gap-4 overflow-hidden overflow-x-clip overflow-y-auto rounded-xl shadow-[0_0_10px_0_rbga(0,0,0,0.1)] *:flex-1"
>
	<!-- 모드 토글 -->
	<div class="top-section right-section max-sm:left-card max-sm:top-card absolute z-2 flex justify-end">
		<button
			type="button"
			onclick={() => {
				mode = mode === 'demo' ? 'live' : 'demo';
				if (mode === 'live') invalidateAll(); // live 전환 즉시 갱신
			}}
			class={[
				'flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold shadow-sm transition-colors',
				mode === 'live' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
			]}
		>
			<span class={['h-2 w-2 rounded-full', mode === 'live' ? 'animate-pulse bg-green-400' : 'bg-slate-400']}></span>
			{mode === 'live' ? 'LIVE' : 'DEMO'}
		</button>
	</div>

	<Tabs tabStyle="pill" class="flex-none! **:[[role='tabpanel']]:bg-white!" bind:selected={selectedKey}>
		<TabItem {activeClass} {inactiveClass} key="current-situation" title="current situation">
			{#snippet titleSlot()}
				<span>현황</span>
			{/snippet}

			<div class="relative opacity-100 transition-all transition-discrete duration-300 starting:translate-y-2 starting:opacity-40">
				<div class="gap-section mt-card grid grid-cols-2 items-start max-sm:grid-cols-1">
					{@render dashboardSection(picking.tit, picking.view, picking.total)}
					{@render dashboardSection(inspection.tit, inspection.view, inspection.total, inspection.waiting)}
				</div>

				<div class="mt-5 min-h-97.5 rounded-xl bg-white">
					<h4 class="text-default pb-5 text-2xl font-bold max-sm:text-xl">시간대별 처리량 (PCS)</h4>
					<BarChart
						data={pickingData}
						x="time"
						series={[
							{ key: 'picking', color: 'var(--a72b2a)' },
							{
								key: 'inspection',
								color: 'var(--006ecc)',
							},
						]}
						seriesLayout="group"
						bandPadding={0.3}
						labels={{ offset: 10, class: 'fill-surface-300', motion: { type: 'tween', duration: 300 } }}
						props={{
							xAxis: { format: 'none' },
							yAxis: { format: 'metric' },
							spline: { curve: curveCatmullRom },
							tooltip: {
								header: { format: 'none' },
							},
							bars: {
								strokeWidth: 0,
								motion: { type: 'tween', duration: 300 },
							},
						}}
						padding={defaultChartPadding({ left: 24 })}
						height={250}
					/>
				</div>
			</div>
		</TabItem>
		<TabItem {activeClass} {inactiveClass} key="productivity" title="productivity">
			{#snippet titleSlot()}
				<span>생산성</span>
			{/snippet}

			<div class="relative opacity-100 transition-all transition-discrete duration-300 starting:translate-y-2 starting:opacity-40">
				<div class="gap-section mt-card grid grid-cols-1 items-start max-sm:grid-cols-1">
					{@render dashboardStatus(productivity.list)}
				</div>
				<div class="gap-card mt-5 flex flex-col">
					<h4 class="text-default text-2xl font-bold max-sm:text-xl">계정별 UPH</h4>
					<TableGridSection wrapClass="grid-rows-[40px_minmax(0,1fr)]!" cls="grid-cols-3 gap-1 leading-1.2 tracking-tighter">
						{#snippet thead()}
							<li class="grid place-content-center px-1 text-center font-bold tracking-tighter">계정</li>
							<li class="grid place-content-center px-1 text-center font-bold tracking-tighter">현 공정</li>
							<li class="grid place-content-center px-1 text-center font-bold tracking-tighter">UPH</li>
						{/snippet}

						{#snippet tbody()}
							{#each productivity.tbl as item, i}
								<li class="hover:bg-primary/5 min-h-12 place-content-center leading-snug tracking-tighter">
									<ul class="grid h-full grid-cols-3 gap-1">
										<li class="grid place-content-center px-1">{item.account}</li>
										<li
											class={[
												'grid place-content-center px-1',
												item.current === 'picking'
													? 'text-pending-frg'
													: item.current === 'inspection'
														? 'text-primary'
														: item.current === 'offline'
															? 'text-warning-frg'
															: '',
											]}
										>
											{item.current === 'picking' ? '피킹' : item.current === 'inspection' ? '검수' : item.current === 'offline' ? '오프라인' : ''}
										</li>
										<li class="text-primary grid place-content-center px-1 font-bold">
											<CounterUp txt={item.uph ?? 0} />
										</li>
									</ul>
								</li>
							{/each}

							{#if productivity?.tbl?.length === 0}
								<li class="text-999 p-20 text-center">데이터가 없습니다.</li>
							{/if}
						{/snippet}
					</TableGridSection>
				</div>

				<div class="mt-5 rounded-xl bg-white">
					<h4 class="text-default pb-5 text-2xl font-bold max-sm:text-xl">UPH 추이</h4>
					<LineChart
						data={uphData}
						x="date"
						series={[
							{ key: 'picking', color: 'var(--a72b2a)' },
							{ key: 'inspection', color: 'var(--006ecc)' },
						]}
						points={{ r: 5, motion: { type: 'tween', duration: 300 } }}
						props={{
							spline: {
								strokeWidth: 4,
								curve: curveCatmullRom,
								motion: { type: 'tween', duration: 300 },
							},
						}}
						padding={defaultChartPadding({ right: 10 })}
						height={200}
						labels={{ offset: 10, class: 'fill-surface-300', motion: { type: 'tween', duration: 300 } }}
					/>
				</div>
			</div>
		</TabItem>
		<TabItem {activeClass} {inactiveClass} key="exception-management" title="Exception management">
			{#snippet titleSlot()}
				<span>예외관리</span>
			{/snippet}

			<div class="relative opacity-100 transition-all transition-discrete duration-300 starting:translate-y-2 starting:opacity-40">
				<div class="gap-section mt-card grid grid-cols-1 items-start max-sm:grid-cols-1">
					{@render dashboardStatus(exception.list)}
				</div>

				<div class="mt-5 grid gap-5 lg:grid-cols-5">
					<TableGridSection cls="grid-cols-3 gap-1 leading-1.2 tracking-tighter" wrapClass="lg:col-span-3 overflow-hidden!">
						{#snippet thead()}
							<li class="col-span-3 flex flex-col justify-center px-5 leading-tight font-bold tracking-tighter">
								<strong class="text-lg leading-tight">피킹 지연 내역 (평균 30초)</strong>
								<p class="divide-warning-frg flex items-center gap-3 divide-x text-sm">
									<span class="text-warning-frg pr-3 leading-tight">SKU(상품명)</span>
									<span class="text-warning-frg pr-3 leading-tight">로케이션</span>
									<span class="text-warning-frg pr-3 leading-tight">피킹 시간</span>
								</p>
							</li>
						{/snippet}

						{#snippet tbody()}
							{#each exception.delay as item (`${item.sku}-${item.location}`)}
								<li
									class="hover:bg-primary/5 relative min-h-15 translate-y-0 place-content-center py-1 leading-snug tracking-tighter opacity-100 transition-all transition-discrete starting:translate-y-3 starting:opacity-0"
								>
									<ul class="grid h-full grid-cols-[1fr_8rem] gap-1">
										<li class="flex flex-col justify-center pr-1 pl-5">
											<p class="leading-tight font-bold">{item.sku}</p>
											<p class="text-warning-frg pr-3 leading-tight">{item.location}</p>
										</li>
										<li class={['text-destructive-frg grid items-center pr-5 pl-1 text-right']}>
											{formatDuration(item.second)}
										</li>
									</ul>
								</li>
							{/each}

							{#if exception?.delay?.length === 0}
								<li class="text-999 p-20 text-center">데이터가 없습니다.</li>
							{/if}
						{/snippet}
					</TableGridSection>
					<TableGridSection cls="grid-cols-3 gap-1 leading-1.2 tracking-tighter" wrapClass="lg:col-span-2 overflow-hidden!">
						{#snippet thead()}
							<li class="col-span-3 flex flex-col justify-center px-5 leading-tight font-bold tracking-tighter">
								<strong class="text-lg leading-tight">검수 적체 내역 (30분 이상)</strong>
								<p class="divide-warning-frg flex items-center gap-3 divide-x text-sm">
									<span class="text-warning-frg pr-3 leading-tight">웨이브 번호</span>
									<span class="text-warning-frg pr-3 leading-tight">전체 시간</span>
								</p>
							</li>
						{/snippet}

						{#snippet tbody()}
							{#each exception.waiting as item, y (`${item.wave}-${y}`)}
								<li
									class="hover:bg-primary/5 relative min-h-15 translate-y-0 place-content-center py-1 leading-snug tracking-tighter opacity-100 transition-all transition-discrete starting:translate-y-3 starting:opacity-0"
								>
									<ul class="grid h-full grid-cols-2 gap-1">
										<li class="flex flex-col justify-center pr-1 pl-5">
											<p>{item.wave}</p>
										</li>
										<li class={['text-destructive-frg grid items-center pr-5 pl-1 text-right']}>
											{formatDuration(item.second)}
										</li>
									</ul>
								</li>
							{/each}

							{#if exception?.delay?.length === 0}
								<li class="text-999 p-20 text-center">데이터가 없습니다.</li>
							{/if}
						{/snippet}
					</TableGridSection>
				</div>
			</div>
		</TabItem>
		<TabItem {activeClass} {inactiveClass} key="ai-analysis" title="AI analysis">
			{#snippet titleSlot()}
				<span>AI 분석</span>
			{/snippet}

			<div
				class="gap-section mt-card relative grid h-full grid-cols-1 items-start text-white opacity-100 transition-all transition-discrete duration-300 starting:translate-y-2 starting:opacity-40"
			>
				<ul class="gap-card grid h-full grid-cols-2 grid-rows-2 items-center text-(--464646) max-sm:grid-cols-1">
					<li
						class="relative flex h-full min-h-30 flex-1 translate-y-0 flex-col rounded-lg bg-linear-90 from-[#031428] to-[#a21f26] shadow-sm transition-all transition-discrete delay-50 duration-200 starting:translate-y-2"
					>
						<h4 class={aiTitClass}>위험 SKU</h4>
						<ul class="relative z-3 my-auto flex flex-col justify-center gap-3 p-5 px-5 text-base text-white xl:gap-6 2xl:flex-1">
							{#each alertSku as item (item.txt)}
								<li animate:flip={{ delay: 300 }} class="relative flex flex-[0_1_25%] flex-col opacity-100 starting:opacity-0">
									{@render alertText(item.txt, item.sub)}
								</li>
							{/each}
						</ul>

						{@render aiIcon('icon-dashboard-1.png')}
					</li>
					<li
						class="relative flex h-full min-h-30 flex-1 flex-col rounded-lg bg-linear-90 from-[#031428] to-[#07752d] shadow-sm transition-all transition-discrete delay-100 starting:translate-y-2"
					>
						<h4 class={aiTitClass}>인력 배치 시뮬레이션</h4>
						<div class="relative z-3 inline-flex flex-1 p-5">
							<div class="flex min-w-19/20 flex-col justify-center rounded-md bg-linear-90 from-white/15 to-transparent p-2.5 px-3 text-white 2xl:p-5">
								<div class="itmes-center inline-flex gap-2">
									<p class="text-base font-bold 2xl:text-4xl">내일 예상 1,470건</p>
									<div class="itmes-center inline-flex gap-1">
										<p
											class="place-content-center rounded-full bg-linear-90 from-white/15 to-transparent px-2.5 py-1 text-base text-[.8125rem] font-bold 2xl:text-3xl"
										>
											+18%
										</p>
										<p
											class="place-content-center rounded-full bg-linear-90 from-white/15 to-transparent px-2.5 py-1 text-base text-[.8125rem] font-bold 2xl:text-3xl"
										>
											±6%
										</p>
									</div>
								</div>
								<div class="mt-5 flex flex-wrap items-center gap-3 2xl:gap-6">
									<div
										class="grid max-h-8/10 min-h-26 min-w-37.5 flex-1 items-center space-y-1 rounded-md bg-white/20 px-1.5 py-3 text-center *:w-full 2xl:min-h-45 2xl:p-3"
									>
										<p class="text-center text-[.8125rem] font-bold 2xl:text-[30px]">피킹 오전</p>
										<div class="flex items-center justify-center gap-2">
											<p class="text-xl font-bold text-white 2xl:text-[30px]">{morningNum}명</p>
											<Icons name="arrow-stroke-right" cls="stroke-white size-6 flex-none" />
											<p class="text-xl font-bold text-[#44ff00] 2xl:text-[30px]">{morningNextNum ?? 0}명</p>
										</div>

										<div
											class="flex h-11 items-center justify-between overflow-clip rounded-full bg-linear-90 from-white/40 to-white/30 text-base font-bold 2xl:h-13 2xl:px-5"
										>
											<Btns
												onclick={() => (morningNextNum -= 1)}
												icon="minus-circle"
												text="빼기"
												variant="icon-only"
												iconColor="fill-white group-disabled/btn:opacity-30"
												iconSize="2xl:size-8"
												cls="disabled:bg-transparent  hover:bg-transparent disabled:hover:bg-transparent"
												disabled={morningNextNum === 0}
											/>
											<div class="flex justify-between 2xl:text-3xl">
												{#if morningNum < morningNextNum}
													+
												{/if}
												{morningNextNum - morningNum}
											</div>
											<Btns
												onclick={() => (morningNextNum += 1)}
												icon="add-circle"
												text="더하기"
												variant="icon-only"
												iconColor="fill-white"
												iconSize="2xl:size-8"
											/>
										</div>
									</div>
									<div
										class="grid max-h-8/10 min-h-26 min-w-37.5 flex-1 items-center space-y-2.5 rounded-md bg-white/20 px-1.5 py-3 text-center *:w-full 2xl:min-h-45 2xl:p-3"
									>
										<p class="text-center text-[.8125rem] font-bold text-nowrap 2xl:text-[30px]">검수 13~16시</p>
										<div class="flex items-center justify-center gap-2">
											<p class="text-xl font-bold text-white 2xl:text-[30px]">{inspectionNum}명</p>
											<Icons name="arrow-stroke-right" cls="stroke-white size-6 flex-none" />
											<p class="text-xl font-bold text-[#44ff00] 2xl:text-[30px]">{inspectionNextNum ?? 0}명</p>
										</div>

										<div
											class="flex h-11 items-center justify-between overflow-clip rounded-full bg-linear-90 from-white/40 to-white/30 text-base font-bold 2xl:h-13 2xl:px-5"
										>
											<Btns
												onclick={() => (inspectionNextNum -= 1)}
												icon="minus-circle"
												text="빼기"
												variant="icon-only"
												iconColor="fill-white group-disabled/btn:opacity-30"
												iconSize="2xl:size-8"
												cls="disabled:bg-transparent  hover:bg-transparent disabled:hover:bg-transparent"
												disabled={inspectionNextNum === 0}
											/>

											<div class="flex justify-between 2xl:text-3xl">
												{#if inspectionNum < inspectionNextNum}
													+
												{/if}
												{inspectionNextNum - inspectionNum}
											</div>
											<Btns
												onclick={() => (inspectionNextNum += 1)}
												icon="add-circle"
												text="더하기"
												variant="icon-only"
												iconColor="fill-white"
												iconSize="2xl:size-8"
											/>
										</div>
									</div>
									<Icons name="arrow-circle-right" cls="fill-white/50 size-6 2xl:size-8 flex-none" />
									<div class="flex min-h-26 min-w-37.5 flex-1 flex-col justify-between space-y-2.5 rounded-md bg-white p-3 text-black 2xl:min-h-45 2xl:p-6">
										<p class="text-left text-[.8125rem] font-bold 2xl:text-[30px]">마감 리스크</p>
										<div class="flex h-11 items-end justify-end gap-1 bg-white text-base font-bold">
											<strong class="text-3xl font-bold text-black 2xl:text-5xl">
												<CounterUp txt={inspectionTotal ?? 0} />
											</strong>
											%
										</div>
									</div>
								</div>
							</div>
						</div>

						{@render aiIcon('icon-dashboard-2.png')}
					</li>
					<li
						class="relative flex h-full min-h-30 flex-1 flex-col rounded-lg bg-linear-90 from-[#031428] to-[#1f39a2] shadow-sm transition-all transition-discrete delay-150 starting:translate-y-2"
					>
						<h4 class={aiTitClass}>마감 리스크 예측</h4>
						<div class="relative z-3 inline-flex flex-1">
							<div class="flex h-full min-w-5/6 flex-col justify-center space-y-10 p-5 text-white 2xl:space-y-15">
								<div class="">
									<p class="flex items-center gap-2.5 text-xl font-bold 2xl:text-4xl">
										<span class="text-[.8125rem] font-normal 2xl:text-4xl">완료 확률</span>
										<strong><CounterUp txt={closingRiskPrediction ?? 0} />%</strong>
									</p>
									<div class="flex">
										<svg class="h-7.5 w-125 2xl:h-20 2xl:w-9/10" viewBox="0 0 500 30" fill="none">
											<line opacity="0.1" y1="15" x2="500" y2="15" stroke="white" stroke-width="30" stroke-dasharray="2 2" />
											<path opacity="0.5" d="M0 15H472" stroke="white" stroke-width="30" stroke-dasharray="2 2" />
											<path
												d={pathD}
												stroke="url(#paint0_linear_1_53)"
												stroke-width="30"
												stroke-dasharray="2 2"
												class="relative transition-all duration-600"
											/>

											<defs>
												<linearGradient id="paint0_linear_1_53" x1="0" y1="15.5" x2="400" y2="15.5" gradientUnits="userSpaceOnUse">
													<stop stop-color="#465299" />
													<stop offset="1" stop-color="#7589FF" />
												</linearGradient>
											</defs>
										</svg>
									</div>
								</div>
								<div class="grid min-h-10 items-center justify-between gap-2.5 rounded-full bg-linear-90 from-white/15 to-transparent px-3 2xl:px-5 2xl:py-6">
									<p class="flex items-center gap-2.5 2xl:text-2xl">
										<Icons name="tick-circle" cls="fill-white size-6 2xl:size-8 flex-none" />
										검수 적체 14건이 주요 변수 · 15시 이전 해소 시 95%로 상승
									</p>
								</div>
							</div>
						</div>

						{@render aiIcon('icon-dashboard-3.png')}
					</li>
					<li
						class="relative flex h-full min-h-30 flex-1 flex-col rounded-lg bg-linear-90 from-[#031428] to-[#a46d1f] shadow-sm transition-all transition-discrete delay-200 starting:translate-y-2"
					>
						<h4 class={aiTitClass}>ROI 트래킹 (도입 후 누적)</h4>
						<div class="relative z-3 inline-flex flex-1">
							<div class="flex h-full min-w-5/6 flex-col justify-center space-y-10 p-5 text-white 2xl:space-y-15">
								<div class="">
									<p class="flex items-center gap-2.5 text-xl font-bold 2xl:text-4xl">
										<span class="text-[.8125rem] font-normal 2xl:text-4xl">실현 ROI</span>
										<strong><CounterUp txt={3.9} />배</strong>
									</p>

									<ul class="mt-5 inline-flex items-center gap-2.5">
										<li
											class="flex min-h-10 items-center justify-center gap-2.5 rounded-full border border-[#ffedbe] bg-linear-90 from-[#cab48a]/20 to-[#cab48a]/20 px-3 py-1 font-bold text-[#ffedbe] 2xl:px-8 2xl:py-4 2xl:text-[30px]"
										>
											<Icons name="trend-down" cls="fill-[#ffedbe] size-6 2xl:size-8" />
											<strong class="min-w-30">절감 <CounterUp txt={9240} />만원</strong>
										</li>
										<li class="font-bold text-white xl:text-2xl">VS</li>
										<li
											class="flex min-h-10 items-center justify-center gap-2.5 rounded-full bg-white/20 px-3 py-1 font-bold 2xl:px-8 2xl:py-4 2xl:text-[30px]"
										>
											<Icons name="receipt-item" cls="fill-white size-6 2xl:size-8" />
											<strong class="min-w-30">구독료 <CounterUp txt={2388} />만원</strong>
										</li>
									</ul>
								</div>
								<div class="grid min-h-10 items-center justify-between gap-2.5 rounded-full bg-linear-90 from-white/15 to-transparent px-3 2xl:px-5 2xl:py-6">
									<p class="flex items-center gap-2.5 2xl:text-2xl">
										<Icons name="info-circle" cls="fill-white size-6 2xl:size-8 flex-none" />
										생산성 향상분 + 오출고·재작업 감소 환산액 합산
									</p>
								</div>
							</div>
						</div>

						{@render aiIcon('icon-dashboard-4.png')}
					</li>
				</ul>
			</div>
		</TabItem>
		<TabItem {activeClass} {inactiveClass} class="h-full" key="location-control" title="current Location control">
			{#snippet titleSlot()}
				<span>위치관제</span>
			{/snippet}

			<div class="relative h-full overflow-clip rounded-xl opacity-100 transition-all transition-discrete duration-300 starting:translate-y-2 starting:opacity-40">
				<div class="bg-191919 grid h-full grid-cols-10">
					<div class="col-span-7 flex flex-col p-5 xl:p-7.5">
						<section class="flex flex-none items-center justify-between gap-2">
							<header>
								<h3 class="text-xl font-bold text-white xl:text-[42px]">실시간 작업자 관제 대시보드</h3>
								<p class="mt-1 text-white/70 xl:mt-5 xl:text-2xl">스마트 글라스 2D 디지털 트윈 로케이션 모니터링</p>
							</header>
						</section>
						<section class="bg-191919 mt-3 flex w-full flex-1 flex-col border border-white/30 text-white/50 xl:mt-5">
							<div class="grid flex-1 grid-cols-[1fr_80px_1fr] xl:grid-cols-[1fr_200px_1fr]">
								<div class="flex h-full flex-col">
									<p class="flex-none pt-5 text-center text-xl font-bold text-white/30 xl:pt-7.5 xl:text-3xl">TDL01 라인 B</p>

									<div class="grid min-h-0 flex-1 gap-5 xl:gap-7.5">
										<ul class="grid flex-1 grid-cols-1 grid-rows-4 gap-y-[2dvh] p-5 xl:p-7.5">
											{#each firstLineArea as ar (ar.id)}
												{@render areaCol(makeRangeByParity('b', 8), ar.id, ar.name)}
											{/each}
										</ul>
									</div>
								</div>

								<p class="flex items-center justify-center gap-2 bg-[#d9d9d9]/20 whitespace-nowrap [text-orientation:upright] [writing-mode:vertical-rl]">
									<span class="whitespace-nowrap [text-orientation:upright] [writing-mode:vertical-rl]">중앙</span>
									<span class="whitespace-nowrap [text-orientation:upright] [writing-mode:vertical-rl]">피킹</span>
									<span class="whitespace-nowrap [text-orientation:upright] [writing-mode:vertical-rl]">통로</span>
								</p>

								<div class="flex h-full flex-col">
									<p class="flex-none pt-5 text-center text-xl font-bold text-white/30 xl:pt-7.5 xl:text-3xl">TDL01 라인 A</p>

									<div class="grid min-h-0 flex-1 gap-5 xl:gap-7.5">
										<ul class="grid flex-1 grid-cols-1 grid-rows-4 gap-y-[2dvh] p-5 xl:p-7.5">
											{#each secondLineArea as ar (ar.id)}
												{@render areaCol(makeRangeByParity('a', 8), ar.id, ar.name)}
											{/each}
										</ul>
									</div>
								</div>
							</div>
						</section>
					</div>

					<div class="col-span-3 bg-[#383838]">
						<h3 class="px-5 pt-5 text-xl font-bold text-white xl:px-7.5 xl:pt-7.5 xl:text-[42px]">실시간 작업 현황</h3>

						<ul class="flex flex-1 flex-col gap-[2dvh] p-5 text-white xl:p-7.5">
							{#each simulation as worker (worker.id)}
								<li
									animate:flip={{ delay: 500 }}
									class={[
										'relative flex w-full flex-col rounded-xl bg-linear-90 transition-colors',
										worker.current_state?.trim() === '' && 'bg-666',
										worker.current_state?.trim() && worker.id !== 'GLASS-02' && 'from-[#240102] to-[#a11f26]',
										worker.current_state?.trim() && worker.id === 'GLASS-02' && 'from-[#200103] to-[#1f389f]',
									]}
								>
									<div class="flex flex-1 flex-wrap items-center justify-between gap-1 border-b border-b-white/20 p-5">
										<p class="flex flex-none flex-wrap items-center gap-2.5 text-xl font-bold xl:gap-5 xl:text-3xl">
											{#if worker.line === 'line-a' || worker.line === 'line-b'}
												<strong class="relative">
													<Icons name="glass" cls="size-6 xl:size-8 fill-white" />
													<Icons name="verify" cls="size-4 xl:size-6 fill-[#44ff00] absolute -top-2 -right-2 xl:-top-3 xl:-right-3 z-1" />
												</strong>
											{:else}
												<Icons name="glass" cls="size-6 xl:size-8 fill-white/30" />
											{/if}
											{worker.id}
										</p>

										{@render nameArea(worker.name)}
									</div>
									<div class="divide-y divide-white/20 px-5">
										<div class="flex flex-1 flex-wrap items-center justify-between gap-1 py-5">
											<p class="flex-none text-base text-white/70 xl:text-2xl">현재상태</p>
											<p class="flex flex-none flex-wrap items-center gap-2.5 text-base font-bold xl:text-2xl">
												{#if worker.current_state}
													{worker.current_state}
													피킹중
												{:else}
													<Icons name="none" cls="size-6 xl:size-8 fill-white/30" /> 미접속
												{/if}
											</p>
										</div>

										<!-- {#if simulation.route.length}
							<div class="flex flex-1 flex-wrap items-center justify-between gap-1 py-5">
								<p class="flex-none text-base text-white/70 xl:text-2xl">이동 동선</p>

								<ul class="flex flex-wrap items-center justify-end gap-2.5">
									{#each simulation.route as route, y}
										<li class="text-base font-bold xl:text-2xl">
											<p class={['flex items-center gap-2.5', simulation.route.length - 1 === y ? 'underline underline-offset-4' : 'line-through']}>
												{#if y !== 0}
													<Icons name="route-arrow" cls="size-4 xl:size-6 stroke-white" />
												{/if}

												{route}
											</p>
										</li>
									{/each}
								</ul>
							</div>
						{/if} -->
									</div>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</TabItem>
	</Tabs>
</section>

{#snippet alertText(txt: string, sub: string)}
	<div
		class="relative inline-flex min-h-10 min-w-2/3 flex-1 items-center gap-2.5 rounded-full bg-linear-90 from-white/15 to-transparent px-3 opacity-100 2xl:px-6 starting:opacity-0"
	>
		<p class="flex min-w-57.5 flex-[0_0_250px] items-center gap-2.5 2xl:min-w-105 2xl:text-3xl">
			<Icons name="alert-triangle" cls="fill-f56464 2xl:size-8 size-6 flex-none flex-none" />
			{txt}
			<Icons name="arrow-stroke-right" cls="stroke-white size-6 flex-none ml-auto  flex-none" />
		</p>
		<p class="col-span-2 flex items-center gap-2.5 leading-tight 2xl:text-3xl">
			<Icons name="tick-circle" cls="fill-white 2xl:size-8 size-6 flex-none" />
			{sub}
		</p>
	</div>
{/snippet}

{#snippet aiIcon(img: string)}
	<picture class="animate-dash-icon absolute top-1/4 right-5">
		<img src="/img/dashboard/{img}" alt="" class="size-45" />
	</picture>
{/snippet}
