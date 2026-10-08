<script lang="ts">
	import Btns from '$/lib/components/button/Btns.svelte';
	import { DAS_FILTER_STATUS_OPTIONS } from '$lib/constants/options.ts';
	import type { PageProps } from './$types';
	import BadgeText from '@/lib/components/badge/BadgeText.svelte';
	import InputArea from '@/lib/components/form/InputArea.svelte';
	import SelectArea from '@/lib/components/form/SelectArea.svelte';
	import TableGrid from '@/lib/components/table/TableGrid.svelte';
	import type { DasBase, DasItems } from '@/lib/types/das';
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';

	const { data }: PageProps = $props();
	const originalList = $derived<DasItems[]>(data.dasItems || []);
	let filteredList = $state<DasItems[]>([]);

	$effect.pre(() => {
		filteredList = [...originalList];
	});

	let filterStatus = $state('전체');
	let inputWorkNumber = $state('');
	let inProgressDasIds = $state<string[]>([]);

	const socketUrl = data.PUBLIC_SOCKET_URL;

	const handleFilter = () => {
		filteredList = originalList.filter((item: DasBase) => {
			const matchStatus = filterStatus === '전체' || item.status === DAS_FILTER_STATUS_OPTIONS.find((o) => o.label === filterStatus)?.value;
			const matchWorkNumber = !inputWorkNumber || item.taskNumber.includes(inputWorkNumber);

			return matchStatus && matchWorkNumber;
		});
	};

	$effect(() => {
		filteredList = originalList.filter((item: DasBase) => {
			const matchStatus = filterStatus === '전체' || item.status === DAS_FILTER_STATUS_OPTIONS.find((o) => o.label === filterStatus)?.value;

			return matchStatus;
		});
	});

	onMount(() => {
		const socket = io(socketUrl, { withCredentials: true });

		socket.on('connect', () => {
			socket.emit('das:getInProgressDasIds', (res) => {
				if (res.status_code === 200) {
					const items = res.data;
					inProgressDasIds = items.map((i) => i.das_id);
				}
			});
		});

		return () => socket.disconnect();
	});
</script>

<section class="bg-bkg p-section max-sm:p-card lg:gap-heading gap-card flex h-full min-h-0 flex-col overflow-clip rounded-xl shadow-[0_0_.625rem_0_rbga(0,0,0,0.1)]">
	<h2 class="text-primary text-3xl font-bold max-sm:text-xl">DAS 리스트</h2>

	<div class="gap-card flex flex-wrap items-center justify-between">
		<ul class="lg:gap-section-gap gap-card flex flex-wrap">
			<li class="flex items-center gap-4">
				<p class="flex-none text-lg max-sm:text-sm">작업상태</p>
				<div class="gap-card flex items-center">
					<SelectArea id="das-state" bind:text={filterStatus} arr={DAS_FILTER_STATUS_OPTIONS.map((s) => s.label)} />
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

	<TableGrid cls="grid-cols-15 gap-1 min-w-6xl">
		{#snippet thead()}
			<li class="col-span-2 grid place-content-center px-1 text-center font-bold">순번</li>
			<li class="col-span-3 grid place-content-center px-1 text-center font-bold">작업 번호</li>
			<li class="col-span-2 grid place-content-center px-1 text-center font-bold">오더건수</li>
			<li class="col-span-2 grid place-content-center px-1 text-center font-bold">현재 SKU &#47; 총 SKU</li>
			<li class="col-span-2 grid place-content-center px-1 text-center font-bold">현재 PCS &#47; 총 PCS</li>
			<li class="col-span-2 grid place-content-center px-1 text-center font-bold">작업상태</li>
			<li class="col-span-2 grid place-content-center px-1 text-center font-bold">작업버튼</li>
		{/snippet}

		{#snippet tbody()}
			{#each filteredList as item, i}
				<li class="hover:bg-primary/5 min-h-15 min-w-6xl place-content-center">
					<ul class="grid h-full grid-cols-15 gap-5">
						<li class="col-span-2 grid place-content-center px-1">{i + 1}</li>
						<li class="col-span-3 grid place-content-center px-1 {item.status === 'COMPLETED' ? 'text-primary font-bold' : ''}">{item.taskNumber}</li>
						<li class="col-span-2 grid place-content-center px-1">{item.totalSlipNumberCount}</li>
						<li class="col-span-2 grid place-content-center px-1">{item.currentSkuCount} / {item.targetSkuCount}</li>
						<li class="col-span-2 grid place-content-center px-1">{item.currentProductCount} / {item.targetProductCount}</li>
						<li class="col-span-2 grid place-content-center px-1">
							<BadgeText variant={item.status} text={DAS_FILTER_STATUS_OPTIONS.find((o) => o.value === item.status)?.label} />
						</li>
						<li class="col-span-2 grid place-content-center px-1">
							<Btns
								itemHref={item.status !== 'COMPLETED' && inProgressDasIds.includes(item.id) ? undefined : `/das/${item.id}`}
								text={item.status === 'COMPLETED' ? '상세보기' : item.status === 'IN_PROGRESS' ? '재작업' : '작업시작'}
								variant={item.status === 'COMPLETED' ? 'neutral-outline' : item.status === 'IN_PROGRESS' ? 'primary-outline' : 'primary'}
								disabled={item.status !== 'COMPLETED' && inProgressDasIds.includes(item.id)}
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
