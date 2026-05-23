<script lang="ts">
	import ScrollStack from './ScrollStack.svelte';

	// 무지개 컬러 배열
	const gradientColors = [
		'from-pink-500 to-rose-500',
		'from-purple-500 to-indigo-500',
		'from-cyan-500 to-blue-500',
		'from-emerald-500 to-teal-500',
		'from-amber-500 to-orange-500',
	];
</script>

{#snippet customCard(index, title, desc, bgGradient)}
	<div class="bg-gradient-to-br {bgGradient} flex h-full w-full flex-col justify-between rounded-2xl p-6 text-white">
		<div class="flex items-center justify-between">
			<span class="font-mono text-xs tracking-widest opacity-60">STEP 0{index}</span>
			<div class="h-2 w-2 animate-pulse rounded-full bg-white/80"></div>
		</div>
		<div>
			<h4 class="text-xl font-bold tracking-tight">{title}</h4>
			<p class="mt-2 text-xs leading-relaxed opacity-80">{desc}</p>
		</div>
	</div>
{/snippet}

{#snippet card1()}
	{@render customCard(1, '입고 알림 수신', '대시보드 커널에서 물류 파이프라인의 입고 이벤트를 실시간 캡처합니다.', gradientColors[0])}
{/snippet}
{#snippet card2()}
	{@render customCard(2, '데이터 청킹 밸리데이션', '50,000개 이상의 유효성 검사 매핑 노드를 무중단 스케줄링 처리합니다.', gradientColors[1])}
{/snippet}
{#snippet card3()}
	{@render customCard(3, '하드웨어 아키텍처 매칭', 'Apple Silicon arm64 런타임 환경에 맞추어 바이너리를 정렬합니다.', gradientColors[2])}
{/snippet}
{#snippet card4()}
	{@render customCard(4, 'CSS 격리 최적화', '외부 라이브러리 의존성 없이 가볍고 정교한 Sticky 스택을 렌더링합니다.', gradientColors[3])}
{/snippet}
{#snippet card5()}
	{@render customCard(5, '파이프라인 배포 완료', 'Svelte 5 Runes 아키텍처에 대응하는 완전무결한 모듈화 처리를 완료합니다.', gradientColors[4])}
{/snippet}

<main class="flex min-h-screen flex-col items-center justify-center bg-zinc-900 p-8">
	<div class="w-full max-w-2xl">
		<h2 class="mb-4 text-sm font-semibold tracking-wider text-zinc-400 uppercase">Logistics Pipeline</h2>

		<!-- 조립된 컴포넌트 배치 -->
		<ScrollStack cards={[card1, card2, card3, card4, card5]} cardHeight="h-64" stickyTopOffset="top-8" scaleStep={0.02} />
	</div>
</main>
