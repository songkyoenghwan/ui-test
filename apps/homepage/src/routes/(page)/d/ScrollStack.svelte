<script lang="ts">
	import { type Snippet } from 'svelte';

	type Props = {
		cards: Snippet[];
		cardHeight?: string; // 카드의 높이 (기본값 20rem / 320px)
		stickyTopOffset?: string; // 카드가 상단 어디쯤에서 멈출지 (기본값 상단에서 4rem)
		scaleStep?: number; // 쌓일 때 뒤에 카드가 얼마나 작아질지 (0.01 ~ 0.05 추천)
	};

	let { cards, cardHeight = 'h-80', stickyTopOffset = 'top-16', scaleStep = 0.03 }: Props = $props();
</script>

<!-- 1. 이 컴포넌트 내부에서만 스크롤이 도옵니다. (컨테이너 밖의 스크롤에 영향을 주지 않음) -->
<div class="relative h-[90vh] w-full overflow-x-hidden rounded-2xl bg-zinc-950 shadow-inner">
	<!-- 2. 카드들이 차례대로 올라올 내부 바구니 영역 -->
	<div class="mx-auto flex flex-col gap-12 pt-[5vh] pb-[40vh]">
		{#each cards as card, i (i)}
			<!-- 
                🔥 핵심 치트키: 
                GSAP이나 Lenis 없이 CSS position: sticky와 style 속성 연산만으로
                컴포넌트 내부에 카드를 차곡차곡 쌓아 올립니다.
            -->
			<div
				class="sticky h-full w-full origin-top rounded-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transition-all duration-200 {cardHeight} {stickyTopOffset}"
				style="
                    top: calc({stickyTopOffset.replace('top-', '')}rem + {i * 1.5}rem);
                    transform: scale({1 - (cards.length - 1 - i) * scaleStep});
                    z-index: {i};
                "
			>
				<!-- 외부에서 주입된 카드 내용 렌더링 -->
				{@render card()}
			</div>
		{/each}
	</div>
</div>
