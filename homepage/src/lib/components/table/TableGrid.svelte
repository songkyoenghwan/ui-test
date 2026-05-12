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

<div class="border-table-outline grid min-h-0 grid-rows-[60px_minmax(0,1fr)] rounded-lg border text-black">
	<ul class="border-table-outline bg-bkg-th grid h-full flex-none border-b text-lg {cls}">
		{@render thead()}
	</ul>

	<ul class={['bg-bkg divide-table-outline flex flex-col divide-y overflow-x-clip overflow-y-auto rounded-b-lg text-lg', bodyCls]}>
		{@render tbody()}
	</ul>
</div>
