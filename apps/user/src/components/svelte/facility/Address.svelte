<script lang="ts">
	import { getDistance, langState, pickText } from '@/stores/globalStore';
	import { poiList } from '@/stores/pageDataStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import type { FacilityListResponse } from '@/types/facilities';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';

	let {
		variant = '',
		data,
	}: {
		variant: 'list' | 'detail' | '';
		data?: FacilityListResponse;
	} = $props();

	const poisMatch = !$poiList.length
		? null
		: ($poiList.find((p) => p.facilityPoiMappings?.some((mapping) => mapping.facilityId === data?.id)) ?? null);
	let variantData = $derived(variant === 'list' ? poisMatch : $facilityCurrent?.poisMatch);

	$effect(() => {
		if (!navigator.geolocation) return;

		const watchId = navigator.geolocation.watchPosition(
			(position) => {
				getDistance.set({
					lat: String(position.coords.latitude),
					lng: String(position.coords.longitude),
				});
			},
			undefined,
			{ enableHighAccuracy: true },
		);

		return () => {
			navigator.geolocation.clearWatch(watchId);
		};
	});

	//하버사인 공식
	function getDistanceMeters(currentLat: number, currentLng: number, poiLat: number, poiLng: number) {
		const toRadians = (degree: number) => (degree * Math.PI) / 180;
		const latitudeDelta = toRadians(poiLat - currentLat);
		const longitudeDelta = toRadians(poiLng - currentLng);
		const a =
			Math.sin(latitudeDelta / 2) ** 2 +
			Math.cos(toRadians(currentLat)) * Math.cos(toRadians(poiLat)) * Math.sin(longitudeDelta / 2) ** 2;

		return 6_371_000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	}

	const distanceMeters = $derived.by(() => {
		const currentLat = Number($getDistance.lat);
		const currentLng = Number($getDistance.lng);
		if (!variantData || !Number.isFinite(currentLat) || !Number.isFinite(currentLng)) return null;

		return getDistanceMeters(currentLat, currentLng, variantData.latitude, variantData.longitude);
	});
	const distanceLabel = $derived(
		distanceMeters == null
			? null
			: distanceMeters < 1_000
				? `${Math.round(distanceMeters)}m`
				: `${(distanceMeters / 1_000).toFixed(1)}km`,
	);
</script>

{#if variantData?.address}
	<dl class="flex items-center gap-2 px-5 py-1">
		<dt class="flex items-center gap-1 text-sm font-bold text-black">
			<Icons name="map-pin-filled" cls="size-4 fill-slate-400 stroke-slate-400" />
			{distanceLabel ?? '-'}
		</dt>
		<dd class=" text-sm text-slate-500">{pickText(variantData?.address, $langState)}</dd>
	</dl>
{/if}
