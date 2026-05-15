<svelte:options
	customElement={{
		tag: 'sub-heading-line',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { visualMotion } from '$lib/components/heading/HeadingMotion.svelte';

	let { title = '', text = '' } = $props();
</script>

<header {@attach visualMotion} class="space-y-2.5 border-b border-b-black pb-5 opacity-100 lg:pb-15">
	<h2 class="text-3xl font-bold transition-all lg:text-6xl">{title}</h2>
	<p class="text-2md transition-all lg:text-lg">{text}</p>
</header>
