<svelte:options
	customElement={{
		tag: 'main-visual',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { parseBreakline } from '$lib/utils/textUtils.svelte';

	let { videoUrl = '', bg = '', badge = '', logo = '', logoAlt = '', tit = '', subtit = '', btnTxt = '' } = $props();
</script>

<section
	data-scroll="first"
	class="relative flex max-h-dvh min-h-[70dvh] flex-col justify-between overflow-clip rounded-xl bg-cover bg-center p-5 text-white opacity-100 max-lg:rounded-lg md:min-h-160 lg:min-h-200 lg:p-15 starting:translate-y-0 starting:opacity-0"
	style={`background-image: url('${bg}')`}
>
	<div
		class="before:[''] absolute top-0 left-0 h-full w-full object-cover before:absolute before:top-0 before:left-0 before:z-3 before:size-full before:bg-linear-to-t before:from-black before:to-black/0"
	>
		<video class="relative z-1 aspect-video h-full w-full object-cover" autoplay muted playsinline loop>
			<source src="/assets/video/main-video.mp4" type="video/mp4" />
		</video>
	</div>

	<div class="relative z-5 starting:opacity-0">
		<div>
			{#if badge}
				<p
					class="before:bg-7cf5a0 inline-flex min-h-7.5 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4.5 py-1 text-xs leading-none font-bold before:size-1.5 before:rounded-full"
				>
					{badge}
				</p>
			{/if}

			{#if logo}
				<picture class="flex h-10 lg:h-15">
					<enhanced:img src={logo} alt={logoAlt} class="h-full" sizes="(min-width: 1280px) 60px, 40px" />
				</picture>
			{/if}
		</div>

		<h2 class="leading-sung mt-5 text-3xl font-bold delay-75 lg:mt-7.5 lg:text-[3.75rem]">{parseBreakline(tit)}</h2>
	</div>

	<div class="relative z-5 starting:opacity-0">
		<p class="text-2md mt-5 leading-normal text-white lg:text-lg">{parseBreakline(subtit)}</p>

		<div class="mt-7.5 flex lg:mt-9 lg:inline-flex">
			<button
				type="button"
				class="hover:text-3743ff text-2md min-h-12 w-full rounded-md border border-white px-7.5 text-left font-bold transition-colors hover:bg-white lg:min-h-13.5"
			>
				<span>{btnTxt}</span>
			</button>
		</div>
	</div>
</section>
