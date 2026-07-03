<svelte:options
	customElement={{
		tag: 'operating-hours',
		shadow: 'none',
		props: {
			itemId: { type: 'String', reflect: true, attribute: 'item-id' },
			result: { type: 'Array' },
			rest: { type: 'String', reflect: true },
			view: { type: 'String', reflect: true },
			error: { type: 'Boolean', reflect: true },
			timeError: { type: 'Boolean', reflect: true, attribute: 'time-error' },
			weekError: { type: 'Boolean', reflect: true, attribute: 'week-error' },
		},
	}}
/>

<script lang="ts">
	import UiBtn from '@/svelte/btn/UiBtn.svelte';
	import TimeScrollPicker from '@/svelte/datePicker/TimeScrollPicker.svelte';
	import { v4 as uuidv4 } from 'uuid';

	type ApiSchedule = {
		id?: number | string;
		dayOfWeek: number | null;
		openingTime: string;
		closingTime: string;
		breakStartTime?: string;
		breakEndTime?: string;
	};

	type UiScheduleGroup = {
		id: string;
		dayOfWeeks: number[];
		openingTime: string;
		closingTime: string;
		breakStartTime: string;
		breakEndTime: string;
	};

	type Status = 'always' | 'week';

	const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];

	const DAY_LABELS: Record<number, string> = {
		0: '일',
		1: '월',
		2: '화',
		3: '수',
		4: '목',
		5: '금',
		6: '토',
	};

	let {
		result = $bindable<ApiSchedule[]>([]),
		rest = 'off',
		error = false,
		timeError = false,
		weekError = false,
		view = 'reg',
	} = $props();

	const componentId = $props.id();
	let didInitStatus = $state(false);
	let status = $state<Status>('always');
	let lastInputSig = $state('');
	let lastOutputSig = $state('');
	let alwaysGroup = $state<UiScheduleGroup>(createGroup({ dayOfWeeks: [...ALL_DAYS] }));
	let weekCols = $state<UiScheduleGroup[]>([createGroup()]);
	let cols = $derived(status === 'always' ? [alwaysGroup] : weekCols);

	const list = [
		{ id: `${componentId}-always`, name: 'always' as const, txt: '매일' },
		{ id: `${componentId}-week`, name: 'week' as const, txt: '요일별' },
	];

	const dayWeekList = [
		{ id: `${componentId}-mon`, name: 1, txt: '월' },
		{ id: `${componentId}-tue`, name: 2, txt: '화' },
		{ id: `${componentId}-wed`, name: 3, txt: '수' },
		{ id: `${componentId}-thu`, name: 4, txt: '목' },
		{ id: `${componentId}-fri`, name: 5, txt: '금' },
		{ id: `${componentId}-sat`, name: 6, txt: '토' },
		{ id: `${componentId}-sun`, name: 0, txt: '일' },
	];

	function createGroup(partial?: Partial<UiScheduleGroup>): UiScheduleGroup {
		return {
			id: uuidv4(),
			dayOfWeeks: [],
			openingTime: '00:00',
			closingTime: '01:00',
			breakStartTime: '00:00',
			breakEndTime: '01:00',
			...partial,
		};
	}

	function normalizeSchedules(items: unknown) {
		if (!Array.isArray(items)) return [];

		return items.map((raw) => {
			const item = raw as ApiSchedule;

			return {
				dayOfWeek: item.dayOfWeek ?? null,
				openingTime: item.openingTime ?? '00:00',
				closingTime: item.closingTime ?? '01:00',
				breakStartTime: item.breakStartTime ?? '00:00',
				breakEndTime: item.breakEndTime ?? '01:00',
			};
		});
	}

	function makeSignature(items: unknown) {
		return JSON.stringify(
			normalizeSchedules(items).sort((a, b) => {
				if ((a.dayOfWeek ?? -1) !== (b.dayOfWeek ?? -1)) {
					return (a.dayOfWeek ?? -1) - (b.dayOfWeek ?? -1);
				}

				const aKey = `${a.openingTime}|${a.closingTime}|${a.breakStartTime}|${a.breakEndTime}`;
				const bKey = `${b.openingTime}|${b.closingTime}|${b.breakStartTime}|${b.breakEndTime}`;
				return aKey.localeCompare(bKey);
			}),
		);
	}

	function groupSchedules(items: unknown): UiScheduleGroup[] {
		if (!Array.isArray(items) || items.length === 0) {
			return [createGroup({ dayOfWeeks: [...ALL_DAYS] })];
		}

		const grouped = new Map<string, UiScheduleGroup>();

		for (const raw of items) {
			const item = raw as ApiSchedule;

			const breakStartTime = item.breakStartTime ?? '00:00';
			const breakEndTime = item.breakEndTime ?? '01:00';

			const key = [item.openingTime ?? '00:00', item.closingTime ?? '00:00', breakStartTime, breakEndTime].join('|');

			if (!grouped.has(key)) {
				grouped.set(
					key,
					createGroup({
						openingTime: item.openingTime ?? '00:00',
						closingTime: item.closingTime ?? '01',
						breakStartTime,
						breakEndTime,
					}),
				);
			}

			const group = grouped.get(key)!;

			if (item.dayOfWeek !== null && item.dayOfWeek !== undefined && !group.dayOfWeeks.includes(item.dayOfWeek)) {
				group.dayOfWeeks = [...group.dayOfWeeks, item.dayOfWeek].sort((a, b) => a - b);
			}
		}

		return Array.from(grouped.values());
	}

	function flattenGroups(): ApiSchedule[] {
		if (status === 'always') {
			return ALL_DAYS.map((dayOfWeek) => ({
				dayOfWeek,
				openingTime: alwaysGroup.openingTime,
				closingTime: alwaysGroup.closingTime,
				breakStartTime: alwaysGroup.breakStartTime ? alwaysGroup.breakStartTime : '',
				breakEndTime: alwaysGroup.breakEndTime ? alwaysGroup.breakEndTime : '',
			}));
		}

		return weekCols.flatMap((group) =>
			[...new Set(group.dayOfWeeks)]
				.filter((dayOfWeek): dayOfWeek is number => dayOfWeek != null)
				.map((dayOfWeek) => ({
					dayOfWeek,
					openingTime: group.openingTime,
					closingTime: group.closingTime,
					breakStartTime: group.breakStartTime ? group.breakStartTime : '',
					breakEndTime: group.breakEndTime ? group.breakEndTime : '',
				})),
		);
	}

	function isAlways(groups: UiScheduleGroup[]) {
		if (groups.length !== 1) return false;

		const days = [...groups[0].dayOfWeeks].sort((a, b) => a - b);
		return days.length === ALL_DAYS.length && ALL_DAYS.every((day, index) => day === days[index]);
	}

	function hydrateFromResult(items: unknown) {
		const grouped = groupSchedules(items);
		const nextStatus = isAlways(grouped) ? 'always' : 'week';

		if (nextStatus === 'always') {
			alwaysGroup = grouped[0] ?? createGroup({ dayOfWeeks: [...ALL_DAYS] });
		} else {
			weekCols = grouped.length > 0 ? grouped : [createGroup()];
		}

		status = nextStatus;
	}

	function emitResult() {
		const next = flattenGroups(cols);
		const sig = makeSignature(next);

		lastOutputSig = sig;
		result = next;
	}

	function applyStatus(next: Status) {
		if (next === status) return;
		status = next;
		emitResult();
	}

	function isDayUsedInOtherGroup(currentIndex: number, day: number) {
		return weekCols.some((col, index) => index !== currentIndex && col.dayOfWeeks.includes(day));
	}

	function getFormattedDayText(days: number[]) {
		const sorted = [...days].sort((a, b) => a - b);
		if (sorted.length === ALL_DAYS.length) return '매일';
		return sorted.map((day) => DAY_LABELS[day]).join(', ');
	}

	function addGroup() {
		if (status !== 'week') return;

		const usedDays = new Set(cols.flatMap((col) => col.dayOfWeeks));
		if (usedDays.size >= ALL_DAYS.length) return;

		const remainingDays = dayWeekList.map((item) => item.name).filter((day) => !usedDays.has(day));
		if (remainingDays.length === 0) return;

		weekCols = [
			...weekCols,
			createGroup({
				dayOfWeeks: [remainingDays[0]],
			}),
		];

		emitResult();
	}

	function removeGroup(index: number) {
		const next = cols.filter((_, i) => i !== index);
		weekCols = next.length > 0 ? next : [createGroup()];
		emitResult();
	}

	function toggleDay(groupIndex: number, day: number, checked: boolean) {
		const current = weekCols[groupIndex];
		if (!current) return;

		if (checked && isDayUsedInOtherGroup(groupIndex, day)) return;

		const nextDays = checked ? [...current.dayOfWeeks, day] : current.dayOfWeeks.filter((d) => d !== day);

		weekCols[groupIndex] = {
			...current,
			dayOfWeeks: [...new Set(nextDays)].sort((a, b) => a - b),
		};

		weekCols = [...weekCols];
		emitResult();
	}

	function handleTimeChange(index: number, key: 'openingTime' | 'closingTime', value: string) {
		if (status === 'always') {
			alwaysGroup = {
				...alwaysGroup,
				[key]: value,
			};
		} else {
			const current = weekCols[index];
			if (!current) return;

			weekCols[index] = {
				...current,
				[key]: value,
			};
			weekCols = [...weekCols];
		}

		emitResult();
	}

	function timeToMinutes(time: string) {
		const [hour = '0', minute = '0'] = (time ?? '00:00').split(':');
		return Number(hour) * 60 + Number(minute);
	}

	function hasInvalidTime(group: UiScheduleGroup) {
		return timeToMinutes(group.openingTime) >= timeToMinutes(group.closingTime);
	}

	let selectedDayCount = $derived(new Set(cols.flatMap((col) => col.dayOfWeeks)).size);
	let canAddGroup = $derived(status === 'week' && selectedDayCount < ALL_DAYS.length);
	let hasWeekError = $derived(status === 'week' && cols.some((group) => group.dayOfWeeks.length === 0));

	function hasRowTimeError(index: number) {
		const group = cols[index];
		if (!group) return false;
		return hasInvalidTime(group);
	}

	function toggleRestTime(id: string, enabled: boolean) {
		if (status === 'always') {
			if (alwaysGroup.id !== id) return;

			alwaysGroup = {
				...alwaysGroup,
				breakStartTime: enabled ? alwaysGroup.breakStartTime || '00:00' : '',
				breakEndTime: enabled ? alwaysGroup.breakEndTime || '01:00' : '',
			};
		} else {
			weekCols = weekCols.map((group) =>
				group.id === id
					? {
							...group,
							breakStartTime: enabled ? group.breakStartTime || '00:00' : '',
							breakEndTime: enabled ? group.breakEndTime || '01:00' : '',
						}
					: group,
			);
		}

		emitResult();
	}

	function handleRestTimeChange(index: number, key: 'breakStartTime' | 'breakEndTime', value: string) {
		if (status === 'always') {
			alwaysGroup = {
				...alwaysGroup,
				[key]: value,
			};
		} else {
			const current = weekCols[index];
			if (!current) return;

			weekCols[index] = {
				...current,
				[key]: value,
			};

			weekCols = [...weekCols];
		}

		emitResult();
	}

	function hasInvalidRestTime(group: UiScheduleGroup) {
		if (!group.breakStartTime) return false;
		return timeToMinutes(group.breakStartTime) >= timeToMinutes(group.breakEndTime);
	}

	function hasRowRestTimeError(index: number) {
		const group = cols[index];
		if (!group) return false;
		return hasInvalidRestTime(group);
	}

	$effect(() => {
		const safeResult = Array.isArray(result) ? result : [];
		const sig = makeSignature(safeResult);

		if (sig === lastInputSig) return;

		if (sig === lastOutputSig) {
			lastInputSig = sig;
			return;
		}

		hydrateFromResult(safeResult);
		lastInputSig = sig;
	});

	$effect(() => {
		if (didInitStatus) return;
		if (status !== 'always') return;

		didInitStatus = true;
		emitResult();
	});
</script>

{#if view === 'detail'}
	{#if status === 'always'}
		{#if cols[0]}
			<div class="grid grid-cols-[120px_1fr] items-center">
				<ui-txt size="sm" cls="text-black" txt="매일"></ui-txt>
				<ui-txt size="sm" cls="text-black" txt={`${cols[0].openingTime} ~ ${cols[0].closingTime}`}></ui-txt>
			</div>
		{/if}
	{:else}
		<ul class="space-y-2">
			{#each cols as item (item.id)}
				<li class="grid grid-cols-[120px_1fr] items-center">
					<ui-txt size="sm" cls="text-black" txt={getFormattedDayText(item.dayOfWeeks)}></ui-txt>
					<ui-txt size="sm" cls="text-black" txt={`${item.openingTime} ~ ${item.closingTime}`}></ui-txt>
				</li>
			{/each}
		</ul>
	{/if}
{:else}
	<div class="felx-wrap flex flex-col gap-2">
		<div class="flex w-32 gap-2">
			{#each list as item (item.id)}
				<label for={item.id} class="button segmented md min-w-15">
					<input
						type="radio"
						id={item.id}
						name={`${componentId}-operating-hours`}
						value={item.name}
						checked={status === item.name}
						class="sr-only"
						onchange={() => applyStatus(item.name)}
					/>
					{item.txt}
				</label>
			{/each}
		</div>

		<ul class="flex flex-col gap-2">
			{#each cols as group, i (group.id)}
				{#if status === 'always'}
					{#if i === 0}
						<li class="relative left-0 flex flex-col gap-2 pt-2 opacity-100 transition-all first:pt-0">
							<div class="inline-flex w-full items-center gap-0.5">
								<TimeScrollPicker
									bind:value={cols[i].openingTime}
									onValueChange={(value: string) => handleTimeChange(0, 'openingTime', value)}
									cls={hasRowTimeError(i) ? 'error w-25' : 'w-25'}
								/>
								<span>~</span>
								<TimeScrollPicker
									bind:value={cols[i].closingTime}
									onValueChange={(value: string) => handleTimeChange(0, 'closingTime', value)}
									cls={hasRowTimeError(i) ? 'error w-25' : 'w-25'}
								/>
							</div>

							{#if timeError || hasRowTimeError(i)}
								<ui-txt size="sm" txt="시작 시간이 종료 시간보다 앞서야 합니다." cls="text-error"></ui-txt>
							{/if}
						</li>
					{/if}
				{:else}
					<li
						class="relative left-0 flex flex-col gap-2 pt-2 opacity-100 transition-all not-first:border-t not-first:border-t-slate-200 first:pt-0"
						style:z-index={cols.length - i}
					>
						<div class="flex flex-wrap gap-1">
							{#each dayWeekList as item, y (item.id)}
								{@const usedInOtherGroup = isDayUsedInOtherGroup(i, item.name)}
								{@const checkedInCurrentGroup = cols[i].dayOfWeeks.includes(item.name)}

								<label for={`${componentId}-${i}-${y}`} class="button segmented">
									<input
										type="checkbox"
										id={`${componentId}-${i}-${y}`}
										name={`${componentId}-day-${i}-${item.name}`}
										value={item.name}
										checked={checkedInCurrentGroup}
										disabled={usedInOtherGroup && !checkedInCurrentGroup}
										class="sr-only"
										onchange={(e) => toggleDay(i, item.name, (e.currentTarget as HTMLInputElement).checked)}
									/>
									{item.txt}
								</label>
							{/each}

							{#if cols.length > 1}
								<UiBtn
									tag="button"
									variant="ghost"
									txt="시간대 삭제"
									cls="min-w-7 flex-[0_0_75px]"
									click={() => removeGroup(i)}
								/>
							{/if}
						</div>

						<div class="relative z-5 inline-flex w-full items-center gap-4">
							<div class="flex items-center gap-0.5">
								<TimeScrollPicker
									bind:value={cols[i].openingTime}
									onValueChange={(value: string) => handleTimeChange(0, 'openingTime', value)}
									cls={hasRowTimeError(i) ? 'error w-22' : ' w-22'}
								/>
								<span>~</span>
								<TimeScrollPicker
									bind:value={cols[i].closingTime}
									onValueChange={(value: string) => handleTimeChange(i, 'closingTime', value)}
									cls={hasRowTimeError(i) ? 'error w-22' : ' w-22'}
								/>
							</div>

							{#if rest === 'on'}
								{#if group.breakStartTime}
									<dl class="flex items-center gap-0.5">
										<dt class="pr-1.5 text-xs text-slate-600">휴게 시간</dt>
										<dd class="inline-flex items-center gap-2">
											<TimeScrollPicker
												bind:value={group.breakStartTime}
												onValueChange={(value: string) =>
													handleRestTimeChange(i, 'breakStartTime', value)}
												cls={hasRowRestTimeError(i) ? 'error w-22' : ' w-22'}
											/>
											<span>~</span>
											<TimeScrollPicker
												bind:value={group.breakEndTime}
												onValueChange={(value: string) => handleRestTimeChange(i, 'breakEndTime', value)}
												cls={hasRowRestTimeError(i) ? 'error w-22' : ' w-22'}
											/>
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

						{#if timeError || hasRowTimeError(i) || hasRowRestTimeError(i)}
							<ui-txt size="sm" txt="시작 시간이 종료 시간보다 앞서야 합니다." cls="text-error"></ui-txt>
						{/if}
					</li>
				{/if}
			{/each}
		</ul>

		{#if canAddGroup}
			<div class="flex items-center gap-2">
				<UiBtn tag="button" variant="secondary" txt="시간대 추가" cls="w-25 flex-[0_0_100px]" click={addGroup} />
			</div>
		{/if}

		{#if weekError || hasWeekError}
			<ui-txt size="sm" txt="요일이 선택되지 않은 시간대가 있습니다." cls="text-error"></ui-txt>
		{/if}
	</div>
{/if}
