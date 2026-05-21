<svelte:options
	customElement={{
		tag: 'sub-problem',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import SubHeading from '$lib/components/heading/SubHeading.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { animate, onScroll } from 'animejs';
	import type { Attachment } from 'svelte/attachments';

	let played = $state(false);

	const product_problem_text = m.product_problem_text();
	const product_problem_title = m.product_problem_title();
	const asList = [
		{
			tit: m.product_as_list_tit_1(),
			txt: m.product_as_list_txt_1(),
		},
		{
			tit: m.product_as_list_tit_2(),
			txt: m.product_as_list_txt_2(),
		},
		{
			tit: m.product_as_list_tit_3(),
			txt: m.product_as_list_txt_3(),
		},
		{
			tit: m.product_as_list_tit_4(),
			txt: m.product_as_list_txt_4(),
		},
	];
	const toList = [
		{
			tit: m.product_to_list_tit_1(),
			txt: m.product_to_list_txt_1(),
		},
		{
			tit: m.product_to_list_tit_2(),
			txt: m.product_to_list_txt_2(),
		},
		{
			tit: m.product_to_list_tit_3(),
			txt: m.product_to_list_txt_3(),
		},
		{
			tit: m.product_to_list_tit_4(),
			txt: m.product_to_list_txt_4(),
		},
	];

	const proMotion: Attachment<HTMLElement> = (el) => {
		const animation = animate(el, {
			y: [30, 0],
			opacity: [0, 1],
			duration: 400,
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

{#snippet content(tit = '', txt = '')}
	<li class="py-5 xl:py-7.5">
		<div class="space-y-2.5">
			<p class="text-2md font-bold xl:text-2xl">{tit}</p>
			<p class="text-2md text-888 group-odd:text-white xl:text-lg">{txt}.</p>
		</div>
	</li>
{/snippet}

<section data-scroll="slide-up" {@attach proMotion} class="space-y-5 py-11.25 xl:space-y-7.5 xl:py-15">
	<SubHeading tit={product_problem_title} txt={product_problem_text} />
	<ol class="grid grid-rows-2 gap-5 lg:grid-cols-[1fr_6rem_1fr] lg:grid-rows-1 xl:grid-cols-[1fr_12.5rem_1fr] xl:gap-[clamp(5%,2vw,100px)] starting:opacity-0">
		<li class="divide-d9d9d9 divide-y divide-dashed rounded-xl bg-white">
			<header class="grid min-h-15 place-content-center text-xl font-bold xl:min-h-22.5 xl:text-4xl">AS-IS</header>
			<ul class="divide-d9d9d9 divide-y divide-dashed px-7.5">
				{#each asList as as, i (i)}
					{@render content(as.tit, as.txt)}
				{/each}
			</ul>
		</li>
		<li class="hidden place-content-center lg:grid">
			<p class="bg-ebedff rounded-full lg:size-25 xl:size-50"></p>
		</li>
		<li class="divide-d9d9d9 bg- bg-3743ff group divide-y divide-dashed rounded-xl text-white">
			<header class="grid min-h-15 place-content-center text-xl font-bold xl:min-h-22.5 xl:text-4xl">TO-BE</header>
			<ul class="divide-d9d9d9 divide-y divide-dashed px-7.5">
				{#each toList as to, t (t)}
					{@render content(to.tit, to.txt)}
				{/each}
			</ul>
		</li>
	</ol>
</section>
