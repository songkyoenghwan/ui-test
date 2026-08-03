<script lang="ts">
	import * as m from '@/paraglide/messages.js';
	import { langState, pickText } from '@/stores/globalStore';
	import { Navigation, Pagination } from 'swiper/modules';
	import Swiper from 'swiper';
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';

	let { OnboardingList } = $props();

	const getOnboardingFile = (files: { fileType: string; fileUrl: string; fileOriginalName: string }[], lang: string) => {
		const targetType = lang === 'ko' ? 'MAIN' : 'MAIN_GLOBAL';
		return files.find((file) => file.fileType === targetType);
	};

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

		return () => {
			swiper.destroy(true, true);
		};
	};
</script>

<div {@attach swiperAttach} class="swiper mt-5 flex h-[calc(100dvh-130px)] flex-1 flex-col justify-center">
	<button
		type="button"
		aria-label="onboarding slide prev"
		class="swiper-button-prev onboarding-button-prev stroke-white text-white! *:fill-white!"
	></button>
	<ul class="swiper-wrapper flex h-full **:text-center **:text-white">
		{#each OnboardingList as item (item.id)}
			{@const onboardingFile = getOnboardingFile(item.onboardingFiles ?? [], $langState)}
			<li class="swiper-slide group/link flex! flex-col items-center">
				<header class="flex flex-none flex-col items-center justify-center break-all *:leading-tight *:tracking-tight">
					<picture class="h-11.25">
						{#if onboardingFile}
							<img class="h-full" src={onboardingFile.fileUrl} alt={onboardingFile.fileOriginalName} />
						{/if}
					</picture>

					<h3 class="text-[26px] break-all">{pickText(item.name, $langState)}</h3>
					<p class="mt-2 text-sm leading-tight">{pickText(item.description, $langState)}</p>
				</header>

				<picture class="my-5 h-full min-h-20 flex-1">
					{#if onboardingFile}
						<img
							class="mx-auto h-full text-center"
							src={onboardingFile.fileUrl}
							alt={onboardingFile.fileOriginalName}
						/>
					{/if}
				</picture>
			</li>
		{/each}
	</ul>
	<div class="swiper-pagination onboarding-pagination"></div>

	<button
		type="button"
		aria-label="onboarding slide next"
		class="swiper-button-next onboarding-button-next stroke-white text-white! *:fill-white!"
	></button>
</div>

<div>
	<a
		href="/survey"
		target="_blank"
		rel="noopener noreferrer"
		class="group relative flex h-10 items-center justify-center rounded-sm bg-white to-[#0f1f42] px-2 py-1 transition-colors hover:bg-(--base-color) hover:text-white active:bg-(--base-color) active:text-white"
	>
		<p class="text-base font-medium text-(--base-color) group-hover:text-white">{$langState && m.usr_obd_002_01()}</p>
	</a>
</div>

<style>
	:global(.swiper-pagination-bullet-active) {
		background-color: white;
	}
</style>
