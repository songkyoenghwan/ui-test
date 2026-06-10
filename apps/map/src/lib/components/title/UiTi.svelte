<svelte:options
	customElement={{
		tag: 'ui-tit',
		shadow: 'open',
		props: {
			tag: { type: 'String' },
			tit: { type: 'String', reflect: true },
			cls: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { applyGlobalReset } from '$lib/styles/shadow-theme';

	interface Props {
		tag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		tit?: string;
		size?: string;
		cls?: string;
		icon?: Snippet;
		rt?: Snippet;
		children?: Snippet;
	}
	let { tag = 'h3', tit, size, cls, icon, rt, children }: Props = $props();

	$effect(() => {
		const host = $host()?.shadowRoot;
		if (host) {
			applyGlobalReset(host);
		}
	});

	const headingTag = $derived(['h2', 'h3', 'h4', 'h5', 'h6'].includes(tag) ? tag : 'h3');
	const s = $derived(size === 'lg' ? 'text-lg' : size === 'md' ? 'text-base' : '');
</script>

<svelte:element this={headingTag} class="title gap-1 text-lg font-semibold text-black has-[.icon]:flex {s} {cls}">
	{#if icon}
		{@render icon()}
	{/if}

	<slot name="lt" />

	{tit}

	<slot name="rt" />

	{#if rt}
		{@render rt()}
	{/if}

	{#if children}
		{@render children()}
	{/if}
</svelte:element>

<style>
	.title {
	}
</style>
