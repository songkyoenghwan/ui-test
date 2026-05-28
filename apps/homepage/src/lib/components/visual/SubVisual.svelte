<svelte:options
	customElement={{
		tag: 'sub-visual',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { animate, onScroll, stagger } from 'animejs';
	import type { Attachment } from 'svelte/attachments';

	let { videoUrl = '', bg = '', badge = '', logo = '', logoAlt = '', tit = '', subtit = '', btnTxt = '' } = $props();
	let played = $state(false);

	const visualMotion: Attachment<HTMLElement> = (el) => {
		const animation = animate(el.children, {
			x: [70, 0],
			opacity: [0, 1],
			duration: 600,
			delay: stagger(200),
			easing: 'easeOutQuad',
			autoplay: false,
		});

		const observer = onScroll({
			container: document.body,
			target: el,
			enter: 'bottom center',
			leave: 'top bottom',
			axis: 'y',
			onEnter: () => {
				if (played) return;
				played = true;
				animation.seek(0);
				animation.play();
			},
			onLeaveBackward: () => {
				played = false;
			},
			debug: false,
		});

		return () => observer.revert?.();
	};
</script>

<section
	{@attach visualMotion}
	class="relative flex max-h-dvh min-h-[70dvh] flex-col justify-between overflow-clip rounded-xl bg-cover bg-center p-5 text-white opacity-100 max-lg:rounded-lg md:min-h-160 lg:p-15 xl:min-h-200 starting:translate-y-0 starting:opacity-0"
	style={`background-image: url('${bg}')`}
>
	{#if videoUrl}
		<div
			class="before:[''] absolute top-0 left-0 h-full w-full object-cover before:absolute before:top-0 before:left-0 before:z-3 before:size-full before:bg-linear-to-t before:from-black before:to-black/0"
		>
			<video class="relative z-1 aspect-video h-full w-full object-cover" autoplay muted playsinline loop>
				<source src={videoUrl} type="video/webm" />
			</video>
		</div>
	{/if}

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

		<h2 class="leading-sung mt-5 text-3xl font-bold delay-75 lg:mt-7.5 lg:text-[3.75rem] lg:whitespace-pre-line">{tit}</h2>
	</div>

	<div class="relative z-5 starting:opacity-0">
		<p class="text-2md mt-5 leading-normal text-white lg:text-lg lg:whitespace-pre-line">{subtit}</p>

		<div class="mt-7.5 flex lg:mt-9">
			<a
				href="/"
				class="hover:text-3743ff text-2md group inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold transition-colors hover:bg-white max-lg:justify-between lg:min-h-13.5 lg:w-auto"
			>
				<span>{m.btn_inquiry()}</span>
				<icon-list name="arrow-right" class="group-hover:stroke-primary size-6 stroke-white"></icon-list>
			</a>
		</div>
	</div>
</section>
