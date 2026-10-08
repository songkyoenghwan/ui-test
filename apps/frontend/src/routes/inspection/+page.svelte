<script lang="ts">
	import { FILTER_STATUS_OPTIONS, FILTER_TYPE_OPTIONS } from '$lib/constants/options';
	import { defaultFormatDate } from '$lib/utils/domUtils';
	import type { PageProps } from './$types';
	import BadgeText from '@/lib/components/badge/BadgeText.svelte';
	import Btns from '@/lib/components/button/Btns.svelte';
	import InputArea from '@/lib/components/form/InputArea.svelte';
	import SelectArea from '@/lib/components/form/SelectArea.svelte';
	import Icons from '@/lib/components/icons/Icons.svelte';
	import TableGrid from '@/lib/components/table/TableGrid.svelte';
	import type { Wave } from '@/lib/types/inspection';
	import { Tooltip } from 'flowbite-svelte';
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';

	const { data }: PageProps = $props();
	const originalList = $derived<Wave[]>(data.waves);
	let filteredList = $state<Wave[]>([]);

	$effect.pre(() => {
		filteredList = [...originalList];
	});

	let filterType = $state('전체');
	let filterStatus = $state('전체');
	let inputWorkNumber = $state('');
	let inProgressWaveIds = $state<string[]>([]);

	const socketUrl = data.PUBLIC_SOCKET_URL;

	const handleFilter = () => {
		filteredList = originalList.filter((item: Wave) => {
			const matchType = filterType === '전체' || item.inspectionType === FILTER_TYPE_OPTIONS.find((o) => o.label === filterType)?.value;
			const matchStatus = filterStatus === '전체' || item.status === FILTER_STATUS_OPTIONS.find((o) => o.label === filterStatus)?.value;
			const matchWorkNumber = !inputWorkNumber || item.waveNumber.includes(inputWorkNumber);

			return matchType && matchStatus && matchWorkNumber;
		});
	};

	$effect(() => {
		filteredList = originalList.filter((item: Wave) => {
			const matchType = filterType === '전체' || item.inspectionType === FILTER_TYPE_OPTIONS.find((o) => o.label === filterType)?.value;
			const matchStatus = filterStatus === '전체' || item.status === FILTER_STATUS_OPTIONS.find((o) => o.label === filterStatus)?.value;

			return matchType && matchStatus;
		});
	});

	onMount(() => {
		const socket = io(socketUrl, { withCredentials: true });

		socket.on('connect', () => {
			socket.emit('getInProgressWaveIds', (res) => {
				if (res.status_code === 200) {
					const items = res.data;
					inProgressWaveIds = items.map((i) => i.wave_id);
				}
			});
		});

		return () => socket.disconnect();
	});
</script>

<section class="bg-bkg p-section max-sm:p-card lg:gap-heading gap-card flex h-full min-h-0 flex-col overflow-clip rounded-xl shadow-[0_0_10px_0_rbga(0,0,0,0.1)]">
	<h2 class="text-primary text-3xl font-bold max-sm:text-xl">검수 리스트</h2>

	<div class="gap-card flex flex-wrap items-center justify-between">
		<ul class="lg:gap-section-gap gap-card flex flex-wrap">
			<li class="flex items-center gap-4">
				<p class="flex-none text-lg max-sm:text-sm">검수유형</p>
				<div class="gap-card flex items-center">
					<SelectArea id="inspection-type" bind:text={filterType} arr={FILTER_TYPE_OPTIONS.map((s) => s.label)} />
				</div>
			</li>
			<li class="flex items-center gap-4">
				<p class="flex-none text-lg max-sm:text-sm">검수상태</p>
				<div class="gap-card flex items-center">
					<SelectArea id="inspection-state" bind:text={filterStatus} arr={FILTER_STATUS_OPTIONS.map((s) => s.label)} />
				</div>
			</li>
		</ul>

		<ul class="lg:gap-section-gap gap-card flex flex-wrap">
			<li class="flex items-center gap-4">
				<p class="flex-none text-lg max-sm:text-sm">작업번호</p>

				<div class="gap-card relative flex items-center">
					<InputArea
						id="work-number"
						name="work-number"
						cls="w-full"
						bind:value={inputWorkNumber}
						onkeydown={(e: KeyboardEvent) => {
							if (e.key === 'Enter') handleFilter();
						}}
					/>

					<div class="absolute top-0 right-0 z-1 grid size-13 place-content-center max-sm:size-9">
						<Btns onclick={() => handleFilter()} icon="search-normal" text="저장하기" variant="icon-only" />
					</div>
				</div>
			</li>
		</ul>
	</div>

	<TableGrid cls="grid-cols-34 gap-1 leading-1.2 tracking-tighter min-w-7xl">
		{#snippet thead()}
			<li class="col-span-2 grid place-content-center px-1 text-center font-bold tracking-tighter">순번</li>
			<li class="col-span-2 grid place-content-center px-1 text-center font-bold tracking-tighter">검수유형</li>
			<li class="col-span-4 grid place-content-center px-1 text-center font-bold tracking-tighter">작업 번호</li>
			<li class="col-span-2 grid place-content-center px-1 text-center font-bold tracking-tighter">오더건수</li>
			<li class="col-span-2 grid place-content-center px-1 text-center font-bold tracking-tighter">영상건수</li>
			<li class="col-span-2 grid place-content-center px-1 text-center font-bold tracking-tighter">목표수량</li>
			<li class="col-span-2 grid place-content-center px-1 text-center font-bold tracking-tighter">완료수량</li>
			<li class="col-span-4 grid place-content-center px-1 text-center font-bold tracking-tighter">피킹 완료 일시</li>
			<li class="col-span-4 grid place-content-center px-1 text-center font-bold tracking-tighter">검수 시작 일시</li>
			<li class="col-span-4 grid place-content-center px-1 text-center font-bold tracking-tighter">검수 종료 일시</li>
			<li class="col-span-3 grid place-content-center px-1 text-center font-bold tracking-tighter">검수상태</li>
			<li class="col-span-3 grid place-content-center px-1 text-center font-bold tracking-tighter">검수버튼</li>
		{/snippet}

		{#snippet tbody()}
			{#each filteredList as item, i}
				<li class="hover:bg-primary/5 min-h-15 min-w-7xl place-content-center leading-snug tracking-tighter">
					<ul class="grid h-full grid-cols-34 gap-1">
						<li class="col-span-2 grid place-content-center px-1">{i + 1}</li>
						<li class="col-span-2 grid place-content-center px-1">{item.inspectionType}</li>
						<li class="col-span-4 grid place-content-center px-1 {item.status === 'COMPLETED' ? 'text-primary font-bold' : ''}">{item.waveNumber}</li>
						<li class="col-span-2 grid place-content-center px-1">{item.totalSlipNumberCount}</li>
						<li class="col-span-2 place-content-center px-1 {item.totalInspectionSkippedCount > 0 ? 'text-accent flex items-center gap-1 font-bold' : 'grid'}">
							{#if item.totalInspectionSkippedCount > 0}
								<Icons name="alert-triangle" cls="fill-accent inline-block size-5" />
								{item.totalFileCount}
								<Tooltip placement="top" class="bg-neutral text-white">녹화 중단</Tooltip>
							{:else}
								{item.totalFileCount}
							{/if}
						</li>
						<li class="col-span-2 grid place-content-center px-1">{item.totalProductCount}</li>
						<li class="col-span-2 grid place-content-center px-1">{item.totalInspectionCompletedProductCount}</li>
						<li class="col-span-4 grid place-content-center px-1 text-center">{defaultFormatDate(item.completeDt)}</li>
						<li class="col-span-4 grid place-content-center px-1 text-center">{defaultFormatDate(item.firstStartDt)}</li>
						<li class="col-span-4 grid place-content-center px-1 text-center">{defaultFormatDate(item.lastEndDt)}</li>
						<li class="col-span-3 grid place-content-center px-1">
							<BadgeText variant={item.status} text={FILTER_STATUS_OPTIONS.find((o) => o.value === item.status)?.label} />
						</li>
						<li class="col-span-3 grid place-content-center px-1">
							<Btns
								itemHref={item.status !== 'COMPLETED' && inProgressWaveIds.includes(item.waveId) ? undefined : `/inspection/${item.waveId}`}
								text={item.status === 'COMPLETED' ? '상세보기' : item.status === 'IN_PROGRESS' ? '재검수' : '검수시작'}
								variant={item.status === 'COMPLETED' ? 'neutral-outline' : item.status === 'IN_PROGRESS' ? 'primary-outline' : 'primary'}
								disabled={item.status !== 'COMPLETED' && inProgressWaveIds.includes(item.waveId)}
							/>
						</li>
					</ul>
				</li>
			{/each}

			{#if filteredList.length === 0}
				<li class="text-999 p-20 text-center">데이터가 없습니다.</li>
			{/if}
		{/snippet}
	</TableGrid>
</section>
