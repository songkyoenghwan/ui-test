<svelte:options
	customElement={{
		tag: 'main-our-products',
		shadow: 'none',
	}}
/>

<script lang="ts">
	let lists = [
		{
			id: 'our-products1',
			logo: '/src/lib/imgs/logo/logo-main-logi.svg',
			logoPc: '/src/lib/imgs/logo/logo-main-logi-pc.svg',
			tit: '스마트 물류 운영 솔루션',
			txt: 'LOGI.FINE은 물류센터의 피킹, 검수, 분류, 패킹 업무를스마트글라스와 Vision AI 기반으로 지원하는 솔루션입니다',
			link: '',
		},
		{
			id: 'our-products2',
			logo: '/src/lib/imgs/logo/logo-main-dao.svg',
			logoPc: '/src/lib/imgs/logo/logo-main-dao-pc.svg',
			tit: 'AI 글래스 기반 현장 업무 지원 솔루션',
			txt: 'DAO는 제조, MRO, 방산 현장의 점검·정비 업무에 필요한 정보를스마트글라스로 제공하고, 작업자의 현장 업무 수행을 지원하는 솔루션입니다.',
			link: '',
		},
		{
			id: 'our-products3',
			logo: '/src/lib/imgs/logo/logo-main-dsc.svg',
			logoPc: '/src/lib/imgs/logo/logo-main-dsc-pc.svg',
			tit: '공간컴퓨팅 기반 디지털 공간 구축 솔루션',
			txt: 'DSC는 현실 공간을 3D 공간 데이터로 구축하고,위치 인식과 AR 콘텐츠를 결합해 공간 기반 서비스를 구현하는 솔루션입니다.',
			link: '',
		},
	];
	import visualVideo from '$lib/assets/main-video.webm';
	let current = $state(0);
	let w = $state(typeof window !== 'undefined' ? window.innerWidth : 0);
	const isDesktop = $derived(w >= 1024);
</script>

<svelte:window bind:innerWidth={w} />

<section class="relative">
	<sub-heading-line line="none" title="Our Products" text="딥파인은 물류, 제조·MRO, 공간 데이터 분야의 현장 문제를 해결하는 산업 AI 솔루션을 제공합니다."></sub-heading-line>

	<ul class="flex gap-7.5 max-lg:flex-col lg:flex-row">
		{#each lists as list, i (list.id)}
			<li data-scroll="slide-up" class="group/prod relative flex-[0_0_300px] overflow-clip rounded-xl has-aria-current:flex-1">
				{#if current === i && isDesktop}
					<div
						class="before:[''] absolute top-0 left-0 z-1 h-full w-full object-cover before:absolute before:top-0 before:left-0 before:z-1 before:size-full before:bg-linear-to-t before:from-black before:to-black/0"
					>
						<video class="relative z-1 aspect-video h-full w-full object-cover" autoplay muted playsinline loop>
							<source src={visualVideo} type="video/webm" />
						</video>
					</div>
				{/if}

				{#if !isDesktop}
					<div
						class="before:[''] absolute top-0 left-0 z-1 h-full w-full object-cover before:absolute before:top-0 before:left-0 before:z-1 before:size-full before:bg-linear-to-t before:from-black before:to-black/0"
					>
						<video class="relative z-1 aspect-video h-full w-full object-cover" autoplay muted playsinline loop>
							<source src={visualVideo} type="video/webm" />
						</video>
					</div>
				{/if}

				<a
					href="/"
					class="group relative flex h-full min-h-[45dvh] w-full cursor-pointer flex-col justify-between overflow-clip rounded-xl bg-cover bg-center bg-no-repeat p-5 text-white lg:p-15
							{i === 0 ? 'bg-[url(/src/lib/imgs/logo/bg-main-logi.png)]' : ''}
							{i === 1 ? 'bg-[url(/src/lib/imgs/logo/bg-main-dao.png)]' : ''}
							{i === 2 ? 'bg-[url(/src/lib/imgs/logo/bg-main-dsc.png)]' : ''}"
					onmouseenter={() => (current = i)}
					onfocus={() => (current = i)}
					aria-current={current === i ? 'true' : !isDesktop ? 'true' : undefined}
				>
					<div class="lg:7.5 relative z-2 flex flex-col gap-5">
						<picture
							class="relative flex min-h-10 opacity-100 transition-all transition-discrete @min-xl:group-has-aria-current/prod:opacity-100 starting:rotate-0 starting:opacity-0 {current ===
							i
								? 'relative'
								: 'lg:absolute lg:bottom-[calc(100%-20px)] lg:left-[calc(100%-20px)] lg:h-25 lg:max-h-105 lg:w-105 lg:origin-left lg:rotate-90'}"
						>
							<source media="(min-width: 1024px)" srcset={list.logoPc} />
							<source media="(max-width: 1024px)" srcset={list.logo} />
							<img src={list.logo} alt="" class="h-full" loading="lazy" />
						</picture>
						<dl
							class="text-2md relative space-y-5 opacity-100 transition-all lg:text-lg lg:opacity-0 lg:group-has-aria-current/prod:block lg:group-has-aria-current/prod:opacity-100 @min-xl:group-has-aria-current/prod:max-w-3/5 starting:opacity-0"
						>
							<dt class="font-bold">{list.tit}</dt>
							<dd>{list.txt}</dd>
						</dl>
					</div>
					<div class="z-2 opacity-100 group-hover:flex lg:hidden starting:opacity-0">
						<p
							class="hover:text-3743ff text-2md min-h-12 w-full rounded-md border border-white px-7.5 text-left font-bold transition-colors hover:bg-white lg:min-h-13.5"
						>
							<span>자세히 보기</span>
						</p>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</section>
