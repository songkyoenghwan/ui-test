<svelte:options
	customElement={{
		tag: 'sub-heading-line',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { visualMotion } from '$lib/components/heading/HeadingMotion.svelte';
	import { parseBreakline } from '$/lib/utils/textUtils.svelte';
	import { m } from '$lib/paraglide/messages.js';

	let { line = 'bottom', title = '' } = $props();

	const titParse = $derived(parseBreakline(title));

	let txt = $derived.by(() => {
		const currentTitle = title.toLocaleLowerCase();

		if (currentTitle === 'news') {
			return m.page_subtitle_news();
		}

		if (currentTitle === 'compnay') {
			return m.page_subtitle_company();
		}

		if (currentTitle === 'contact') {
			return m.page_subtitle_contact();
		}

		return '';
	});
</script>

<header {@attach visualMotion} class="space-y-2.5 {line === 'bottom' ? 'border-b border-b-black' : ''} pb-5 opacity-100 lg:pb-15">
	<h2 class="text-3xl font-bold transition-all lg:text-6xl">{titParse}</h2>
	<p class="text-2md transition-all lg:text-lg">{txt}</p>
</header>
