<script lang="ts">
	import { animate, stagger, onScroll } from 'animejs';
	import type { Attachment } from 'svelte/attachments';
	import { parseBreakline } from '$lib/utils/textUtils.svelte';

	let { page = '', tit = '', txt = '', subTxt = '' } = $props();
	let played = $state(false);

	export const headingMotion: Attachment<HTMLElement> = (el) => {
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
	const titParse = $derived(parseBreakline(tit));
	const txtParse = $derived(parseBreakline(txt));
	const subTxttParse = $derived(parseBreakline(subTxt));
</script>

<header {@attach headingMotion} class="space-y-5">
	<p class="text-666 text-2md font-bold lg:text-2xl">{titParse}</p>
	<h3 class="text-1a1a2e text-2xl leading-tight font-bold lg:text-5xl lg:whitespace-pre-line">{txtParse}</h3>

	{#if subTxt}
		<p class="text-666 text-2md mt-2.5 lg:text-2xl lg:whitespace-pre-line">{subTxttParse}</p>
	{/if}
</header>
