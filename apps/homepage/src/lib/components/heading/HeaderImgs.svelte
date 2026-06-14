<svelte:options
	customElement={{
		tag: 'header-imgs',
		shadow: 'none',
		props: {
			name: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { tick } from 'svelte';

	const left = `${__STATIC_URL__}/imgs/logo/img-header.png`;
	const logo = `${__STATIC_URL__}/imgs/logo/logo-deepfine.svg`;
	const logi = `${__STATIC_URL__}/imgs/logo/logo-main-logi.svg`;
	const dao = `${__STATIC_URL__}/imgs/logo/logo-main-dao.svg`;
	const dsc = `${__STATIC_URL__}/imgs/logo/logo-main-dsc.svg`;

	let { name = '' } = $props<{ name?: string }>();

	const imgMap = {
		logo,
		left,
		logi,
		dao,
		dsc,
	} as const;

	let activeImg = $derived(name in imgMap ? imgMap[name as keyof typeof imgMap] : null);
	let vid: HTMLVideoElement | null = $state(null);
	let w = $state(typeof window !== 'undefined' ? window.innerWidth : 0);
	const isDesktop = $derived(w >= 1280);

	let gnbMenuChk: HTMLInputElement | null = $state(null);

	$effect(() => {
		if (name === 'left') {
			gnbMenuChk = document?.getElementById('gnb-menu') as HTMLInputElement;

			const handleToggle = () => {
				if (!vid) return;

				if (gnbMenuChk?.checked && isDesktop) {
					tick().then(() => {
						vid?.play().catch((err) => console.warn('비디오 재생 거부:', err));
					});
				} else {
					vid?.pause();
				}
			};

			gnbMenuChk.addEventListener('change', handleToggle);

			return () => {
				gnbMenuChk?.removeEventListener('change', handleToggle);
				vid?.pause();
			};
		}
	});
</script>

<svelte:window bind:innerWidth={w} />

{#if name === 'logo'}
	<picture class="flex w-full">
		<img
			loading="lazy"
			src={activeImg}
			alt="DEEP.FINE An AI and spatial intelligence solution company empowering industrial operations"
			class="w-41.75 lg:w-full"
		/>
	</picture>
{/if}

{#if name === 'logi' || name === 'dao' || name === 'dsc'}
	<figure
		class={[
			'text-2sm flex h-22.5 w-full items-center justify-between bg-cover bg-center bg-no-repeat px-5 text-white',
			name === 'logi'
				? 'bg-(image:--bg-head-logi) group-hover/head-logo:bg-(image:--bg-head-logi-on) group-aria-[current=page]/head-logo:bg-(image:--bg-head-logi-on) '
				: '',
			name === 'dao'
				? 'bg-(image:--bg-head-dao) group-hover/head-logo:bg-(image:--bg-head-dao-on) group-aria-[current=page]/head-logo:bg-(image:--bg-head-dao-on) '
				: '',
			name === 'dsc'
				? 'bg-(image:--bg-head-dsc) group-hover/head-logo:bg-(image:--bg-head-dsc-on) group-aria-[current=page]/head-logo:bg-(image:--bg-head-dsc-on) '
				: '',
		]}
		style:--bg-head-logi={`url(${__STATIC_URL__}/imgs/logo/bg-header-logi-off.jpg)`}
		style:--bg-head-dao={`url(${__STATIC_URL__}/imgs/logo/bg-header-dao-off.jpg)`}
		style:--bg-head-dsc={`url(${__STATIC_URL__}/imgs/logo/bg-header-dsc-off.jpg)`}
		style:--bg-head-logi-on={`url(${__STATIC_URL__}/imgs/logo/bg-header-logi-on.jpg)`}
		style:--bg-head-dao-on={`url(${__STATIC_URL__}/imgs/logo/bg-header-dao-on.jpg)`}
		style:--bg-head-dsc-on={`url(${__STATIC_URL__}/imgs/logo/bg-header-dsc-on.jpg)`}
	>
		<img
			loading="lazy"
			src={activeImg}
			alt="DEEP.FINE An AI and spatial intelligence solution company empowering industrial operations"
			class="h-10"
		/>
		<figcaption class="text-right whitespace-pre-line">
			{#if name === 'logi'}
				{m.header_logo_1()}
			{:else if name === 'dao'}
				{m.header_logo_2()}
			{:else if name === 'dsc'}
				{m.header_logo_3()}
			{/if}
		</figcaption>
	</figure>
{/if}

{#if name === 'left'}
	<section class="before:bg-000/70 absolute flex size-full w-full object-cover before:absolute before:z-2 before:size-full">
		<video
			class="absoltue z-1 aspect-video h-full w-full object-cover"
			preload="auto"
			autoplay
			loop
			playsinline
			muted
			poster={`${__STATIC_URL__}/video/main-video.jpg`}
			bind:this={vid}
		>
			<source src={`${__STATIC_URL__}/video/main-video.mp4`} type="video/mp4" />
			<source src={`${__STATIC_URL__}/video/main-video.webm`} type="video/webm" />
		</video>
	</section>

	<div class="relative z-3 flex size-full flex-col items-center justify-center gap-15">
		<picture class="flex w-full justify-center">
			<img
				loading="lazy"
				src={activeImg}
				alt="DEEP.FINE An AI and spatial intelligence solution company empowering industrial operations"
				class="max-w-72.25 lg:w-full"
			/>
		</picture>
		<p class="max-w-135 text-center text-2xl text-white">
			An AI and spatial intelligence solution company empowering industrial operations
		</p>
	</div>
{/if}

{#if name === 'logo'}
	<footer-lang class="sr-only"></footer-lang>
	<!-- 컴포넌언 언어팩 변경 부분  -->
{/if}
