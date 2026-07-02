<svelte:options
	customElement={{
		tag: 'operating-hours',
		shadow: 'none',
		props: {
			itemId: { type: 'String', reflect: true, attribute: 'item-id' },
			result: { type: 'Object' },
			rest: { type: 'String', reflect: true },
			view: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	import UiBtn from '@/svelte/btn/UiBtn.svelte';
	import TimeScrollPicker from '@/svelte/datePicker/TimeScrollPicker.svelte';
	import { v4 as uuidv4 } from 'uuid';

	type ApiSchedule = {
		id: number | string;
		dayOfWeek: number;
		openingTime: string;
		closingTime: string;
	};

	type EditSchedule = {
		id: string;
		dayWeek: number[];
		openingTime: string;
		closingTime: string;
		time: {
			error: boolean;
			rest: boolean;
		};
		restStart: string;
		restEnd: string;
	};

	type ResultType = {
		tourDestinationOperatingSchedules?: ApiSchedule[];
	};

	let {
		result = $bindable<ResultType>(),
		rest = 'off',
		error = false,
		timeError = false,
		weekError = false,
		view = 'reg',
	} = $props();

	const componentId = uuidv4();

	let list = $state([
		{ id: `${componentId}-always`, name: 'always', txt: '매일' },
		{ id: `${componentId}-week`, name: 'week', txt: '요일별' },
	]);

	let dayWeekList = $state([
		{ id: `${componentId}-sun`, name: 0, txt: '일' },
		{ id: `${componentId}-mon`, name: 1, txt: '월' },
		{ id: `${componentId}-tue`, name: 2, txt: '화' },
		{ id: `${componentId}-wed`, name: 3, txt: '수' },
		{ id: `${componentId}-thu`, name: 4, txt: '목' },
		{ id: `${componentId}-fri`, name: 5, txt: '금' },
		{ id: `${componentId}-sat`, name: 6, txt: '토' },
	]);

	function createEmptyGroup(): EditSchedule {
		return {
			id: uuidv4(),
			dayWeek: [],
			openingTime: '00:00',
			closingTime: '00:00',
			time: {
				error: false,
				rest: false,
			},
			restStart: '00:00',
			restEnd: '00:00',
		};
	}

	function getFormattedDayText(days: number[]) {
		const order = [1, 2, 3, 4, 5, 6, 0];

		return [...days]
			.sort((a, b) => order.indexOf(a) - order.indexOf(b))
			.map((day) => dayWeekList.find((d) => d.name === day)?.txt)
			.filter(Boolean)
			.map((txt) => `${txt}요일`)
			.join(', ');
	}

	function groupSchedules(source: ApiSchedule[]): EditSchedule[] {
		const grouped = source.reduce<Record<string, EditSchedule>>((acc, item) => {
			const key = `${item.openingTime}-${item.closingTime}`;

			if (!acc[key]) {
				acc[key] = {
					id: uuidv4(),
					dayWeek: [],
					openingTime: item.openingTime,
					closingTime: item.closingTime,
					time: {
						error: false,
						rest: false,
					},
					restStart: '00:00',
					restEnd: '00:00',
				};
			}

			acc[key].dayWeek = [...acc[key].dayWeek, item.dayOfWeek];
			return acc;
		}, {});

		return Object.values(grouped);
	}

	function flattenSchedules(groups: EditSchedule[]): ApiSchedule[] {
		return groups.flatMap((group) =>
			group.dayWeek.map((day) => ({
				id: uuidv4(),
				dayOfWeek: day,
				openingTime: group.openingTime,
				closingTime: group.closingTime,
			})),
		);
	}

	function isAlwaysSchedule(source: ApiSchedule[]) {
		if (source.length !== 7) return false;

		const days = [...source].map((item) => item.dayOfWeek).sort((a, b) => a - b);
		return JSON.stringify(days) === JSON.stringify([0, 1, 2, 3, 4, 5, 6]);
	}

	let status = $state<'always' | 'week'>('always');
	let cols = $state<EditSchedule[]>([]);
	let initialized = $state(false);

	$effect(() => {
		if (initialized) return;

		const source = result?.tourDestinationOperatingSchedules ?? [];

		status = isAlwaysSchedule(source) ? 'always' : 'week';
		cols = source.length ? groupSchedules(source) : [createEmptyGroup()];
		initialized = true;
	});

	function syncResult(nextCols = cols, nextStatus = status) {
		if (!result) return;

		result = {
			...result,
			tourDestinationOperatingSchedules:
				nextStatus === 'always'
					? [0, 1, 2, 3, 4, 5, 6].map((day) => ({
							id: uuidv4(),
							dayOfWeek: day,
							openingTime: nextCols[0]?.openingTime ?? '00:00',
							closingTime: nextCols[0]?.closingTime ?? '00:00',
						}))
					: flattenSchedules(nextCols.filter((group) => group.dayWeek.length > 0)),
		};

		console.log(result);
	}

	function changeStatus(nextStatus: 'always' | 'week') {
		status = nextStatus;

		if (nextStatus === 'always' && cols.length === 0) {
			cols = [createEmptyGroup()];
		}

		syncResult(cols, nextStatus);
	}

	function addGroup() {
		const nextCols = [...cols, createEmptyGroup()];
		cols = nextCols;
		syncResult(nextCols, status);
	}

	function removeGroup(id: string) {
		const nextCols = cols.filter((group) => group.id !== id);
		cols = nextCols.length ? nextCols : [createEmptyGroup()];
		syncResult(cols, status);
	}

	function updateWeekDays(groupId: string, value: number[]) {
		const nextCols = cols.map((group) => (group.id === groupId ? { ...group, dayWeek: value } : group));
		cols = nextCols;
		syncResult(nextCols, status);
	}

	function updateOpeningTime(groupId: string, value: string) {
		const nextCols = cols.map((group) => (group.id === groupId ? { ...group, openingTime: value } : group));
		cols = nextCols;
		syncResult(nextCols, status);
	}

	function updateClosingTime(groupId: string, value: string) {
		const nextCols = cols.map((group) => (group.id === groupId ? { ...group, closingTime: value } : group));
		cols = nextCols;
		syncResult(nextCols, status);
	}

	function getUsedDaysExcept(groupId: string): number[] {
		return cols.filter((group) => group.id !== groupId).flatMap((group) => group.dayWeek);
	}

	function getSelectableDayWeekList(groupId: string) {
		const usedDays = new Set(getUsedDaysExcept(groupId));

		return dayWeekList.map((day) => ({
			...day,
			disabled: usedDays.has(day.name),
		}));
	}

	$inspect(cols);
</script>

{#if view === 'detail'}
	{#if status === 'always'}
		{#if (result?.tourDestinationOperatingSchedules?.length ?? 0) > 0}
			<div class="grid grid-cols-[120px_1fr] items-center">
				<ui-txt size="sm" cls="text-black" txt="매일"></ui-txt>
				<ui-txt
					size="sm"
					cls="text-black"
					txt={`${result?.tourDestinationOperatingSchedules?.[0]?.openingTime} ~ ${result?.tourDestinationOperatingSchedules?.[0]?.closingTime}`}
				></ui-txt>
			</div>
		{/if}
	{:else}
		<ul class="space-y-2">
			{#each cols as item (item.id)}
				<li class="grid grid-cols-[120px_1fr] items-center">
					<ui-txt size="sm" cls="text-black" txt={getFormattedDayText(item.dayWeek)}></ui-txt>
					<ui-txt size="sm" cls="text-black" txt={`${item.openingTime} ~ ${item.closingTime}`}></ui-txt>
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
				name={`${componentId}-operating-hours`}
				arr={list}
				cls="flex-1"
				bind:selected={status}
			/>
		</div>

		{#if status === 'week'}
			<ul class="flex flex-col gap-2">
				{#each cols as group, i (group.id)}
					<li
						class="relative left-0 flex flex-col gap-2 pt-2 opacity-100 transition-all not-first:border-t not-first:border-t-slate-200 first:pt-0"
					>
						<div class="flex flex-wrap gap-1">
							<UiBtn
								tag="chk"
								variant="segmented"
								arr={dayWeekList}
								selected={group.dayWeek}
								name={`${componentId}-hour-day-${i}`}
								cls="min-w-7 flex-[0_0_28px]"
								change={() => {
									syncResult();
								}}
							/>

							{#if (cols?.length ?? 0) > 1}
								<UiBtn
									tag="button"
									variant="ghost"
									txt="시간대 삭제"
									cls="min-w-7 flex-[0_0_75px]"
									click={() => removeGroup(group.id)}
								/>
							{/if}
						</div>

						<div class="relative z-1 flex flex-wrap gap-2">
							<div class="inline-flex w-full items-center gap-2">
								<TimeScrollPicker
									value={group.openingTime}
									cls={group.time.error ? 'error' : ''}
									onValueChange={(value: string) => updateOpeningTime(group.id, value)}
								/>
								<span>~</span>
								<TimeScrollPicker
									value={group.closingTime}
									cls={group.time.error ? 'error' : ''}
									onValueChange={(value: string) => updateClosingTime(group.id, value)}
								/>
							</div>

							{#if rest === 'on'}
								{#if group.time.rest}
									<dl>
										<dt>휴게 시간</dt>
										<dd class="inline-flex items-center gap-2">
											<TimeScrollPicker value={group.restStart} />
											<span>~</span>
											<TimeScrollPicker value={group.restEnd} />
											<UiBtn
												tag="button"
												variant="icon"
												txt="삭제"
												iconName="btn-del"
												cls="size-7 flex-[0_0_28px] stroke-error fill-error"
											/>
										</dd>
									</dl>
								{:else}
									<UiBtn tag="button" variant="ghost" txt="휴게 시간" cls="min-w-7 flex-[0_0_75px]" />
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
					txt="시간대 추가"
					arr={list}
					cls="w-25 flex-[0_0_100px]"
					click={addGroup}
				/>
			</div>
		{:else if status === 'always'}
			<ul class="flex flex-col gap-2">
				{#each cols as group, i (group.id)}
					{#if i === 0}
						<li class="inline-flex w-full items-center gap-2">
							<TimeScrollPicker value={group.openingTime} cls={group.time.error ? 'error' : ''} />
							<span>~</span>
							<TimeScrollPicker value={group.closingTime} cls={group.time.error ? 'error' : ''} />
						</li>
					{/if}
				{/each}
			</ul>
		{/if}

		{#if timeError}
			<ui-txt size="sm" txt="시작 시간이 종료 시간보다 앞서야 합니다." cls="text-error"></ui-txt>
		{/if}

		{#if weekError}
			<ui-txt size="sm" txt="요일이 선택되지 않은 시간대가 있습니다." cls="text-error"></ui-txt>
		{/if}
	</div>
{/if}
