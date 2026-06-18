<svelte:options
	customElement={{
		tag: 'closing-day',
		shadow: 'none',
		props: {
			itemId: { type: 'String', reflect: true },
			error: { reflect: true, type: 'Boolean', attribute: 'error' },
			view: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	import { createClosingResult, type Props } from '$/lib/types/time/closingDay.type';
	import UiBtn from '$lib/components/btn/UiBtn.svelte';
	import { v4 as uuidv4 } from 'uuid';

	let {
		itemId = uuidv4(),
		result = $bindable(createClosingResult()),
		checked = $bindable(false),
		error = $bindable(false),
		view = 'reg',
	}: Props = $props();

	const list = $derived([
		{ id: `${itemId}-none`, name: 'none', txt: '없음' },
		{ id: `${itemId}-week`, name: 'week', txt: '요일' },
		{ id: `${itemId}-day`, name: 'day', txt: '날짜 ' },
	]);
	const weekList = $derived([
		{ id: `${itemId}-first`, name: '1', txt: '첫째' },
		{ id: `${itemId}-second`, name: '2', txt: '둘째' },
		{ id: `${itemId}-third`, name: '3', txt: '셋째' },
		{ id: `${itemId}-fourth`, name: '4', txt: '넷째' },
		{ id: `${itemId}-last`, name: 'last', txt: '마지막' },
	]);
	const dayWeekList = $derived([
		{ id: `${itemId}-mon`, name: 'mon', txt: '월' },
		{ id: `${itemId}-tue`, name: 'tue', txt: '화' },
		{ id: `${itemId}-wed`, name: 'wed', txt: '수' },
		{ id: `${itemId}-thu`, name: 'thu', txt: '목' },
		{ id: `${itemId}-fri`, name: 'fri', txt: '금' },
		{ id: `${itemId}-sat`, name: 'sat', txt: '토' },
		{ id: `${itemId}-sun`, name: 'sun', txt: '일' },
	]);
	let lastStatus = result.status;
	let allWeek = $state('');
	let hasWeek = $derived(allWeek === 'all-week' || (result.week?.length ?? 0) > 0);
	let hasDay = $derived((result.dayWeek?.length ?? 0) > 0);
	let showError = $derived(result.status === 'week' && (!hasWeek || !hasDay));

	$effect(() => {
		error = showError;
	});

	$effect(() => {
		const currentStatus = result.status;

		if (currentStatus !== lastStatus) {
			result.week = [''];
			allWeek = '';
			result.dayWeek = [''];

			if (currentStatus === 'day') {
				result.day = '1';
			} else {
				result.day = '';
			}

			lastStatus = currentStatus;
		}
	});

	$effect(() => {
		const host = $host();
		if (host) {
			Object.defineProperty(host, 'result', {
				get() {
					return $state.snapshot(result);
				},
				set(val) {
					if (val) {
						result.status = val.status ?? 'none';
						result.week = val.week ?? [''];
						allWeek = val.allWeek ?? '';
						result.dayWeek = val.dayWeek ?? [''];
						result.day = val.day ?? '';
					}
				},
				configurable: true,
				enumerable: true,
			});
		}
	});

	let formattedDayText = $derived.by(() => {
		const days = result.dayWeek || [];
		if (days.length === 0) return '';

		// 배열의 순서가 뒤섞여 있어도 완벽히 감식할 수 있도록 정렬 및 비교 함수를 씁니다.
		const isMatch = (targetDays: string[]) => days.length === targetDays.length && targetDays.every((d) => days.includes(d));

		// 주중 판별 (월, 화, 수, 목, 금)
		if (isMatch(['mon', 'tue', 'wed', 'thu', 'fri'])) {
			return '주중';
		}

		//  주말 판별
		if (isMatch(['sat', 'sun'])) {
			return '주말';
		}

		//  그 외의 경우 (월요일, 수요일 등)
		return days
			.map((item) => {
				const txt = dayWeekList.find((w) => w.name === item)?.txt || '';
				return `${txt}요일`;
			})
			.join(', ');
	});
</script>

{#if view === 'detail'}
	{#if result.status === 'none'}
		<ui-txt size="sm" txt="없음" cls="text-black"></ui-txt>
	{/if}

	{#if result.status === 'week'}
		{#if result.week}
			<div class="flex flex-wrap gap-2">
				<div class="flex gap-1">
					{#each result.week as item, index}
						<ui-txt
							size="sm"
							txt={`${weekList.find((w) => w.name === item)?.txt || ''}${index < result.week.length - 1 ? '주, ' : '주'}`}
							cls="text-black"
						></ui-txt>
					{/each}
				</div>
				<div class="flex gap-1">
					<ui-txt size="sm" txt={formattedDayText} cls="text-black"></ui-txt>
				</div>
			</div>
		{/if}
	{/if}

	{#if result.status === 'day'}
		<ui-txt size="sm" txt="없음" cls="text-black"></ui-txt>
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
				bind:selected={result.status}
			/>
		</div>

		{#if result.status === 'week'}
			<dl class="inline-flex items-center gap-2.5">
				<dt class="label">주차</dt>
				<dd class="flex flex-wrap gap-1">
					<UiBtn
						tag="chk"
						variant="segmented"
						name={`${itemId}-closing-week`}
						arr={weekList}
						cls="min-w-12.5 flex-[0_0_50px]"
						bind:selected={result.week}
						change={(e: Event) => {
							const target = e.currentTarget;
							if (target instanceof HTMLInputElement && target.checked) {
								allWeek = result.week?.length === 5 ? 'all-week' : '';
							} else {
								allWeek = '';
							}
						}}
					/>
				</dd>
				<dd class="flex flex-wrap gap-1">
					<ui-checkbox
						item-id={`${itemId}-all-chk`}
						txt="매주"
						class="flex-none"
						checked={allWeek === 'all-week' ? true : false}
						change={(e: Event & { currentTarget: HTMLInputElement }) => {
							allWeek = e.currentTarget.checked ? 'all-week' : '';
							if (e.currentTarget.checked) {
								result.week = ['1', '2', '3', '4', 'last'];
							} else {
								result.week = [];
							}
						}}
					></ui-checkbox>
				</dd>
			</dl>
			{#if allWeek === 'all-week'}
				<ui-txt
					size="sm"
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
						name={`${itemId}-closing-day`}
						arr={dayWeekList}
						cls="min-w-7 flex-[0_0_28px]"
						bind:selected={result.dayWeek}
					/>
				</dd>
			</dl>

			{#if showError}
				<ui-txt
					size="sm"
					txt="주차와 요일을 각각 1개 이상 선택해 주세요."
					class="text-error relative left-0 opacity-100 transition-all starting:left-1 starting:opacity-0"
					cls="text-error"
				></ui-txt>
			{/if}
		{/if}

		{#if result.status === 'day'}
			<dl class="inline-flex items-center gap-1">
				<dt class="label">매달</dt>
				<dd>
					<div class="grid flex-[0_0_300px] items-center bg-white px-2 py-1.5">
						<select
							name={`${itemId}-closing-date`}
							id={`${itemId}-closing-date`}
							class="select h-7 min-h-7 min-w-50"
							bind:value={result.day}
						>
							{#each Array(31) as _, i (`sel-date-${i}`)}
								<option class="max-w-66" value={String(i + 1)}>{i + 1}일</option>
							{/each}
						</select>
					</div>
				</dd>
			</dl>
		{/if}
	</div>
{/if}
