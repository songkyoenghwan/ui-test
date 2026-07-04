<svelte:options
	customElement={{
		tag: 'closing-day',
		shadow: 'none',
		props: {
			itemId: { type: 'String', reflect: true },
			error: { reflect: true, type: 'Boolean', attribute: 'error' },
			view: { type: 'String', reflect: true },
			result: { type: 'Array' },
		},
	}}
/>

<script lang="ts">
	import UiBtn from '@/svelte/btn/UiBtn.svelte';
	import { untrack } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	type HolidayItem = {
		dayOfWeek: number | null;
		fixedHoliday: number | null;
		holidayType: number | null;
		id: string;
		weekOfMonth: number | null;
	};

	let { result = $bindable(), checked = $bindable(false), error = $bindable(false), view = 'reg' } = $props();

	let itemId = uuidv4();
	let list = $state([
		{ id: `${itemId}-none`, name: 'none', txt: '없음' },
		{ id: `${itemId}-week`, val: 0, name: 'week', txt: '요일' },
		{ id: `${itemId}-day`, val: 1, name: 'day', txt: '날짜 ' },
	]);
	let weekList = $state([
		{ id: `${itemId}-first`, name: 1, txt: '첫째' },
		{ id: `${itemId}-second`, name: 2, txt: '둘째' },
		{ id: `${itemId}-third`, name: 3, txt: '셋째' },
		{ id: `${itemId}-fourth`, name: 4, txt: '넷째' },
		{ id: `${itemId}-last`, name: 5, txt: '마지막' },
	]);
	let dayWeekList = $state([
		{ id: `${itemId}-mon`, name: 1, txt: '월' },
		{ id: `${itemId}-tue`, name: 2, txt: '화' },
		{ id: `${itemId}-wed`, name: 3, txt: '수' },
		{ id: `${itemId}-thu`, name: 4, txt: '목' },
		{ id: `${itemId}-fri`, name: 5, txt: '금' },
		{ id: `${itemId}-sat`, name: 6, txt: '토' },
		{ id: `${itemId}-sun`, name: 0, txt: '일' },
	]);

	let status = $state<'none' | 'week' | 'day'>('none');
	let weekArr = $state<number[]>([]);
	let weekDayArr = $state<number[]>([]);
	let day = $state<number | null>(1);
	let allWeek = $state<boolean>(false);
	let initialized = $state(false);

	function createEmptyItem(): HolidayItem {
		return {
			dayOfWeek: null,
			fixedHoliday: null,
			holidayType: null,
			id: uuidv4(),
			weekOfMonth: null,
		};
	}

	let total = $state<HolidayItem[]>([createEmptyItem()]);

	function rebuildTotal() {
		if (status === 'none') {
			total = [createEmptyItem()];
			result = total;
			return;
		}

		if (status === 'week') {
			if (weekArr.length === 0 || weekDayArr.length === 0) {
				total = [];
				return; // result에 반영하지 않음
			}

			total = weekArr.flatMap((weekOfMonth) =>
				weekDayArr.map((dayOfWeek) => ({
					dayOfWeek,
					fixedHoliday: null,
					holidayType: 0,
					id: uuidv4(),
					weekOfMonth,
				})),
			);

			result = total;
			return;
		}

		if (status === 'day') {
			total = [
				{
					dayOfWeek: null,
					fixedHoliday: day,
					holidayType: 1,
					id: uuidv4(),
					weekOfMonth: null,
				},
			];

			result = total;
		}
	}

	function syncAllWeek() {
		allWeek = weekArr.length === 5;
	}

	function handleStatusChange() {
		if (status === 'none') {
			weekArr = [];
			weekDayArr = [];
			day = 1;
			allWeek = false;
		}

		if (status === 'week') {
			day = 1;
		}

		if (status === 'day') {
			weekArr = [];
			weekDayArr = [];
			allWeek = false;
			if (day == null) day = 1;
		}

		rebuildTotal();
	}

	function handleWeekChange() {
		syncAllWeek();
		rebuildTotal();
	}

	function handleWeekDayChange() {
		rebuildTotal();
	}

	function handleAllWeekChange(e: Event & { currentTarget: HTMLInputElement }) {
		allWeek = e.currentTarget.checked;

		if (allWeek) {
			weekArr = [1, 2, 3, 4, 5];
		} else {
			weekArr = [];
		}

		rebuildTotal();
	}

	function handleDayChange() {
		rebuildTotal();
	}

	let formattedDayText = $derived.by(() => {
		if (weekDayArr.length === 0) return '';

		const isMatch = (targetDays: number[]) =>
			weekDayArr.length === targetDays.length && targetDays.every((d) => weekDayArr.includes(d));

		if (isMatch([1, 2, 3, 4, 5])) return '주중';
		if (isMatch([6, 0])) return '주말';

		return weekDayArr
			.map((item) => {
				const txt = dayWeekList.find((w) => w.name === item)?.txt || '';
				return `${txt}요일`;
			})
			.join(', ');
	});

	let weekText = $derived.by(() => {
		if (weekArr.length === 0) return '';

		return weekArr.map((item) => weekList.find((w) => w.name === item)?.txt || '').join(', ');
	});
	let dayText = $derived.by(() => {
		return weekDayArr
			.map((item) => dayWeekList.find((d) => d.val === item)?.txt)
			.filter(Boolean)
			.map((txt) => `${txt}요일`)
			.join(', ');
	});
	let isWeekValid = $derived.by(() => {
		if (status !== 'week') return true;

		return weekArr.length > 0 && weekDayArr.length > 0;
	});
	let showError = $derived(!isWeekValid);

	function resetToNone() {
		status = 'none';
		weekArr = [];
		weekDayArr = [];
		day = 1;
		allWeek = false;
	}

	function uniqueNumbers(values: Array<number | null | undefined>) {
		return [...new Set(values.filter((v): v is number => v != null))].sort((a, b) => a - b);
	}

	function isNoneItem(item: HolidayItem | undefined) {
		return !!item && item.weekOfMonth == null && item.dayOfWeek == null && item.fixedHoliday == null;
	}

	function isNoneData(data: HolidayItem[]) {
		return data.length === 1 && isNoneItem(data[0]);
	}

	function hasFixedHoliday(data: HolidayItem[]) {
		return data.some((item) => item.fixedHoliday != null);
	}

	function applyDayMode(data: HolidayItem[]) {
		status = 'day';
		day = data.find((item) => item.fixedHoliday != null)?.fixedHoliday ?? 1;
		weekArr = [];
		weekDayArr = [];
		allWeek = false;
	}

	function applyWeekMode(data: HolidayItem[]) {
		const weeks = uniqueNumbers(data.map((item) => item.weekOfMonth));
		const days = uniqueNumbers(data.map((item) => item.dayOfWeek));

		status = 'week';
		weekArr = weeks;
		weekDayArr = days;
		allWeek = weeks.length === 5;
		day = 1;
	}

	function initFromResult(data: typeof result) {
		if (!Array.isArray(data)) {
			resetToNone();
			return;
		}

		if (data.length === 0) {
			return;
		}

		if (isNoneData(data)) {
			resetToNone();
			return;
		}

		if (hasFixedHoliday(data)) {
			applyDayMode(data);
			return;
		}

		applyWeekMode(data);
	}

	let closingText = $derived.by(() => {
		const sortedWeeks = [...weekArr].sort((a, b) => a - b);
		const sortedDays = [...weekDayArr].sort((a, b) => a - b);

		const weekText = sortedWeeks
			.map((item) => weekList.find((w) => w.name === item)?.txt)
			.filter(Boolean)
			.map((txt) => `${txt}주`)
			.join(', ');

		const dayText = sortedDays
			.map((item) => dayWeekList.find((d) => d.name === item)?.txt)
			.filter(Boolean)
			.map((txt) => `${txt}요일`)
			.join(', ');

		if (!weekText && !dayText) return '';
		if (!weekText) return dayText;
		if (!dayText) return weekText;

		return `<span>${weekText}</span> <span>${dayText}</span>`;
	});

	$effect(() => {
		const resultSnap = $state.snapshot(result);
		untrack(() => {
			initFromResult(resultSnap);
		});
	});

	$effect(() => {
		const totalSnap = $state.snapshot(total);
		untrack(() => {
			result = totalSnap;
		});
	});
</script>

{#if view === 'detail' || view === 'side'}
	{#if status === 'none'}
		<ui-txt size={view === 'side' ? 'xs' : 'sm'} txt="없음" cls="text-black leading-tight"></ui-txt>
	{/if}

	{#if status === 'week'}
		{#if weekArr.length > 0}
			<p class={['inline-flex flex-wrap items-center gap-x-2 leading-tight', view === 'side' ? 'text-xs' : 'text-sm']}>
				{@html closingText}
			</p>
		{/if}
	{/if}

	{#if status === 'day'}
		<ui-txt size={view === 'side' ? 'xs' : 'sm'} txt={`매달 ${day}일`} cls="text-black leading-tight"></ui-txt>
	{/if}
{:else}
	<div class="inline-flex flex-col gap-2">
		<div class="inline-flex items-center gap-2">
			<UiBtn
				tag="label"
				variant="segmented"
				name={`${itemId}-closing-day`}
				arr={list}
				cls="w-15 flex-[0_0_60px]"
				bind:selected={status}
				change={handleStatusChange}
			/>
		</div>

		{#if status === 'week'}
			<dl class="inline-flex items-center gap-2.5">
				<dt class="label">주차</dt>
				<dd class="flex flex-wrap gap-1">
					<UiBtn
						tag="chk"
						variant="segmented"
						name={`${itemId}-closing-week`}
						arr={weekList}
						cls="min-w-12.5 flex-[0_0_50px]"
						bind:selected={weekArr}
						change={handleWeekChange}
					/>
				</dd>
				<dd class="flex flex-wrap gap-1">
					<ui-checkbox
						item-id={`${itemId}-all-chk`}
						txt="매주"
						class="flex-none"
						checked={allWeek}
						change={handleAllWeekChange}
					></ui-checkbox>
				</dd>
			</dl>

			{#if allWeek}
				<ui-txt
					size={view === 'side' ? 'xs' : 'sm'}
					txt="매주 정기 휴무로 설정된 요일은 운영 시간보다 우선 적용되며, <br /> 해당 요일의 운영 시간이 자동 조정될 수 있습니다."
					class="relative left-0 opacity-100 transition-all starting:left-1 starting:opacity-0"
				></ui-txt>
			{/if}

			<dl class="inline-flex items-center gap-2.5">
				<dt class="label">요일</dt>
				<dd class="flex flex-wrap gap-1">
					<UiBtn
						tag="chk"
						variant="segmented"
						name={`${itemId}-closing-weekday`}
						arr={dayWeekList}
						cls="min-w-7 flex-[0_0_28px]"
						bind:selected={weekDayArr}
						change={handleWeekDayChange}
					/>
				</dd>
			</dl>

			{#if showError}
				<ui-txt
					size={view === 'side' ? 'xs' : 'sm'}
					txt="주차와 요일을 각각 1개 이상 선택해 주세요."
					class="text-error relative left-0 opacity-100 transition-all starting:left-1 starting:opacity-0"
					cls="text-error"
				></ui-txt>
			{/if}
		{/if}

		{#if status === 'day'}
			<dl class="inline-flex items-center gap-1">
				<dt class="label">매달</dt>
				<dd>
					<div class="grid flex-[0_0_300px] items-center bg-white px-2 py-1.5">
						<select
							name={`${itemId}-closing-date`}
							id={`${itemId}-closing-date`}
							class="select h-7 min-h-7 min-w-50"
							bind:value={day}
							onchange={handleDayChange}
						>
							{#each Array(31) as _, i (`sel-date-${i}`)}
								<option class="max-w-66" value={i + 1}>{i + 1}일</option>
							{/each}
						</select>
					</div>
				</dd>
			</dl>
		{/if}
	</div>
{/if}
