<svelte:options
	customElement={{
		tag: 'operating-period',
		shadow: 'none',
		props: {
			result: { type: 'Object' },
		},
	}}
/>

<script lang="ts">
	import UiBtn from '$lib/components/btn/UiBtn.svelte';
	import InputPicker from '$lib/components/datePicker/InputPicker.svelte';
	import { createDefaultOperatingResult, OperatingResultSchema, type Props } from '$lib/types/time/operatingPeriod.type';
	import { v4 as uuidv4 } from 'uuid';

	let { result = $bindable(), checked = $bindable(false), disabled = false }: Props = $props();

	let itemId = uuidv4();
	const list = $state([
		{ id: `${itemId}-always`, name: 'always', txt: '상시 운영' },
		{ id: `${itemId}-period`, name: 'period', txt: '기간' },
	]);
	let local = $state(createDefaultOperatingResult());

	$effect(() => {
		if (result && typeof result === 'object') {
			local.status = result.status || 'always';
			local.day = result.day || '';
		}
	});

	$effect(() => {
		if (result && typeof result === 'object') {
			// 문서 핵심: 외부로 데이터를 전달할 때는 $state.snapshot을 사용하여 순수 데이터만 추출합니다.
			const snap = $state.snapshot(local);

			// 객체를 통째로 바꾸지 않고(result = snap ❌), 속성만 덮어씌워 부모와의 메모리 참조를 유지합니다 (⭕).
			result.status = snap.status;
			result.day = snap.day;
		}
	});

	$inspect(local);
</script>

{#if local}
	<div class="felx-wrap flex gap-2">
		<div class="flex w-32 gap-2">
			<UiBtn
				tag="label"
				variant="segmented"
				name={`${itemId}-operating-period`}
				arr={list}
				cls="flex-1"
				bind:selected={local.status}
				change={() => {
					// 상태가 바뀌었을 때의 찌꺼기 청소도 local만 건드리면 됩니다. (나머지는 effect가 자동 동기화)
					if (local.status === 'always') local.day = '';
				}}
			/>
		</div>

		{#if local.status === 'period'}
			<InputPicker inputId={`${itemId}-picker`} dateType="range" placeholder={'날짜를 선택해 주세요'} bind:day={local.day}
			></InputPicker>
		{/if}
	</div>
{/if}
