<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState, pickText } from '@/stores/globalStore';
	import Address from '@/svelte/facility/Address.svelte';
	import OperationInformation from '@/svelte/facility/OperationInformation.svelte';
	import IconCategory from '@/svelte/icons/IconCategory.svelte';
	import Icons from '@/svelte/icons/Icons.svelte';
	import Thumb from '@/svelte/thumb/Thumb.svelte';
	import type { FacilityDetailResponse, FacilityListResponse } from '@/types/facilities';
	import { formatOperatingStatus } from '@/utils/operatingStatus';

	let {
		variant = '',
		rest,
		detail,
		onDirections,
	}: {
		variant: '' | 'list' | 'detail';
		rest?: FacilityListResponse | null;
		detail?: FacilityDetailResponse | null;
		onDirections?: () => void;
	} = $props();

	let currenFacilityData = $state<FacilityDetailResponse | null>(null);

	async function loadFacilityInfo(facilityId: number, signal: AbortSignal): Promise<FacilityDetailResponse | null> {
		const response = await fetch(`/api/facilities/${facilityId}`, { credentials: 'include', signal });
		if (!response.ok) throw new Error('시설 정보를 불러오지 못했습니다.');

		const facilityData = await response.json();
		return (facilityData?.data as FacilityDetailResponse | null) ?? null;
	}

	$effect(() => {
		if (variant === 'detail') return;
		const facilityId = rest?.id;
		if (!facilityId) return;
		if (rest?.name && rest?.category) return;

		const controller = new AbortController();
		void loadFacilityInfo(facilityId, controller.signal)
			.then((facility) => {
				if (controller.signal.aborted) return;
				currenFacilityData = facility;
			})
			.catch((error: unknown) => {
				if (!(error instanceof DOMException && error.name === 'AbortError')) console.error(error);
			});

		return () => {
			controller.abort();
		};
	});

	let currenFacilityDetailData = $derived(variant === 'detail' ? detail : (currenFacilityData ?? detail));
	let thumbnailFiles = $derived(
		rest?.thumbnailUrl
			? [{ id: rest.id, fileUrl: rest.thumbnailUrl }]
			: (currenFacilityDetailData?.facilityFiles?.slice(0, 1) ?? []),
	);
	let operationLabel = $derived(rest?.operation ? formatOperatingStatus(rest.operation) : '');
</script>

<div class="flex min-h-17.5 items-center justify-between gap-2 px-5">
	<div class="inline-flex flex-col gap-2">
		<p class="text-000 line-clamp-1 text-[20px] leading-tight font-semibold">
			{pickText(rest?.name, $langState)}
		</p>

		<IconCategory
			icon={rest?.category?.iconKey ?? rest?.category?.parent?.iconKey ?? ''}
			color={rest?.category?.categoryColorCodes?.colorCode ??
				rest?.category?.parent?.categoryColorCodes?.colorCode ??
				''}
			name={pickText(rest?.category?.name, $langState)}
		/>
	</div>

	<Thumb facilityFiles={thumbnailFiles} />
</div>

{#if variant === 'list'}
	{#if operationLabel}
		<div class="flex items-center gap-2 px-5 py-1 text-sm font-semibold text-slate-600">
			<Icons name="clock-filled" cls="size-4 fill-slate-400 stroke-slate-400" />
			<span>{operationLabel}</span>
		</div>
	{:else}
		<OperationInformation variant="list" data={currenFacilityDetailData ?? undefined} />
	{/if}
	<Address variant="list" data={rest ?? undefined} />
	{#if onDirections}
		<div class="grid px-5 py-1">
			<button
				type="button"
				class="text-09235e flex h-10 flex-1 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-100"
				onclick={(event) => {
					event.preventDefault();
					event.stopPropagation();
					onDirections();
				}}
			>
				<span>{m.usr_rec_001_07({ locale: $langState })}</span>
				<Icons name="map-start" cls="fill-09235e size-3.25" />
			</button>
		</div>
	{/if}
{/if}
