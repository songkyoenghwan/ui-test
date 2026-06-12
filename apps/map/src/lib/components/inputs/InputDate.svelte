<svelte:options
	customElement={{
		tag: 'input-date',
		shadow: 'none',
		props: {
			itemId: { type: 'String', reflect: true },
			selectedDate: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	interface Props {
		itemId?: string;
		selectedDate?: string;
		checked?: boolean;
		disabled?: boolean;
		cls?: string;
	}
	let { itemId = '', selectedDate = '', checked = $bindable(false) }: Props = $props();

	const list = $derived([
		{ id: `${itemId}-always`, name: 'always', txt: '상시 운영' },
		{ id: `${itemId}-period`, name: 'period', txt: '기간' },
	]);
	let value = $state('always');
</script>

<div class="felx-wrap flex gap-2">
	<ul class="inline-flex items-center gap-2">
		{#each list as item (item.id)}
			<li class="inline-flex items-center gap-2">
				<label for={item.id} class="button m ghost min-w-15">
					<input type="radio" id={item.id} name="always" class="peer sr-only" value={item.name} bind:group={value} />
					<span>{item.txt}</span>
				</label>

				{#if value === 'period' && item.name === 'period'}
					<date-period input-id={`${item.id}-picker`} date-type="range" {selectedDate}></date-period>
				{/if}
			</li>
		{/each}
	</ul>
</div>
