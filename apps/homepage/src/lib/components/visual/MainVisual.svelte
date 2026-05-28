<svelte:options
	customElement={{
		tag: 'main-visual',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { LiquidGlass } from 'liquid-glass-svelte';
</script>

<section
	data-scroll="first"
	class="relative flex max-h-dvh min-h-[60dvh] flex-col justify-between overflow-clip rounded-xl bg-cover bg-center p-5 text-white opacity-100 max-lg:rounded-lg md:min-h-160 lg:min-h-200 lg:p-15 starting:translate-y-0 starting:opacity-0"
>
	<div
		class="before:[''] absolute top-0 left-0 h-full w-full object-cover before:absolute before:top-0 before:left-0 before:z-3 before:size-full before:bg-linear-to-t before:from-black before:to-black/0"
	>
		<video class="relative z-1 aspect-video h-full w-full object-cover" autoplay muted playsinline loop poster={`${__STATIC_URL__}/video/main-video.png`}>
			<source src={`${__STATIC_URL__}/video/main-video.webm`} type="video/webm" />
		</video>
	</div>

	<div class="relative z-5 starting:opacity-0">
		<div class="p-1">
			<LiquidGlass
				class="inline-flex min-h-12 items-center gap-2 rounded-full px-5 py-1 text-lg leading-none font-bold lg:text-2xl"
				options={{
					mainBackgroundColor: 'hsla(0, 0%, 75%, 0.1)',
					mainBlur: '1vw',
					edgeBlur: '0.5vw',
					edgeBackgroundColor: 'hsla(0, 0%, 100%, 0.1)',
					edgeWidth: '1vw',
					edgeGradientWidth: '1vw',
					sheenBlur: '1vw',
					sheenBackgroundColor: 'hsla(0, 0%, 100%, 0.2)',
					sheenWidth: '0.2vw',
				}}
				style="border-radius: 24px;"
			>
				<p>{m.main_visual_badge()}</p>
			</LiquidGlass>
		</div>

		<h2 class="leading-sung mt-5 text-3xl font-bold delay-75 lg:mt-7.5 lg:text-[3.75rem] lg:whitespace-pre-line">{m.main_visual_title()}</h2>
	</div>

	<div class="relative z-5 starting:opacity-0">
		<div class="text-2md mt-5 text-white lg:text-lg lg:whitespace-pre-line">
			<p class="leading-relaxed">{m.main_visual_subtitle_1()}</p>
			<p class="leading-relaxed">{m.main_visual_subtitle_2()}</p>
		</div>
		<div class="mt-7.5 flex lg:mt-9">
			<a
				href="/"
				class="hover:text-3743ff group text-2md inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold transition-colors hover:bg-white max-lg:justify-between lg:min-h-13.5 lg:w-auto"
			>
				<span>{m.btn_inquiry()}</span>
				<icon-list name="arrow-right" class="group-hover:stroke-primary size-6 stroke-white"></icon-list>
			</a>
		</div>
	</div>
</section>
