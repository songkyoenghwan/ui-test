<svelte:options
	customElement={{
		tag: 'icon-list',
		shadow: 'none',
		props: {
			name: { reflect: true, type: 'String', attribute: 'data-name' },
		},
	}}
/>

<script lang="ts">
	import { getIconData } from './IconData.svelte.ts';

	let { name = '', w = '100%', h = '100%', cls = '' } = $props();
	let svgRef = $state<SVGSVGElement | null>(null);
	const selectedIcon = $derived(getIconData().find((icon) => icon.name === name));
	const viewBox = $derived.by(() => {
		if (!selectedIcon) return '0 0 24 24';
		const parts = selectedIcon.size.trim().split(/\s+/);
		return parts.length > 1 ? `0 0 ${selectedIcon.size}` : `0 0 ${selectedIcon.size} ${selectedIcon.size}`;
	});
	const content = $derived(selectedIcon ? selectedIcon.html : '');

	$effect.pre(() => {
		if (svgRef) {
			svgRef.innerHTML = '';

			if (selectedIcon && selectedIcon.html) {
				svgRef.innerHTML = content;
			}
		}
	});
</script>

{#if selectedIcon}
	<svg bind:this={svgRef} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class={cls} width={w} height={h} {viewBox}></svg>
{/if}
