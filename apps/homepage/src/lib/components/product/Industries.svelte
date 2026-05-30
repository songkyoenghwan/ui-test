<svelte:options
	customElement={{
		tag: 'sub-industries',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import SubHeading from '$lib/components/heading/SubHeading.svelte';
	import { animate, onScroll, stagger } from 'animejs';
	import type { Attachment } from 'svelte/attachments';

	let { tit = '', txt = '', subTxt = '', lists = [], cls = '' } = $props();
	let played = $state(false);

	const indMotion: Attachment<HTMLElement> = (el) => {
		const animation = animate(el.children, {
			y: [50, 0],
			opacity: [0, 1],
			duration: 600,
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

{#snippet contentIndustries(tit = '', txt = '', icon = '')}
	<li class="bg-ebedff relative grid place-items-center gap-5 rounded-xl p-5 text-center opacity-0 lg:p-7.5">
		<picture class="grid size-22.5 place-content-center">
			<img loading="lazy" src={icon} alt={tit} />
		</picture>
		{#if tit}
			<p class="text-lg font-bold lg:text-2xl">{tit}</p>
		{/if}

		{#if txt}
			<p class="text-2md text-666 lg:text-lg">{txt}</p>
		{/if}
	</li>
{/snippet}

<section data-scroll="slide-up" class="space-y-5 overflow-clip py-11.25 lg:space-y-7.5 lg:py-15">
	<div class="space-y-5 rounded-xl bg-white p-5 lg:space-y-15 lg:p-15">
		<SubHeading {tit} {txt} {subTxt} />
		<ul {@attach indMotion} class={['grid gap-5', cls]}>
			{#each lists as item, i (i)}
				{@render contentIndustries(item.tit, item.txt, item.img)}
			{/each}
		</ul>
	</div>
</section>
