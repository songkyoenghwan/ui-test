<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		thead,
		tbody,
		cls = '',
		bodyCls = '',
		wrapClass = '',
	} = $props<{
		thead: Snippet;
		tbody: Snippet;
		cls?: string;
		bodyCls?: string;
		wrapClass?: string;
	}>();
</script>

<div class="border-table-outline grid min-h-0 grid-rows-[60px_minmax(0,1fr)] overflow-x-auto overflow-y-auto rounded-lg border text-black {wrapClass}">
	<ul class="border-table-outline bg-bkg-th grid h-full flex-none border-b text-lg max-sm:text-sm {cls}">
		{@render thead()}
	</ul>

	<ul class={['bg-bkg divide-table-outline flex flex-col divide-y  rounded-b-lg text-lg max-sm:text-sm', bodyCls]}>
		{@render tbody()}
	</ul>
</div>
