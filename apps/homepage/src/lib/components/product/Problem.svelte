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

	const dao_problem_text = m.dao_problem_text();
	const dao_problem_title = m.dao_problem_title();
	const asList = [
		{
			tit: m.dao_as_list_tit_1(),
			txt: m.dao_as_list_txt_1(),
		},
		{
			tit: m.dao_as_list_tit_2(),
			txt: m.dao_as_list_txt_2(),
		},
		{
			tit: m.dao_as_list_tit_3(),
			txt: m.dao_as_list_txt_3(),
		},
		{
			tit: m.dao_as_list_tit_4(),
			txt: m.dao_as_list_txt_4(),
		},
	];
	const toList = [
		{
			tit: m.dao_to_list_tit_1(),
			txt: m.dao_to_list_txt_1(),
		},
		{
			tit: m.dao_to_list_tit_2(),
			txt: m.dao_to_list_txt_2(),
		},
		{
			tit: m.dao_to_list_tit_3(),
			txt: m.dao_to_list_txt_3(),
		},
		{
			tit: m.dao_to_list_tit_4(),
			txt: m.dao_to_list_txt_4(),
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
			'before:bg-primary relative flex py-2 before:top-[calc(50%-0.1563rem)] before:z-5 before:rounded-full before:opacity-0 before:transition-all has-aria-current:before:absolute has-aria-current:before:size-1.25 has-aria-current:before:opacity-100 max-lg:before:hidden! max-lg:after:hidden',
			type === 'as'
				? 'after:border-primary z-6 after:top-[calc(50%-.0156rem)] after:z-1 after:border-dashed has-aria-current:before:right-0 has-aria-current:after:absolute has-aria-current:after:left-full has-aria-current:after:border lg:has-aria-current:after:w-30 2xl:has-aria-current:after:w-105'
				: 'z-7 delay-500 before:z-6 has-aria-current:before:left-0',
		]}
	>
		<button
			class={[
				'@starting:bg-transparnet group z-3 flex flex-1 grid-rows-2 items-center gap-5 space-y-2.5 rounded-xl p-5 text-left transition-all lg:gap-7.5 lg:py-7.5',
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
			<div aria-hidden="true" class="absolute top-[calc(50%-1.25rem)] left-full z-5 grid size-10 animate-[as-is_5s_ease-in-out_infinite] place-items-center max-lg:hidden">
				<div class="relative">
					{#each Array(5) as _, y}
						<p
							class={[
								'border-primary @starting:opacity-0 absolute -top-2.5 -left-2.5 grid animate-[ping-motion_0.6s_cubic-bezier(0,0,0.4,1)_infinite] place-items-center rounded-full border-16 opacity-0',
								y === 1
									? 'animate-[ping-motion_1.1s_cubic-bezier(0,0,0.4,1)_infinite]'
									: y === 2
										? 'animate-[ping-motion_1.1s_cubic-bezier(0,0,0.4,1)_0.6s_infinite]'
										: y === 3
											? 'animate-[ping-motion_1.1s_cubic-bezier(0,0,0.4,1)_1.1s_infinite]'
											: y === 4
												? 'animate-[ping-motion_0.6s_cubic-bezier(0,0,0.4,1)_1.6s_infinite]'
												: '',
							]}
						></p>
					{/each}
					<p class="relative z-2 size-3 rounded-full bg-white"></p>
				</div>
			</div>
		{/if}
	</li>
{/snippet}

<section data-scroll="slide-up" {@attach proMotion} class="space-y-5 py-11.25 lg:space-y-7.5 lg:py-15">
	<SubHeading tit={dao_problem_title} txt={dao_problem_text} />
	<ol class="grid grid-rows-2 gap-5 lg:grid-cols-[1fr_60px_1fr] lg:grid-rows-1 lg:gap-5 2xl:grid-cols-[1fr_12.5rem_1fr] 2xl:gap-25 starting:opacity-0">
		<li class="divide-d9d9d9 relative grid h-full divide-y divide-dashed rounded-xl bg-white lg:grid-rows-[90px_1fr]">
			<header class="grid min-h-15 place-content-center text-xl font-bold lg:min-h-22.5 lg:text-4xl">AS-IS</header>
			<ul class="divide-d9d9d9 grid grid-rows-4 divide-y divide-dashed px-2">
				{#each asList as as, i (i)}
					{@render content(as.tit, as.txt, 'as', i)}
				{/each}
			</ul>
		</li>
		<li class="hidden place-content-center lg:grid">
			<p class="bg-ebedff grid place-items-center rounded-full lg:size-15 xl:size-50">
				<icon-list name="arrow-as-is" class="stroke-primary relative w-full max-w-22.5 p-1 transition-all"></icon-list>
			</p>
		</li>
		<li
			class="divide-d9d9d9 bg-3743ff from-primary to-828aff group relative z-3 grid h-full divide-y divide-dashed rounded-xl bg-linear-to-t text-white lg:grid-rows-[90px_1fr]"
		>
			<header class="grid min-h-15 place-content-center text-xl font-bold lg:min-h-22.5 lg:text-4xl">TO-BE</header>
			<ul class="divide-d9d9d9 grid grid-rows-4 divide-y divide-dashed px-2 text-left">
				{#each toList as to, t (t)}
					{@render content(to.tit, to.txt, 'to', t)}
				{/each}
			</ul>
		</li>
	</ol>
</section>
