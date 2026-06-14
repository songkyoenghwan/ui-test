<svelte:options
	customElement={{
		tag: 'ui-input-group',
		shadow: 'open',
		props: {
			box: { type: 'String' },
			itemId: { reflect: true, type: 'String', attribute: 'item-id' },
			arr: { type: 'Array' },
			name: { type: 'String' },
			value: { reflect: true, type: 'String' },
			disabled: { reflect: true, type: 'Boolean' },
		},
	}}
/>

<script lang="ts">
	interface RadioItem {
		id: string;
		txt: string;
		value: string;
	}
	interface Props {
		box?: 'radio' | 'checkbox';
		itemId?: string;
		arr?: RadioItem[];
		name?: string;
		value?: string;
		disabled?: boolean;
		cls?: string;
		change?: (event: Event) => void;
	}
	let { box = 'radio', arr, name = $bindable(), value = $bindable(''), disabled = false, change }: Props = $props();
	const txtList = $derived(Array.isArray(arr) ? arr : []);
</script>

{#each txtList as item (item.id)}
	<label for={item.id} class="radio-box">
		{#if box === 'radio'}
			<input
				type="radio"
				id={item.id}
				{name}
				value={item.value}
				class="peer sr-only"
				{disabled}
				bind:group={value}
				onchange={change}
			/>
			<icon-list data-name={value === item.value ? 'radio-on' : 'radio-off'} class="icon"></icon-list>
		{:else}
			<input
				type="checkbox"
				id={item.id}
				{name}
				value={item.value}
				class="peer sr-only"
				{disabled}
				bind:group={value}
				onchange={change}
			/>
			<icon-list data-name={value === item.value ? 'checkbox-on' : 'checkbox-off'} class="icon"></icon-list>
		{/if}
		<span class="text-2sm text-black">{item.txt}</span>
	</label>
{/each}

<style>
	@import '../../../../src/lib/styles/ui-reset.css';

	.radio-box {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-slate-500);

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
