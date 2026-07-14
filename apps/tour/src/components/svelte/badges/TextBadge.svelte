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
			del: { type: 'String' },
			cls: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	import ContentTooltip from '@/svelte/tooltip/ContentTooltip.svelte';
	import { blur, scale, slide } from 'svelte/transition';

	type Props = {
		txt?: string;
		variant?: string;
		size?: string;
		ellipsis?: string;
		icon?: string;
		tooltip?: string;
		del?: string;
		cls?: string;
	};

	let { txt = '', variant = '', size = 'lg', ellipsis = '', icon = '', tooltip = '', del = '', cls = '' }: Props = $props();

	let open = $state(true);

	let color = $derived(
		variant === 'bg-slate-50'
			? 'text-slate-500 bg-slate-50 border-slate-100 border stroke-slate-500'
			: variant === 'error'
				? 'text-error border-error bg-white border stroke-error'
				: variant === 'bg-error'
					? 'text-white bg-error stroke-white'
					: variant === 'border-error'
						? 'text-error bg-error/5 stroke-error border border-error'
						: variant === 'pastel-error'
							? 'text-error bg-error/10 stroke-error'
							: variant === 'bg-primary'
								? 'text-white bg-cms-3 stroke-white'
								: variant === 'pastel-primary'
									? 'text-cms-3 bg-secondary stroke-cms-3'
									: variant === 'bg-cms-4'
										? 'text-white bg-cms-4 stroke-white'
										: variant === 'bg-slate'
											? 'text-slate-500 bg-slate-200 stroke-slate-200'
											: variant === 'border-slate-300'
												? 'text-slate-800 bg-white stroke-slate-800 border border-slate-300'
												: variant === 'bg-secondary'
													? 'text-cms-3 bg-secondary border border-cms-3 stroke-cms-3'
													: 'text-cms-3 bg-white border-cms-3 border stroke-cms-3',
	);

	function openHandler() {
		open = false;
	}
</script>

<strong
	class={[
		'@starting:opacity-0.2 relative inline-flex min-w-0 items-center justify-center gap-1 rounded-sm px-2 leading-none font-normal opacity-100',
		variant,
		color,
		cls,
		size === 'md' ? 'h-4.5 text-xs' : 'min-h-5.5 py-1 text-sm',
		open ? 'inline-flex' : 'hidden!',
	]}
	in:slide={{ duration: 220 }}
	out:blur={{ duration: 180, amount: 6, opacity: 0.2 }}
>
	{#if icon}
		<icon-list data-name={icon ?? ''} class="icon size-2.5"></icon-list>
	{/if}
	<span class={ellipsis ? 'truncate' : ''}>
		{@html txt}
	</span>

	{#if del === 'del'}
		<ui-btn
			size="sm"
			variant="icon"
			icon-name="btn-del"
			icon-cls="size-4 stroke-error bg-white fill-error"
			class="-mt-1 ml-auto size-4 rounded-sm"
			txt="삭제"
			onbtn-click={(e: Event) => {
				e.preventDefault();
				openHandler();
			}}
		></ui-btn>
	{/if}
</strong>

{#if tooltip}
	<ContentTooltip placement="top" {txt} />
{/if}
