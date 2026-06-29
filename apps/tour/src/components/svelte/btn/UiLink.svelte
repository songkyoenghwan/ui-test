<svelte:options
	customElement={{
		tag: 'ui-link',
		shadow: 'none',
		props: {
			link: { type: 'String' },
			txt: { type: 'String', reflect: true },
			cls: { type: 'String' },
			iconCls: { type: 'String', attribute: 'icon-cls' },
			iconName: { type: 'String', attribute: 'icon-name' },
			iconPos: { type: 'String', attribute: 'icon-pos' },
		},
	}}
/>

<script lang="ts">
	interface Props {
		txt?: string;
		link?: string;
		cls?: string;
		iconCls?: string;
		iconName?: string;
		iconPos?: string;
	}

	let { txt, link, cls, iconCls, iconName, iconPos = 'rt' }: Props = $props();
</script>

{#snippet icon()}
	<icon-list data-name={iconName} class={['icon relative size-4 transition-all', iconCls]}></icon-list>
{/snippet}

<a href={link} class="hover:text-1616ff items-cente flex gap-4 break-all underline underline-offset-1" target="_blank">
	{#if iconName && iconPos === 'lt'}
		{@render icon()}
	{/if}
	{txt}
	{#if iconName && iconPos === 'rt'}
		{@render icon()}
	{/if}
</a>
