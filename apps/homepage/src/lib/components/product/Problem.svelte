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

	let current = $state(0);
</script>

{#snippet content(tit = '', txt = '', type = '', i = 0)}
	<li
		data-scroll="slide-up"
		class={[
			'before:bg-primary relative flex py-2 before:top-[calc(50%-2.5px)] before:z-5 before:rounded-full before:opacity-0 before:transition-all has-aria-current:before:absolute has-aria-current:before:size-1.25 has-aria-current:before:opacity-100 max-lg:before:hidden! max-lg:after:hidden',
			type === 'as'
				? 'after:border-primary z-6 after:top-[calc(50%-0.5px)] after:z-1 after:border-dotted has-aria-current:before:right-0 has-aria-current:after:absolute has-aria-current:after:left-full has-aria-current:after:w-full has-aria-current:after:border'
				: 'delay-500 has-aria-current:before:left-0',
		]}
	>
		<button
			class={[
				'@starting:bg-transparnet group z-3 flex flex-1 grid-rows-2 items-center  gap-5 space-y-2.5 rounded-xl p-5 text-left transition-all lg:gap-7.5 lg:py-7.5',
				type === 'as' ? 'aria-current:bg-light-blue text-666' : 'aria-current:bg-9097ff',
			]}
			aria-current={current === i ? 'true' : undefined}
			onmouseenter={() => (current = i)}
		>
			{#if type === 'as'}
				<icon-list name="tri-alert" class="group-aria-current:fill-primary fill-999 relative h-10 w-10.5 flex-none transition-all"></icon-list>
			{/if}
			{#if type === 'to'}
				<icon-list name="tick-circle" class="relative h-10 w-10.5 flex-none fill-white/30 transition-all group-aria-current:fill-white"></icon-list>
			{/if}
			<strong class="flex flex-col gap-2.5">
				<span class="text-2md font-bold lg:text-2xl">{tit}</span>
				<span class={['text-2md text-666 font-normal lg:text-lg', type === 'as' ? ' text-666' : 'text-white']}>{txt}</span>
			</strong>
		</button>

		{#if current === i && type === 'as'}
			<div
				aria-hidden="true"
				class="border-primary/30 absolute top-[calc(50%-20px)] left-full z-5 grid size-10 animate-[as-is_5s_ease-in-out_infinite] place-items-center rounded-full border-7 max-lg:hidden"
			>
				<p class="border-primary/50 grid place-items-center rounded-full border-8">
					<span class="size-3 rounded-full bg-white"></span>
				</p>
			</div>
		{/if}
	</li>
{/snippet}

<section data-scroll="slide-up" {@attach proMotion} class="space-y-5 py-11.25 lg:space-y-7.5 lg:py-15">
	<SubHeading tit={product_problem_title} txt={product_problem_text} />
	<ol class="grid grid-rows-2 gap-5 lg:grid-cols-[1fr_60px_1fr] lg:grid-rows-1 lg:gap-5 2xl:grid-cols-[1fr_12.5rem_1fr] 2xl:gap-25 starting:opacity-0">
		<li class="divide-d9d9d9 grid h-full divide-y divide-dashed rounded-xl bg-white lg:grid-rows-[90px_1fr]">
			<header class="grid min-h-15 place-content-center text-xl font-bold lg:min-h-22.5 lg:text-4xl">AS-IS</header>
			<ul class="divide-d9d9d9 grid grid-rows-4 divide-y divide-dashed px-2">
				{#each asList as as, i (i)}
					{@render content(as.tit, as.txt, 'as', i)}
				{/each}
			</ul>
		</li>
		<li class="hidden place-content-center lg:grid">
			<p class="bg-ebedff grid place-items-center rounded-full lg:size-15 xl:size-50">
				<icon-list name="arrow-as-is" class="stroke-primary relative size-22.5 flex-none transition-all group-aria-current:fill-white"></icon-list>
			</p>
		</li>
		<li class="divide-d9d9d9 bg-3743ff from-primary to-828aff group grid h-full divide-y divide-dashed rounded-xl bg-linear-to-t text-white lg:grid-rows-[90px_1fr]">
			<header class="grid min-h-15 place-content-center text-xl font-bold lg:min-h-22.5 lg:text-4xl">TO-BE</header>
			<ul class="divide-d9d9d9 grid grid-rows-4 divide-y divide-dashed px-2 text-left">
				{#each toList as to, t (t)}
					{@render content(to.tit, to.txt, 'to', t)}
				{/each}
			</ul>
		</li>
	</ol>
</section>
