<svelte:options
	customElement={{
		tag: 'sub-heading-line',
		shadow: 'none',
		props: {
			title: { type: 'String' },
			subTit: { type: 'String' },
			btnRender: { type: 'String' },
			link: { type: 'String' },
			cls: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	import { visualMotion } from '$lib/components/heading/HeadingMotion.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { parseBreakline } from '$lib/utils/textUtils.svelte';

	let { line = 'bottom', title = '', subTit = '', btnRender = '', cls = '', page = '', link = '' } = $props();

	const titParse = $derived(parseBreakline(title));

	let txt = $derived.by(() => {
		const currentTitle = title.toLocaleLowerCase();

		if (currentTitle === 'news') {
			return m.page_subtitle_news();
		}

		if (currentTitle === 'company') {
			return m.page_subtitle_company();
		}

		if (currentTitle === 'contact') {
			return m.page_subtitle_contact();
		}

		return '';
	});
</script>

<header
	{@attach visualMotion}
	class={[
		'flex justify-between pb-5 opacity-100 max-lg:flex-col lg:whitespace-pre-line',
		line === 'bottom' ? 'border-b border-b-black lg:pb-15' : 'lg:pb-7.5',
		title.toLocaleLowerCase() === 'news' ? 'pt-5 lg:pt-15' : '',
		title.toLocaleLowerCase() === 'company' ? 'pt-5 lg:pt-15' : '',
		title.toLocaleLowerCase() === 'contact' ? 'pt-5 lg:pt-15' : '',
		page.toLocaleLowerCase() === 'term' ? 'pt-5 lg:pt-15' : '',
	]}
>
	<div class={cls ? cls : 'space-y-2.5'}>
		{#if title.toLocaleLowerCase() === 'news' || title.toLocaleLowerCase() === 'company' || title.toLocaleLowerCase() === 'contact'}
			<h1 class="text-3xl leading-tight font-bold transition-all lg:text-6xl">{titParse}</h1>
			<h2 class="sr-only">{title}</h2>
		{:else}
			<h2 class="text-3xl leading-tight font-bold transition-all lg:text-6xl">{titParse}</h2>
		{/if}

		<p class="text-2md transition-all lg:text-2xl">{subTit ? subTit : txt}</p>
	</div>

	{#if btnRender === 'link'}
		<div class="max-lg:mt-5">
			<a
				href={`${link ?? '/'}`}
				class="group flex min-h-12 flex-1 items-center justify-between gap-2 rounded-md border border-black px-5 transition-colors hover:bg-white hover:text-white max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:flex-none"
				aria-label={txt}
			>
				<span>{m.btn_more()}</span>
				<icon-list name="arrow-right" class="group-hover:stroke-primary size-6 stroke-black"></icon-list>
			</a>
		</div>
	{/if}
</header>
