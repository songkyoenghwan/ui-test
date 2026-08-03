<svelte:options
	customElement={{
		tag: 'content-tooltip',
		shadow: 'none',
		props: {
			btn: { type: 'String', reflect: true },
			txt: { type: 'String', reflect: true },
			animation: { type: 'String', reflect: true },
			placement: { type: 'String', reflect: true },
			bg: { type: 'String', reflect: true },
			referenceId: { type: 'String' },
			open: { type: 'Boolean', reflect: true },
		},
	}}
/>

<script lang="ts">
	import type { Placement } from '@floating-ui/utils';
	import { Tooltip } from 'flowbite-svelte';
	import { blur, scale, slide } from 'svelte/transition';
	import * as z from 'zod';

	export const TooltipAnimationSchema = z.enum(['blur', 'slide', 'scale', 'none']);
	type TooltipAnimation = z.infer<typeof TooltipAnimationSchema>;
	interface Props {
		btn?: string;
		txt?: string;
		animation?: TooltipAnimation;
		placement?: Placement;
		bg?: string;
		referenceId?: string;
		open?: boolean;
	}

	let {
		btn = 'tooltip',
		txt = 'tooltip content',
		animation = 'blur',
		placement = 'top',
		bg = 'bg-slate-600',
		referenceId = '',
		open = false,
	}: Props = $props();

	let place = $derived(placement as Placement);
	let activeTransition = $derived(() => {
		if (animation === 'slide') return slide;
		if (animation === 'scale') return scale;
		if (animation === 'blur') return blur;
		return undefined;
	});
	let formattedTxt = $derived(txt.replace(/\\n/g, '\n'));

	function onbeforetoggle(ev: Event) {
		// oxlint-disable-next-line typescript/no-explicit-any
		const trigger = (ev as any).trigger;
		if (trigger?.id) {
			placement = trigger.id.replace('ref-', '');
		}
	}
</script>

<Tooltip
	class="{bg} rounded-sm px-3 py-2 text-xs whitespace-pre-line"
	transition={activeTransition()}
	placement={place}
	transitionParams={{ duration: 100 }}
	reference={referenceId}
>
	{@html formattedTxt}
</Tooltip>
