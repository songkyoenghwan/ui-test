<svelte:options
	customElement={{
		tag: 'main-visual',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	const videoUrl = $derived(import.meta.env.PROD ? '/build/video/main-video.webm' : '/video/main-video.webm');
	import bg from '$lib/assets/imgs/visual/dao-visual.jpg';
	import badgeBg from '$static/imgs/badge/main-badge.png?url';
</script>

<section
	data-scroll="first"
	class="relative flex max-h-dvh min-h-[60dvh] flex-col justify-between overflow-clip rounded-xl bg-cover bg-center p-5 text-white opacity-100 max-lg:rounded-lg md:min-h-160 lg:min-h-200 lg:p-15 starting:translate-y-0 starting:opacity-0"
	style={`background-image: url('${bg}')`}
>
	<div
		class="before:[''] absolute top-0 left-0 h-full w-full object-cover before:absolute before:top-0 before:left-0 before:z-3 before:size-full before:bg-linear-to-t before:from-black before:to-black/0"
	>
		<video class="relative z-1 aspect-video h-full w-full object-cover" autoplay muted playsinline loop>
			<source src={videoUrl} type="video/webm" />
		</video>
	</div>

	<div class="relative z-5 starting:opacity-0">
		<div>
			<p
				class="inline-flex min-h-12 items-center gap-2 bg-(image:--badge-bg) bg-contain bg-center bg-no-repeat px-5 py-1 text-lg leading-none font-bold lg:text-2xl"
				style="--badge-bg: url('{badgeBg}'); "
			>
				{m.main_visual_badge()}
			</p>
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
				class="hover:text-3743ff text-2md inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold transition-colors hover:bg-white max-lg:justify-between lg:min-h-13.5 lg:w-auto"
			>
				<span>{m.btn_inquiry()}</span>
				<icon-list name="arrow-right" class="group-hover:stroke-primary size-6 stroke-white"></icon-list>
			</a>
		</div>
	</div>
</section>
