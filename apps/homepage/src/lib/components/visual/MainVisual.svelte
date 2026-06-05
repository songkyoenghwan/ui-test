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
	class="relative flex max-h-dvh min-h-[70dvh] flex-col justify-between overflow-clip rounded-xl bg-cover bg-center p-5 text-white opacity-100 max-lg:rounded-lg md:min-h-160 lg:min-h-200 lg:p-15 starting:translate-y-0 starting:opacity-0"
>
	<div
		class="before:[''] absolute top-0 left-0 h-full w-full object-cover before:absolute before:top-0 before:left-0 before:z-3 before:size-full before:bg-linear-to-l before:from-black/0 before:to-black"
	>
		<video class="relative z-1 aspect-video h-full w-full object-cover" preload="auto" autoplay loop playsinline muted poster={`${__STATIC_URL__}/video/main-video.jpg`}>
			<source src={`${__STATIC_URL__}/video/main-video.mp4`} type="video/mp4" />
			<source src={`${__STATIC_URL__}/video/main-video.webm`} type="video/webm" />
		</video>
	</div>

	<div class="relative z-5 starting:opacity-0">
		<div class="p-1">
			<LiquidGlass class="inline-flex min-h-12 items-center gap-2 rounded-full px-5 py-1 text-lg leading-none font-bold lg:text-2xl" style="border-radius: 24px;">
				<p>Spatial Intelligence Platform</p>
			</LiquidGlass>
		</div>

		<h1 class="leading-sung mt-5 text-3xl font-bold delay-75 lg:mt-7.5 lg:text-[3.75rem] lg:whitespace-pre-line">{m.main_visual_title()}</h1>
		<h2 class="sr-only">main page</h2>
	</div>

	<div class="relative z-5 starting:opacity-0">
		<div class="text-2md mt-5 text-white lg:text-lg lg:whitespace-pre-line">
			<p class="leading-relaxed">{m.main_visual_subtitle_1()}</p>
			<p class="leading-relaxed">{m.main_visual_subtitle_2()}</p>
		</div>
		<div class="mt-7.5 flex lg:mt-9">
			<a
				href="/contact/contact"
				aria-label={m.btn_inquiry()}
				class="group text-2md inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold transition-colors hover:bg-white hover:text-black max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:text-lg"
			>
				<span>{m.btn_inquiry()}</span>
				<icon-list name="arrow-right" class="size-6 stroke-white group-hover:stroke-black"></icon-list>
			</a>
		</div>
	</div>
</section>
