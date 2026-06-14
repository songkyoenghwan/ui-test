<svelte:options
	customElement={{
		tag: 'main-news',
		shadow: 'none',
		props: {
			list: { type: 'Array' },
		},
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	interface News {
		link: string;
		img: string;
		tit: string;
		date: string;
	}
	let { list = [] }: { list: News[] } = $props();

	let lists = $derived(list);
</script>

<section class="max-w-dvw overflow-hidden py-5 max-lg:space-y-5 lg:py-15">
	<sub-heading-line
		line="none"
		title={m.main_title_news?.()}
		subTit={m.main_subtitle_news?.()}
		btnRender="link"
		link="/news/news"
	></sub-heading-line>

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
		class="before:from-f0f0f0 after:from-f0f0f0 relative w-[calc(100dvw+40px)] max-w-dvw before:absolute before:left-0 before:z-2 before:h-full before:w-20 before:bg-linear-to-r before:to-transparent after:absolute after:top-0 after:right-10 after:z-2 after:h-full after:w-20 after:bg-linear-to-l after:to-transparent lg:w-[calc(100%+80px)] lg:before:left-0 lg:after:right-20"
	>
		{#each lists as { link, img, tit, date }, i (`new-slide-${i}`)}
			<swiper-slide class="h-full w-75 select-none lg:w-100">
				<a href={link} aria-label={`${tit} page`} class="w-full overflow-clip rounded-xl bg-white">
					<picture class="bg-light-blue flex h-45.5 overflow-clip rounded-t-xl transition-all lg:h-56.25">
						<img
							loading="lazy"
							src={img ? img : `${__STATIC_URL__}/imgs/visual/img-none.jpg`}
							alt={`${tit} exemple image`}
							class="w-full object-cover"
						/>
					</picture>
					<dl class="text-2md lg:43.5 flex h-35 flex-col justify-between overflow-clip rounded-b-xl bg-white p-5 text-xl">
						<dt class="line-clamp-2 text-lg lg:text-2xl">
							{tit}
						</dt>
						<dd class="text-666 text-right">{date}</dd>
					</dl>
				</a>
			</swiper-slide>
		{/each}
	</swiper-container>
</section>
