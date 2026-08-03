<!-- <svelte:options
	customElement={{
		tag: 'icon-list',
		shadow: 'none',
		props: {
			name: { reflect: true, type: 'String', attribute: 'data-name' },
			tooltipTxt: { type: 'String', attribute: 'data-tooltip-txt' },
		},
	}}
/> -->

<script lang="ts">
	import ContentTooltip from '@/svelte/tooltip/ContentTooltip.svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { getIconData } from './IconData.svelte.ts';

	let { name = '', w = '100%', h = '100%', tooltipTxt = '', cls = '' } = $props();
	const selectedIcon = $derived(getIconData().find((icon) => icon.name === name));
	const viewBox = $derived.by(() => {
		if (!selectedIcon) return '0 0 24 24';
		const parts = selectedIcon.size.trim().split(/\s+/);
		return parts.length > 1 ? `0 0 ${selectedIcon.size}` : `0 0 ${selectedIcon.size} ${selectedIcon.size}`;
	});
	const content = $derived(selectedIcon ? selectedIcon.html : '');

	const tooltipRefId = `icon-ref-${uuidv4()}`;
	let hoverEvent = $state(false);

	function hoverHandler(e: Event, _state: boolean = false) {
		e.preventDefault();
		hoverEvent = _state;
	}
</script>

{#if selectedIcon}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		class={cls}
		width={w}
		height={h}
		{viewBox}
		id={tooltipRefId}
		onpointerenter={(e) => hoverHandler(e, true)}
		onpointerleave={(e) => hoverHandler(e, false)}
	>
		{@html content}
	</svg>
{/if}

{#if tooltipTxt && hoverEvent}
	<ContentTooltip txt={tooltipTxt} referenceId={`#${tooltipRefId}`} placement="top" />
{/if}
