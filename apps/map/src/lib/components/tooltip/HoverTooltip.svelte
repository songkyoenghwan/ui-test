<svelte:options
	customElement={{
		tag: 'hover-tooltip',
		shadow: 'none',
		props: {
			btn: { type: 'String', reflect: true },
			txt: { type: 'String', reflect: true },
			animation: { type: 'String', reflect: true },
			placement: { type: 'String', reflect: true },
			bg: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	import { Tooltip, Button } from 'flowbite-svelte';
	import { slide, scale, blur } from 'svelte/transition';
	let { btn = 'tooltip', txt = 'tooltip content', animation = 'blur', placement = 'top', bg = 'bg-primary' } = $props();

	import type { Placement } from '@floating-ui/utils';
	let place: Placement = $derived(placement);
</script>

<Button class="gap-2 p-0 font-normal text-slate-500">
	{btn}
	<icon-list data-name="info-circle" class="icon flex size-3 fill-slate-400"></icon-list>
</Button>

{#if animation === 'blur'}
	<Tooltip class={bg} transition={blur} transitionParams={{ duration: 100 }} placement={place}>{@html txt}</Tooltip>
{:else if animation === 'slide'}
	<Tooltip class={bg} transition={slide} transitionParams={{ duration: 100 }} placement={place}>{@html txt}</Tooltip>
{:else}
	<Tooltip class={bg} transition={scale} transitionParams={{ duration: 100 }} placement={place}>{@html txt}</Tooltip>
{/if}
