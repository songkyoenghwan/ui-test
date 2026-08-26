<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';

	interface Props {
		tag?: 'button' | 'a' | 'label' | 'chk' | 'rdo';
		variant?: 'primary' | 'secondary' | 'ghost' | 'segmented' | 'text' | 'icon' | 'icon-hover';
		size?: 'lg' | 'md' | 'sm';
		iconOnly?: '' | 'icon';
		btnType?: 'button' | 'reset' | 'submit';
		itemId?: string;
		txt?: string;
		link?: string;
		value?: string;
		blank?: string;
		download?: string;
		scroll?: string;
		cls?: string;
		iconCls?: string;
		name?: string;
		arr?: { id?: string; name?: string | number; txt?: string; disabled?: boolean }[];
		selected?: number | string | null | number[] | string[];
		iconName?: string;
		iconPos?: string;
		disabled?: string | boolean;
		checked?: boolean;
		click?: (event: MouseEvent) => void;
		onmousedown?: (event: MouseEvent) => void;
		change?: (event: Event) => void;
	}

	let {
		tag = 'button',
		variant = 'primary',
		iconOnly = '',
		btnType,
		itemId = uuidv4(),
		txt,
		link,
		cls,
		iconCls,
		name,
		iconName,
		iconPos = 'rt',
		value = '',
		blank = '_self',
		download,
		disabled,
		click,
		onmousedown,
		change,
	}: Props = $props();

	const role = $derived(tag === 'a' ? 'link' : tag === 'button' ? 'button' : undefined);
</script>

{#snippet icon()}
	<icon-list data-name={iconName} class={['icon relative  transition-all', iconCls ? iconCls : 'size-4']}></icon-list>
{/snippet}

<svelte:element
	this={tag}
	type={tag === 'button' ? (btnType ?? 'button') : undefined}
	{role}
	class="group relative flex h-10 items-center justify-center rounded-sm bg-white to-[#0f1f42] px-2 py-1 transition-colors hover:bg-(--base-color) hover:text-white active:bg-(--base-color) active:text-white"
	aria-label={txt}
	{onmousedown}
	disabled={disabled === true || disabled === 'true' || disabled === 'disabled' ? true : undefined}
	onclick={(e: PointerEvent) => {
		click?.(e);
	}}
>
	{#if iconName && iconPos === 'lt'}
		{@render icon()}
	{/if}

	{#if variant === 'icon'}
		<span class="sr-only">
			{txt}
		</span>
	{:else if iconOnly === 'icon'}
		<span class="sr-only">
			{txt}
		</span>
	{:else}
		{txt}
	{/if}
	{#if iconName && iconPos === 'rt'}
		{@render icon()}
	{/if}
</svelte:element>
