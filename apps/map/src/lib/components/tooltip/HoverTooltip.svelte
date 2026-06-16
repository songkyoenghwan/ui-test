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
	import { Button, Tooltip } from 'flowbite-svelte';
	import { blur, scale, slide } from 'svelte/transition';

	interface MyTooltipProps {
		btn?: string;
		txt?: string;
		animation?: 'blur' | 'slide' | 'scale' | 'none';
		placement?: Placement;
		bg?: string;
	}

	let { btn = 'tooltip', txt = 'tooltip content', animation = 'blur', placement = 'top', bg = 'bg-cms-3' }: MyTooltipProps = $props();

	let place = $derived(placement as Placement);
	let activeTransition = $derived(() => {
		if (animation === 'slide') return slide;
		if (animation === 'scale') return scale;
		if (animation === 'blur') return blur;
		return undefined;
	});
	let formattedTxt = $derived(txt.replace(/\\n/g, '\n'));
</script>

<Button class="gap-2 bg-transparent p-0 text-left text-[10px] font-normal tracking-tight text-slate-500 hover:bg-transparent">
	{btn}
	<icon-list data-name="tooltip" class="icon flex size-2.5 fill-slate-400"></icon-list>
</Button>

<Tooltip class="{bg} whitespace-pre-line" transition={activeTransition()} placement={place} transitionParams={{ duration: 100 }}>
	{@html formattedTxt}
</Tooltip>
