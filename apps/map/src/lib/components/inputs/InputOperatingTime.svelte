<svelte:options
	customElement={{
		tag: 'input-operating-time',
		shadow: 'none',
		props: {
			itemId: { type: 'String', reflect: true, attribute: 'item-id' },
			selected: { type: 'String', reflect: true },
			day: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	import UiBtn from '$lib/components/btn/UiBtn.svelte';

	interface Props {
		itemId?: string;
		selected?: string;
		day?: string;
		checked?: boolean;
		disabled?: boolean;
		cls?: string;
	}
	let { itemId = '', selected = $bindable('everyday'), day = $bindable(''), checked = $bindable(false) }: Props = $props();

	const list = $derived([
		{ id: `${itemId}-everyday`, name: 'everyday', txt: '상시 운영' },
		{ id: `${itemId}-day`, name: 'day', txt: '기간' },
	]);

	$effect(() => {
		if (selected !== 'everyday' && selected !== 'day') {
			selected = day ? 'day' : 'everyday';
		}
	});
</script>

<div class="felx-wrap flex gap-2">
	<div class="inline-flex items-center gap-2">
		<UiBtn tag="label" variant="segmented" name={`${itemId}-closing-day`} arr={list} cls="w-15 flex-[0_0_60px]" bind:selected />
	</div>

	<!-- <ul class="inline-flex items-center gap-2">
		{#each list as item (item.id)}
			<li class="inline-flex items-center gap-2">
				<label for={item.id} class="button m ghost min-w-15">
					<input type="radio" id={item.id} name="everyday" class="peer sr-only" value={item.name} bind:group={selected} />
					<span>{item.txt}</span>
				</label>
			</li>
		{/each}
	</ul> -->
</div>
