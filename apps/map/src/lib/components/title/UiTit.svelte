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
	import { applyGlobalReset } from '$lib/styles/shadow-theme';
	import type { Snippet } from 'svelte';

	interface Props {
		tag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		tit?: string;
		sub?: string;
		size?: 'lg' | 'md' | 'sm';
		cls?: string;
		icon?: Snippet;
		rt?: Snippet;
		children?: Snippet;
	}
	let { tag = 'h3', tit, sub, size, cls, icon, rt, children }: Props = $props();

	$effect(() => {
		const host = $host()?.shadowRoot;
		if (host) {
			applyGlobalReset(host);
		}
	});

	const headingTag = $derived(['h2', 'h3', 'h4', 'h5', 'h6'].includes(tag) ? tag : 'h3');
	const s = $derived(size);
</script>

<svelte:element this={headingTag} class="tit {s} {cls}">
	{#if icon}
		{@render icon()}
	{/if}

	<slot name="lt" />

	{tit}

	<slot name="rt" />

	{#if sub}
		<p class="sub">{sub}</p>
	{/if}

	{#if rt}
		{@render rt()}
	{/if}

	{#if children}
		{@render children()}
	{/if}
</svelte:element>

<style>
	.tit {
		color: var(--color-black);
		font-weight: 600;

		&.lg {
			font-size: 18px;
		}

		&.md {
			font-size: 16px;
		}
	}

	.sub {
		color: var(--color-slate-500);
		font-weight: 400;
		font-size: 0.875rem;
	}
</style>
