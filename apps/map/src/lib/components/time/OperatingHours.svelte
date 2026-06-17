<svelte:options
	customElement={{
		tag: 'operating-hours',
		shadow: 'none',
		props: {
			itemId: { type: 'String', reflect: true, attribute: 'item-id' },
			result: { type: 'Array' },
			rest: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	import TimeScrollPicker from '$/lib/components/datePicker/TimeScrollPicker.svelte';
	import UiBtn from '$lib/components/btn/UiBtn.svelte';
	import { v4 as uuidv4 } from 'uuid';

	interface DayWeek {
		name: string; // 'mon', 'tue' 등
		txt: string; // '월', '화' 등
		chk: boolean;
	}

	interface OperatingTime {
		id: string;
		timeStart: string;
		timeEnd: string;
		rest: boolean;
		error: boolean;
		restStart: string;
		restEnd: string;
	}

	interface OperatingHourCols {
		id: string;
		dayWeek: DayWeek[];
		time: OperatingTime[];
	}
	interface OperatingHourResult {
		status: 'always' | 'week';
		cols?: OperatingHourCols[];
		timeError?: boolean;
		weekError?: boolean;
	}
	interface Props {
		itemId?: string;
		result?: OperatingHourResult;
		rest?: string;
		error?: boolean;
	}
	let {
		itemId = uuidv4(),
		result = $bindable({ status: 'always', cols: [], timeError: false, weekError: false }),
		rest = 'off',
	}: Props = $props();

	const list = $derived([
		{ id: `${itemId}-always`, name: 'always', txt: '매일' },
		{ id: `${itemId}-week`, name: 'week', txt: '요일별' },
	]);

	let localResult = $derived(result.cols || []);
	let isInitialized = false;
	$effect(() => {
		if (localResult && localResult.length > 0) {
			if (!isInitialized) {
				result.cols = JSON.parse(JSON.stringify(result.cols));
				isInitialized = true;
			}
		} else if (!result || result.cols?.length === 0) {
			const uniqueId = uuidv4();
			result.cols = [
				{
					id: uniqueId,
					dayWeek: [
						{ name: 'mon', txt: '월', chk: false },
						{ name: 'tue', txt: '화', chk: false },
						{ name: 'wed', txt: '수', chk: false },
						{ name: 'thu', txt: '목', chk: false },
						{ name: 'fri', txt: '금', chk: false },
						{ name: 'sat', txt: '토', chk: false },
						{ name: 'sun', txt: '일', chk: false },
					],
					time: [
						{
							id: uniqueId,
							rest: false,
							error: false,
							timeStart: '',
							timeEnd: '',
							restStart: '',
							restEnd: '',
						},
					],
				},
			];
			isInitialized = true;
		}
	});

	$effect(() => {
		if (result.status !== 'always' && result.status !== 'week') {
			result.status = localResult.length > 0 ? 'week' : 'always';
		}
	});

	function addTime() {
		const uniqueId = uuidv4();
		const uniqueRestId = uuidv4();
		result.cols = [
			...localResult,
			{
				id: uniqueId,
				dayWeek: [
					{ name: 'mon', txt: '월', chk: false },
					{ name: 'tue', txt: '화', chk: false },
					{ name: 'wed', txt: '수', chk: false },
					{ name: 'thu', txt: '목', chk: false },
					{ name: 'fri', txt: '금', chk: false },
					{ name: 'sat', txt: '토', chk: false },
					{ name: 'sun', txt: '일', chk: false },
				],
				time: [{ id: uniqueRestId, rest: false, error: false, timeStart: '', timeEnd: '', restStart: '', restEnd: '' }],
			},
		];
	}

	function deleteTime(id: string) {
		if (localResult.length <= 1) return;
		result.cols = localResult.filter((item) => item.id !== id);
	}

	function toggleRestTime(id: string, status: boolean) {
		result.cols = localResult.map((item) => {
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
						result.cols = val.cols ?? [''];
					}
				},
				configurable: true,
				enumerable: true,
			});
		}
	});
</script>

<div class="felx-wrap flex flex-col gap-2">
	<div class="flex w-32 gap-2">
		<UiBtn tag="label" variant="segmented" name={`${itemId}-operating-hours`} arr={list} cls="flex-1" bind:selected={result.status} />
	</div>

	{#if result.status === 'week'}
		<ul class="flex flex-col gap-2">
			{#each localResult as group, i (group.id)}
				<li
					class="relative left-0 flex flex-col gap-2 pt-2 opacity-100 transition-all not-first:border-t not-first:border-t-slate-200 first:pt-0 starting:left-1 starting:opacity-0"
					style="z-index: {localResult.length - i};"
				>
					<div class="flex flex-wrap gap-1">
						{#each group.dayWeek as day, y (`${group.id}-week-${y}`)}
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
							<UiBtn
								tag="button"
								variant="ghost"
								txt="시간대 삭제"
								cls="min-w-7 flex-[0_0_75px]"
								click={() => deleteTime(String(group.id))}
							/>
						{/if}
					</div>

					<ul>
						{#each group.time as hour (hour.id)}
							<li class={['relative z-1 flex flex-wrap gap-2']}>
								<div class="inline-flex w-full items-center gap-2">
									<TimeScrollPicker bind:value={hour.timeStart} cls={hour.error ? 'error' : ''} />
									<span>~</span>
									<TimeScrollPicker bind:value={hour.timeEnd} cls={hour.error ? 'error' : ''} />
								</div>
								{#if rest === 'on'}
									{#if hour.rest}
										<dl>
											<dt>휴게 시간</dt>
											<dd class="inline-flex items-center gap-2">
												<TimeScrollPicker bind:value={hour.restStart} />
												<span>~</span>
												<TimeScrollPicker bind:value={hour.restEnd} />
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
										<UiBtn
											tag="button"
											variant="ghost"
											txt="휴게 시간"
											cls="min-w-7 flex-[0_0_75px]"
											click={() => toggleRestTime(String(group.id), true)}
										/>
									{/if}
								{/if}
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>

		<div class="flex items-center gap-2">
			<UiBtn tag="button" variant="secondary" txt="시간대 추가 " arr={list} cls="w-25 flex-[0_0_100px]" click={addTime} />
		</div>

		{#if result.timeError}
			<ui-txt size="sm" txt="시작 시간이 종료 시간보다 앞서야 합니다." cls="text-error"></ui-txt>
		{/if}

		{#if result.weekError}
			<ui-txt size="sm" txt="요일이 선택되지 않은 시간대가 있습니다." cls="text-error"></ui-txt>
		{/if}
	{/if}
</div>
