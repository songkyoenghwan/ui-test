<svelte:options
	customElement={{
		tag: 'main-home',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import Lenis from 'lenis';
	import Industry from '$lib/components/main/Industry.svelte';
	import OurProducts from '$lib/components/main/OurProducts.svelte';
	import SlideCard from '$lib/components/main/SlideCard.svelte';
	import Why from '$lib/components/main/Why.svelte';
	import Work from '$lib/components/main/Work.svelte';
	import MainVisual from '$lib/components/visual/MainVisual.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { lenisStore } from '$lib/utils/scrollMove.svelte';

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

	<section class="-mx-5 max-w-dvw overflow-hidden px-5 py-5 lg:py-15">
		<sub-heading-line line="none" title={m.main_title_news?.()} subTit={m.main_subtitle_news?.()} btnRender="link"></sub-heading-line>

		<swiper-container
			slides-per-view="auto"
			centered-slides={false}
			speed="6000"
			loop={true}
			free-mode={true}
			allow-touch-move={true}
			space-between={30}
			autoplay-delay={1000}
			autoplay-disable-on-interaction={false}
			class="-mx-5 w-[calc(100%+40px)] max-w-dvw"
		>
			{#each Array(10) as _, i (`new-slide-${i}`)}
				<swiper-slide class="h-full w-75 select-none lg:w-100">
					<a href="/" class="w-full overflow-clip rounded-xl bg-white">
						<picture class="flex h-45.5 overflow-clip rounded-t-xl transition-all lg:h-56.25">
							<img
								loading="lazy"
								src="https://www.deepfine.com/filestorage/2026/1/23/1aeaeb1a-8e4c-4042-8bea-8cdf124e1515.png"
								alt=""
								class="w-full object-cover"
							/>
						</picture>
						<dl class="text-2md lg:43.5 flex h-35 flex-col justify-between overflow-clip rounded-b-xl bg-white p-5 text-xl">
							<dt class="line-clamp-2 text-lg lg:text-2xl">
								{i} DEEP.FINE to Showcase XR-Based Spatial Intelligence Showcase XR-Based Spatial IntelligenceShowcase XR-Based
								Spatial Intelligence
							</dt>
							<dd class="text-666 text-right">2025. 12. 8</dd>
						</dl>
					</a>
				</swiper-slide>
			{/each}
		</swiper-container>
	</section>

	<main-operations></main-operations>
</main>
