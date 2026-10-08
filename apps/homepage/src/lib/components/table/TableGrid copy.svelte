<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		thead,
		tbody,
		cls = '',
		bodyCls = '',
	} = $props<{
		thead: Snippet;
		tbody: Snippet;
		cls?: string;
		bodyCls?: string;
	}>();
</script>

<div
	class="border-table-outline grid min-h-0 w-[calc(100dvw-200px)] grid-rows-[60px_minmax(0,1fr)] overflow-x-auto overflow-y-auto rounded-lg border text-black max-[1440px]:w-[calc(100dvw-220px)] max-[1440px]:has-data-[width=full]:w-full max-sm:w-[calc(100dvw-170px)] max-sm:has-data-[width=full]:w-full min-[1440px]:w-[calc(100dvw-445px)] min-[1440px]:has-data-[width=full]:w-full"
>
	<ul class="border-table-outline bg-bkg-th grid h-full flex-none border-b text-lg max-sm:text-sm {cls}">
		{@render thead()}
	</ul>

	<ul class={['bg-bkg divide-table-outline flex flex-col divide-y  rounded-b-lg text-lg max-sm:text-sm', bodyCls]}>
		{@render tbody()}
	</ul>
</div>
