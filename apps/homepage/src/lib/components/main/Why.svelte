<svelte:options
	customElement={{
		tag: 'main-why',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import CountNumber from '$lib/components/text/CountNumber.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { videoObserver } from '$lib/utils/videoObserve.svelte';

	let lists = $state([
		{
			id: 'why-1',
			poster: `${__STATIC_URL__}/video/img-why-1.png`,
			webm: `${__STATIC_URL__}/video/img-why-1.webm`,
			video: `${__STATIC_URL__}/video/img-why-1.mp4`,
			num: 36,
			txt: m.main_why_txt_1?.(),
			font: '90',
			cls: 'flex-col bg-(image:--why-1-bg) bg-no-repeat bg-center bg-cover text-white lg:row-span-2',
		},
		{
			id: 'why-2',
			poster: `${__STATIC_URL__}/video/img-why-2.png`,
			webm: `${__STATIC_URL__}/video/img-why-2.webm`,
			video: `${__STATIC_URL__}/video/img-why-2.mp4`,
			num: 22000,
			txt: m.main_why_txt_2?.(),
			cls: 'flex-col bg-white',
		},
		{
			id: 'why-3',
			img: `${__STATIC_URL__}/imgs/main/why/img-why-3.png`,
			num: 70,
			txt: m.main_why_txt_3?.(),
			font: '90',
			cls: 'flex-col bg-linear-to-r from-[#e8eeff] to-[#c5d3f7] lg:col-span-2',
		},
		{
			id: 'why-4',
			img: `${__STATIC_URL__}/imgs/main/why/img-why-4.png`,
			tit: 'No.1',
			txt: m.main_why_txt_4?.(),
			font: '90',
			cls: 'text-white bg-linear-to-r from-[#3743ff] to-[#90f0ff] lg:flex lg:justify-between lg:col-span-2',
		},
		{
			id: 'why-5',
			poster: `${__STATIC_URL__}/video/img-why-5.png`,
			webm: `${__STATIC_URL__}/video/img-why-5.webm`,
			video: `${__STATIC_URL__}/video/img-why-5.mp4`,
			num: 92,
			txt: m.main_why_txt_5?.(),
			font: '90',
			cls: 'flex-col bg-white',
		},
	]);
	let videoRefs: HTMLVideoElement[] = $state([]);
</script>

<section data-scroll="slide-up" class="relative max-w-dvw">
	<sub-heading-line line="none" title={m.main_title_why?.()} subTit={m.main_subtitle_why?.()}></sub-heading-line>

	<ul class="grid grid-cols-1 grid-rows-1 gap-7.5 lg:h-200 lg:grid-cols-4 lg:grid-rows-[repeat(2,385px)]">
		{#each lists as list, i (list.id)}
			<li
				data-scroll="slide-up"
				data-index={i}
				class={[
					'group/why relative flex h-90 w-full flex-[0_0_360px] justify-between overflow-clip rounded-xl transition-all duration-300 max-lg:flex-col lg:h-full lg:hover:scale-105',
					list.cls,
				]}
				style:--why-1-bg={`url(${__STATIC_URL__}/imgs/main/why/bg-why-1.png)`}
				onpointerenter={() => {
					if (videoRefs[i]) {
						videoRefs[i].pause();
						videoRefs[i].play();
					}
				}}
				onpointerleave={() => {
					if (videoRefs[i]) videoRefs[i].pause();
				}}
			>
				<dl class="space-y-2.5 p-5">
					<dt
						class={['flex items-center text-5xl leading-none font-bold lg:text-6xl lg:data-[font=90]:text-[90px]', list.id === 'why-3' ? 'text-primary' : '']}
						data-font={list.font}
					>
						{#if list.id !== 'why-4'}
							<CountNumber text={Number(list.num)} />
						{:else}
							{list.tit}
						{/if}
						<strong class="text-primary">{list.id === 'why-2' || list.id === 'why-3' ? '+' : ''}</strong>
					</dt>
					<dd class={[list.id !== 'why-3' && list.id !== 'why-4' ? 'text-2md lg:text-lg' : 'text-lg lg:text-2xl']}>{list.txt}</dd>
				</dl>

				{#if list.video}
					<div data-scroll="slide-up" class="flex justify-end">
						<video
							{@attach videoObserver}
							bind:this={videoRefs[i]}
							data-scroll="slide-up"
							class={[
								'relative z-1',
								list.id === 'why-1'
									? 'h-56.5 lg:left-32 lg:min-h-131.75 lg:min-w-130'
									: list.id === 'why-2'
										? 'h-53.5 max-w-full lg:h-61.5'
										: list.id === 'why-5'
											? 'h-62.5 w-auto lg:h-48 lg:max-w-85.5'
											: '',
							]}
							preload="auto"
							muted
							playsinline
							poster={list.poster}
						>
							<source src={list.video} type="video/mp4" />
						</video>
					</div>
				{/if}

				{#if list.img}
					<div data-scroll="slide-up" class="flex justify-end">
						<picture
							data-scroll="slide-up"
							class={[
								'relative flex flex-1 justify-end',
								list.id === 'why-4' ? 'flex w-full flex-1 flex-wrap items-end px-5 lg:w-124.75 lg:translate-y-15 lg:p-5' : '',
							]}
						>
							<enhanced:img
								src={list.img}
								alt="img"
								class={[
									'relative ',
									list.id === 'why-3'
										? 'relative h-full translate-x-4/10 translate-y-3/10 scale-180 transition-all lg:translate-x-[40%] lg:-translate-y-1/5 lg:scale-130 lg:group-hover/why:-translate-y-[calc(20%+30px)]'
										: list.id === 'why-4'
											? 'flex-1 lg:min-h-61.5'
											: '',
								]}
							/>
						</picture>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</section>
