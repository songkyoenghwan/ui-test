<script lang="ts">
	import { animate, onScroll, stagger } from 'animejs';
	import type { Attachment } from 'svelte/attachments';

	let { tit = '', txt = '', subTxt = '' } = $props();
	let played = $state(false);

	const headingMotion: Attachment<HTMLElement> = (el) => {
		const animation = animate(el.children, {
			y: [20, 0],
			opacity: [0, 1],
			duration: 400,
			delay: stagger(100),
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

<header {@attach headingMotion} class="space-y-5">
	<p class="text-666 text-2md font-bold xl:text-2xl">{@html tit}</p>
	<h3 class="text-1a1a2e text-2xl leading-tight font-bold xl:text-5xl">{@html txt}</h3>

	{#if subTxt}
		<p class="text-666 text-2md mt-2.5 font-bold xl:text-2xl">{@html subTxt}</p>
	{/if}
</header>
