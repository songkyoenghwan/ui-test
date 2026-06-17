<svelte:options
	customElement={{
		tag: 'ui-checkbox',
		shadow: 'none',
		props: {
			itemId: { reflect: true, type: 'String', attribute: 'item-id' },
			txt: { type: 'String' },
			checked: { reflect: true, type: 'Boolean' },
			disabled: { reflect: true, type: 'Boolean' },
			reverse: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	import { applyGlobalReset } from '$lib/styles/shadow-theme';

	interface Props {
		itemId?: string;
		txt?: string;
		checked?: boolean;
		disabled?: boolean;
		reverse?: string;
		cls?: string;
		change?: (event: Event) => void;
	}
	let { itemId = '', txt = '', checked = $bindable(false), disabled = false, reverse = '', cls = '', change }: Props = $props();

	$effect(() => {
		const host = $host()?.shadowRoot;
		if (host) {
			applyGlobalReset(host);
		}
	});

	$effect(() => {
		const host = $host();
		if (host) {
			Object.defineProperty(host, 'checked', {
				get() {
					return checked;
				},
				set(val) {
					checked = !!val;
				},
				configurable: true,
			});
		}
	});
</script>

<label for={itemId} class="check-box {reverse ? 'flex-row-reverse' : ''} {cls}">
	<input type="checkbox" id={itemId} class="peer sr-only" {disabled} bind:checked onchange={change} />
	<icon-list data-name={checked ? 'checkbox-on' : 'checkbox-off'} class="icon"></icon-list>
	<span class="flex-1 text-sm text-black">{txt}</span>
</label>

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
