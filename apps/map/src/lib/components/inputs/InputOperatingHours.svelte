<svelte:options
	customElement={{
		tag: 'input-operating-hours',
		shadow: 'none',
		props: {
			itemId: { type: 'String', reflect: true, attribute: 'item-id' },
			selected: { type: 'String', reflect: true },
			result: { type: 'Array', reflect: true },
		},
	}}
/>

<script lang="ts">
	import type { Props } from '$lib/components/inputs/InputOperatingHours.type.svelte';
	import UiBtn from '$lib/components/btn/UiBtn.svelte';
	import SveltyPicker from 'svelty-picker';

	let { itemId = '', selected = $bindable('always'), result = $bindable([]) }: Props = $props();

	const list = $derived([
		{ id: `${itemId}-always`, name: 'always', txt: '매일' },
		{ id: `${itemId}-week-day`, name: 'week-day', txt: '요일별' },
	]);

	let localResult = $derived(result || []);
	let isInitialized = false;
	$effect(() => {
		if (result && result.length > 0) {
			if (!isInitialized) {
				result = JSON.parse(JSON.stringify(result));
				isInitialized = true;
			}
		} else if (!result || result.length === 0) {
			const uniqueId = crypto.randomUUID();
			result = [
				{
					id: uniqueId,
					weekDay: [
						{ name: 'mon', txt: '월', chk: false },
						{ name: 'tue', txt: '화', chk: false },
						{ name: 'wed', txt: '수', chk: false },
						{ name: 'thu', txt: '목', chk: false },
						{ name: 'fri', txt: '금', chk: false },
						{ name: 'sat', txt: '토', chk: false },
						{ name: 'sun', txt: '일', chk: false },
					],
					time: [{ timeStart: '', timeEnd: '', rest: false, restStart: '', restEnd: '' }],
				},
			];
			isInitialized = true;
		}
	});

	$effect(() => {
		if (selected !== 'always' && selected !== 'week-day') {
			selected = result.length > 0 ? 'week-day' : 'always';
		}
	});

	function addTime() {
		const uniqueId = crypto.randomUUID();
		const uniqueRestId = crypto.randomUUID();
		result = [
			...result,
			{
				id: uniqueId,
				weekDay: [
					{ name: 'mon', txt: '월', chk: false },
					{ name: 'tue', txt: '화', chk: false },
					{ name: 'wed', txt: '수', chk: false },
					{ name: 'thu', txt: '목', chk: false },
					{ name: 'fri', txt: '금', chk: false },
					{ name: 'sat', txt: '토', chk: false },
					{ name: 'sun', txt: '일', chk: false },
				],
				time: [{ id: uniqueRestId, rest: false, timeStart: '', timeEnd: '', restStart: '', restEnd: '' }],
			},
		];
	}

	function deleteTime(id: string) {
		if (result.length <= 1) return;
		result = result.filter((item) => item.id !== id);
	}

	function toggleRestTime(id: string, status: boolean) {
		result = result.map((item) => {
			if (item.id === id) {
				return {
					...item,
					time: item.time.map((t) => ({
						...t,
						rest: status,
						restStart: status ? t.restStart : '',
						restEnd: status ? t.restEnd : '',
					})),
				};
			}
			return item;
		});
	}
</script>

<div class="felx-wrap flex flex-col gap-2">
	<div class="flex w-32 gap-2">
		<UiBtn tag="label" variant="segmented" name={`${itemId}-operating-hours`} arr={list} cls="flex-1" bind:selected />
	</div>

	{#if selected === 'week-day'}
		<ul class="flex flex-col gap-2">
			{#each localResult as group, i (group.id)}
				<li
					class="relative left-0 flex flex-col gap-2 pt-2 opacity-100 transition-all not-first:border-t not-first:border-t-slate-200 first:pt-0 starting:left-1 starting:opacity-0"
				>
					<div class="flex flex-wrap gap-1">
						{#each group.weekDay as day, y (`${group.id}-week-${y}`)}
							<UiBtn
								itemId={`hour-${i}-${y}`}
								tag="chk"
								variant="segmented"
								bind:checked={day.chk as boolean}
								name={`${itemId}-closing-day-${group.id}`}
								txt={day.txt}
								cls="min-w-7 flex-[0_0_28px]"
							/>
						{/each}

						{#if localResult.length > 1}
							<UiBtn tag="button" variant="ghost" txt="시간대 삭제" cls="min-w-7 flex-[0_0_75px]" click={() => deleteTime(String(group.id))} />
						{/if}
					</div>

					<ul>
						{#each group.time as hour (hour.id)}
							<li class="flex flex-wrap gap-2">
								<div class="inline-flex items-center gap-2">
									<SveltyPicker mode="time" inputClasses="input-time m w-22" placeholder="시간선택" format="hh:ii" bind:value={hour.timeStart}></SveltyPicker>
									<span>~</span>
									<SveltyPicker mode="time" inputClasses="input-time m w-22" placeholder="시간선택" format="hh:ii" bind:value={hour.timeEnd}></SveltyPicker>
								</div>

								{#if hour.rest}
									<dl>
										<dt></dt>
										<dd class="inline-flex items-center gap-2">
											<SveltyPicker mode="time" inputClasses="input-time m w-22" placeholder="시간선택" format="hh:ii" bind:value={hour.restStart}
											></SveltyPicker>
											<span>~</span>
											<SveltyPicker mode="time" inputClasses="input-time m w-22" placeholder="시간선택" format="hh:ii" bind:value={hour.restEnd}
											></SveltyPicker>
											<UiBtn
												tag="button"
												variant="icon"
												txt="삭제"
												iconName="btn-del"
												cls="size-7 flex-[0_0_28px] stroke-error fill-error"
												click={() => toggleRestTime(String(group.id), false)}
											/>
										</dd>
									</dl>
								{:else}
									<UiBtn tag="button" variant="ghost" txt="휴게 시간 " cls="min-w-7 flex-[0_0_75px]" click={() => toggleRestTime(String(group.id), true)} />
								{/if}
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>

		<div>
			<UiBtn tag="button" variant="secondary" txt="시간대 추가 " arr={list} cls="min-w-20" disabled={localResult.length >= 7 ? true : undefined} click={addTime} />
		</div>
	{/if}
</div>
