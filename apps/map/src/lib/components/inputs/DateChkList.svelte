<script lang="ts">
	import UiBtn from '$lib/components/btn/UiBtn.svelte';

	interface Props {
		itemId?: string;
		week?: string[];
		allWeek?: string;
		cls?: string;
		change?: (event: Event) => void;
	}
	let { itemId = '', week = $bindable(['']), allWeek = $bindable('1'), cls = '', change }: Props = $props();

	const dateList = $derived([
		{ id: `${itemId}-mon`, name: 'mon', txt: '월' },
		{ id: `${itemId}-tue`, name: 'tue', txt: '화' },
		{ id: `${itemId}-wed`, name: 'wed', txt: '수' },
		{ id: `${itemId}-thu`, name: 'thu', txt: '목' },
		{ id: `${itemId}-fri`, name: 'fri', txt: '금' },
		{ id: `${itemId}-sat`, name: 'sat', txt: '토' },
		{ id: `${itemId}-sun`, name: 'sun', txt: '일' },
	]);
</script>

{#each dateList as item (item.id)}
	<label for={item.id} class="button m segmented size-7">
		<input type="checkbox" id={item.id} name={item.name} class="peer sr-only" value={item.name} bind:group={week} />
		<span>{item.txt}</span>
	</label>
{/each}
