<svelte:options
	customElement={{
		tag: 'text-radio',
		shadow: 'none',
		props: {
			itemId: { reflect: true, type: 'String', attribute: 'item-id' },
			itemName: { reflect: true, type: 'String', attribute: 'item-name' },
			value: { reflect: true, type: 'String' },
			disabled: { reflect: true, type: 'Boolean' },
		},
	}}
/>

<script lang="ts">
	let {
		itemId = '',
		itemName = '',
		text = '',
		value = $bindable(''),
		checked = false,
		disabled = $bindable(false),
	} = $props();

	function handleChange(e: Event) {
		const target = e.currentTarget as HTMLInputElement;

		value = target.value;

		const host = target.closest('text-radio');

		if (host) {
			host.dispatchEvent(
				new CustomEvent('checked-changed', {
					detail: { value: value, itemId },
					bubbles: true,
					composed: true, // Shadow DOM 경계를 넘나들기 위해 필요
				}),
			);
		}
	}
</script>

<label for={itemId} class="flex min-h-6 gap-3 items-center select-none disabled:cursor-no-drop" aria-label={value}>
	<input
		type="radio"
		id={itemId}
		name={itemName}
		class="peer sr-only"
		{disabled}
		{value}
		{checked}
		onchange={handleChange}
	/>
	<icon-list
		data-name="radio"
		class={[
			disabled ? 'peer-checked:fill-ccc stroke-ccc' : 'peer-checked:fill-primary stroke-primary',
			'transition-all size-6 fill-white',
		]}
	></icon-list>

	<span class="text-2sm text-666 peer-checked:text-primary peer-disabled:text-ccc">{text}</span>
</label>
