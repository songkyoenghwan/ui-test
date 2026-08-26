<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState, pickText } from '@/stores/globalStore';
	import { locationPermission, userPosition } from '@/stores/locationStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import type { FacilityListResponse } from '@/types/facilities';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';
	import { calculateDistanceMeters, formatDistance } from '@/utils/distance';

	let {
		variant = '',
		data,
	}: {
		variant: 'list' | 'detail' | '';
		data?: FacilityListResponse;
	} = $props();

	let variantData = $derived(variant === 'list' ? data : $facilityCurrent?.poisMatch);
	let addressLabel = $derived(
		[pickText(variantData?.address, $langState), pickText(variantData?.addressDetail, $langState)]
			.filter(Boolean)
			.join(' '),
	);

	const distanceMeters = $derived.by(() => {
		const currentLat = $userPosition?.latitude;
		const currentLng = $userPosition?.longitude;
		const poiLat = Number(variantData?.latitude);
		const poiLng = Number(variantData?.longitude);
		if (
			!variantData ||
			variantData.latitude == null ||
			variantData.longitude == null ||
			!Number.isFinite(currentLat) ||
			!Number.isFinite(currentLng) ||
			!Number.isFinite(poiLat) ||
			!Number.isFinite(poiLng)
		)
			return null;

		return calculateDistanceMeters(
			{ latitude: currentLat as number, longitude: currentLng as number },
			{ latitude: poiLat, longitude: poiLng },
		);
	});
	const distanceLabel = $derived(formatDistance(distanceMeters));
	const showPermissionGuide = $derived(['prompt', 'denied', 'unsupported'].includes($locationPermission));
	const showLocationRow = $derived(Boolean(addressLabel || distanceLabel || showPermissionGuide));
</script>

{#if showLocationRow}
	<dl class="flex items-center gap-2 px-5 py-1">
		{#if distanceLabel || showPermissionGuide}
			<dt class="flex items-center gap-1 text-sm font-bold text-black">
				<Icons name="map-pin-filled" cls="size-4 fill-slate-400 stroke-slate-400" />
				{showPermissionGuide ? m.usr_map_002_44({ locale: $langState }) : distanceLabel}
			</dt>
		{/if}
		{#if addressLabel && !showPermissionGuide}
			<dd class=" text-sm text-slate-500">{addressLabel}</dd>
		{/if}
	</dl>
{/if}
