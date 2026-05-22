<svelte:options
	customElement={{
		tag: 'main-whay',
		shadow: 'none',
	}}
/>

<script lang="ts">
	let lists = [
		{
			id: 'why-1',
			video: '/src/lib/imgs/main/why/img-why-1.mp4',
			tit: '36',
			txt: '수상 및 인증',
			font: '90',
			cls: 'flex-col bg-[url(/src/lib/imgs/main/bg-why-1.png)] bg-no-repeat bg-center bg-cover text-white lg:row-span-2',
		},
		{
			id: 'why-2',
			video: '/src/lib/imgs/main/why/img-why-2.mp4',
			tit: '22,000',
			txt: '산업 데이터 리포트',
			cls: 'flex-col bg-white',
		},
		{
			id: 'why-3',
			img: '/src/lib/imgs/main/why/img-why-3.png',
			tit: '70',
			txt: '글로벌 대기업·공공기관 고객 및 파트너',
			font: '90',
			cls: 'flex-col bg-linear-to-r from-[#e8eeff] to-[#c5d3f7] lg:col-span-2',
		},
		{
			id: 'why-4',
			img: '/src/lib/imgs/main/why/img-why-4.png',
			tit: 'No.1',
			txt: '국내 스마트글라스 산업 도입',
			font: '90',
			cls: 'text-white bg-linear-to-r from-[#3743ff] to-[#90f0ff] lg:flex lg:justify-between lg:col-span-2',
		},
		{
			id: 'why-5',
			img: '/src/lib/imgs/main/why/img-why-5.png',
			tit: '92%',
			txt: '고객 유지율',
			font: '90',
			cls: 'flex-col bg-white',
		},
	];
</script>

<section data-scroll="slide-up" class="relative">
	<sub-heading-line
		line="none"
		title="We Transform \n How Industrial Sites Work"
		text="공간을 인식하고, 작업을 데이터화하며, 산업 운영의 AX 전환을 가속합니다."
	></sub-heading-line>

	<ul class="grid grid-cols-1 grid-rows-1 gap-7.5 lg:grid-cols-4 lg:grid-rows-[repeat(2,385px)]">
		{#each lists as list, i (list.id)}
			<li data-scroll="slide-up" data-index={i} class={['relative flex h-90 w-full flex-[0_0_360px] justify-between overflow-clip rounded-xl lg:h-full', list.cls]}>
				<dl class="space-y-2.5 p-5">
					<dt class={['text-5xl leading-snug font-bold lg:text-6xl lg:data-[font=90]:text-[90px]', list.id === 'why-3' ? 'text-primary' : '']} data-font={list.font}>
						{list.tit}
					</dt>
					<dd class="text-2md lg:text-lg">{list.txt}</dd>
				</dl>

				{#if list.video}
					<div data-scroll="slide-up" class="flex justify-end">
						<video
							data-scroll="slide-up"
							class={['relative z-1 max-w-fit', list.id === 'why-1' ? 'h-56.5 lg:left-32 lg:min-h-131.75' : list.id === 'why-2' ? 'h-53.5 max-w-full lg:h-61.5' : '']}
							autoplay
							muted
							playsinline
						>
							<source src={list.video} type="video/mp4" />
						</video>
					</div>
				{/if}

				{#if list.img}
					<div data-scroll="slide-up" class="flex justify-end">
						<picture data-scroll="slide-up" class={['flex justify-end', list.id === 'why-4' ? 'flex flex-wrap items-end px-5 lg:p-5' : '']}>
							<enhanced:img
								src={list.img}
								alt="img"
								class={[
									'relative ',
									list.id === 'why-3'
										? 'h-full translate-x-[40%] -translate-y-1/11'
										: list.id === 'why-4'
											? 'h-61.5 w-auto'
											: list.id === 'why-5'
												? 'h-62.5 w-auto lg:h-48'
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
