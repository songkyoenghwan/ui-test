<svelte:options
	customElement={{
		tag: 'main-card',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { register } from 'swiper/element/bundle';
	register();

	const lists = [
		{
			id: 'card-slide-1',
			badge: ['공공시설 점검', 'DAO'],
			txt: '스마트글라스 기반 원격 점검으로 출장 비용 60% 절감, 생산성 34% 향상',
			logo: '/src/lib/assets/imgs/main/slide/img-logo-1.png',
		},
		{
			id: 'card-slide-2',
			badge: ['중공업 MRO', 'DAO'],
			txt: 'Vision Assist로 도면·작업 지침을 즉시 표시해 정비 시간 30% 단축, 교육 기간 40% 단축',
			logo: '/src/lib/assets/imgs/main/slide/img-logo-1.png',
		},
		{
			id: 'card-slide-3',
			badge: ['건설', '디지털트윈'],
			txt: '3D 디지털 트윈으로 제조 공정 가시화 및 이상 감지 모니터링 체계 구축',
			logo: '/src/lib/assets/imgs/main/slide/img-logo-1.png',
		},
		{
			id: 'card-slide-4',
			badge: ['관광·축제', '혼잡도 분석'],
			txt: 'AI 혼잡도 분석과 맞춤 경로 추천으로 누적 이용 416만 건, 방문객 만족도 4.3점 달성',
			logo: '/src/lib/assets/imgs/main/slide/img-logo-1.png',
		},
		{
			id: 'card-slide-5',
			badge: ['공공시설 점검', 'DAO'],
			txt: '스마트글라스 기반 원격 점검으로 출장 비용 60% 절감, 생산성 34% 향상',
			logo: '/src/lib/assets/imgs/main/slide/img-logo-1.png',
		},
		{
			id: 'card-slide-6',
			badge: ['중공업 MRO', 'DAO'],
			txt: 'Vision Assist로 도면·작업 지침을 즉시 표시해 정비 시간 30% 단축, 교육 기간 40% 단축',
			logo: '/src/lib/assets/imgs/main/slide/img-logo-1.png',
		},
		{
			id: 'card-slide-7',
			badge: ['건설', '디지털트윈'],
			txt: '3D 디지털 트윈으로 제조 공정 가시화 및 이상 감지 모니터링 체계 구축',
			logo: '/src/lib/assets/imgs/main/slide/img-logo-1.png',
		},
		{
			id: 'card-slide-8',
			badge: ['관광·축제', '혼잡도 분석'],
			txt: 'AI 혼잡도 분석과 맞춤 경로 추천으로 누적 이용 416만 건, 방문객 만족도 4.3점 달성',
			logo: '/src/lib/assets/imgs/main/slide/img-logo-1.png',
		},
	] as const;
</script>

<section class="grid grid-cols-1 rounded-xl bg-white p-5 lg:grid-cols-[1fr_500px] lg:gap-15 lg:p-15">
	<sub-heading-line
		line="none"
		title="다양한 산업 현장에서 검증된 성과를 만들고 있습니다"
		text="딥파인은 물류·제조·MRO·공공 분야의 실제 현장에서 작업 효율화, 오류 감소, 업무 표준화, 데이터 기반 운영 관리를 검증하고 있습니다."
	></sub-heading-line>

	<div class="relative mx-auto flex w-full max-w-145 items-center justify-between gap-5 lg:px-10">
		<swiper-container
			effect="cards"
			cards-effect-rotate="false"
			cards-effect-slide-shadows="false"
			grab-cursor="true"
			loop="true"
			speed="3000"
			autoplay-delay="300"
			autoplay-disable-on-interaction="true"
			navigation="true"
			class="mx-auto w-full max-w-95"
		>
			{#each lists as list (list.id)}
				<swiper-slide class="h-full w-full bg-transparent opacity-95 shadow-transparent lg:w-125 [&.swiper-slide-active]:opacity-100">
					<div class="bg-7785ff w-full space-y-5 overflow-clip rounded-xl p-5">
						<picture class="flex h-47 overflow-clip rounded-xl transition-all lg:h-56.25">
							<img src="https://www.deepfine.com/filestorage/2026/1/23/1aeaeb1a-8e4c-4042-8bea-8cdf124e1515.png" alt="" class="w-full object-cover" />
						</picture>

						<ul class="flex items-center justify-center gap-3">
							{#each list.badge as bed, i (i)}
								<li class="rounded-full bg-white px-3 py-1">
									{bed}
								</li>
							{/each}
						</ul>
						<dl class="text-2md lg:43.5 flex h-35 flex-col justify-between overflow-clip rounded-b-xl px-5 text-lg text-white">
							<dt class="text-center text-lg lg:text-2xl">
								{list.txt}
							</dt>
							<dd class=" text-right">2025. 12. 8</dd>
						</dl>
					</div>
				</swiper-slide>
			{/each}
		</swiper-container>
	</div>
</section>
