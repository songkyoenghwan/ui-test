<svelte:options
	customElement={{
		tag: 'only-checkbox',
		shadow: 'none',
		props: {
			chkId: { reflect: true, type: 'String', attribute: 'chk-id' },
			checked: { reflect: true, type: 'Boolean' },
			disabled: { reflect: true, type: 'Boolean' },
		},
	}}
/>

<script lang="ts">
	let { chkId = '', checked = $bindable(false), disabled = $bindable(false) } = $props();

	function handleChange(e: Event) {
		const target = e.currentTarget as HTMLInputElement;

		checked = target.checked;

		const host = target.closest('only-checkbox');

		if (host) {
			host.dispatchEvent(
				new CustomEvent('checked-changed', {
					detail: { checked: checked, chkId },
					bubbles: true,
					composed: true, // Shadow DOM 경계를 넘나들기 위해 필요
				}),
			);
		}
	}
</script>

<label class="input-checkbox h-6 items-center select-none" for={chkId ?? ''}>
	<input class="peer sr-only" id={chkId ?? ''} type="checkbox" {checked} {disabled} onchange={handleChange} />

	{#if !disabled}
		<icon-checkbox {checked}></icon-checkbox>
	{:else}
		<icon-checkbox {checked} {disabled}></icon-checkbox>
	{/if}
	<span class="sr-only">체크</span>
</label>
