<script lang="ts">
	import ScrollStack from '$lib/components/pages/ScrollStack.svelte';

	// 무지개 컬러 배열
	const gradientColors = [
		'from-pink-500 to-rose-500',
		'from-purple-500 to-indigo-500',
		'from-cyan-500 to-blue-500',
		'from-emerald-500 to-teal-500',
		'from-amber-500 to-orange-500',
	];
</script>

{#snippet customCard(index, title, desc)}
	<div class="grid gap-5 rounded-xl bg-white p-5 lg:grid-cols-[minmax(0,1fr)_640px] xl:flex-row xl:gap-50 xl:p-15">
		<div class="flex flex-col justify-between gap-2.5">
			<dl class="space-y-2.5 xl:space-y-5">
				<dt class="text-2xl font-bold xl:text-5xl">{title}</dt>
				<dd class="text-lg xl:text-2xl">{desc}</dd>
				<dd class="text-2sm text-666 xl:text-lg">{desc}</dd>
			</dl>
		</div>

		<div>
			<video
				src="https://videos.pexels.com/video-files/35423737/15008263_2560_1440_30fps.mp4"
				class="bg-ebedff aspect-video h-auto w-full rounded-2xl object-cover sm:h-90 xl:w-160"
				autoplay
				muted
				playsinline
				loop
			>
				<source src="https://videos.pexels.com/video-files/35423737/15008263_2560_1440_30fps.mp4" type="video/mp4" />
			</video>
		</div>
	</div>
{/snippet}

{#snippet card1()}
	{@render customCard(1, '입고 알림 수신', '대시보드 커널에서 물류 파이프라인의 입고 이벤트를 실시간 캡처합니다.')}
{/snippet}

<main class="flex min-h-screen flex-col items-center justify-center">
	<div class="w-full">
		<ScrollStack cards={[card1, card1, card1, card1]} cardHeight="h-64" stickyTopOffset="top-8" scaleStep={0.02} />
	</div>
</main>
