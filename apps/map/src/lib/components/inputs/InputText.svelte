<svelte:options
	customElement={{
		tag: 'input-text',
		shadow: 'none',
		props: {
			itemId: { type: 'String', reflect: true },
			value: { type: 'String', reflect: true },
			error: { reflect: true, type: 'String', attribute: 'error' },
			placeholder: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	interface Props {
		itemId?: string;
		value?: string;
		placeholder?: string;
		error?: string;
		cls?: string;
		input?: (event: Event) => void;
	}
	let { itemId = '', value = $bindable(''), placeholder, error, cls = '', input }: Props = $props();
</script>

<input
	id={itemId}
	class={['input-text w-full read-only:border-slate-300 read-only:bg-white', error ? 'error border-error! outline-error' : '', cls]}
	{placeholder}
	bind:value
	oninput={input}
/>
