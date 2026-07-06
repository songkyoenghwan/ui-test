<svelte:options
	customElement={{
		tag: 'text-badge',
		shadow: 'none',
		props: {
			variant: { type: 'String' },
			size: { type: 'String' },
			text: { type: 'String' },
			ellipsis: { type: 'String', attribute: 'date-ellipsis' },
			icon: { type: 'String' },
			tooltip: { type: 'String' },
			cls: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	import ContentTooltip from '@/svelte/tooltip/ContentTooltip.svelte';

	type Props = {
		txt?: string;
		variant?: string;
		size?: string;
		ellipsis?: string;
		icon?: string;
		cls?: string;
	};

	let { txt = '', variant = '', size = 'lg', ellipsis = '', icon = '', tooltip = '', cls = '' }: Props = $props();

	let color = $derived(
		variant === 'error'
			? 'text-error border-error bg-white border'
			: variant === 'bg-error'
				? 'text-white bg-error'
				: variant === 'bg-primary'
					? 'text-white bg-cms-3'
					: variant === 'bg-slate'
						? 'text-slate-500 bg-slate-200'
						: variant === 'bg-secondary'
							? 'text-cms-3 bg-secondary border border-cms-3'
							: 'text-cms-3 bg-white border-cms-3 border',
	);
</script>

<strong
	class={[
		'inline-flex min-w-0 items-center justify-center gap-1 rounded-sm px-2 leading-none font-normal',
		variant,
		color,
		cls,
		size === 'md' ? 'h-4.5 text-xs' : 'min-h-5.5 py-1 text-sm',
	]}
>
	{#if icon}
		<icon-list data-name={icon ?? ''} class="icon stroke-cms-3 size-2.5"></icon-list>
	{/if}
	<span class={ellipsis ? 'truncate' : ''}>
		{txt}
	</span>
</strong>

{#if tooltip}
	<ContentTooltip placement="top" {txt} />
{/if}
