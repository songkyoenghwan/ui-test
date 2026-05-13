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
	const selectedIcon = $derived(getIconData().find((icon) => icon.name === name));
	const viewBox = $derived.by(() => {
		if (!selectedIcon) return '0 0 24 24';
		const parts = selectedIcon.size.trim().split(/\s+/);
		return parts.length > 1 ? `0 0 ${selectedIcon.size}` : `0 0 ${selectedIcon.size} ${selectedIcon.size}`;
	});
	const content = $derived(selectedIcon ? selectedIcon.html : '');
</script>

{#if selectedIcon}
	<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class={cls} width={w} height={h} {viewBox}>
		{@html content}
	</svg>
{/if}
