<svelte:options
	customElement={{
		tag: 'sub-visual',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { animate, stagger, onScroll } from 'animejs';
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
	class="relative flex max-h-dvh min-h-[70dvh] flex-col justify-between overflow-clip bg-cover bg-center p-5 text-white opacity-100 max-xl:rounded-lg md:min-h-160 xl:min-h-200 xl:p-15 starting:translate-y-0 starting:opacity-0"
	style={`background-image: url('${bg}')`}
>
	{#if videoUrl}
		{videoUrl}
	{/if}

	<div class="starting:opacity-0">
		<div>
			{#if badge}
				<p
					class="before:bg-7cf5a0 inline-flex min-h-7.5 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4.5 py-1 text-xs leading-none font-bold before:size-1.5 before:rounded-full"
				>
					{badge}
				</p>
			{/if}

			{#if logo}
				<picture class="flex h-10 xl:h-15">
					<enhanced:img src={logo} alt={logoAlt} class="h-full" sizes="(min-width: 1280px) 60px, 40px" />
				</picture>
			{/if}
		</div>

		<h2 class="leading-sung mt-5 text-3xl font-bold delay-75 xl:mt-7.5 xl:text-[3.75rem]">{@html tit}</h2>
	</div>

	<div class="relative starting:opacity-0">
		<p class="mt-5 text-[.9375rem] leading-normal text-white xl:text-lg">{@html subtit}</p>

		<div class="mt-7.5 flex xl:mt-9 xl:inline-flex">
			<button
				type="button"
				class="hover:text-3743ff min-h-12 w-full rounded-md border border-white px-7.5 text-left text-[.9375rem] font-bold transition-colors hover:bg-white xl:min-h-13.5"
			>
				<span>{btnTxt}</span>
			</button>
		</div>
	</div>
</section>
