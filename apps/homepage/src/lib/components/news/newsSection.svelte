<svelte:options
	customElement={{
		tag: 'news-section',
		shadow: 'none',
	}}
/>

<script lang="ts">
	interface Props {
		layout?: string;
		img?: string;
		badges?: string;
		title?: string;
		text?: string;
		date?: string;
		source?: string;
		url?: string;
	}

	let { layout = '', img = '', badges = '', title = '', text = '', date = '', source = '', url = '' }: Props = $props();

	let lastBadges = $state('');
	let cachedList: string[] = $state([]);

	const hasComma = $derived(String(badges).includes(','));
	let badgeList = $derived(() => {
		const currentBadges = String(badges);

		if (currentBadges !== lastBadges) {
			lastBadges = currentBadges;
			cachedList = currentBadges.split(/\s*,\s*/);
		}

		return cachedList;
	});

	$effect(() => {
		badgeList();
	});
</script>

{#snippet badgeRender(badge = '')}
	<p class="bg-light-blue text-primary grid flex-none place-content-center rounded-full px-5 py-1 font-bold">{badge}</p>
{/snippet}

{#snippet imgRender(img = '')}
	<picture class={`grid place-content-center overflow-clip rounded-xl bg-white transition-all ${layout === 'list' ? 'h-45 lg:h-75 lg:w-133.5' : ''}`}>
		<img
			loading="lazy"
			src={img !== '' && img !== null && img !== undefined && img !== 'undefined' ? img : `${__STATIC_URL__}/imgs/visual/img-none.jpg`}
			alt={`${title} image`}
			class="w-full max-w-300 object-cover"
		/>
	</picture>
{/snippet}

{#snippet newsRender(img = '', badges = '', title = '', text = '', date = '', source = '', url = '')}
	<div class="flex flex-col gap-5">
		<div class="inline-flex flex-wrap gap-3">
			{#if hasComma}
				{#each cachedList as badge, i (i)}
					{@render badgeRender(badge)}
				{/each}
			{:else}
				{@render badgeRender(badges)}
			{/if}
		</div>

		<h4 class={['font-bold', layout === 'list' ? 'text-lg lg:text-4xl' : 'text-2xl lg:text-5xl']}>{title}</h4>

		{#if layout !== 'list' && img !== '' && img !== null && img !== undefined && img !== 'undefined'}
			<div class="lg:py-5">
				{@render imgRender(img)}
			</div>
		{/if}

		<p class="text-2md lg:py-5 lg:text-lg">{@html text}</p>

		<div class="text-666 text-2md mt-auto flex justify-between gap-2 lg:pt-2.5 lg:text-lg">
			{#if source}
				<p class="font-bold">{source}</p>
			{/if}
			<p class="flex-1 text-right">{date}</p>
		</div>

		{#if url}
			<div class="border-t-d9d9d9 text-666 text-2md flex gap-2 border-t border-dashed pt-5 max-lg:flex-col lg:flex-row lg:items-center lg:gap-7.5 lg:pt-7.5 lg:text-lg">
				<p class="font-bold">URL</p>
				<a href={url} aria-label={title} target="_blank" rel="noopener noreferrer" class="flex-1 break-all underline">{url}</a>
			</div>
		{/if}
	</div>
{/snippet}

{#if layout === 'list'}
	<section data-scroll="slide-up" class="text-2md grid gap-5 rounded-xl bg-white p-5 transition-all lg:grid lg:grid-cols-[534px_1fr] lg:gap-15 lg:p-7.5">
		{@render imgRender(img)}

		{@render newsRender(img, badges, title, text, date, source)}
	</section>
{:else}
	<section data-scroll="first" class="text-2md grid gap-5 rounded-xl bg-white p-5 transition-all lg:gap-15 lg:p-15">
		{@render newsRender(img, badges, title, text, date, source, url)}
	</section>
{/if}
