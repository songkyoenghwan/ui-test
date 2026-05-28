<script lang="ts">
	import '$lib/styles/index.css';
	import '$lib/components/index';

	let { children } = $props();
</script>

<section class="grid h-dvh grid-cols-[var(--lnb-width)_1fr] grid-rows-[var(--header-height)_1fr]">
	<aside-lnb class="row-span-2 h-full" authority="administrator"></aside-lnb>
	<!-- authority : D - user || administrator -->

	<header-list></header-list>

	<main class="relative grid size-full overflow-auto has-data-[map=init]:overflow-clip">
		{@render children()}
	</main>
</section>

<alert-popup class="fixed top-0 left-0" txt="작성 중인 내용이 저장되지 않았습니다. <br/>이 페이지를 벗어나시겠습니까?" confirm="확인" cancel="취소" open="close"></alert-popup>
