<svelte:options
	customElement={{
		tag: 'main-our-products',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	let lists = [
		{
			id: 'our-products1',
			logo: `${__STATIC_URL__}/imgs/logo/logo-main-logi.svg`,
			logoPc: `${__STATIC_URL__}/imgs/logo/logo-main-logi-pc.svg`,
			tit: m.main_our_item_tit_1?.(),
			txt: m.main_our_item_txt_1?.(),
			link: '',
		},
		{
			id: 'our-products2',
			logo: `${__STATIC_URL__}/imgs/logo/logo-main-dao.svg`,
			logoPc: `${__STATIC_URL__}/imgs/logo/logo-main-dao-pc.svg`,
			tit: m.main_our_item_tit_2?.(),
			txt: m.main_our_item_txt_2?.(),
			link: '',
		},
		{
			id: 'our-products3',
			logo: `${__STATIC_URL__}/imgs/logo/logo-main-dsc.svg`,
			logoPc: `${__STATIC_URL__}/imgs/logo/logo-main-dsc-pc.svg`,
			tit: m.main_our_item_tit_3?.(),
			txt: m.main_our_item_txt_3?.(),
			link: '',
		},
	];
	const videoUrl = $derived(import.meta.env.PROD ? '/build/video/main-video.webm' : '/video/main-video.webm');
	let current = $state(0);
	let w = $state(typeof window !== 'undefined' ? window.innerWidth : 0);
	const isDesktop = $derived(w >= 1024);
</script>

<svelte:window bind:innerWidth={w} />

<section class="relative max-w-dvw">
	<sub-heading-line line="none" title="Our Products" subTit={m.main_subtitle_our()}></sub-heading-line>

	<ul class="flex gap-7.5 max-lg:flex-col lg:flex-row">
		{#each lists as list, i (list.id)}
			<li data-scroll="slide-up" class="group/prod relative flex min-h-[40dvh] flex-[0_0_200px] flex-col overflow-clip rounded-xl has-aria-current:flex-1 lg:h-145">
				{#if current === i && isDesktop}
					<div
						class="before:[''] absolute top-0 left-0 z-1 size-full object-cover before:absolute before:top-0 before:left-0 before:z-1 before:size-full before:bg-linear-to-t before:from-black before:to-black/0"
					>
						<video class="relative z-1 aspect-video h-full w-full object-cover" autoplay muted playsinline loop>
							<source src={videoUrl} type="video/webm" />
						</video>
					</div>
				{/if}

				{#if !isDesktop}
					<div
						class="before:[''] absolute top-0 left-0 z-1 size-full object-cover transition-all before:absolute before:top-0 before:left-0 before:z-1 before:size-full before:bg-linear-to-t before:from-black before:to-black/0"
					>
						<video class="relative z-1 aspect-video h-full w-full object-cover" autoplay muted playsinline loop>
							<source src={videoUrl} type="video/webm" />
						</video>
					</div>
				{/if}

				<a
					href="/"
					class="relative flex size-full flex-1 cursor-pointer flex-col justify-between overflow-clip rounded-xl bg-cover bg-center bg-no-repeat p-5 text-white lg:p-15
							{i === 0 ? 'bg-(image:--bg-main-logi)' : ''}
							{i === 1 ? 'bg-(image:--bg-main-dao)' : ''}
							{i === 2 ? 'bg-(image:--bg-main-dsc)' : ''}"
					style:--bg-main-logi={`url(${__STATIC_URL__}/imgs/logo/bg-main-logi.png)`}
					style:--bg-main-dao={`url(${__STATIC_URL__}/imgs/logo/bg-main-dao.png)`}
					style:--bg-main-dsc={`url(${__STATIC_URL__}/imgs/logo/bg-main-dsc.png)`}
					onmouseenter={() => (current = i)}
					onfocus={() => (current = i)}
					aria-current={current === i ? 'true' : !isDesktop ? 'true' : undefined}
				>
					<div class="lg:7.5 relative z-2 flex flex-col gap-5">
						<picture
							class="relative flex min-h-10 opacity-100 transition-all transition-discrete duration-300 @min-xl:group-has-aria-current/prod:opacity-100 starting:rotate-0 starting:opacity-0 {current ===
							i
								? 'relative'
								: 'lg:absolute lg:bottom-[calc(100%-20px)] lg:left-[calc(100%-20px)] lg:h-25 lg:max-h-105 lg:w-105 lg:origin-left lg:rotate-90'}"
						>
							<source media="(min-width: 1024px)" srcset={list.logoPc} />
							<source media="(max-width: 1024px)" srcset={list.logo} />
							<img src={list.logo} alt="" class="h-full" loading="lazy" />
						</picture>
						<dl
							class="text-2md relative space-y-5 opacity-100 transition-all duration-300 lg:text-lg lg:opacity-0 lg:group-has-aria-current/prod:block lg:group-has-aria-current/prod:opacity-100 @min-xl:group-has-aria-current/prod:max-w-3/5 starting:opacity-0"
						>
							<dt class="font-bold">{list.tit}</dt>
							<dd>{list.txt}</dd>
						</dl>
					</div>
					<div class="z-2 mt-auto opacity-100 transition-all duration-300 lg:opacity-0 lg:group-has-aria-current/prod:flex lg:group-has-aria-current/prod:opacity-100">
						<p
							class="text-2md hover:text-primary group inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold transition-colors hover:bg-white max-lg:justify-between lg:min-h-13.5 lg:w-auto"
						>
							<span>{m.btn_detail?.()}</span>
							<icon-list name="arrow-right" class="group-hover:stroke-primary size-6 stroke-white"></icon-list>
						</p>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</section>
