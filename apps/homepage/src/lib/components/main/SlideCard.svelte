<svelte:options
	customElement={{
		tag: 'main-card',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { register } from 'swiper/element/bundle';

	const cardList = $state([
		{
			badge: [m.main_mro_badge_1?.(), m.main_mro_badge_2?.()],
			txt: m.main_mro_txt_1?.(),
			img: `${__STATIC_URL__}/imgs/main/slide/img-card-1.png`,
			logo: `${__STATIC_URL__}/imgs/main/slide/img-logo-1.png`,
		},
		{
			badge: [m.main_mro_badge_3?.(), m.main_mro_badge_2?.()],
			txt: m.main_mro_txt_2?.(),
			img: `${__STATIC_URL__}/imgs/main/slide/img-card-2.png`,
			logo: `${__STATIC_URL__}/imgs/main/slide/img-logo-2.png`,
		},
		{
			badge: [m.main_mro_badge_4?.(), m.main_mro_badge_5?.()],
			txt: m.main_mro_txt_3?.(),
			img: `${__STATIC_URL__}/imgs/main/slide/img-card-3.png`,
			logo: `${__STATIC_URL__}/imgs/main/slide/img-logo-3.png`,
		},
		{
			badge: [m.main_mro_badge_6?.(), m.main_mro_badge_7?.()],
			txt: m.main_mro_txt_4?.(),
			img: `${__STATIC_URL__}/imgs/main/slide/img-card-4.png`,
			logo: `${__STATIC_URL__}/imgs/main/slide/img-logo-4.png`,
		},
	]);
	const lists = $derived([...cardList, ...cardList]);

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
		autoHeight: false,
		speed: 300,
		// autoplay: {
		// 	delay: 3000,
		// 	disableOnInteraction: false,
		// },
		pagination: false,
	};

	// oxlint-disable-next-line typescript/no-explicit-any
	let swiperEl: HTMLElement | any | null = $state(null);
	let isOn = $state(false);
	let currentIndex = $state(0);

	$effect.pre(() => {
		register();
		isOn = true;

		if (swiperEl) {
			Object.assign(swiperEl, creativeConfig);
			swiperEl.initialize();

			swiperEl.addEventListener('swiperslidechange', (e: any) => {
				const [swiper] = e.detail;
				currentIndex = swiper.realIndex % 4;
			});
		}
	});
</script>

<section data-scroll="slide-up" class="slide-card relative grid max-w-dvw grid-cols-1 overflow-hidden rounded-xl bg-white p-5 lg:grid-cols-[1fr_620px] lg:gap-15 lg:p-15">
	<div data-scroll="slide-up" class="space-y-2.5 lg:space-y-15 lg:whitespace-pre-line">
		<h2 class="text-3xl font-bold transition-all lg:text-6xl">{m.main_title_mro?.()}</h2>
		<p class="text-666 text-base transition-all lg:text-3xl">{m.main_subtitle_mro?.()}</p>
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
					class="group not-[.swiper-slide-active]:bg-7785ff relative h-full min-h-96.5 w-full space-y-2.5 overflow-clip rounded-xl bg-size-[auto_100%] bg-top bg-no-repeat p-2.5 opacity-0 shadow-transparent not-[.swiper-slide-active]:top-2 not-[.swiper-slide-active]:h-[80%] lg:w-125 lg:space-y-5 lg:bg-size-[auto_100%] lg:p-5 lg:nth-[2]:opacity-10 lg:nth-[6]:opacity-10 [.swiper-slide-active]:bg-(image:--bg-card-mo) lg:[.swiper-slide-active]:bg-(image:--bg-card-pc)"
					style:--bg-card-mo={`url(${__STATIC_URL__}/imgs/main/slide/bg-card-mo.png)`}
					style:--bg-card-pc={`url(${__STATIC_URL__}/imgs/main/slide/bg-card.png)`}
				>
					<picture class="flex h-47 overflow-clip rounded-xl transition-all group-not-[.swiper-slide-active]:opacity-0 lg:h-56.25">
						<img loading="lazy" src={list.img} alt="" class="w-full object-cover" />
					</picture>

					<ul class="flex items-center justify-center gap-3 group-not-[.swiper-slide-active]:opacity-0">
						{#each list.badge as bed, i (i)}
							<li class="text-primary rounded-xl bg-white px-3 py-1 font-bold">
								{bed}
							</li>
						{/each}
					</ul>
					<dl class="text-2md flex flex-col justify-between overflow-clip rounded-b-xl text-lg text-white group-not-[.swiper-slide-active]:opacity-0 lg:min-h-35">
						<dt class="text-center text-lg lg:text-2xl">
							{list.txt}
						</dt>
						<dd class=" text-right">
							<picture class="absolute right-5 bottom-5 flex h-6 lg:h-7.5">
								<img loading="lazy" src={list.logo} alt="" class="h-full" />
							</picture>
						</dd>
					</dl>
				</swiper-slide>
			{/each}
		</swiper-container>

		<div class="absolute bottom-2 z-3 inline-flex gap-1">
			{#each cardList.slice(0, 4) as _, y (`dot-${y}`)}
				<p
					class="size-2 rounded-full shadow-md transition-all duration-300"
					class:bg-white={(swiperEl?.swiper?.realIndex ?? 0) % 4 === y}
					class:bg-9097ff={(swiperEl?.swiper?.realIndex ?? 0) % 4 !== y}
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

<style>
</style>
