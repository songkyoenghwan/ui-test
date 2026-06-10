<svelte:options
	customElement={{
		tag: 'ui-btn',
		shadow: 'open',
		props: {
			tag: { type: 'String' },
			txt: { type: 'String', reflect: true },
			variant: { type: 'String' },
			cls: { type: 'String' },
			size: { type: 'String' },
			name: { type: 'String' },
			value: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	import { applyGlobalReset } from '$lib/styles/shadow-theme';

	interface Props {
		tag?: 'button' | 'a' | 'label';
		variant?: 'primary' | 'secondary' | 'ghost' | 'segmented' | 'text';
		size?: 'lg' | 'md' | 'sm';
		txt?: string;
		cls?: string;
		name?: string;
		value?: string;
		click?: (event: MouseEvent) => void;
	}

	$effect(() => {
		const host = $host()?.shadowRoot;
		if (host) {
			applyGlobalReset(host);
		}
	});

	let { tag = 'button', variant = 'primary', size = 'md', txt, cls, name, value = $bindable(''), click }: Props = $props();

	const role = $derived(tag === 'a' ? 'link' : tag === 'button' ? 'button' : undefined);
	function parseArrayString(value: string): string[] {
		if (!value) return [];

		const trimmed = value.trim();
		if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
			try {
				const validJson = trimmed.replace(/'/g, '"');
				return JSON.parse(validJson);
			} catch (e) {
				return trimmed
					.slice(1, -1)
					.split(',')
					.map((t) => t.trim().replace(/^['"]|['"]$/g, ''));
			}
		}

		return trimmed.split(',').map((t) => t.trim());
	}
	const txtList = $derived(parseArrayString(txt ?? ''));
	const isSegmented = $derived(variant === 'segmented');
	let fillings: string[] = $derived(txtList);

	$effect(() => {
		if (!value && txtList.length > 0) {
			value = txtList[0];
		}
	});
</script>

{#if isSegmented}
	{#each fillings as item, i (`seg-${name}-${i}`)}
		<label for={`${name}-${i}`} class="button {variant} {size} {cls}">
			<input
				type="radio"
				id={`${name}-${i}`}
				{name}
				value={item}
				bind:group={value}
				class="sr-only"
				onchange={() => {
					value = item;
				}}
			/>
			{item}
		</label>
	{/each}
{:else}
	<svelte:element this={tag} type={tag === 'button' ? 'button' : undefined} {role} class="button {variant} {size} {cls}" aria-label={txt} onclick={click}>
		{txt}
	</svelte:element>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: 1.75rem;
		padding-right: 0.4375rem;
		padding-left: 0.4375rem;
		gap: 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

		&.lg {
			min-height: 2.5rem;
			font-size: 1rem;
			line-height: 1.5rem;
		}

		&.md {
			min-height: 1.75rem;
			font-size: 0.875rem;
			line-height: 1.25rem;
		}

		&.sm {
			min-height: 1.25rem;
			font-size: 0.625rem;
			line-height: 1.25;
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

		&[data-btn='input-del'] {
			display: none;
			z-index: 2;
			position: absolute;
			top: 0;
			right: 0;
		}
	}
</style>
