<script lang="ts">
	import Icons from '@/svelte/icons/Icons.svelte';

	let { icon = '', name = '', color = '' } = $props();
</script>

{#snippet bgIcon()}
	<span class="grid size-5 place-content-center rounded-full bg-(--category-color)" style:--category-color={color}>
		<Icons name={icon} cls="size-3 fill-white stroke-white" />
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
