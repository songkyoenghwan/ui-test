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
