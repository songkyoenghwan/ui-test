<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { DAS_FILTER_STATUS_OPTIONS } from '$lib/constants/options.ts';
	import type { PageProps } from './$types';
	import BadgeText from '@/lib/components/badge/BadgeText.svelte';
	import Btns from '@/lib/components/button/Btns.svelte';
	import InputArea from '@/lib/components/form/InputArea.svelte';
	import Icons from '@/lib/components/icons/Icons.svelte';
	import TableGrid from '@/lib/components/table/TableGrid.svelte';
	import { socketManager } from '@/lib/socket.svelte';
	import type { DasItems, DasWorkStatus } from '@/lib/types/das';
	import { Modal, Tooltip } from 'flowbite-svelte';
	import QRCode from 'qrcode';
	import { io } from 'socket.io-client';
	import { onMount, tick } from 'svelte';

	let { data }: PageProps = $props();
	const details = $derived(data.dasDetail as DasItems);

	let inputOrderNumber = $state('');
	let filteredWorkStatus = $state<DasWorkStatus[]>([]);

	let currentBoxNumber = $state('');
	let currentDasTaskId = $state('');
	let qrImgUrl = $state('');
	let sacleView = $state(false);
	let status = $state(details.status);

	let socket;
	const socketUrl = data.PUBLIC_SOCKET_URL;

	$effect(() => {
		if (details?.tasks) {
			filteredWorkStatus = [...details.tasks.filter((item) => item.dasTaskId === currentDasTaskId), ...details.tasks.filter((item) => item.dasTaskId !== currentDasTaskId)];
		}

		if (details.status === 'BEFORE' && status !== 'BEFORE') return;
		status = details.status;
	});

	const handleFilter = () => {
		if (!details?.tasks) return;

		const searchTerm = inputOrderNumber.trim();

		if (!searchTerm) {
			filteredWorkStatus = [...details.tasks.filter((item) => item.dasTaskId === currentDasTaskId), ...details.tasks.filter((item) => item.dasTaskId !== currentDasTaskId)];
			return;
		}

		filteredWorkStatus = details.tasks.filter((entry) => entry.slipNumber.includes(searchTerm));
	};

	const sacleHandler = () => {
		return (sacleView = !sacleView);
	};

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && sacleView) {
			sacleView = false;
		}
	}

	if (details.status !== 'COMPLETED') {
		onMount(() => {
			socket = io(socketUrl, { withCredentials: true });

			socket.on('connect', () => {
				console.log('서버와 연결되었습니다. socketId', socket.id);
				socket.emit('das:createRoom', { das_id: details.dasId }, async (res) => {
					if (res.status_code === 400 || res.status_code === 401) {
						alert('소켓 서버 연결에 실패했습니다.');
						goto('/das');
					} else if (res.status_code === 409) {
						alert('이미 DAS가 진행 중 입니다.');
						goto('/das');
					} else {
						try {
							qrImgUrl = await QRCode.toDataURL(details.dasId);
						} catch (e) {
							alert('QR 생성 실패: ' + (e?.message || e));
						}
					}
				});
			});

			socket.on('connect_error', (error) => {
				console.error('연결 실패 원인:', error);
				alert('소켓 서버 연결에 실패했습니다.');
				goto('/das');
			});

			socket.on('das:scanProductBarcodeResult', (data) => {
				currentDasTaskId = data.data.das_task_id;
			});

			socket.on('das:putProduct', () => {
				currentDasTaskId = '';
				invalidate('refresh:das');
			});

			socket.on('das:joinRoom', () => {
				sacleView = false;

				if (status === 'BEFORE') {
					status = 'IN_PROGRESS';
				}
			});

			socket.on('disconnect', (reason) => {
				console.log('disconnect: ', reason);
				if (reason === 'io server disconnect' || reason === 'transport close') {
					// 소켓 연결 해제 시 방이 사라진 상태이므로 QR 숨김 처리
					qrImgUrl = '';
					setTimeout(() => {
						alert('소켓 서버와의 연결이 끊어졌습니다.');
						goto('/das');
					}, 10);
				}
			});

			return () => socket.disconnect();
		});
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<section class="bg-bkg p-section max-sm:p-card flex h-full min-h-0 flex-col gap-4 overflow-clip rounded-xl shadow-[0_0_10px_0_rbga(0,0,0,0.1)]">
	<div class="flex justify-between">
		<div class="space-y-3">
			<p class="text-muted-frg text-base">DAS 리스트 &gt; 작업번호 {details.taskNumber}</p>
			<h2 class="text-primary text-3xl font-bold max-sm:text-xl">DAS 작업현황</h2>
		</div>

		{#if qrImgUrl}
			{#if sacleView}
				<p
					class="group relative -top-2.5 size-40 cursor-pointer transition-all select-none empty:bg-gray-100 hover:scale-105"
					role="button"
					onclick={sacleHandler}
					aria-pressed={sacleView}
				></p>
			{:else}
				<picture
					class="group relative -top-2.5 size-40 cursor-pointer transition-all select-none empty:bg-gray-300 hover:scale-105"
					role="button"
					onclick={sacleHandler}
					aria-pressed={sacleView}
				>
					<img src={qrImgUrl} alt="" class="relative size-full bg-white group-aria-pressed:hidden" />
				</picture>
			{/if}
			<Tooltip placement="bottom" class="bg-primary border-primary border text-white">{sacleView === false ? '확대' : '축소'}</Tooltip>
		{/if}
	</div>

	<div class="flex flex-wrap items-center justify-between gap-3">
		<div class="flex flex-wrap items-center gap-3">
			<BadgeText variant={status} text={DAS_FILTER_STATUS_OPTIONS.find((o) => o.value === status)?.label} />
			<p class="text-frg text-2xl">작업번호 {details.taskNumber}</p>
		</div>

		<div class="flex items-center gap-4">
			<li class="flex items-center gap-4">
				<p class="flex-none text-lg max-sm:text-sm">주문번호</p>
				<div class="gap-card relative flex items-center">
					<InputArea
						id="order-number"
						name="order-number"
						cls="w-full"
						placeholder="주문번호를 입력하세요"
						bind:value={inputOrderNumber}
						onkeydown={(e: KeyboardEvent) => {
							if (e.key === 'Enter') handleFilter();
						}}
					/>

					<button type="button" class=" absolute top-0 right-0 z-1 grid size-13 place-content-center max-sm:size-9" onclick={handleFilter}>
						<span class="sr-only">검색</span>
						<Icons name="search-normal" cls="stroke-svg flex size-6" />
					</button>
				</div>
			</li>
		</div>
	</div>

	<TableGrid cls="grid-cols-13 gap-1 min-w-7xl">
		{#snippet thead()}
			<li class="col-span-2 grid place-content-center px-1 text-center font-bold">주문번호</li>
			<li class="col-span-1 grid place-content-center px-1 text-center font-bold">박스번호</li>
			<li class="col-span-2 grid place-content-center px-1 text-center font-bold">상품바코드</li>
			<li class="col-span-4 grid place-content-center px-1 text-center font-bold">상품명</li>
			<li class="col-span-1 grid place-content-center px-1 text-center font-bold">목표수량</li>
			<li class="col-span-1 grid place-content-center px-1 text-center font-bold">완료수량</li>
			<li class="col-span-2 grid place-content-center px-1 text-center font-bold">분류상태</li>
		{/snippet}

		{#snippet tbody()}
			{#each filteredWorkStatus as item}
				<li class="hover:bg-primary/5 group/state min-h-15 min-w-7xl place-content-center" aria-current={currentDasTaskId === item.dasTaskId ? 'true' : 'false'}>
					<ul class="grid h-full grid-cols-13 gap-1">
						<li class="col-span-2 grid place-content-center px-1">{item.slipNumber}</li>
						<li class="group-aria-current/state:bg-neon col-span-1 grid place-content-center px-1 text-2xl font-bold">
							{item.boxNumber}
						</li>
						<li class="col-span-2 grid place-content-center px-1">{item.productCode}</li>
						<li class="col-span-4 grid place-content-center px-1">{item.productName}</li>
						<li class="col-span-1 grid place-content-center px-1">{item.targetCount}</li>
						<li class="col-span-1 grid place-content-center px-1">{item.currentCount}</li>
						<li class="col-span-2 grid place-content-center px-1">
							<BadgeText
								text={item.targetCount === item.currentCount ? '분류 완료' : '분류 미완료'}
								variant={item.targetCount === item.currentCount ? 'complete' : 'incomplete'}
							/>
						</li>
					</ul>
				</li>
			{/each}

			{#if filteredWorkStatus.length === 0}
				<li class="grid min-h-50 place-content-center text-center">데이터가 없습니다.</li>
			{/if}
		{/snippet}
	</TableGrid>
</section>

<Modal bind:open={sacleView} modal={false} size="sm" class="z-10 border shadow-xl">
	{#snippet header()}
		<header class=" flex w-full items-center justify-between bg-white px-2.5 py-0">
			<h3 class="text-primary text-3xl font-bold max-sm:text-xl">QR CODE</h3>
			<Btns text="다운로드" variant="icon-only" icon="close" iconSize="44" cls="hover:bg-muted" onclick={() => (sacleView = false)} />
		</header>
	{/snippet}
	<img
		src={qrImgUrl}
		alt=""
		class="relative size-full bg-white transition-all duration-25 group-aria-pressed:absolute group-aria-pressed:top-1/2 group-aria-pressed:right-1/2 group-aria-pressed:z-20 group-aria-pressed:scale-225"
	/>
</Modal>

<style>
	:global([aria-label='Close']) {
		display: none;
	}
</style>
