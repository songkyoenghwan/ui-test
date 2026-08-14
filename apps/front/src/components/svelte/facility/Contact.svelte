<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import type { FacilityDetailResponse } from '@/types/facilities';
	import { Clipboard } from 'flowbite-svelte';

	type Props = {
		facility?: FacilityDetailResponse;
	};

	let { facility }: Props = $props();

	let value = $derived(`${facility?.contact}`);
	let success = $state(false);
</script>

<div class="flex min-h-12.5 items-center gap-2 px-5 py-1">
	<Icons name="call" cls="size-4 fill-slate-400" />

	<a href="tel:{facility?.contact}" class="text-base text-black">{value}</a>

	<Clipboard bind:value bind:success class="text-2877ff bg-white p-0 text-sm active:bg-slate-50">
		{#if success}
			{m.usr_gps_001_03({ locale: $langState })}
		{:else}
			{m.usr_map_002_47({ locale: $langState })}
		{/if}
	</Clipboard>
</div>
