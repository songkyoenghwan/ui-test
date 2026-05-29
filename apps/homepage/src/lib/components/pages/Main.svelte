<svelte:options
	customElement={{
		tag: 'main-home',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import Industry from '$lib/components/main/Industry.svelte';
	import MainNews from '$lib/components/main/MainNews.svelte';
	import Operations from '$lib/components/main/Operations.svelte';
	import OurProducts from '$lib/components/main/OurProducts.svelte';
	import SlideCard from '$lib/components/main/SlideCard.svelte';
	import Why from '$lib/components/main/Why.svelte';
	import Work from '$lib/components/main/Work.svelte';
	import MainVisual from '$lib/components/visual/MainVisual.svelte';
	import { lenisStore } from '$lib/utils/scrollMove.svelte';
	import Lenis from 'lenis';

	$effect(() => {
		const lenis = new Lenis({
			autoRaf: true,
		});

		lenisStore.setInstance(lenis);

		return () => {
			lenisStore.clear();
		};
	});
</script>

<main class="main">
	<MainVisual />

	<Industry />

	<OurProducts />

	<Work />

	<Why />

	<SlideCard />

	<MainNews />

	<Operations />
</main>
