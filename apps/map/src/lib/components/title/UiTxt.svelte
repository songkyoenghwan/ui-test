<svelte:options
	customElement={{
		tag: 'ui-txt',
		shadow: 'open',
		props: {
			tag: { type: 'String' },
			txt: { type: 'String' },
			cls: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	import { applyGlobalReset } from '$lib/styles/shadow-theme';
	import type { Snippet } from 'svelte';

	interface Props {
		tag: 'p' | 'strong' | 'span' | 'div';
		txt?: string;
		size?: 'md' | 'sm' | 'xs';
		cls?: string;
		lt?: Snippet;
		rt?: Snippet;
		children?: Snippet;
	}
	let { tag = 'p', txt = '', cls = '', size, lt, rt, children }: Props = $props();

	$effect(() => {
		const host = $host()?.shadowRoot;
		if (host) {
			applyGlobalReset(host);
		}
	});

	const s = $derived(size);
</script>

<svelte:element this={tag} class="txt {s} {cls}">
	{#if lt}
		{@render lt()}
	{/if}

	<slot name="lt" />

	{txt}

	<slot name="rt" />

	{#if rt}
		{@render rt()}
	{/if}

	{#if children}
		{@render children()}
	{/if}
</svelte:element>

<style>
	.txt {
		color: var(--color-slate-500);

		&.md {
			font-size: 0.875rem;
		}

		&.sm {
			font-size: 0.75rem;
		}

		&.xs {
			font-size: 0.625rem;
		}
	}
</style>
