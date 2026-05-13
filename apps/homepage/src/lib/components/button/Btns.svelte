<script lang="ts">
	import Icons from '@/lib/components/icons/Icons.svelte';
	import { Clipboard, Input } from 'flowbite-svelte';
	import { CheckOutline } from 'flowbite-svelte-icons';
	import type { ClassValue } from 'svelte/elements';

	type Variant =
		| 'primary'
		| 'primary-outline'
		| 'secondary'
		| 'neutral'
		| 'neutral-outline'
		| 'ghost'
		| 'destructive'
		| 'destructive-outline'
		| 'white'
		| 'underline'
		| 'tooltip'
		| 'icon-only';
	interface Props {
		btnId?: string;
		buttonType?: 'button' | 'submit' | 'reset' | undefined;
		title?: string;
		itemHref?: string;
		text?: string;
		cls?: ClassValue;
		icon?: string;
		iconColor?: string;
		iconSize?: string;
		iconPosition?: 'ltl' | 'rtl' | 'center';
		variant?: Variant;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		disabled?: string;
		loading?: boolean;
		download?: string;
		fullWidth?: boolean;
	}
	let {
		btnId = '',
		buttonType = 'button' as Props['buttonType'],
		title = $bindable(''),
		itemHref = $bindable(''),
		text = $bindable(''),
		cls = '',
		icon = $bindable(''),
		iconColor = 'fill-svg stroke-svg',
		iconSize = 'size-5',
		iconPosition = 'rtl',
		variant = 'primary' as Variant,
		size = 'md' as Props['size'],
		disabled = $bindable(false),
		loading = $bindable(false),
		download = '',
		fullWidth = false,
		onclick = undefined,
	} = $props();
	const VARIANT_BG: Record<Variant, string> = {
		primary: 'bg-primary hover:bg-default active:bg-default',
		'primary-outline': 'border border-primary hover:bg-primary/5 active:bg-primary/5 bg-white',
		secondary: 'bg-secondary hover:bg-secondary/10 active:bg-secondary/80',
		neutral: 'bg-neutral hover:bg-neutral/80 active:bg-neutral/80',
		'neutral-outline': 'border border-neutral hover:bg-neutral/5 active:bg-neutral/5',
		ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-200',
		destructive: 'bg-destructive hover:bg-destructive/80 active:bg-destructive/80',
		white: 'border-ddd hover:border-primary/80 text-2sm min-h-15 min-w-45 rounded-lg border bg-white px-3',
		'destructive-outline': 'border border-ff0000 hover:bg-red-100 active:bg-red-100 bg-white',
		underline: '',
		tooltip: '',
		'icon-only': '',
	};
	const VARIANT_TEXT: Record<Variant, string> = {
		primary: 'text-white font-medium',
		'primary-outline': 'text-primary font-medium',
		secondary: 'text-gray-900 font-medium',
		neutral: 'text-white font-medium',
		'neutral-outline': 'text-neutral font-medium',
		ghost: 'text-666 font-medium',
		destructive: 'text-white font-medium',
		'destructive-outline': 'text-destructive-frg font-medium',
		white: 'text-black',
		underline: 'group-hover/btn:text-primary underline underline-offset-1',
		tooltip: '',
		'icon-only': '',
	};
	let variantBgClasses = $derived(VARIANT_BG[variant]);
	let variantTextClasses = $derived(VARIANT_TEXT[variant]);

	let sizeClasses = $derived(
		variant === 'icon-only'
			? {
					xs: 'size-6 rounded-sm',
					sm: 'size-8 rounded-md',
					md: 'size-10 rounded-lg',
					lg: 'size-12 rounded-lg',
					xl: 'size-14 rounded-lg',
				}[size ?? 'md']
			: {
					xs: 'px-1 py-1 text-xs min-h-6 rounded-full',
					sm: 'px-2 py-1 text-sm min-h-8 rounded-full',
					md: 'px-3 py-1 text-base min-h-10 rounded-full',
					lg: 'px-4 py-1 text-lg min-h-12.5 rounded-full',
					xl: 'px-5 py-1 text-xl min-h-14.5 rounded-full',
				}[size ?? 'md'],
	);

	let baseClasses = $derived(
		`focus:outline-primary/10 relative flex items-center justify-center gap-1.25 focus:outline hover:outline-primary min-w-10 disabled:bg-muted disabled:border-muted disabled:text-muted-frg disabled:hover:bg-muted disabled:cursor-not-allowed group/btn ${fullWidth ? 'w-full' : 'inline-flex'} ${sizeClasses}`,
	);

	function click(e: MouseEvent) {
		if (disabled || loading) return;
		const host = e.currentTarget as HTMLElement;
		if (!host) return;

		if (buttonType !== 'submit') {
			e.preventDefault();
			e.stopPropagation();
		}

		if (host) {
			host.dispatchEvent(
				new CustomEvent('btn-click', {
					// 소문자로 명명 추천
					detail: { btnId, text, variant },
					bubbles: true,
					composed: true, // Custom Element 경계를 넘어가도록 설정
				}),
			);
		}
	}

	let clipValue = $derived(text);
</script>

{#snippet iconRender({ icon = '', iconSize = '', iconColor = '', loading = false })}
	{#if loading}
		<div class="size-5 animate-spin rounded-full border-2 border-current border-t-transparent">
			<span class="sr-only">loading</span>
		</div>
	{:else if icon}
		<Icons
			name={icon}
			cls={`${iconSize} ${iconColor} group-disabled:fill-muted group-disabled/btn:stroke-muted transition-all group-hover:scale-110 group-hover:rotate-3 group-has-aria-expanded/drop-btn:rotate-180`}
		/>
	{/if}
{/snippet}

{#snippet spanText({ variant }: { variant: Variant; variantTextClasses?: string })}
	<span class={[variant === 'icon-only' ? 'sr-only' : variant === 'tooltip' ? 'group-hover/btn:text-primary' : 'truncate leading-none', 'group-disabled/btn:text-muted-frg']}>
		{text}
	</span>
{/snippet}

{#snippet btnContents({ text = '', icon = '', iconSize = '', iconColor = '', loading = false })}
	{#if iconPosition === 'ltl'}
		{@render iconRender({ icon, iconSize, iconColor, loading })}
	{/if}

	{#if text !== undefined && text !== ''}
		{@render spanText({ variant, variantTextClasses })}
	{/if}

	{#if iconPosition === 'rtl'}
		{@render iconRender({ icon, iconSize, iconColor, loading })}
	{/if}
{/snippet}

{#if itemHref}
	<a
		id={btnId}
		{title}
		href={itemHref}
		class={[baseClasses, cls, variantBgClasses, variantTextClasses]}
		aria-disabled={disabled || loading}
		aria-label={title}
		{...download !== '' ? { download: `${download}` } : {}}
	>
		{@render btnContents({ text, icon, iconSize, iconColor, loading })}
	</a>
{:else if icon === 'copy'}
	<Input bind:value={clipValue} readonly class="sr-only!" />
	<Clipboard
		bind:value={clipValue}
		class="text-primary hover:bg-primary/5 bg-transparent px-px py-0"
		{...variant === 'tooltip' ? { 'data-tooltip-target': `${btnId}-tooltip` } : {}}
	>
		{#snippet children(success)}
			{clipValue}
			{#if success}
				<CheckOutline class="size-6" />
			{:else}
				{@render iconRender({ icon, iconSize, iconColor, loading })}
			{/if}
		{/snippet}
	</Clipboard>
{:else}
	<button
		type={buttonType}
		id={btnId}
		{title}
		class={[baseClasses, cls, variantBgClasses, variantTextClasses, variantTextClasses]}
		aria-label={text}
		disabled={disabled || loading}
		{...variant === 'tooltip' ? { 'data-tooltip-target': `${btnId}-tooltip` } : {}}
		{onclick}
	>
		{@render btnContents({ text, icon, iconSize, iconColor, loading })}
	</button>
{/if}
