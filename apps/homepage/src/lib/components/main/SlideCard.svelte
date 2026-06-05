<svelte:options
	customElement={{
		tag: 'main-card',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import type { SwiperContainerElement } from '$lib/types/swiperType';
	import { tick } from 'svelte';
	import { register } from 'swiper/element/bundle';

	const cardList = $state([
		{
			type: 'dao',
			badge: [m.main_mro_badge_1()],
			txt: m.main_mro_txt_1(),
			img: `${__STATIC_URL__}/imgs/main/slide/img-card-1.jpg`,
		},
		{
			type: 'dao',
			badge: [m.main_mro_badge_2()],
			txt: m.main_mro_txt_2(),
			img: `${__STATIC_URL__}/imgs/main/slide/img-card-2.jpg`,
		},
		{
			type: 'logi.fine',
			badge: [m.main_mro_badge_3()],
			txt: [m.main_mro_txt_3()],
			img: `${__STATIC_URL__}/imgs/main/slide/img-card-3.jpg`,
		},
		{
			type: 'dsc',
			badge: [m.main_mro_badge_4()],
			txt: m.main_mro_txt_4(),
			txt2: m.main_mro_txt_4_2(),
			img: `${__STATIC_URL__}/imgs/main/slide/img-card-4.jpg`,
		},
		{
			type: 'dsc',
			badge: [m.main_mro_badge_5()],
			txt: [m.main_mro_txt_5()],
			img: `${__STATIC_URL__}/imgs/main/slide/img-card-5.jpg`,
		},
	]);
	const lists = $state([...cardList, ...cardList]);

	const creativeConfig = {
		effect: 'cards',
		cardsEffect: {
			rotate: false,
			perSlideRotate: 0,
			perSlideOffset: 11,
			slideShadows: false,
		},
		initialSlide: 0,
		grabCursor: false,
		rewind: false,
		loop: true,
		slidesPerView: 1,
		slidesPerGroup: 1,
		loopAdditionalSlides: 2,
		autoHeight: false,
		speed: 300,
		// autoplay: {
		// 	delay: 3000,
		// 	disableOnInteraction: false,
		// },
		pagination: false,
	};

	let swiperEl = $state<SwiperContainerElement | null>(null);
	let swipe = $derived(swiperEl?.swiper);
	let isOn = $state(false);
	let currentIndex = $state(0);
	const handleSlideChange = async () => {
		await tick();
		if (swiperEl) {
			currentIndex = swiperEl.swiper.realIndex % cardList.length;
		}
	};

	$effect(() => {
		register();
		isOn = true;

		if (swiperEl) {
			Object.assign(swiperEl, creativeConfig);
			swiperEl.initialize();
			swiperEl.addEventListener('swiperslidechange', handleSlideChange);

			return () => {
				isOn = false;
				if (swiperEl) {
					swiperEl.removeEventListener('swiperslidechange', handleSlideChange);
					swiperEl = null;
				}
			};
		}
	});
</script>

<section data-scroll="slide-up" class="slide-card relative grid max-w-dvw grid-cols-1 gap-5 overflow-hidden rounded-xl bg-white p-5 lg:grid-cols-[1fr_620px] lg:gap-15 lg:p-15">
	<div data-scroll="slide-up" class="space-y-2.5 lg:space-y-15 lg:whitespace-pre-line">
		<h2 class="text-3xl leading-tight font-bold transition-all lg:text-6xl">{m.main_title_mro()}</h2>
		<p class="text-666 text-base transition-all lg:text-2xl">{m.main_subtitle_mro()}</p>
	</div>

	<div
		data-scroll="slide-up"
		class="relative flex w-full max-w-80.5 items-center justify-center gap-5 not-[:has(.swiper-slide-active)]:hidden empty:hidden max-lg:mx-auto lg:max-w-195"
	>
		<swiper-container
			bind:this={swiperEl}
			init={false}
			class="h-96.5 min-h-96.5 w-full max-w-80.5 *:first:opacity-0 *:last:opacity-0 lg:h-150 lg:w-full lg:max-w-125 *:[.swiper-slide-active]:opacity-100 lg:*:[.swiper-slide-next]:opacity-50 lg:*:[.swiper-slide-prev]:opacity-50"
		>
			{#each lists as list, i (`slide-card-${i}`)}
				<swiper-slide
					class={[
						'group  relative h-full min-h-96.5 w-full space-y-2.5 overflow-clip rounded-xl bg-size-[auto_100%] bg-top bg-no-repeat p-2.5 opacity-0 shadow-transparent not-[.swiper-slide-active]:top-2 not-[.swiper-slide-active]:h-[80%] lg:w-125 lg:space-y-5 lg:bg-size-[auto_100%] lg:p-5 lg:nth-[1]:opacity-10 lg:nth-[10]:opacity-10',
						list.type === 'dao' ? 'not-[.swiper-slide-active]:bg-9cc5e8 [.swiper-slide-active]:bg-(image:--bg-card-dao-pc)' : '',
						list.type === 'dsc' ? 'not-[.swiper-slide-active]:bg-e8d5a7 [.swiper-slide-active]:bg-(image:--bg-card-dsc-pc)' : '',
						list.type === 'logi.fine' ? 'not-[.swiper-slide-active]:bg-7785ff [.swiper-slide-active]:bg-(image:--bg-card-logi-pc)' : '',
					]}
					style:--bg-card-mo={`url(${__STATIC_URL__}/imgs/main/slide/bg-card-mo.png)`}
					style:--bg-card-dao-pc={`url(${__STATIC_URL__}/imgs/main/slide/bg-card-dao.png)`}
					style:--bg-card-dsc-pc={`url(${__STATIC_URL__}/imgs/main/slide/bg-card-dsc.png)`}
					style:--bg-card-logi-pc={`url(${__STATIC_URL__}/imgs/main/slide/bg-card-logi.png)`}
				>
					<picture class="flex h-47 overflow-clip rounded-xl transition-all group-not-[.swiper-slide-active]:opacity-0 lg:h-56.25">
						<img loading="lazy" src={list.img} alt={`${list.type} Example image`} class="w-full object-cover" />
					</picture>

					<ul class="flex items-center justify-center gap-3 group-not-[.swiper-slide-active]:opacity-0">
						{#each list.badge as bed, i (i)}
							<li class="text-primary rounded-xl bg-white px-3 py-1 font-bold">
								{bed}
							</li>
						{/each}
					</ul>
					<div class="text-2md flex flex-col justify-between overflow-clip rounded-b-xl text-lg text-white group-not-[.swiper-slide-active]:opacity-0 lg:min-h-35">
						<p class="text-2md text-center font-bold whitespace-pre-line lg:text-2xl">
							{list.txt}
							{#if list.txt2}
								<span class="block text-center text-sm font-normal lg:text-base">{list.txt2}</span>
							{/if}
						</p>
					</div>

					<p class="absolute right-5 bottom-5 text-white/70">{list.type.toUpperCase()}</p>
				</swiper-slide>
			{/each}
		</swiper-container>

		<div class="absolute bottom-2 z-3 inline-flex gap-1">
			{#each cardList.slice(0, 5) as _, y (`dot-${y}`)}
				<p
					class="size-2 rounded-full shadow-md transition-all duration-300"
					class:bg-white={currentIndex === y}
					class:bg-9097ff={currentIndex !== y}
					class:w-6={currentIndex === y}
				>
					<span class="sr-only">{y + 1}번째 슬라이드 구역</span>
				</p>
			{/each}
		</div>

		{#if isOn}
			<div class="absolute -bottom-1 -left-1 z-1 flex items-center gap-2 rounded-tr-3xl pt-3 lg:bottom-0 lg:left-10 lg:gap-5 lg:px-5">
				<button
					class="hover:bg-primary grid size-9 place-content-center rounded-full bg-black transition-colors lg:size-12"
					onclick={() => {
						swipe?.slidePrev();
					}}
				>
					<span class="sr-only">Slide Prev</span>
					<icon-list name="arrow-right" class="size-6 rotate-180 stroke-white"></icon-list>
				</button>
				<button
					class="hover:bg-primary grid size-9 place-content-center rounded-full bg-black transition-colors lg:size-12"
					onclick={() => {
						swipe?.slideNext();
					}}
				>
					<span class="sr-only">Slide Next</span>
					<icon-list name="arrow-right" class="size-6 stroke-white"></icon-list>
				</button>
			</div>
		{/if}
	</div>
</section>

<style>
</style>
