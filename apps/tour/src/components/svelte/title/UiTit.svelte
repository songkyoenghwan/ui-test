<svelte:options
	customElement={{
		tag: 'ui-tit',
		shadow: 'none',
		props: {
			tag: { type: 'String' },
			tit: { type: 'String', reflect: true },
			cls: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	import { applyGlobalReset } from '@/styles/shadow-theme';
	import HoverTooltip from '@/svelte/tooltip/HoverTooltip.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		tag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		tit?: string;
		sub?: string;
		size?: 'lg' | 'md' | 'sm';
		req?: string;
		tip?: string;
		tooltip?: string;
		cls?: string;
		icon?: Snippet;
		rt?: Snippet;
		children?: Snippet;
	}
	let { tag = 'h3', tit, sub, size = 'sm', req, tip, tooltip, cls, icon, rt, children }: Props = $props();

	$effect(() => {
		const host = $host()?.shadowRoot;
		if (host) {
			applyGlobalReset(host);
		}
	});

	const headingTag = $derived(['h2', 'h3', 'h4', 'h5', 'h6'].includes(tag) ? tag : 'h3');
	const s = $derived(size);
</script>

<svelte:element this={headingTag} class="tit flex items-center gap-1 {s} {cls}">
	{#if icon}
		{@render icon()}
	{/if}

	<slot name="lt" />

	{@html tit}

	{#if req}
		<span class="text-xs text-slate-500">선택</span>
	{/if}

	<slot name="rt" />

	{#if rt}
		{@render rt()}
	{/if}

	{#if children}
		{@render children()}
	{/if}
</svelte:element>

{#if sub}
	<p class="sub">{sub}</p>
{/if}

{#if tip && tooltip}
	<div class="flex items-center pt-1">
		<HoverTooltip btn={tip} txt={tooltip} />
	</div>
{/if}

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

		&.sm {
			font-size: 14px;
		}
	}

	.sub {
		color: var(--color-slate-500);
		font-weight: 400;
		font-size: 12px;
	}
</style>
