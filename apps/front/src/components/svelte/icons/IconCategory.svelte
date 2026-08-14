<script lang="ts">
	import Icons from '@/svelte/icons/Icons.svelte';

	let { icon = '', name = '', color, reverse = '' } = $props();
</script>

{#snippet bgIcon()}
	<span
		class={[
			'grid size-5 place-content-center rounded-full',
			reverse === 'poi'
				? 'rounded-full border border-white bg-(--category-color)'
				: reverse === 'poi-current'
					? 'bg-white'
					: 'bg-(--category-color)',
		]}
		style:--category-color={color}
	>
		{#if reverse === 'poi'}
			<Icons name={icon} cls="size-3 fill-white stroke-white" />
		{:else if reverse === 'poi-current'}
			<Icons name={icon} cls="size-4.25 fill-(--category-color) stroke-(--category-color)" />
		{:else}
			<Icons name={icon} cls="size-3 fill-white stroke-white" />
		{/if}
	</span>
{/snippet}

{#if name}
	<span class="flex items-center gap-2">
		{@render bgIcon()}

		{#if name}
			<span class="text-sm text-slate-700">
				{name}
			</span>
		{/if}
	</span>
{:else}
	{@render bgIcon()}
{/if}
