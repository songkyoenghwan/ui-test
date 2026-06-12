<script lang="ts">
	interface Props {
		itemId?: string;
		txt?: string;
		checked?: boolean;
		disabled?: boolean;
		cls?: string;
		change?: (event: Event) => void;
	}
	let { itemId = '', txt = '', checked = $bindable(false), disabled = false, change }: Props = $props();

	const list = $derived([
		{ id: `${itemId}-none`, name: 'none', txt: '없음' },
		{ id: `${itemId}-day`, name: 'day', txt: '요일' },
		{ id: `${itemId}-date`, name: 'date', txt: '날짜 ' },
	]);
	const weekList = $derived([
		{ id: `${itemId}-first`, name: '1', txt: '첫째' },
		{ id: `${itemId}-second`, name: '2', txt: '둘째' },
		{ id: `${itemId}-third`, name: '3', txt: '셋째' },
		{ id: `${itemId}-fourth`, name: '4', txt: '넷째' },
		{ id: `${itemId}-last`, name: 'last', txt: '마지막' },
	]);
	const dateList = $derived([
		{ id: `${itemId}-mon`, name: 'mon', txt: '월' },
		{ id: `${itemId}-tue`, name: 'tue', txt: '화' },
		{ id: `${itemId}-wed`, name: 'wed', txt: '수' },
		{ id: `${itemId}-thu`, name: 'thu', txt: '목' },
		{ id: `${itemId}-fri`, name: 'fri', txt: '금' },
		{ id: `${itemId}-sat`, name: 'sat', txt: '토' },
		{ id: `${itemId}-sun`, name: 'sun', txt: '일' },
	]);
	let value = $state('none');
</script>

<div class="flex flex-col gap-2">
	<ul class="inline-flex items-center gap-2">
		{#each list as item (item.id)}
			<li class="inline-flex items-center gap-2">
				<label for={item.id} class="button m ghost min-w-15">
					<input type="radio" id={item.id} name={item.name} class="peer sr-only" value={item.name} bind:group={value} />
					<span>{item.txt}</span>
				</label>
			</li>
		{/each}
	</ul>

	{#if value === 'day'}
		<dl class="inline-flex items-center gap-1">
			<dt class="label">주차</dt>
			{#each weekList as item (item.id)}
				<dd>
					<label for={item.id} class="button m ghost min-w-12.5">
						<input type="checkbox" id={item.id} name={item.name} class="peer sr-only" />
						<span>{item.txt}</span>
					</label>
				</dd>
			{/each}
			<dd><ui-checkbox item-id="" txt="매주" class="flex-none"></ui-checkbox></dd>
		</dl>
		<dl class="inline-flex items-center gap-1">
			<dt class="label">요일</dt>
			{#each dateList as item (item.id)}
				<dd>
					<label for={item.id} class="button m ghost size-7">
						<input type="checkbox" id={item.id} name={item.name} class="peer sr-only" />
						<span>{item.txt}</span>
					</label>
				</dd>
			{/each}
		</dl>
	{/if}

	{#if value === 'date'}
		<dl class="inline-flex items-center gap-1">
			<dt class="label">매달</dt>
			<dd>
				<div class="grid flex-[0_0_300px] items-center bg-white px-2 py-1.5">
					<select name="" id="" class="select h-7">
						<button type="button">
							<selectedcontent class="truncate"></selectedcontent>
						</button>
						{#each Array(31) as _, i (`sel-date-${i}`)}
							<option class="max-w-66" value="">{i + 1}일</option>
						{/each}
					</select>
				</div>
			</dd>
		</dl>
	{/if}
</div>
