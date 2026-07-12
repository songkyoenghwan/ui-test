<svelte:options
	customElement={{
		tag: 'ui-txt',
		shadow: 'none',
		props: {
			tag: { type: 'String' },
			txt: { type: 'String' },
			cls: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	import ContentTooltip from '@/svelte/tooltip/ContentTooltip.svelte';
	import type { Placement } from '@floating-ui/utils';
	interface Props {
		tag: 'p' | 'strong' | 'span' | 'div';
		txt?: string;
		size?: 'md' | 'sm' | 'xs';
		tooltip?: string;
		placement?: Placement;
		cls?: string;
	}
	let { tag = 'p', txt = '', cls = '', size = 'md', tooltip, placement = 'top' }: Props = $props();

	const s = $derived(size);
</script>

<svelte:element this={tag} class="txt {s} {cls ? cls : 'text-slate-500'}">
	<slot name="lt" />

	{@html txt}

	<slot name="rt" />
</svelte:element>

{#if tooltip}
	<ContentTooltip {placement} {txt} />
{/if}

<style>
	* {
		margin: 0;
		padding: 0;
	}
	.txt {
		&.md {
			font-size: 1rem;
		}

		&.sm {
			font-size: 0.875rem;
		}

		&.xs {
			font-size: 0.75rem;
		}

		&.xxs {
			font-size: 0.625rem;
		}
	}
</style>
