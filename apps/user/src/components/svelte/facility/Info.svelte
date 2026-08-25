<script lang="ts">
	import { langState, pickText } from '@/stores/globalStore';
	import Address from '@/svelte/facility/Address.svelte';
	import OperationInformation from '@/svelte/facility/OperationInformation.svelte';
	import IconCategory from '@/svelte/icons/IconCategory.svelte';
	import Thumb from '@/svelte/thumb/Thumb.svelte';
	import type { FacilityDetailResponse, FacilityListResponse } from '@/types/facilities';

	let {
		variant = '',
		rest,
		detail,
	}: {
		variant: '' | 'list' | 'detail' | 'variant';
		rest?: FacilityListResponse;
		detail?: FacilityDetailResponse;
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

	let currenFacilityDetailData = $derived(variant === 'detail' ? detail : currenFacilityData);
</script>

<span class="flex min-h-17.5 items-center justify-between gap-2 px-5">
	<span class="inline-flex flex-col gap-2">
		<span class="text-000 text-[20px] leading-tight font-semibold">
			{pickText(rest?.name, $langState)}
		</span>

		<IconCategory
			icon={rest?.category?.iconKey ?? ''}
			color={rest?.category?.categoryColorCodes?.colorCode ?? ''}
			name={pickText(rest?.category?.name, $langState)}
		/>
	</span>

	<Thumb {variant} facilityFiles={currenFacilityDetailData?.facilityFiles?.slice(0, 1) ?? []} />
</span>

{#if variant === 'list'}
	<OperationInformation variant="list" data={currenFacilityDetailData ?? undefined} />
	<Address variant="list" data={rest ?? undefined} />
{/if}
