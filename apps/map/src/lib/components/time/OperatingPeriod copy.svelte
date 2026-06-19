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

	let { result: inputResult, checked = $bindable(false), disabled = false }: Props = $props();

	let itemId = uuidv4();
	const list = [
		{ id: `${itemId}-always`, name: 'always', txt: '상시 운영' },
		{ id: `${itemId}-period`, name: 'period', txt: '기간' },
	];
	let result = $state(createDefaultOperatingResult());

	// props가 바뀔 때 내부 상태에 반영
	$effect.pre(() => {
		if (inputResult == null) return;

		// JSON 문자열로 들어오는 경우 처리
		let raw: unknown = inputResult;
		if (typeof inputResult === 'string') {
			try {
				raw = JSON.parse(inputResult);
			} catch {
				return;
			}
		}
		const parsed = OperatingResultSchema.safeParse(raw);

		if (!parsed.success) {
			console.warn('Invalid operating period', parsed.error);
			return;
		}

		result = {
			status: parsed.data.status,
			day: parsed.data.day ?? '',
		};
	});
	$inspect(result);
</script>

{#if result}
	<div class="felx-wrap flex gap-2">
		<div class="flex w-32 gap-2">
			<UiBtn
				tag="label"
				variant="segmented"
				name={`${itemId}-operating-period`}
				arr={list}
				cls="flex-1"
				bind:selected={result.status}
			/>
		</div>

		{#if result.status === 'period'}
			<InputPicker inputId={`${itemId}-picker`} dateType="range" placeholder={'날짜를 선택해 주세요'} bind:day={result.day}
			></InputPicker>
		{/if}
	</div>
{/if}
