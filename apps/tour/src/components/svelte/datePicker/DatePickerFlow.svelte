<svelte:options
	customElement={{
		tag: 'date-picker',
		shadow: 'none',
		props: {
			inputId: { reflect: true, type: 'String', attribute: 'input-id' },
			selectedDate: { reflect: true, type: 'String', attribute: 'selected-date' },
			dateType: { reflect: true, type: 'String', attribute: 'date-type' },
			day: { reflect: true, type: 'String', attribute: 'day' },
			inline: { reflect: true, type: 'String', attribute: 'inline' },
			position: { reflect: true, type: 'String', attribute: 'position' },
		},
	}}
/>

<script lang="ts">
	import { Button, Datepicker } from 'flowbite-svelte';

	let {
		inputId = $bindable(''),
		disabled = $bindable(false),
		selectedDate = $bindable(undefined),
		day = $bindable(''),
		dateType = $bindable('default'),
		inline = $bindable(''),
		position = $bindable(''),
	} = $props();

	let datepickerRef: HTMLInputElement | undefined = $state();
	const today = new Date();
	let dateRange = $state<{ from: Date | undefined; to: Date | undefined }>({
		from: undefined,
		to: undefined,
	});
	let dirInline = $derived(inline === 'true' || inline === 'inline' ? true : undefined);
	// Intl.DateTimeFormat 설정 (YYYY.MM.DD 포맷용)
	const formatter = new Intl.DateTimeFormat('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});

	const formatDate = (d: Date | undefined) => {
		if (!d || !(d instanceof Date)) return '';
		// ko-KR 포맷의 공백과 끝 마침표 제거
		return formatter.format(d).replace(/\s/g, '').replace(/\.$/, '');
	};

	$effect(() => {
		// '날짜를 선택하세요' 같은 안내 문구는 제외하고 실제 날짜 포맷일 때만 할당
		const formatted = formatDate(selectedDate);
		if (dateType === 'range') {
			const from = formatDate(dateRange.from);
			const to = formatDate(dateRange.to);
			day = from && to ? `${from} ~ ${to}` : '';
		} else {
			day = formatted || '';
		}

		if (datepickerRef) {
			const handleFocus = () => {
				// 라이브러리가 팝업을 생성할 시간을 약간 주기 위해 setTimeout 사용
				setTimeout(() => {
					const dia = $host().querySelector('[role="dialog"]') as HTMLElement | null;
					if (dia) {
						dia.style.position = 'fixed';
						dia.style.zIndex = '9999';

						// 현재 입력창 위치를 계산하여 fixed 위치 보정 (필요 시)
						const rect = datepickerRef?.getBoundingClientRect();
						dia.style.top = `${rect?.bottom || 0 + window.scrollY}px`;
					}
				}, 0);
			};

			datepickerRef.addEventListener('focus', handleFocus);
			// 클릭 시에도 열리므로 click 이벤트도 함께 감시하는 것이 안전합니다.
			datepickerRef.addEventListener('click', handleFocus);

			return () => {
				datepickerRef?.removeEventListener('focus', handleFocus);
				datepickerRef?.removeEventListener('click', handleFocus);
			};
		}
	});

	// "오늘" 버튼 클릭 핸들러
	const setToday = () => {
		// 중요: Datepicker 바인딩 값은 반드시 'Date 객체'여야 합니다.
		if (dateType === 'range') {
			dateRange.from = today;
			dateRange.to = today;
		} else {
			selectedDate = today;
		}
	};
</script>

{#snippet foot({ selectedDate, dateType, handleClear, handleApply, close }: any)}
	<div class="border-t-e9e9e9 mt-2 flex flex-col gap-2 border-t pt-2">
		<div class="flex justify-between gap-2">
			<div>
				<Button size="sm" color="alternative" onclick={setToday}>오늘</Button>
			</div>
			<div class="flex flex-none gap-2">
				<Button size="sm" color="alternative" onclick={handleClear}>취소</Button>
				<Button
					size="sm"
					onclick={() => {
						if (dateType === 'default') {
							handleApply(selectedDate);
						} else if (dateType === 'range') {
							handleApply({ from: dateRange.from, to: dateRange.to });
						}

						close();
					}}
					disabled={dateType === 'range' ? !dateRange.from || !dateRange.to : !selectedDate}
				>
					선택
				</Button>
			</div>
		</div>
	</div>
{/snippet}

{#if dateType === 'default'}
	<Datepicker
		inline={dirInline}
		bind:elementRef={datepickerRef}
		bind:value={selectedDate}
		id={inputId}
		autohide={false}
		inputProps={{
			id: inputId,
			autocomplete: 'off',
		}}
		placeholder="YYYY.MM.DD"
	>
		{#snippet actionSlot(params)}
			{@render foot(params)}
		{/snippet}
	</Datepicker>
{:else if dateType === 'range'}
	<Datepicker
		range
		bind:elementRef={datepickerRef}
		bind:rangeFrom={dateRange.from}
		bind:rangeTo={dateRange.to}
		autohide={false}
		inputProps={{ id: inputId, autocomplete: 'off', placeholder: 'YY.MM.DD-YY.MM.DD' }}
		placeholder="YY.MM.DD-YY.MM.DD"
	>
		{#snippet actionSlot(params)}
			{@render foot(params)}
		{/snippet}
	</Datepicker>
{:else}
	{selectedDate}
{/if}
