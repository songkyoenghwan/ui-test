<script lang="ts">
	import MainVisual from '$lib/components/visual/MainVisual.svelte';
	import Industry from '$lib/components/main/Industry.svelte';
	import OurProducts from '$lib/components/main/OurProducts.svelte';
	import SlideCard from '$lib/components/main/SlideCard.svelte';
	import Why from '$lib/components/main/Why.svelte';
	import logo from '$lib/imgs/logo/logo-dao.svg';
	import bg from '$lib/imgs/visual/dao-visual.jpg';
	import { m } from '$lib/paraglide/messages.js';

	import visualVideo from '$lib/assets/main-video.webm';

	const visuel = {
		logoText: m.main_visual_badge(),
		title: m.main_visual_title(),
		subtitle: m.main_visual_subtitle(),
		btnText: m.product_visual_btn(),
	};
</script>

<main class="main">
	<MainVisual videoUrl={visualVideo} {bg} {logo} logoAlt={visuel.logoText} tit={visuel.title} subtit={visuel.subtitle} btnTxt={visuel.btnText}></MainVisual>

	<Industry />

	<OurProducts />

	<Why />

	<SlideCard />

	<section>
		<sub-heading-line line="none" title="DEEP.FINE NEWS" text="딥파인의 산업 AI, 공간지능, 스마트글라스 솔루션 적용 사례와 최신 소식을 확인하세요."></sub-heading-line>

		<swiper-container
			slides-per-view="auto"
			centered-slides="false"
			speed="6000"
			loop="true"
			free-mode="true"
			allow-touch-move="false"
			space-between="30"
			autoplay-delay="0"
			autoplay-disable-on-interaction="false"
			class="-mx-5 w-[calc(100%+40px)]"
		>
			{#each Array(10) as _, i (`new-slide-${i}`)}
				<swiper-slide class="h-full w-75 select-none lg:w-100">
					<a href="/" class="w-full overflow-clip rounded-xl bg-white">
						<picture class="flex h-45.5 overflow-clip rounded-t-xl transition-all lg:h-56.25">
							<img src="https://www.deepfine.com/filestorage/2026/1/23/1aeaeb1a-8e4c-4042-8bea-8cdf124e1515.png" alt="" class="w-full object-cover" />
						</picture>
						<dl class="text-2md lg:43.5 flex h-35 flex-col justify-between overflow-clip rounded-b-xl bg-white p-5 text-xl">
							<dt class="line-clamp-2 text-lg lg:text-2xl">
								{i} DEEP.FINE to Showcase XR-Based Spatial Intelligence Showcase XR-Based Spatial IntelligenceShowcase XR-Based Spatial Intelligence
							</dt>
							<dd class="text-666 text-right">2025. 12. 8</dd>
						</dl>
					</a>
				</swiper-slide>
			{/each}
		</swiper-container>
	</section>
</main>
