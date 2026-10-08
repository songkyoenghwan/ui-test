<script lang="ts">
	import { page } from '$app/state';
	import '@/lib';
	import favicon from '@/lib/assets/favicon.svg';
	import HeadArea from '@/lib/components/HeadArea.svelte';
	import LnbArea from '@/lib/components/lnb/LnbArea.svelte';
	import '@/lib/styles/index.css';

	let { children } = $props();

	let boardLayoutClass = $derived(page.url.pathname === '/board' || page.url.pathname === '/dashboard');
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="grid min-h-dvh grid-rows-[70px_1fr]">
	<HeadArea />

	<main
		class={[
			'gap-container transition-color grid max-h-[calc(100dvh-70px)] max-w-dvw p-5 has-data-[upload=dom]:overflow-auto has-[aside]:grid-cols-[6.25rem_1fr] max-sm:max-h-[calc(100dvh-50px)] max-sm:has-[aside]:grid-cols-[4rem_1fr] has-[aside]:min-[1440px]:grid-cols-[20rem_1fr]',
			boardLayoutClass ? 'grid-cols-[6.25rem_1fr]!' : '',
		]}
	>
		<LnbArea />

		{@render children()}
	</main>
</div>
