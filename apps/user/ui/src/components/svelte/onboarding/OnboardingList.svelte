<script lang="ts">
	import Swiper from 'swiper';
	import { Navigation, Pagination } from 'swiper/modules';
	import * as m from '@/paraglide/messages.js';
	import { getCurrentTourDestinationId, langState } from '@/stores/globalStore';
	import { loadTourDestinationOnboardings, tourDestinationOnboarding } from '@/stores/pageDataStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';

	let data = $derived($tourDestinationOnboarding);
	let onboardingList = $derived(data?.items ?? []);
	let swiperInstance: Swiper | null = null;

	const linkUrl = $derived(data ? (data.hasBasicSurvey ? '/survey' : '/map') : '#');

	$effect(() => {
		const language = $langState;
		const destinationId = getCurrentTourDestinationId();
		const controller = new AbortController();

		void loadTourDestinationOnboardings(destinationId, language, controller.signal);

		return () => controller.abort();
	});

	$effect(() => {
		if (onboardingList.length === 0) return;

		queueMicrotask(() => swiperInstance?.update());
	});

	const swiperAttach = (node: HTMLElement) => {
		const swiper = new Swiper(node, {
			modules: [Navigation, Pagination],
			slidesPerView: 1,
			spaceBetween: 10,
			centeredSlides: true,
			navigation: {
				nextEl: '.onboarding-button-next',
				prevEl: '.onboarding-button-prev',
			},
			pagination: {
				el: '.onboarding-pagination',
				type: 'bullets',
				clickable: true,
			},
		});
		swiperInstance = swiper;

		return () => {
			if (swiperInstance === swiper) swiperInstance = null;
			swiper.destroy(true, true);
		};
	};
</script>

<div {@attach swiperAttach} class="swiper mt-5 flex h-[calc(100dvh-130px)] flex-1 flex-col justify-center">
	<button
		type="button"
		aria-label="onboarding slide prev"
		class="swiper-button-prev onboarding-button-prev -left-2.5! stroke-white text-white! *:fill-white!"
	>
		<Icons name="arrow-slide" cls="w-5.5 h-10.5 rotate-180 stroke-white" />
	</button>
	<ul class="swiper-wrapper flex h-full **:text-center **:text-white">
		{#each onboardingList as item (item.id)}
			<li class="swiper-slide group/link flex! flex-col items-center">
				<header class="flex flex-none flex-col items-center justify-center break-all *:leading-tight *:tracking-tight">
					<picture class="h-11.25">
						{#if item.subImageUrl}
							<img class="h-full" src={item.subImageUrl} alt={item.title} />
						{/if}
					</picture>

					<h3 class="text-[26px] break-all">{item.title}</h3>
					<p class="mt-2 text-sm leading-tight">{item.description}</p>
				</header>

				<picture class="my-5 h-full min-h-20 flex-1">
					{#if item.mainImageUrl}
						<img class="mx-auto h-full text-center" src={item.mainImageUrl} alt={item.title} />
					{/if}
				</picture>
			</li>
		{/each}
	</ul>
	<div class="swiper-pagination onboarding-pagination"></div>

	<button
		type="button"
		aria-label="onboarding slide next"
		class="swiper-button-next onboarding-button-next -right-2.5! stroke-white text-white! *:fill-white!"
	>
		<Icons name="arrow-slide" cls="w-5.5 h-10.5 stroke-white" />
	</button>
</div>

<div>
	<a
		href={linkUrl}
		aria-label={$langState && m.usr_obd_002_01()}
		class="group relative flex h-10 items-center justify-center rounded-sm bg-white to-[#0f1f42] px-2 py-1 transition-colors hover:bg-(--base-color) hover:text-white active:bg-(--base-color) active:text-white"
	>
		<p class="text-base font-medium text-(--base-color) group-hover:text-white">{$langState && m.usr_obd_002_01()}</p>
	</a>
</div>

<style>
	:global(.swiper-pagination-bullet-active) {
		width: 1.5rem;
		border-radius: 0.25rem;
		background-color: var(--color-fff);
		transition: all ease-in 0.2s;
	}
</style>
