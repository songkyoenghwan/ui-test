<svelte:options
	customElement={{
		tag: 'text-checkbox',
		shadow: 'none',
		props: {
			itemId: { reflect: true, type: 'String', attribute: 'item-id' },
			checked: { reflect: true, type: 'Boolean' },
			disabled: { reflect: true, type: 'Boolean' },
		},
	}}
/>

<script lang="ts">
	let { itemId = '', text = '', checked = $bindable(false), disabled = $bindable(false) } = $props();

	function handleChange(e: Event) {
		const target = e.currentTarget as HTMLInputElement;

		checked = target.checked;

		const host = target.closest('text-checkbox');

		if (host) {
			host.dispatchEvent(
				new CustomEvent('checked-changed', {
					detail: { checked: checked, itemId },
					bubbles: true,
					composed: true, // Shadow DOM 경계를 넘나들기 위해 필요
				}),
			);
		}
	}
</script>

<label for={itemId} class="input-checkbox min-h-6 items-center gap-3 select-none">
	<input type="checkbox" id={itemId} class="peer sr-only" {disabled} bind:checked onchange={handleChange} />
	<icon-checkbox {checked} {disabled}></icon-checkbox>
	<span class="text-2sm text-black">{text}</span>
</label>
