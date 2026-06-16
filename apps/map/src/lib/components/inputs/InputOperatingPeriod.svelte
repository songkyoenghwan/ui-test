<svelte:options
	customElement={{
		tag: 'input-operating-period',
		shadow: 'none',
		props: {
			itemId: { type: 'String', reflect: true, attribute: 'item-id' },
		},
	}}
/>

<script lang="ts">
	import UiBtn from '$lib/components/btn/UiBtn.svelte';
	import { v4 as uuidv4 } from 'uuid';

	interface OperatingResult {
		status: 'always' | 'period';
		day?: string;
	}

	interface Props {
		itemId?: string;
		result?: OperatingResult;
		checked?: boolean;
		disabled?: boolean;
		cls?: string;
	}
	let { itemId = uuidv4(), result = $bindable({ status: 'always', day: '' }), checked = $bindable(false) }: Props = $props();

	const list = $derived([
		{ id: `${itemId}-always`, name: 'always', txt: '상시 운영' },
		{ id: `${itemId}-period`, name: 'period', txt: '기간' },
	]);
	$effect(() => {
		const currentStatus = result.status;

		if (currentStatus === 'always' && result.day !== '') {
			result.day = '';
		}
	});

	$effect(() => {
		const host = $host();
		if (host) {
			Object.defineProperty(host, 'result', {
				get() {
					return $state.snapshot(result);
				},
				set(val) {
					if (val) {
						result.status = val.status ?? 'always';
						result.day = val.day ?? '';
					}
				},
				configurable: true,
				enumerable: true,
			});
		}
	});
</script>

<div class="felx-wrap flex gap-2">
	<div class="flex w-32 gap-2">
		<UiBtn tag="label" variant="segmented" name={`${itemId}-operating-period`} arr={list} cls="flex-1" bind:selected={result.status} />
	</div>

	{#if result.status === 'period'}
		<InputPicker inputId={`${itemId}-picker`} dateType="range" bind:day={result.day}></InputPicker>
	{/if}
</div>
