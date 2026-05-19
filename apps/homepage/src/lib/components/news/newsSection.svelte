<svelte:options
	customElement={{
		tag: 'news-section',
		shadow: 'none',
	}}
/>

<script lang="ts">
	let { layout = '', img = '', badges = '', title = '', text = '', date = '', source = '', url = '' } = $props();

	const hasComma = $derived(String(badges).includes(','));
	let badgeList = $derived(
		String(badges)
			.split(',')
			.map((s) => s.trim()),
	);
</script>

{#snippet badgeRender(badge = '')}
	<p class="bg-light-blue text-primary grid flex-none place-content-center rounded-full px-5 py-1 font-bold">{badge}</p>
{/snippet}

{#snippet imgRender(img = '')}
	{#if img}
		<picture class={`grid place-content-center overflow-clip rounded-xl transition-all ${layout === 'list' ? 'h-45 lg:h-75 lg:w-133.5' : ' '}`}>
			<img src={img} alt="" class="w-full max-w-300 object-cover" />
		</picture>
	{/if}
{/snippet}

{#snippet newsRender(img = '', badges = '', title = '', text = '', date = '', source = '', url = '')}
	<div class="flex flex-col gap-5">
		<div class="inline-flex flex-wrap gap-3">
			{#if hasComma}
				{#each badgeList as badge}
					{@render badgeRender(badge)}
				{/each}
			{:else}
				{@render badgeRender(badges)}
			{/if}
		</div>

		<h4 class="text-lg font-bold lg:text-4xl">{title}</h4>

		{#if layout !== 'list'}
			<div class="lg:py-5">
				{@render imgRender(img)}
			</div>
		{/if}

		<p>{@html text}</p>

		<div class="text-666 text-2md mt-auto flex justify-between gap-2 lg:pt-2.5 lg:text-lg">
			{#if source}
				<p class="font-bold">{source}</p>
			{/if}
			<p class="flex-1 text-right">{date}</p>
		</div>

		{#if url}
			<div class="border-t-d9d9d9 text-666 text-2md flex flex-col gap-2 border-t border-dashed pt-5 lg:flex-row lg:items-center lg:gap-7.5 lg:pt-7.5 lg:text-lg">
				<p class="font-bold">URL</p>
				<p class="flex-1">{url}</p>
			</div>
		{/if}
	</div>
{/snippet}

{#if layout === 'list'}
	<section class="text-2md grid gap-5 rounded-xl bg-white p-5 drop-shadow-md transition-all lg:grid lg:grid-cols-[534px_1fr] lg:gap-15">
		{@render imgRender(img)}

		{@render newsRender(img, badges, title, text, date, source)}
	</section>
{:else}
	<section class="text-2md grid gap-5 rounded-xl bg-white p-5 drop-shadow-md transition-all lg:gap-15 lg:p-15">
		{@render newsRender(img, badges, title, text, date, source, url)}
	</section>
{/if}
