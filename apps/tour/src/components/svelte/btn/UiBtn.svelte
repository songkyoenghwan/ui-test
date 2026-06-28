<svelte:options
	customElement={{
		tag: 'ui-btn',
		shadow: 'none',
		props: {
			itemId: { type: 'String', reflect: true, attribute: 'item-id' },
			tag: { type: 'String' },
			link: { type: 'String' },
			txt: { type: 'String', reflect: true },
			variant: { type: 'String' },
			cls: { type: 'String' },
			iconCls: { type: 'String', attribute: 'icon-cls' },
			size: { type: 'String' },
			value: { type: 'String' },
			arr: { type: 'Array' },
			name: { type: 'String' },
			iconName: { type: 'String', attribute: 'icon-name' },
			iconPos: { type: 'String', attribute: 'icon-pos' },
			selected: { type: 'String', reflect: true },
			disabled: { type: 'String', reflect: true },
			checked: { type: 'Boolean', reflect: true },
		},
	}}
/>

<script lang="ts">
	interface Props {
		tag?: 'button' | 'a' | 'label' | 'chk' | 'rdo';
		variant?: 'primary' | 'secondary' | 'ghost' | 'segmented' | 'text' | 'icon';
		size?: 'lg' | 'md' | 'sm';
		itemId?: string;
		txt?: string;
		link?: string;
		value?: string;
		scroll?: string;
		cls?: string;
		iconCls?: string;
		name?: string;
		arr?: { id?: string; name?: string; txt?: string }[];
		selected?: string | string[] | string[][];
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
		size = 'md',
		itemId,
		txt,
		link,
		cls,
		iconCls,
		name,
		iconName,
		iconPos = 'rt',
		arr,
		value = '',
		scroll = '',
		selected = $bindable(),
		disabled,
		checked = $bindable(false),
		click,
		onmousedown,
		change,
	}: Props = $props();

	const role = $derived(tag === 'a' ? 'link' : tag === 'button' ? 'button' : undefined);
	const isSegmented = $derived(variant === 'segmented' && arr);
	const segmentList = $derived(Array.isArray(arr) ? arr : []);
	let scrollAreaRef: HTMLElement | null = $state(null);

	function dispatch(type: string, detail?: unknown) {
		$host()?.dispatchEvent(
			new CustomEvent(type, {
				detail,
				bubbles: true,
				composed: true,
			}),
		);
	}

	$effect(() => {
		if (!selected && segmentList.length > 0) {
			selected = segmentList[0].name;
		}
	});
</script>

{#snippet icon()}
	<icon-list data-name={iconName} class={['icon relative size-4 transition-all', iconCls]}></icon-list>
{/snippet}

{#if isSegmented}
	{#each segmentList as item, i (`seg-${item.name}-${i}`)}
		<label for={`${name}-${item.name}-${i}`} class="button {variant} {size} {cls}">
			{#if tag === 'chk'}
				<input
					type="checkbox"
					id={`${name}-${item.name}-${i}`}
					{name}
					value={item.name}
					bind:group={selected}
					class="sr-only"
					onchange={change}
				/>
			{:else}
				<input
					type="radio"
					id={`${name}-${item.name}-${i}`}
					{name}
					value={item.name}
					bind:group={selected}
					class="sr-only"
					onchange={change}
					onclick={(e) => {
						if (scroll) {
							const container = document.getElementById('main-container');
							const targetElement = document.getElementById(`target-scroll-${name}-${i}`);

							if (container && targetElement) {
								const containerRect = container.getBoundingClientRect();
								const targetRect = targetElement.getBoundingClientRect();
								const headerOffset = 120;
								const offsetPosition = targetRect.top - containerRect.top + container.scrollTop - headerOffset;

								container.scrollTo({
									top: offsetPosition,
									behavior: 'smooth',
								});
							}
						}
					}}
				/>
			{/if}
			{item?.txt ? item?.txt : item}
		</label>
	{/each}
{:else if !isSegmented && tag === 'button'}
	<svelte:element
		this={tag}
		type={tag === 'button' ? 'button' : undefined}
		{role}
		class="button {variant} {size} {cls}"
		aria-label={txt}
		{onmousedown}
		disabled={disabled === true || disabled === 'true' ? true : undefined}
		onclick={(e) => {
			click?.(e);
			dispatch('btn-click', e);
		}}
	>
		{#if iconName && iconPos === 'lt'}
			{@render icon()}
		{/if}

		{#if variant === 'icon'}
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
{:else if !isSegmented && tag === 'a'}
	<a href={link} class=" {variant} {size} {cls ? cls : 'hover:text-1616ff flex items-center'}" target="_blank">
		{#if iconName && iconPos === 'lt'}
			{@render icon()}
		{/if}
		{txt}
		{#if iconName && iconPos === 'rt'}
			{@render icon()}
		{/if}
	</a>
{:else if !isSegmented && tag === 'chk'}
	<label for={itemId} class="button segmented {variant} {size} {cls}">
		<input type="checkbox" id={itemId} {name} {value} bind:checked class="sr-only" onchange={change} />
		{txt}
	</label>
{/if}

<style>
	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: 1.75rem;
		padding-right: 0.25rem;
		padding-left: 0.25rem;
		gap: 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

		&.lg {
			min-height: 2.5rem;
			font-size: 0.875rem;
			line-height: 1.5rem;

			&.segmented {
				font-size: 0.875rem;
			}
		}

		&.md {
			min-height: 1.75rem;
			font-size: 0.625rem;
			line-height: 1.25rem;

			&.segmented {
				font-size: 0.75rem;
			}
		}

		&.sm {
			min-height: 1.25rem;
			font-size: 0.625rem;
			line-height: 1.25;

			&.segmented {
				font-size: 0.625rem;
			}
		}

		&.primary {
			border: 1px solid var(--color-cms-2);
			background-color: var(--color-cms-2);
			color: var(--color-fff, #ffffff);

			&:hover:not(:disabled) {
				border-color: var(--color-cms-3);
				background-color: var(--color-cms-3);
			}
			&:focus-visible {
				outline: none;
				background-color: var(--color-cms-4);
			}
			&:active:not(:disabled) {
				border-color: var(--color-cms-4);
				background-color: var(--color-cms-4);
			}
			&:disabled {
				border-color: var(--color-slate-200);
				background-color: var(--color-slate-100);
				color: var(--color-slate-500);
				cursor: not-allowed;
			}
		}

		&.secondary {
			border: 1px solid var(--color-cms-3);
			background-color: transparent;
			color: var(--color-cms-4);

			&:hover:not(:disabled) {
				background-color: var(--color-secondary);
			}
			&:focus-visible,
			&:active:not(:disabled) {
				background-color: var(--color-secondary);
			}
			&:disabled {
				border-color: var(--color-slate-200);
				background-color: var(--color-slate-100);
				color: var(--color-slate-500);
				cursor: not-allowed;
			}
		}

		&.ghost {
			border: 1px solid var(--color-slate-300);
			background-color: var(--color-fff, #ffffff);
			color: var(--color-black, #121212);

			&:hover:not(:disabled) {
				background-color: var(--color-slate-100);
			}
			&:focus-visible,
			&:active:not(:disabled) {
				background-color: var(--color-slate-200);
			}
			&:disabled {
				background-color: var(--color-fff, #ffffff);
				cursor: not-allowed;
			}
			&:has(:checked) {
				border-color: var(--color-cms-3);
				background-color: var(--color-cms-3);
				color: var(--color-fff, #ffffff);
			}
		}

		&.segmented {
			border: 1px solid var(--color-slate-300);
			background-color: var(--color-fff, #ffffff);
			color: var(--color-black, #121212);

			&:hover:not(:disabled) {
				border-color: var(--color-cms-3);
			}
			&:focus-visible,
			&:active:not(:disabled) {
				border-color: var(--color-cms-3);
				background-color: var(--color-secondary);
			}
			&:disabled {
				border: 1px solid var(--color-slate-100);
				background-color: var(--color-slate-100);
				cursor: not-allowed;
			}
			&:has(:checked) {
				border-color: var(--color-cms-3);
				background-color: var(--color-cms-3);
				color: var(--color-fff, #ffffff);
			}
		}

		&.text {
			border: 1px solid transparent;
			background-color: transparent;

			&:hover:not(:disabled) {
				background-color: var(--color-slate-100);
			}
			&:focus-visible,
			&:active:not(:disabled) {
				background-color: var(--color-slate-200);
			}
			&:disabled {
				color: var(--color-slate-500);
				cursor: not-allowed;
			}
		}

		&.icon {
			border: 1px solid transparent;
			background-color: transparent;

			&:hover:not(:disabled) {
				border-color: var(--color-slate-100);
				background-color: var(--color-slate-100);
			}
			&:focus-visible,
			&:active:not(:disabled) {
				border-color: var(--color-slate-300);
				background-color: var(--color-slate-200);
			}
		}
		/* 
		&[data-btn='input-del'] {
			display: none;
			z-index: 2;
			position: absolute;
			top: 0;
			right: 0;
		} */

		&:has(.icon) {
			gap: 8px;
		}

		.icon {
			display: flex;
			flex: none;

			&.size-1 {
				width: 4px;
			}

			&.size-2 {
				width: 8px;
			}

			&.size-3 {
				width: 12px;
			}

			&.size-4 {
				width: 16px;
			}

			&.size-5 {
				width: 20px;
			}

			&.size-6 {
				width: 24px;
			}
		}

		&.fill-cms-1 {
			fill: var(--color-cms-1);
		}
		&.fill-cms-2 {
			fill: var(--color-cms-2);
		}
		&.fill-cms-3 {
			fill: var(--color-cms-3);
		}
		&.fill-cms-4 {
			fill: var(--color-cms-4);
		}
		&.fill-cms-5 {
			fill: var(--color-cms-5);
		}

		&.stroke-cms-1 {
			stroke: var(--color-cms-1);
		}
		&.stroke-cms-2 {
			stroke: var(--color-cms-2);
		}
		&.stroke-cms-3 {
			stroke: var(--color-cms-3);
		}
		&.stroke-cms-4 {
			stroke: var(--color-cms-4);
		}
		&.stroke-cms-5 {
			stroke: var(--color-cms-5);
		}
	}
</style>
