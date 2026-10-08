<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { FILTER_STATUS_OPTIONS } from '$lib/constants/options';
	import { defaultFormatDate } from '$lib/utils/domUtils';
	import { download } from '$lib/utils/file';
	import type { PageProps } from './$types';
	import BadgeText from '@/lib/components/badge/BadgeText.svelte';
	import Btns from '@/lib/components/button/Btns.svelte';
	import InputArea from '@/lib/components/form/InputArea.svelte';
	import Icons from '@/lib/components/icons/Icons.svelte';
	import TableGrid from '@/lib/components/table/TableGrid.svelte';
	import type { InspectionProduct, Task, WaveDetail } from '@/lib/types/inspection';
	import { Modal, type ModalProps, Tooltip } from 'flowbite-svelte';
	import QRCode from 'qrcode';
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let isInspectionReady = $state(false);
	let openModal = $state(false);
	let alertModal = $state(false);
	let noneModal = $state(false);
	let size: ModalProps['size'] = $state('md');
	let { data, params }: PageProps = $props();
	const details = $derived<WaveDetail>(data.waveDetail);

	let inputOrderNumber = $state('');
	let filteredInspected = $state<Task[]>([]);
	let targetOrder = $state<InspectionProduct[]>();
	let qrImgUrl = $state('');
	let sacleView = $state(false);
	let productBarcode = $state('');
	let isKeyInEnabled = $state(false);
	let status = $state(details.status);
	let inspectedProducts = $state(new Set());

	let socket;
	const socketUrl = data.PUBLIC_SOCKET_URL;

	$effect(() => {
		if (details?.tasks) {
			filteredInspected = [...details.tasks];
		}

		status = details.status;
	});

	const handleFilter = () => {
		if (!details?.tasks) return;

		const searchTerm = inputOrderNumber.trim();

		if (!searchTerm) {
			filteredInspected = [...details.tasks];
			return;
		}

		filteredInspected = details.tasks.filter((entry) => entry.slipNumber.includes(searchTerm));
	};

	const sacleHandler = () => {
		return (sacleView = !sacleView);
	};

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && sacleView) {
			sacleView = false;
		}

		if (event.key === 'Enter' && alertModal) {
			event.preventDefault();
		}
	}

	const openAlertModal = () => {
		if (productBarcode === '' || !isKeyInEnabled) {
			return false;
		}
		alertModal = true;
	};

	const closeOpenModal = () => {
		openModal = false;
		alertModal = false;
		noneModal = false;
		isKeyInEnabled = false;
		productBarcode = '';
	};

	const handleManualInspection = () => {
		const item = targetOrder.find((i) => i.product_code === productBarcode);
		if (item) {
			item.completed_count = item.target_count;
			item.completed_dt = new Date().toISOString();
			socket.emit('scanProductBarcode', { data: targetOrder });
			productBarcode = '';
		} else {
			noneModal = true;
		}

		alertModal = false;
	};

	if (details.status !== 'COMPLETED') {
		onMount(async () => {
			try {
				qrImgUrl = await QRCode.toDataURL(details.waveId);
			} catch (e) {
				alert('QR 생성 실패: ' + (e?.message || e));
			}
		});

		onMount(() => {
			socket = io(socketUrl, { withCredentials: true });
			const updateInspectionProduct = (result) => {
				openModal = true;
				targetOrder = result.data;
			};

			socket.on('connect', () => {
				console.log('서버와 연결되었습니다. socketId', socket.id);
				socket.emit('createRoom', { wave_id: details.waveId, inspection_type: details.inspectionType }, (res) => {
					if (res.status_code === 400 || res.status_code === 401) {
						alert('소켓 서버 연결에 실패했습니다.');
						goto('/inspection');
					} else if (res.status_code === 409) {
						alert('이미 검수가 진행 중 입니다.');
						goto('/inspection');
					} else {
						isInspectionReady = true;
					}
				});
			});

			socket.on('connect_error', (error) => {
				console.error('연결 실패 원인:', error);
				alert('소켓 서버 연결에 실패했습니다.');
				goto('/inspection');
			});

			socket.on('scanSlipNumberResult', (data) => {
				updateInspectionProduct(data);
			});

			socket.on('scanProductBarcodeResult', (data) => {
				updateInspectionProduct(data);
			});

			socket.on('finish', () => {
				closeOpenModal();
				invalidate('refresh:inspection');
			});

			socket.on('activateKeyIn', () => {
				isKeyInEnabled = true;
			});

			socket.on('joinRoom', () => {
				sacleView = false;

				if (status === 'BEFORE') {
					status = 'IN_PROGRESS';
				}
			});

			socket.on('same:scanProductBarcode', (data) => {
				const newInspectedProducts = new Set(inspectedProducts);
				data.data.forEach((item) => newInspectedProducts.add(item.product_code));
				inspectedProducts = newInspectedProducts;
			});

			socket.on('disconnect', (reason) => {
				console.log('disconnect: ', reason);
				if (reason === 'io server disconnect' || reason === 'transport close') {
					// 소켓 연결 해제 시 방이 사라진 상태이므로 QR 숨김 처리
					qrImgUrl = '';
					setTimeout(() => {
						alert('소켓 서버와의 연결이 끊어졌습니다.');
						goto('/inspection');
					}, 10);
				}
			});

			return () => socket.disconnect();
		});
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if details.status === 'COMPLETED' || isInspectionReady}
	<section class="bg-bkg p-section max-sm:p-card flex h-full min-h-0 flex-col gap-4 overflow-clip rounded-xl shadow-[0_0_10px_0_rbga(0,0,0,0.1)]">
		<div class="flex justify-between">
			<div class="space-y-3">
				<p class="text-muted-frg text-base">검수 리스트 &gt; 작업번호 {details.waveNumber}</p>
				<h2 class="text-primary text-3xl font-bold max-sm:text-xl">검수 ({details.inspectionType})</h2>
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
				<BadgeText variant={status} text={FILTER_STATUS_OPTIONS.find((o) => o.value === status)?.label} />
				<p class="text-frg text-2xl">작업번호 {details.waveNumber}</p>
				{#if details.inspectionType.toUpperCase() === 'SAME'}
					{#if details.firstFileId}
						<Btns
							onclick={() => download(`/download/${details.firstFileId}`)}
							size="md"
							variant="primary"
							cls="rounded-xl"
							text="영상 다운로드"
							icon="fill-download"
							iconColor="fill-white"
							iconSize="size-3.5"
						/>
					{/if}
				{/if}
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

		{#if details.inspectionType.toUpperCase() === 'SAME'}
			<ul class="border-detail-outline bg-primary-50 divide-detail-outline grid grid-cols-8 items-center divide-x rounded-lg border text-(--464646)">
				<li class="divide-detail-outline col-span-6 grid flex-1 gap-1 divide-y p-4">
					{#each details.products as product, i (product.product_code)}
						<ul class="flex items-center py-3 text-(--464646)">
							<li class=" grid flex-1 place-items-center gap-1 p-4">
								<BadgeText
									text={status === 'COMPLETED' || inspectedProducts.has(product.product_code) ? '검수 완료' : '검수 미완료'}
									variant={status === 'COMPLETED' || inspectedProducts.has(product.product_code) ? 'complete' : 'incomplete'}
								/>
							</li>
							<li class=" grid flex-2 place-items-center gap-1 p-4">
								<p>상품바코드</p>
								<p class="text-primary text-2xl font-bold">{product.product_code}</p>
							</li>
							<li class=" grid flex-4 place-items-center gap-1 p-4">
								<p>상품명</p>
								<p class="text-primary text-2xl font-bold">{product.product_name}</p>
							</li>
						</ul>
					{/each}
				</li>
				<li class="col-span-2 grid place-items-center gap-1 p-4">
					<p>총 세트수량</p>
					<p class="text-primary text-3xl font-bold max-sm:text-xl">{details.totalProductCount / details.products.length}세트</p>
				</li>
			</ul>
		{/if}

		{#if details.inspectionType.toUpperCase() === 'N'}
			<TableGrid cls="grid-cols-21 leading-1.2 tracking-tighter min-w-6xl gap-1">
				{#snippet thead()}
					<li class="col-span-2 grid place-content-center px-1 text-center font-bold tracking-tighter">순번</li>
					<li class="col-span-3 grid place-content-center px-1 text-center font-bold tracking-tighter">주문번호</li>
					<li class="col-span-2 grid place-content-center px-1 text-center font-bold tracking-tighter">현재 SKU &#47; 총 SKU</li>
					<li class="col-span-2 grid place-content-center px-1 text-center font-bold tracking-tighter">현재 PCS &#47; 총 PCS</li>
					<li class="col-span-4 grid place-content-center px-1 text-center font-bold tracking-tighter">검수 시작 일시</li>
					<li class="col-span-4 grid place-content-center px-1 text-center font-bold tracking-tighter">검수 종료 일시</li>
					<li class="col-span-2 grid place-content-center px-1 text-center font-bold tracking-tighter">검수상태</li>
					<li class="col-span-2 grid place-content-center px-1 text-center font-bold tracking-tighter">영상다운로드</li>
				{/snippet}

				{#snippet tbody()}
					{#each filteredInspected as item, i (item.slipNumber)}
						<li class="hover:bg-primary/5 group/state min-h-15 min-w-6xl place-content-center leading-snug tracking-tighter">
							<ul class="grid h-full grid-cols-21 gap-1">
								<li class="col-span-2 grid place-content-center px-1">{i + 1}</li>
								<li class="col-span-3 grid place-content-center px-1">{item.slipNumber}</li>
								<li class="col-span-2 grid place-content-center px-1">{item.currentSkuCount} / {item.targetSkuCount}</li>
								<li class="col-span-2 grid place-content-center px-1">{item.totalInspectionCompletedProductCount} / {item.totalProductCount}</li>
								<li class="col-span-4 grid place-content-center px-1">{defaultFormatDate(item.startDt)}</li>
								<li class="col-span-4 grid place-content-center px-1">{defaultFormatDate(item.endDt)}</li>
								<li class="col-span-2 grid place-content-center px-1">
									<BadgeText
										text={item.totalProductCount === item.totalInspectionCompletedProductCount ? '검수 완료' : '검수 미완료'}
										variant={item.totalProductCount === item.totalInspectionCompletedProductCount ? 'complete' : 'incomplete'}
									/>
								</li>
								<li class="col-span-2 grid place-content-center px-1">
									{#if item.fileId}
										<Btns onclick={() => download(`/download/${item.fileId}`)} text="다운로드" variant="neutral-outline" />
									{/if}
								</li>
							</ul>
						</li>
					{/each}

					{#if filteredInspected.length === 0}
						<li class="grid min-h-50 place-content-center text-center">데이터가 없습니다.</li>
					{/if}
				{/snippet}
			</TableGrid>
		{/if}

		{#if details.inspectionType.toUpperCase() === 'SAME'}
			<TableGrid cls="grid-cols-4 gap-1 leading-1.2 tracking-tighter min-w-6xl">
				{#snippet thead()}
					<li class="col-span-1 grid place-content-center px-1 text-center font-bold tracking-tighter">순번</li>
					<li class="col-span-2 grid place-content-center px-1 text-center font-bold tracking-tighter">주문번호</li>
					<li class="col-span-1 grid place-content-center px-1 text-center font-bold tracking-tighter">수량</li>
				{/snippet}

				{#snippet tbody()}
					{#each filteredInspected as item, i (item.slipNumber)}
						<li class="hover:bg-primary/5 group/state min-h-15 min-w-6xl place-content-center leading-snug tracking-tighter">
							<ul class="grid h-full grid-cols-4 gap-1">
								<li class="col-span-1 grid place-content-center px-1">{i + 1}</li>
								<li class="col-span-2 grid place-content-center px-1">{item.slipNumber}</li>
								<li class="col-span-1 grid place-content-center px-1 text-2xl font-bold text-black">
									{item.totalProductCount / details.products.length}세트
								</li>
							</ul>
						</li>
					{/each}

					{#if filteredInspected.length === 0}
						<li class="grid min-h-50 place-content-center text-center">데이터가 없습니다.</li>
					{/if}
				{/snippet}
			</TableGrid>
		{/if}
	</section>

	<Modal
		bind:open={openModal}
		outsideclose={false}
		class="divide-outline m-auto grid max-h-[80dvh] min-h-0 max-w-5xl grid-rows-[92px_1fr] overflow-clip outline-0 backdrop:bg-black/50"
		{size}
	>
		{#snippet header()}
			<header class=" flex w-full items-center justify-between bg-white p-2.5">
				<h3 class="text-primary text-3xl font-bold max-sm:text-xl">검수 상품 목록</h3>
				<Btns text="다운로드" variant="icon-only" icon="close" iconSize="44" cls="hover:bg-muted" onclick={() => closeOpenModal()} />
			</header>
		{/snippet}
		<div class="flex h-full min-h-0 w-full flex-col bg-white p-2.5">
			<ul class="lg:gap-section-gap gap-card flex w-full flex-wrap">
				<li class="flex w-full flex-1 items-center gap-6">
					<p class="flex-none text-lg max-sm:text-sm">상품바코드</p>
					<div class="gap-card relative flex flex-1 items-center">
						<InputArea
							id="work-number"
							name="work-number"
							bind:value={productBarcode}
							onkeydown={(e: KeyboardEvent) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									e.stopPropagation();
									openAlertModal();
								}
							}}
							placeholder="상품바코드를 입력하세요."
							maxlength="20"
						/>

						<div class="top-0 right-0 z-1 grid place-content-center">
							<Btns onclick={() => openAlertModal()} cls="rounded-lg min-w-25" size="lg" text="등록" disabled={!isKeyInEnabled} />
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="flex h-full min-h-0 flex-col bg-white p-2.5">
			<TableGrid cls="grid-cols-7" bodyCls="h-full">
				{#snippet thead()}
					<li data-width="full" class="col-span-1 grid place-content-center px-1 text-center">로케이션</li>
					<li data-width="full" class="col-span-1 grid place-content-center px-1 text-center">상품바코드</li>
					<li data-width="full" class="col-span-3 grid place-content-center px-1 text-center">상품명</li>
					<li data-width="full" class="col-span-1 grid place-content-center px-1 text-center">스캔수량</li>
					<li data-width="full" class="col-span-1 grid place-content-center px-1 text-center">목표수량</li>
				{/snippet}

				{#snippet tbody()}
					{#each targetOrder ?? [] as item}
						{@const isComplete = item.target_count === item.completed_count}
						<li
							class="hover:bg-primary/5 border-line data-[state=complete]:bg-neon flex min-h-15 items-center border-b last:border-none"
							data-state={isComplete ? 'complete' : 'pending'}
						>
							<ul class="grid h-full w-full grid-cols-7">
								<li class="col-span-1 grid place-content-center px-1">{item.supply_bin || '-'}</li>
								<li class="col-span-1 grid place-content-center px-1">{item.product_code || '-'}</li>
								<li class="col-span-3 grid place-content-center px-1">{item.product_name || ''}</li>
								<li class="text-succes-frg col-span-1 grid place-content-center px-1 text-[1.75rem] font-bold">{item.completed_count}</li>
								<li class="col-span-1 grid place-content-center px-1 text-[1.75rem] font-bold text-black">{item.target_count}</li>
							</ul>
						</li>
					{/each}
					{#if targetOrder.length === 0}
						<li class="grid min-h-50 place-content-center text-center">데이터가 없습니다.</li>
					{/if}
				{/snippet}
			</TableGrid>
		</div>
	</Modal>
{/if}

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

<Modal bind:open={alertModal} size="xs" transition={fade} permanent class="border-table-outline">
	<div class="p-1 text-center">
		<h3 class="mb-9 pt-4 text-lg font-normal text-black max-sm:text-sm">
			상품바코드 <strong class="text-primary font-bold">{productBarcode}</strong>
			<br />
			검수 완료 처리하시겠습니까?
		</h3>
		<div class="grid grid-cols-2 gap-5">
			<Btns onclick={() => (alertModal = false)} size="xl" variant="primary-outline" cls="rounded-xl" text="취소" />
			<Btns onclick={() => handleManualInspection()} size="xl" variant="primary" cls="rounded-xl" text="확인" />
		</div>
	</div>
</Modal>

<Modal bind:open={noneModal} size="xs" transition={fade} permanent class="border-table-outline">
	<div class="p-1 text-center">
		<h3 class="mb-9 pt-4 text-lg font-normal text-black max-sm:text-sm">
			검수 상품 목록에 없는 상품코드입니다.
			<br />
			상품바코드를 다시 확인해주세요.
		</h3>
		<div class="grid grid-cols-1 gap-5">
			<Btns onclick={() => (noneModal = false)} size="xl" variant="primary" cls="rounded-xl" text="확인" />
		</div>
	</div>
</Modal>

<style>
	:global([aria-label='Close']) {
		display: none;
	}
</style>
