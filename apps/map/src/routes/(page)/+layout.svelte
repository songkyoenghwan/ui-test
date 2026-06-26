<script lang="ts">
	import '$lib/index';

	let { data, children } = $props();
</script>

<section class="grid h-dvh grid-cols-[var(--lnb-width)_1fr] grid-rows-[var(--header-height)_1fr]">
	<aside-lnb class="row-span-2 h-full" menus={data.menus}></aside-lnb>
	<!-- authority : D - user || administrator -->

	<header-list></header-list>

	<main id="main-container" class="main-container">
		{@render children()}
	</main>
</section>
