<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { register } from 'swiper/element/bundle';

	let { page = '' } = $props();

	$effect(() => {
		register();
	});

	const spaceBetween = $state(0);
	const bannerTitleFunctions = [
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
	] as const;
	let pageKeys = $derived(page === 'dao' ? [...bannerTitleFunctions] : []);
	let bg = $derived(
		page === 'dao' ? `${__STATIC_URL__}/imgs/banner/bg-banner-dao.png` : `${__STATIC_URL__}/imgs/banner/bg-banner-logi.png`,
	);
	let tit = $derived(page === 'dao' ? m.dao_banner_title?.() : '');
	let tit2 = $derived(page === 'dao' ? m.dao_banner_title_2?.() : '');
	let txt = $derived(page === 'dao' ? m.dao_banner_text?.() : '');
	const bannerKeys = $derived(
		Array.from({ length: pageKeys.length }).map((_, i) => {
			const targetFn = pageKeys[i];

			return {
				img: `${__STATIC_URL__}/imgs/banner/img-banner-dao-${i + 1}.png`,
				txt: typeof targetFn === 'function' ? (targetFn as () => string)() : '',
			};
		}),
	);
</script>

{#snippet inquiryLi(img: string, txt: string)}
	<swiper-slide class="flex min-h-12 items-center justify-center gap-2.5 px-5 lg:min-h-17.75 lg:gap-5 lg:px-15">
		<picture class="inline-flex size-7.5 lg:size-12.5"><img loading="lazy" src={img} alt="" class="h-full object-cover" /></picture>

		<h4 class="text-primary text-lg font-bold lg:text-4xl">{txt}</h4>
	</swiper-slide>
{/snippet}

<section
	data-scroll="slide-up"
	class="bg-light-blue flex h-120 flex-col rounded-xl bg-(image:--banner-bg) bg-cover bg-center bg-no-repeat p-5 text-white lg:h-165 lg:p-15"
	style:--banner-bg={`url(${bg})`}
>
	<div class="flex flex-col gap-1">
		<h3 class="text-2xl leading-tight font-bold text-white lg:text-5xl">{tit}</h3>
		<div class="max-lg:space-y-2.5 lg:flex lg:items-center lg:gap-5">
			<swiper-container
				effect="cube"
				cube-effect-shadow={false}
				cube-effect-slide-shadows={false}
				loop={true}
				slides-per-view={1}
				space-between={spaceBetween}
				speed="450"
				autoplay-delay="1500"
				class="flex flex-none rounded-full bg-white shadow-md lg:w-107.5"
			>
				{#each bannerKeys as list}
					{@render inquiryLi(list.img, list.txt)}
				{/each}
			</swiper-container>
			<h3 class="text-2xl leading-tight font-bold text-white lg:text-5xl">{tit2}</h3>
		</div>
		<p class="text-2md mt-5 whitespace-pre-line text-white lg:text-2xl">{txt}</p>
	</div>

	<div class="mt-auto">
		<a
			href="/"
			class="hover:text-3743ff text-2md group inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold transition-colors hover:bg-white max-lg:justify-between lg:min-h-13.5 lg:w-auto"
		>
			<span>{m.btn_inquiry()}</span>
			<icon-list name="arrow-right" class="group-hover:stroke-primary size-6 stroke-white"></icon-list>
		</a>
	</div>
</section>
