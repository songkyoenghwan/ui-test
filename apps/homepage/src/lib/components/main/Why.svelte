<svelte:options
	customElement={{
		tag: 'main-why',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import CountNumber from '$lib/components/text/CountNumber.svelte';
	import { m } from '$lib/paraglide/messages.js';

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
			cls: 'text-white bg-linear-to-r from-[#3743ff] to-[#90f0ff] lg:flex lg:justify-between lg:col-span-2 @container',
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
	let playPromises = new Map<number, Promise<void> | null>();
	const handleVideoEnter = async (i: number) => {
		const video = videoRefs[i];
		if (!video) return;
		if (!video.paused) return;

		video.muted = true;
		const promise = video.play();
		playPromises.set(i, promise);

		try {
			await promise;
		} catch (error) {
			if (error.name === 'AbortError') {
				console.warn('호버링 제어가 너무 빨라 play() 연산이 양보되었습니다.');
			} else {
				console.error('비디오 가동 실패:', error);
			}
		} finally {
			if (playPromises.get(i) === promise) {
				playPromises.set(i, null);
			}
		}
	};
</script>

<section data-scroll="slide-up" class="relative max-w-dvw">
	<sub-heading-line line="none" title={m.main_title_why?.()} subTit={m.main_subtitle_why?.()}></sub-heading-line>

	<ul class="grid grid-cols-1 grid-rows-1 gap-7.5 lg:h-200 lg:grid-cols-4 lg:grid-rows-[repeat(2,385px)]">
		{#each lists as list, i (list.id)}
			<li
				data-scroll="slide-up"
				data-index={i}
				class={[
					'group/why relative flex h-90 w-full justify-between overflow-clip rounded-xl transition-all duration-300 max-lg:flex-col lg:h-full lg:hover:scale-101',
					list.cls,
				]}
				style:--why-1-bg={`url(${__STATIC_URL__}/imgs/main/why/bg-why-1.jpg)`}
				onpointerenter={() => handleVideoEnter(i)}
			>
				<dl
					class={[
						'space-y-2.5 p-5',
						list.id === 'why-3'
							? 'h-full bg-(image:--why-3-bg) bg-size-[529.5px_auto] bg-position-[calc(100%+200px)_200px] bg-no-repeat before:absolute before:top-0 before:left-0 before:z-1 before:size-full before:bg-(image:--why-3) before:bg-size-[529.5px_auto] before:bg-position-[calc(100%+200px)_196px] before:bg-no-repeat before:transition-all group-hover/why:before:bg-position-[calc(100%+200px)_190px] lg:bg-size-[1059px_auto] lg:bg-position-[170px_50px] lg:before:bg-size-[1059px_auto] lg:before:bg-position-[170px_46px] lg:group-hover/why:before:bg-position-[170px_30px]'
							: '',
					]}
					style:--why-3-bg={`url(${__STATIC_URL__}/imgs/main/why/img-why-bg-3.png)`}
					style:--why-3={`url(${__STATIC_URL__}/imgs/main/why/img-why-3.png)`}
				>
					<dt
						class={[
							'relative z-3 flex items-center text-5xl leading-none font-bold lg:text-6xl lg:data-[font=90]:text-[90px]',
							list.id === 'why-3' ? 'text-primary' : '',
						]}
						data-font={list.font}
					>
						{#if list.id !== 'why-4'}
							<strong class={['inline-flex gap-px leading-none font-bold tracking-tight lg:min-w-29', list.id === 'why-2' ? 'max-xl:text-4xl max-lg:text-5xl' : '']}>
								<CountNumber text={Number(list.num)} />
							</strong>
							{#if list.id === 'why-5'}
								<span class="leading-none font-normal">%</span>
							{/if}
						{:else}
							{list.tit}
						{/if}
						<strong class={['text-primary leading-none', list.id === 'why-2' ? 'max-xl:text-4xl max-lg:text-5xl' : '']}>
							{list.id === 'why-2' || list.id === 'why-3' ? '+' : ''}
						</strong>
					</dt>
					<dd class={['text-2md', list.id !== 'why-3' && list.id !== 'why-4' ? 'relative z-3 lg:text-lg' : 'lg:text-2xl']}>{list.txt}</dd>
				</dl>

				{#if list.video}
					<div
						data-scroll="slide-up"
						class={['relative flex justify-end after:absolute after:z-2 after:flex after:size-full after:bg-transparent ', list.id === 'why-1' ? 'lg:-mr-23.75' : '']}
					>
						<video
							bind:this={videoRefs[i]}
							data-scroll="slide-up"
							class={[
								'relative z-1',
								list.id === 'why-1'
									? 'h-56.5 max-sm:hidden lg:min-h-131.75 lg:min-w-130'
									: list.id === 'why-2'
										? 'h-53.5 max-w-full lg:h-61.5'
										: list.id === 'why-5'
											? 'h-31.5 w-auto lg:h-48 lg:max-w-85.5'
											: '',
							]}
							muted
							playsinline
							preload="metadata"
							poster={list.poster}
						>
							{#if list.video}
								<source src={list.video} type="video/mp4" />
							{/if}
							{#if list.webm}
								<source src={list.webm} type="video/webm" />
							{/if}
						</video>

						{#if list.id === 'why-1'}
							<picture class="relative hidden w-full flex-1 flex-wrap items-end justify-end max-sm:flex">
								<enhanced:img src={list.poster} alt="img" class="relative w-full flex-1 max-lg:max-w-59 lg:max-w-118" />
							</picture>
						{/if}
					</div>
				{/if}

				{#if list.id === 'why-4'}
					<div data-scroll="slide-up" class="relative flex items-end justify-end">
						<picture class="frelative flex w-full flex-1 flex-wrap items-end justify-end px-5 lg:p-5">
							<enhanced:img src={list.img} alt="img" class="relative w-full flex-1 max-lg:max-w-59 lg:max-w-118" />
						</picture>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</section>
