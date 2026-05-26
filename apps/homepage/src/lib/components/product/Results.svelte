<script lang="ts">
	import ResultItem from '$lib/components/list/ResultItem.svelte';
	import SubHeading from '$lib/components/heading/SubHeading.svelte';
	let { tit = '', txt = '', subTxt = '', lists = [] } = $props();
</script>

<section data-scroll="slide-up" class="space-y-5 rounded-xl py-11.25 lg:space-y-7.5 lg:py-15">
	<SubHeading {tit} {txt} {subTxt} />
	<ul
		class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5 md:grid-cols-[repeat(auto-fit,minmax(calc(50%-20px),1fr))] lg:grid-cols-[repeat(auto-fit,minmax(calc(25%-20px),1fr))]"
	>
		{#each lists as list, i (`result-item-${i}`)}
			<ResultItem result={list.result} num={list.num} subTit={list.subTit} txt={list.txt} />
		{/each}
	</ul>
</section>
