<svelte:options
	customElement={{
		tag: 'main-card',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { register } from 'swiper/element/bundle';

	const lists = $derived([
		{
			id: 'card-slide-1',
			badge: [m.main_mro_badge_1?.(), m.main_mro_badge_2?.()],
			txt: m.main_mro_txt_1?.(),
			img: `${__STATIC_URL__}/imgs/main/slide/img-card-1.png`,
			logo: `${__STATIC_URL__}/imgs/main/slide/img-logo-1.png`,
		},
		{
			id: 'card-slide-2',
			badge: [m.main_mro_badge_3?.(), m.main_mro_badge_2?.()],
			txt: m.main_mro_txt_2?.(),
			img: `${__STATIC_URL__}/imgs/main/slide/img-card-2.png`,
			logo: `${__STATIC_URL__}/imgs/main/slide/img-logo-1.png`,
		},
		{
			id: 'card-slide-3',
			badge: [m.main_mro_badge_4?.(), m.main_mro_badge_5?.()],
			txt: m.main_mro_txt_3?.(),
			img: `${__STATIC_URL__}/imgs/main/slide/img-card-3.png`,
			logo: `${__STATIC_URL__}/imgs/main/slide/img-logo-1.png`,
		},
		{
			id: 'card-slide-4',
			badge: [m.main_mro_badge_6?.(), m.main_mro_badge_7?.()],
			txt: m.main_mro_txt_4?.(),
			img: `${__STATIC_URL__}/imgs/main/slide/img-card-4.png`,
			logo: `${__STATIC_URL__}/imgs/main/slide/img-logo-1.png`,
		},
	]);

	// const creativeConfig = {
	// 	effect: 'cards',
	// 	cardsEffect: {
	// 		rotate: false,
	// 		perSlideRotate: 0,
	// 		perSlideOffset: 9,
	// 	},
	// 	grabCursor: true,
	// 	loop: true,
	// 	slidesPerView: 1,
	// 	speed: 400,
	// 	navigation: false,
	// 	autoplay: {
	// 		delay: 5000,
	// 		disableOnInteraction: false,
	// 	},
	// };

	// oxlint-disable-next-line typescript/no-explicit-any
	let swiperEl: HTMLElement | any | null = $state(null);
	let isOn = $state(false);
	$effect.pre(() => {
		register();
		isOn = true;
	});
</script>

<section data-scroll="slide-up" class="relative grid max-w-dvw grid-cols-1 overflow-hidden rounded-xl bg-white p-5 lg:grid-cols-[1fr_500px] lg:gap-15 lg:p-15">
	<sub-heading-line line="none" title={m.main_title_mro?.()} subTit={m.main_subtitle_mro?.()}></sub-heading-line>

	<div
		data-scroll="slide-up"
		class="relative flex w-full max-w-80.5 items-center justify-center gap-5 not-[:has(.swiper-slide-active)]:hidden empty:hidden max-lg:mx-auto lg:max-w-145"
	>
		<swiper-container
			bind:this={swiperEl}
			init="true"
			effect="cards"
			pagination="true"
			speed="450"
			autoplay-delay="3000"
			class="*:bg-7785ff min-h-96.5 w-full max-w-80.5 *:opacity-0 lg:h-150 lg:w-full lg:max-w-125 lg:*:h-100 *:[.swiper-slide-active]:bg-transparent *:[.swiper-slide-active]:bg-[url(/static/imgs/main/slide/bg-card.svg)] *:[.swiper-slide-active]:opacity-100 lg:*:[.swiper-slide-active]:h-150 lg:*:[.swiper-slide-active]:opacity-100 lg:*:[.swiper-slide-next]:h-125 lg:*:[.swiper-slide-next]:opacity-50 lg:*:[.swiper-slide-prev]:h-125 lg:*:[.swiper-slide-prev]:opacity-50"
		>
			{#each lists as list (list.id)}
				<swiper-slide
					class="gorup h-full min-h-96.5 w-full space-y-2.5 overflow-clip rounded-xl bg-(image:--bg-card-mo) bg-size-[auto_100%] bg-top bg-no-repeat p-2.5 opacity-10 shadow-transparent transition-all lg:w-125 lg:space-y-5 lg:bg-(image:--bg-card-pc) lg:bg-size-[auto_100%] lg:p-5"
					style:--bg-card-mo={`url(${__STATIC_URL__}/imgs/main/slide/bg-card-mo.png)`}
					style:--bg-card-pc={`url(${__STATIC_URL__}/imgs/main/slide/bg-card.svg)`}
				>
					<picture class="flex h-47 overflow-clip rounded-xl transition-all lg:h-56.25">
						<img loading="lazy" src={list.img} alt="" class="w-full object-cover" />
					</picture>

					<ul class="flex items-center justify-center gap-3">
						{#each list.badge as bed, i (i)}
							<li class="rounded-full bg-white px-3 py-1">
								{bed}
							</li>
						{/each}
					</ul>
					<dl class="text-2md flex flex-col justify-between overflow-clip rounded-b-xl text-lg text-white lg:min-h-35">
						<dt class="text-center text-lg lg:text-2xl">
							{list.txt}
						</dt>
						<dd class=" text-right">2025. 12. 8</dd>
					</dl>
				</swiper-slide>
			{/each}
		</swiper-container>

		{#if isOn}
			<div class="absolute -bottom-1 -left-1 z-1 flex items-center gap-2 rounded-tr-3xl pt-3 lg:bottom-0 lg:-left-5 lg:gap-5 lg:px-5">
				<button
					class="hover:bg-primary grid size-9 place-content-center rounded-full bg-black transition-colors lg:size-12"
					onclick={() => {
						swiperEl?.swiper?.slidePrev();
					}}
				>
					<span class="sr-only">Slide Prev</span>
					<icon-list name="arrow-right" class="size-6 rotate-180 stroke-white"></icon-list>
				</button>
				<button class="hover:bg-primary grid size-9 place-content-center rounded-full bg-black transition-colors lg:size-12" onclick={() => swiperEl?.swiper?.slideNext()}>
					<span class="sr-only">Slide Next</span>
					<icon-list name="arrow-right" class="size-6 stroke-white"></icon-list>
				</button>
			</div>
		{/if}
	</div>
</section>
