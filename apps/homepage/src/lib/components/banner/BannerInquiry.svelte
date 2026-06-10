<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { register } from 'swiper/element/bundle';

	let { page = '' } = $props();

	$effect(() => {
		register();
	});

	const spaceBetween = $state(0);
	const bannerTitleDao = $state([
		m.dao_banner_item_1,
		m.dao_banner_item_2,
		m.dao_banner_item_3,
		m.dao_banner_item_4,
		m.dao_banner_item_5,
		m.dao_banner_item_6,
		m.dao_banner_item_7,
		m.dao_banner_item_8,
		m.dao_banner_item_9,
		m.dao_banner_item_10,
	]);
	const bannerTitleLogi = $state([
		m.logi_banner_item_1,
		m.logi_banner_item_2,
		m.logi_banner_item_3,
		m.logi_banner_item_4,
		m.logi_banner_item_5,
		m.logi_banner_item_6,
		m.logi_banner_item_7,
		m.logi_banner_item_8,
	]);
	let pageKeys = $derived(page === 'dao' ? [...bannerTitleDao] : page === 'logi' ? [...bannerTitleLogi] : []);
	let bg = $derived(page === 'dao' ? `${__STATIC_URL__}/imgs/banner/bg-banner-dao.jpg` : `${__STATIC_URL__}/imgs/banner/bg-banner-logi.jpg`);
	let tit = $derived(page === 'dao' ? m.dao_banner_title() : page === 'logi' ? m.logi_banner_title() : '');
	let tit2 = $derived(page === 'dao' ? m.dao_banner_title_2() : page === 'logi' ? m.logi_banner_title_2() : '');
	let txt = $derived(page === 'dao' ? m.dao_banner_text() : page === 'logi' ? m.logi_banner_text() : '');
	const bannerKeys = $derived(
		Array.from({ length: pageKeys.length }).map((_, i) => {
			const targetFn = pageKeys[i];

			return {
				img: page === 'dao' ? `${__STATIC_URL__}/imgs/banner/img-banner-dao-slide-${i + 1}.png` : `${__STATIC_URL__}/imgs/banner/img-banner-logi-slide-${i + 1}.png`,
				txt: typeof targetFn === 'function' ? (targetFn as () => string)() : '',
			};
		}),
	);
</script>

{#snippet inquiryLi(img: string, txt: string)}
	<swiper-slide class="flex h-full min-h-12 w-full flex-1 items-center justify-center gap-2.5 px-5 lg:min-h-17.5 lg:gap-5 lg:px-7.5">
		<picture class="inline-flex size-7.5 lg:size-12.5"><img loading="lazy" src={img} alt="" class="h-full object-cover" /></picture>

		<h4 class="text-primary text-lg font-bold lg:text-4xl">{txt}</h4>
	</swiper-slide>
{/snippet}

<section
	data-scroll="slide-up"
	class="bg-light-blue flex h-120 flex-col rounded-xl bg-(image:--banner-bg) bg-cover bg-center bg-no-repeat p-5 text-white lg:h-165 lg:p-15"
	style:--banner-bg={`url(${bg})`}
>
	<div class={['flex flex-col gap-2', page === 'logi' ? 'space-y-5' : '']}>
		<h3 class="text-2xl leading-tight font-bold text-white lg:text-5xl">{tit}</h3>
		<div class={['max-lg:space-y-2.5 lg:gap-5', page === 'dao' ? 'space-y-5' : page === 'logi' ? 'space-y-5' : '']}>
			<swiper-container
				loop={true}
				slides-per-view={1}
				space-between={spaceBetween}
				speed="450"
				autoplay-delay="1500"
				direction="vertical"
				class={['flex h-12 flex-none justify-between rounded-full bg-white shadow-md lg:h-17.5', page === 'dao' ? 'lg:w-107.5' : page === 'logi' ? 'lg:w-155' : '']}
			>
				<!-- 	a-->
				{#each bannerKeys as list}
					{@render inquiryLi(list.img, list.txt)}
				{/each}
			</swiper-container>
			<h3 class="text-2xl leading-tight font-bold text-white lg:text-5xl">{tit2}</h3>
		</div>
		<p class="text-2md whitespace-pre-line text-white lg:mt-5 lg:text-2xl">{txt}</p>
	</div>

	<div class="mt-auto">
		<a
			href={page === 'logi'
				? '/contact/contact?selectSolution=LOGI.FINE'
				: page === 'dao'
					? '/contact/contact?selectSolution=DAO'
					: page === 'dsc'
						? '/contact/contact?selectSolution=DSC'
						: '/contact/contact'}
			class="text-2md group inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold transition-colors hover:bg-white hover:text-black max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:text-lg"
			aria-label={page === 'logi' ? m.btn_start_trial?.() : m.btn_inquiry()}
		>
			<span>{page === 'logi' ? m.btn_start_trial?.() : m.btn_inquiry()}</span>
			<icon-list name="arrow-right" class="size-6 stroke-white group-hover:stroke-black"></icon-list>
		</a>
	</div>
</section>
