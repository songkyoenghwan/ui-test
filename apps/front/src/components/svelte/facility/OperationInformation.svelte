<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import TextDate from '@/svelte/text/TextDate.svelte';
	import type { FacilityHolidayScheduleResponse } from '@/types/facilities';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';
	import dayjs from 'dayjs';

	let { variant = '' } = $props();

	const ALL_DAYS = [1, 2, 3, 4, 5, 6, 0];
	const DAY_LABELS: Record<number, string> = {
		0: m.usr_map_002_26({ locale: $langState }),
		1: m.usr_map_002_20({ locale: $langState }),
		2: m.usr_map_002_21({ locale: $langState }),
		3: m.usr_map_002_22({ locale: $langState }),
		4: m.usr_map_002_23({ locale: $langState }),
		5: m.usr_map_002_24({ locale: $langState }),
		6: m.usr_map_002_25({ locale: $langState }),
	};
	const HOLIDAY_DAY_LABELS: Record<number, string> = {
		0: m.usr_map_002_36({ locale: $langState }),
		1: m.usr_map_002_30({ locale: $langState }),
		2: m.usr_map_002_31({ locale: $langState }),
		3: m.usr_map_002_32({ locale: $langState }),
		4: m.usr_map_002_33({ locale: $langState }),
		5: m.usr_map_002_34({ locale: $langState }),
		6: m.usr_map_002_35({ locale: $langState }),
	};
	const WEEK_LABELS: Record<number, string> = {
		1: m.usr_map_002_55({ locale: $langState }),
		2: m.usr_map_002_56({ locale: $langState }),
		3: m.usr_map_002_57({ locale: $langState }),
		4: m.usr_map_002_58({ locale: $langState }),
		5: m.usr_map_002_27({ locale: $langState }),
	};

	let open = $state(false);

	function toTodayTime(base: dayjs.Dayjs, hhmm: string) {
		const [hour, minute] = hhmm.split(':').map(Number);
		return base.hour(hour).minute(minute).second(0).millisecond(0);
	}

	function isCurrentHoliday(now: dayjs.Dayjs, holiday: FacilityHolidayScheduleResponse) {
		if (holiday.holidayType === 1) return holiday.fixedHoliday === now.date();
		return holiday.weekOfMonth === Math.ceil(now.date() / 7) && holiday.dayOfWeek === now.day();
	}

	function toDateString(value?: Date | string | null) {
		return value ? dayjs(value).format('YYYY-MM-DD') : undefined;
	}

	function normalizeClosingTime(value?: string | null): string {
		if (!value) return '';
		return value === '00:00' ? '24:00' : value;
	}

	const operationTime = $derived.by(() => {
		return $facilityCurrent?.facilityDetail?.facilityOperatingSchedules
			?.filter((item) => item?.dayOfWeek != null)
			.sort((a, b) => ALL_DAYS.indexOf(a.dayOfWeek ?? 0) - ALL_DAYS.indexOf(b.dayOfWeek ?? 0));
	});
	const isDailySchedule = $derived.by(() => {
		if (!operationTime || operationTime.length !== ALL_DAYS.length) return false;

		const [firstSchedule] = operationTime;
		const breakSchedules = firstSchedule.facilityBreakSchedules
			.map((breakSchedule) => `${breakSchedule.breakStartTime}-${breakSchedule.breakEndTime}`)
			.join(',');

		return (
			ALL_DAYS.every((dayOfWeek) => operationTime.some((schedule) => schedule.dayOfWeek === dayOfWeek)) &&
			operationTime.every(
				(schedule) =>
					schedule.openingTime === firstSchedule.openingTime &&
					schedule.closingTime === firstSchedule.closingTime &&
					schedule.facilityBreakSchedules
						.map((breakSchedule) => `${breakSchedule.breakStartTime}-${breakSchedule.breakEndTime}`)
						.join(',') === breakSchedules,
			)
		);
	});
	const isAlwaysOperating = $derived(
		ALL_DAYS.every((dayOfWeek) =>
			$facilityCurrent?.facilityDetail?.facilityOperatingSchedules?.some(
				(schedule) =>
					schedule.dayOfWeek === dayOfWeek &&
					schedule.openingTime === '00:00' &&
					schedule.closingTime === '00:00' &&
					schedule.facilityBreakSchedules.length === 0,
			),
		),
	);
	// 현재 상태를 판정하는 기준 시각
	const now = $derived(dayjs());
	// 시설의 운영 기간 시작일과 종료일
	const startAt = $derived($facilityCurrent?.facilityDetail?.startAt);
	const endAt = $derived($facilityCurrent?.facilityDetail?.endAt);
	const startDate = $derived(toDateString(startAt));
	const endDate = $derived(toDateString(endAt));
	const isSameOperationDate = $derived(Boolean(startAt && endAt && dayjs(startAt).isSame(dayjs(endAt), 'day')));
	// 현재 요일에 등록된 운영 스케줄
	const todaySchedule = $derived(
		$facilityCurrent?.facilityDetail?.facilityOperatingSchedules?.find((schedule) => schedule.dayOfWeek === now.day()),
	);
	// 오늘 운영 스케줄의 시작·종료 시각
	const openAt = $derived(todaySchedule?.openingTime ? toTodayTime(now.clone(), todaySchedule.openingTime) : null);
	const closeAt = $derived(
		todaySchedule?.closingTime ? toTodayTime(now.clone(), normalizeClosingTime(todaySchedule.closingTime)) : null,
	);

	// 운영 기간 시작 전 또는 종료 후인지 확인
	const isOutsideOperationPeriod = $derived(
		(startAt && now.isBefore(dayjs(startAt))) || (endAt && (now.isAfter(dayjs(endAt)) || now.isSame(dayjs(endAt)))),
	);
	// 휴무 스케줄이 현재 날짜와 일치하는지 확인
	const isHoliday = $derived(
		$facilityCurrent?.facilityDetail?.facilityHolidaySchedules?.some((holiday) => isCurrentHoliday(now, holiday)) ?? false,
	);
	const holidaySummaries = $derived.by(() => {
		const holidays = $facilityCurrent?.facilityDetail?.facilityHolidaySchedules ?? [];
		const weeklyHolidays = holidays.filter((holiday) => holiday.holidayType === 0);
		const fixedHolidays = holidays.filter((holiday) => holiday.holidayType === 1 && holiday.fixedHoliday != null);
		const summaries: string[] = [];

		const weeks = [
			...new Set(weeklyHolidays.map((holiday) => holiday.weekOfMonth).filter((week): week is number => week != null)),
		]
			.sort((a, b) => a - b)
			.map((week) => WEEK_LABELS[week])
			.filter(Boolean);
		const days = [...new Set(weeklyHolidays.map((holiday) => holiday.dayOfWeek).filter((day): day is number => day != null))]
			.sort((a, b) => ALL_DAYS.indexOf(a) - ALL_DAYS.indexOf(b))
			.map((day) => HOLIDAY_DAY_LABELS[day]);
		if (weeks.length && days.length)
			summaries.push(`${weeks.join(', ')} ${days.join(', ')} ${m.usr_map_002_38({ locale: $langState })}`);

		for (const holiday of fixedHolidays.sort((a, b) => (a.fixedHoliday ?? 0) - (b.fixedHoliday ?? 0))) {
			summaries.push(
				`${m.usr_map_002_37({ locale: $langState, time: holiday.fixedHoliday })} ${m.usr_map_002_38({ locale: $langState })}`,
			);
		}

		return summaries;
	});
	// 현재 시각에 포함되는 휴게 스케줄
	const currentBreak = $derived(
		todaySchedule?.facilityBreakSchedules.find((breakTime) => {
			if (!breakTime.breakStartTime || !breakTime.breakEndTime) return false;
			const breakStart = toTodayTime(now.clone(), breakTime.breakStartTime);
			const breakEnd = toTodayTime(now.clone(), normalizeClosingTime(breakTime.breakEndTime));
			return (now.isAfter(breakStart) || now.isSame(breakStart)) && now.isBefore(breakEnd);
		}),
	);
	// 휴게 시간 여부
	const isBreakTime = $derived(Boolean(currentBreak));
	// 운영 시작 전 여부
	const isBeforeOpen = $derived(openAt ? now.isBefore(openAt) : false);
	// 운영 종료 시각 이후 여부
	const isClosed = $derived(closeAt ? now.isAfter(closeAt) || now.isSame(closeAt) : false);

	function toggle() {
		open = !open;
	}
</script>

{#snippet currentState()}
	{#if isOutsideOperationPeriod}
		{m.usr_map_002_09({ locale: $langState })}
	{:else if isHoliday || !todaySchedule}
		{m.usr_map_002_10({ locale: $langState })}
	{:else if isAlwaysOperating}
		{m.usr_map_002_11({ locale: $langState })}
	{:else if isBreakTime}
		{m.usr_map_002_13({ locale: $langState })}
	{:else if isBeforeOpen}
		{m.usr_map_002_16({ locale: $langState, time: todaySchedule?.openingTime ?? '' })}
	{:else if isClosed}
		{m.usr_map_002_17({ locale: $langState })}
	{:else}
		{m.usr_map_002_11({ locale: $langState })}
	{/if}
{/snippet}

{#if variant === 'state'}
	<dl class="flex items-center gap-2 px-5">
		<dt class="flex items-center gap-1 text-sm font-bold text-black">
			<Icons name="clock-filled" cls="size-4 fill-slate-400 stroke-slate-400" />
			{m.usr_map_002_08({ locale: $langState })}
		</dt>
		<dd class=" text-sm text-slate-500">
			{@render currentState()}
		</dd>
	</dl>
{:else}
	<dl class="flex flex-col gap-3 px-5 py-1.5">
		<dt class="flex items-center gap-1 text-sm font-bold text-black">
			<button type="button" class="flex w-full items-start gap-3" onclick={toggle} aria-expanded={open}>
				<span class="inline-flex items-start gap-2">
					<Icons name="clock-filled" cls="size-4 fill-slate-400 stroke-slate-400" />
					{@render currentState()}
				</span>

				<span class="flex items-center justify-center gap-1 text-xs text-slate-500">
					{#if !isHoliday && todaySchedule && isAlwaysOperating && !isBreakTime && !isBeforeOpen && !isClosed}
						{m.usr_map_002_12({ locale: $langState, time: normalizeClosingTime(todaySchedule.closingTime) ?? '' })}
					{:else if isBreakTime}
						{m.usr_map_002_14({ locale: $langState, time: normalizeClosingTime(currentBreak?.breakEndTime) ?? '' })}
					{:else if isBeforeOpen}
						{m.usr_map_002_16({ locale: $langState, time: todaySchedule?.openingTime ?? '' })}
					{/if}

					<span class={['relative transition-all', open ? 'rotate-90' : 'rotate-270']}>
						<Icons name="arrow-left" cls="size-4 stroke-slate-500" />
					</span>
				</span>
			</button>
		</dt>

		<dd
			class={[
				'gap-1 opacity-100 transition-all transition-discrete duration-75 starting:opacity-0',
				open ? 'flex flex-col' : 'hidden',
			]}
		>
			{#if isAlwaysOperating}
				<div class="pl-6 text-base text-black">{m.usr_map_002_18({ locale: $langState })}</div>
			{:else if startDate || endDate}
				<div class="pl-6 text-base text-black">
					{#if startDate && endDate && !isSameOperationDate}
						<TextDate dateTime={startDate} /> ~ <TextDate dateTime={normalizeClosingTime(endDate)} />
					{:else}
						<TextDate dateTime={startDate ?? endDate} />
					{/if}
				</div>
			{/if}

			{#each holidaySummaries as summary}
				<div class="text-error pl-6 text-base">{summary}</div>
			{/each}

			{#if operationTime}
				<div class="mt-2 flex flex-col gap-2 border-t border-t-slate-200 pt-3">
					{#each isDailySchedule ? operationTime.slice(0, 1) : operationTime as time}
						<div class="flex gap-1 text-sm text-black">
							<div class="flex-[0_1_66px] text-center" style="flex: 0 1 66px;">
								{isDailySchedule ? m.usr_map_002_39({ locale: $langState }) : DAY_LABELS[time.dayOfWeek ?? 0]}
							</div>
							<div class="flex flex-col gap-1 text-sm">
								<div class="flex items-center gap-1 text-sm text-slate-600">
									{#if time?.openingTime === time?.closingTime}
										{m.usr_map_002_40({ locale: $langState })}
									{:else}
										<p>
											<TextDate dateTime={time?.openingTime ?? undefined} />
										</p>
										<p>~</p>
										<p>
											<TextDate dateTime={normalizeClosingTime(time?.closingTime)} />
										</p>
									{/if}
								</div>

								{#if time.facilityBreakSchedules}
									<div class="flex items-center gap-1 text-sm text-slate-600">
										{#each time.facilityBreakSchedules as item (item.id)}
											<p class="min-w-10">
												{m.usr_map_002_13({ locale: $langState })}
											</p>
											<p>
												<TextDate dateTime={item.breakStartTime ?? undefined} />
											</p>
											<p>~</p>
											<p>
												<TextDate dateTime={normalizeClosingTime(item?.breakEndTime)} />
											</p>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</dd>
	</dl>
{/if}
