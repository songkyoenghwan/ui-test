<svelte:options
	customElement={{
		tag: 'ui-checkbox',
		shadow: 'none',
		props: {
			variant: { type: 'String' },
			itemId: { reflect: true, type: 'String', attribute: 'item-id' },
			txt: { type: 'String' },
			checked: { reflect: true, type: 'Boolean' },
			disabled: { reflect: true, type: 'Boolean' },
			reverse: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	interface Props {
		variant?: 'default' | 'toggle';
		itemId?: string;
		txt?: string;
		checked?: boolean;
		disabled?: boolean;
		reverse?: string;
		cls?: string;
		change?: (event: Event) => void;
	}
	import { v4 as uuidv4 } from 'uuid';
	let {
		variant = 'default',
		itemId = uuidv4() || '',
		txt = '',
		checked = $bindable(false),
		disabled = false,
		reverse = '',
		cls = '',
		change,
	}: Props = $props();

	function handleChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		checked = target.checked;

		$host()?.dispatchEvent(
			new CustomEvent('checked-change', {
				detail: { checked },
				bubbles: true,
			}),
		);
	}
</script>

{#if variant === 'toggle'}
	<label for={itemId} class="toggle-chk">
		<input
			type="checkbox"
			id={itemId}
			class="peer sr-only"
			aria-label="toggle checkbox"
			bind:checked
			onchange={handleChange}
		/>
	</label>
{:else}
	<label for={itemId} class="check-box {reverse ? 'flex-row-reverse' : ''} {cls}">
		<input type="checkbox" id={itemId} class="peer sr-only" {disabled} bind:checked onchange={handleChange} />
		<icon-list data-name={checked ? 'checkbox-on' : 'checkbox-off'} class="icon"></icon-list>

		{#if txt}
			<span class="flex-1 text-sm text-black">{txt}</span>
		{/if}
	</label>
{/if}

<style>
	.check-box {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-black);

		&.flex-row-reverse {
			flex-direction: row-reverse;
		}

		.icon {
			display: flex;
			width: 1rem;
			height: 1rem;
			fill: var(--color-white);
			stroke: var(--color-slate-300);
			transition: all 0.1s ease-in-out;
		}

		&:has(:checked) {
			.icon {
				fill: var(--color-cms-4);
				stroke: var(--color-cms-4);
			}
		}

		&:has(:disabled) {
			color: var(--color-slate-500);

			.icon {
				fill: var(--color-slate-100);
				stroke: var(--color-slate-300);
			}
		}
	}
</style>
