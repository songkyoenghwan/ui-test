<svelte:options
	customElement={{
		tag: 'input-search-del',
		shadow: 'none',
		props: {
			size: { type: 'String', reflect: true },
			value: { type: 'String', reflect: true },
			placeholder: { type: 'String', reflect: true },
			readonly: { type: 'Boolean', reflect: true },
			disabled: { type: 'Boolean', reflect: true },
		},
	}}
/>

<script lang="ts">
	let { value = $bindable(''), placeholder = '', readonly = false, disabled = false } = $props();

	function onInput(e: Event) {
		value = (e.target as HTMLInputElement).value;
	}

	function clear() {
		value = '';
	}
</script>

<div class="input-search group/input-search">
	<input class="input-text peer pr-15!" type="text" bind:value {placeholder} {readonly} {disabled} oninput={onInput} />

	<div class={['absolute top-1.5 right-2 z-2 bg-white', value.trim() === '' ? 'hidden' : '']}>
		<ui-btn
			variant="icon"
			icon-name="input-del"
			icon-cls="size-4 stroke-slate-400"
			onbtn-click={(e: Event) => {
				e.preventDefault();
				clear();
			}}
		></ui-btn>
	</div>
</div>
