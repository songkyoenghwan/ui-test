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
	import {
		createDefaultOperatingHourCol,
		createDefaultOperatingHourResult,
		type Props,
	} from '$lib/types/time/operatingHours.type';
	import { untrack } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	let {
		result = $bindable(),
		rest = 'off',
		error = false,
		timeError = false,
		weekError = false,
		view = 'reg',
	}: Props = $props();
	let local = $state(createDefaultOperatingHourResult());

	$effect(() => {
		if (result && typeof result === 'object') {
			const resultSnap = $state.snapshot(result);

			untrack(() => {
				local.status = resultSnap.status || 'always';
				local.cols = resultSnap.cols || [];
			});
		}
	});

	const itemId = uuidv4();
	let list = $state([
		{ id: `${itemId}-always`, name: 'always', txt: '매일' },
		{ id: `${itemId}-week`, name: 'week', txt: '요일별' },
	]);
	let dayWeekList = $state([
		{ id: `${itemId}-mon`, name: 'mon', txt: '월' },
		{ id: `${itemId}-tue`, name: 'tue', txt: '화' },
		{ id: `${itemId}-wed`, name: 'wed', txt: '수' },
		{ id: `${itemId}-thu`, name: 'thu', txt: '목' },
		{ id: `${itemId}-fri`, name: 'fri', txt: '금' },
		{ id: `${itemId}-sat`, name: 'sat', txt: '토' },
		{ id: `${itemId}-sun`, name: 'sun', txt: '일' },
	]);

	$effect(() => {
		if (local.status !== 'always' && local.status !== 'week') {
			untrack(() => {
				local.status = result.cols.length > 0 ? 'week' : 'always';
			});
		}
	});

	function addTime() {
		if (!result) return;
		const uniqueId = uuidv4();
		local.cols?.push(createDefaultOperatingHourCol(uniqueId));
	}

	function deleteTime(id: string) {
		if (!result) return;
		if (local.cols.length <= 1) return;
		local.cols = local.cols.filter((item) => item.id !== id);
	}

	function toggleRestTime(id: string, status: boolean) {
		if (!result) return;
		local.cols = local.cols.map((item) => {
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

	const getFormattedDayText = (days: string[] = []) => {
		if (days.length === 0) return '';

		const isMatch = (targetDays: string[]) => days.length === targetDays.length && targetDays.every((d) => days.includes(d));

		// 주중 판별
		if (isMatch(['mon', 'tue', 'wed', 'thu', 'fri'])) return '주중';

		// 주말 판별 (기획에 맞게 'sat', 'sun'으로 수정됨)
		if (isMatch(['sat', 'sun'])) return '주말';

		// 그 외의 경우 (요일 이름 매핑)
		return days
			.map((item) => dayWeekList.find((w) => w.name === item)?.txt || '')
			.filter(Boolean) // 빈 문자열 제거(안전망)
			.join(', ');
	};

	$effect(() => {
		const localSnap = $state.snapshot(local);
		untrack(() => {
			if (result && typeof result === 'object') {
				result.status = localSnap.status;
				result.cols = localSnap.cols;
			}
		});
	});
</script>

{#if view === 'detail'}
	{#if local.status === 'always'}
		{@const t = result?.cols?.[0].time}
		<div class="grid grid-cols-[120px_1fr] items-center">
			<ui-txt size="sm" cls="text-black" txt="매일"></ui-txt>
			<ui-txt size="sm" cls="text-black" txt={`${t?.timeStart} ~ ${t?.timeEnd}`}></ui-txt>
		</div>
	{/if}

	{#if local.status === 'week'}
		<ul class="space-y-2">
			{#each result?.cols as item}
				<li class="grid grid-cols-[120px_1fr] items-center">
					<ui-txt size="sm" cls="text-black" txt={getFormattedDayText(item.dayWeek)}></ui-txt>
					<ui-txt size="sm" cls="text-black" txt={`${item?.time?.timeStart} ~ ${item?.time?.timeEnd}`}></ui-txt>
				</li>
			{/each}
		</ul>
	{/if}
{:else}
	<div class="felx-wrap flex flex-col gap-2">
		<div class="flex w-32 gap-2">
			<UiBtn
				tag="label"
				variant="segmented"
				name={`${itemId}-operating-hours`}
				arr={list}
				cls="flex-1"
				bind:selected={local.status}
			/>
		</div>

		{#if local.status === 'week'}
			<ul class="flex flex-col gap-2">
				{#each local.cols as group, i (group.id)}
					<li
						class="relative left-0 flex flex-col gap-2 pt-2 opacity-100 transition-all not-first:border-t not-first:border-t-slate-200 first:pt-0 starting:left-1 starting:opacity-0"
						style="z-index: {local.cols.length - i};"
					>
						<div class="flex flex-wrap gap-1">
							<UiBtn
								tag="chk"
								variant="segmented"
								arr={dayWeekList}
								bind:selected={group.dayWeek}
								name={`${itemId}-hour-day-${i}`}
								cls="min-w-7 flex-[0_0_28px]"
							/>

							{#if local.cols.length > 1}
								<UiBtn
									tag="button"
									variant="ghost"
									txt="시간대 삭제"
									cls="min-w-7 flex-[0_0_75px]"
									click={() => deleteTime(String(group.id))}
								/>
							{/if}
						</div>

						<div class={['relative z-1 flex flex-wrap gap-2']}>
							<div class="inline-flex w-full items-center gap-2">
								<TimeScrollPicker bind:value={group.time.timeStart} cls={group.time.error ? 'error' : ''} />
								<span>~</span>
								<TimeScrollPicker bind:value={group.time.timeEnd} cls={group.time.error ? 'error' : ''} />
							</div>
							{#if rest === 'on'}
								{#if group.time.rest}
									<dl>
										<dt>휴게 시간</dt>
										<dd class="inline-flex items-center gap-2">
											<TimeScrollPicker bind:value={group.time.restStart} />
											<span>~</span>
											<TimeScrollPicker bind:value={group.time.restEnd} />
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
						</div>
					</li>
				{/each}
			</ul>

			<div class="flex items-center gap-2">
				<UiBtn
					tag="button"
					variant="secondary"
					txt="시간대 추가 "
					arr={list}
					cls="w-25 flex-[0_0_100px]"
					click={addTime}
				/>
			</div>
		{:else if local.status === 'always'}
			<div class="inline-flex w-full items-center gap-2">
				<TimeScrollPicker bind:value={local.cols[0].time.timeStart} cls={local.cols[0].time.error ? 'error' : ''} />
				<span>~</span>
				<TimeScrollPicker bind:value={local.cols[0].time.timeEnd} cls={local.cols[0].time.error ? 'error' : ''} />
			</div>
		{/if}

		{#if local.timeError}
			<ui-txt size="sm" txt="시작 시간이 종료 시간보다 앞서야 합니다." cls="text-error"></ui-txt>
		{/if}

		{#if local.weekError}
			<ui-txt size="sm" txt="요일이 선택되지 않은 시간대가 있습니다." cls="text-error"></ui-txt>
		{/if}
	</div>
{/if}
