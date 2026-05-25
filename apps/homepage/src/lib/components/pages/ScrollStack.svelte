<script lang="ts">
	import { type Snippet } from 'svelte';

	type Props = {
		cards: Snippet[];
		cardHeight?: string; // 카드의 높이 (기본값 20rem / 320px)
		stickyTopOffset?: string; // 카드가 상단 어디쯤에서 멈출지 (기본값 상단에서 4rem)
		scaleStep?: number; // 쌓일 때 뒤에 카드가 얼마나 작아질지 (0.01 ~ 0.05 추천)
	};

	let { cards, cardHeight = 'h-[480px]', stickyTopOffset = 'top-16', scaleStep = 0.03 }: Props = $props();
</script>

<div class="relative h-dvh w-full overflow-x-hidden rounded-2xl">
	<div class="mx-auto flex flex-col gap-12 pb-[480px]">
		{#each cards as card, i (i)}
			<div
				class="sticky h-full w-full origin-top rounded-3xl transition-all duration-200 {cardHeight} {stickyTopOffset}"
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
