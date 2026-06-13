<svelte:options
	customElement={{
		tag: 'input-operating-period',
		shadow: 'none',
		props: {
			itemId: { type: 'String', reflect: true, attribute: 'item-id' },
			selected: { type: 'String', reflect: true },
			day: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	import InputPicker from '$lib/components/datePicker/InputPicker.svelte';
	import UiBtn from '$lib/components/btn/UiBtn.svelte';

	interface Props {
		itemId?: string;
		selected?: string;
		day?: string;
		checked?: boolean;
		disabled?: boolean;
		cls?: string;
	}
	let { itemId = '', selected = $bindable('always'), day = $bindable(''), checked = $bindable(false) }: Props = $props();

	const list = $derived([
		{ id: `${itemId}-always`, name: 'always', txt: '상시 운영' },
		{ id: `${itemId}-period`, name: 'period', txt: '기간' },
	]);

	$effect(() => {
		if (selected !== 'always' && selected !== 'period') {
			selected = day ? 'period' : 'always';
		}
	});
</script>

<div class="felx-wrap flex gap-2">
	<div class="flex w-32 gap-2">
		<UiBtn tag="label" variant="segmented" name={`${itemId}-operating-period`} arr={list} cls="flex-1" bind:selected />
	</div>

	{#if selected === 'period'}
		<InputPicker inputId={`${itemId}-picker`} dateType="range" bind:day></InputPicker>
	{/if}
</div>
