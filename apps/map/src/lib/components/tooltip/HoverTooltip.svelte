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
	import type { Placement } from '@floating-ui/utils';
	import { Tooltip, Button } from 'flowbite-svelte';
	import { slide, scale, blur } from 'svelte/transition';
	interface MyTooltipProps {
		btn?: string;
		txt?: string;
		animation?: 'blur' | 'slide' | 'scale' | 'none';
		placement?: Placement;
		bg?: string;
	}

	let { btn = 'tooltip', txt = 'tooltip content', animation = 'blur', placement = 'top', bg = 'bg-primary' }: MyTooltipProps = $props();

	let place = $derived(placement as Placement);
	let activeTransition = $derived(() => {
		if (animation === 'slide') return slide;
		if (animation === 'scale') return scale;
		if (animation === 'blur') return blur;
		return undefined;
	});
	let formattedTxt = $derived(txt.replace(/\\n/g, '\n'));
</script>

<Button class="gap-2 p-0 font-normal text-slate-500">
	{btn}
	<icon-list data-name="info-circle" class="icon flex size-3 fill-slate-400"></icon-list>
</Button>

<Tooltip class="{bg} whitespace-pre-line" transition={activeTransition()} placement={place} transitionParams={{ duration: 100 }}>
	{formattedTxt}
</Tooltip>
