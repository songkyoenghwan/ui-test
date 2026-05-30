<svelte:options
	customElement={{
		tag: 'sub-industries',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import SubHeading from '$lib/components/heading/SubHeading.svelte';

	let { tit = '', txt = '', subTxt = '', lists = [], cls = '' } = $props();
</script>

{#snippet contentIndustries(tit = '', txt = '', icon = '')}
	<li data-scroll="slide-up" class="bg-ebedff relative grid place-items-center gap-5 rounded-xl p-5 text-center lg:p-7.5">
		<picture class="grid size-22.5 place-content-center">
			<img loading="lazy" src={icon} alt={tit} />
		</picture>
		{#if tit}
			<p class="text-lg font-bold lg:text-2xl">{tit}</p>
		{/if}

		{#if txt}
			<p class="text-2md text-666 lg:text-lg">{txt}</p>
		{/if}
	</li>
{/snippet}

<section class="space-y-5 overflow-clip py-11.25 lg:space-y-7.5 lg:py-15">
	<div class="space-y-5 rounded-xl bg-white p-5 lg:space-y-15 lg:p-15">
		<SubHeading {tit} {txt} {subTxt} />
		<ul class={['grid gap-5', cls]}>
			{#each lists as item, i (i)}
				{@render contentIndustries(item.tit, item.txt, item.img)}
			{/each}
		</ul>
	</div>
</section>
