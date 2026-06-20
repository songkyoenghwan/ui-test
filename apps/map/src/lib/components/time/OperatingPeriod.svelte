<svelte:options
	customElement={{
		tag: 'operating-period',
		shadow: 'none',
		props: {
			result: { type: 'Object' },
			view: { type: 'String', reflect: true },
			re: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	import UiBtn from '$lib/components/btn/UiBtn.svelte';
	import InputPicker from '$lib/components/datePicker/InputPicker.svelte';
	import { createDefaultOperatingResult, type Props } from '$lib/types/time/operatingPeriod.type';
	import { untrack } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	let { result = $bindable(), checked = $bindable(false), view = 'reg', re = '' }: Props = $props();

	let itemId = uuidv4();
	const list = $state([
		{ id: `${itemId}-always`, name: 'always', txt: '상시 운영' },
		{ id: `${itemId}-period`, name: 'period', txt: '기간' },
	]);
	let local = $state(createDefaultOperatingResult());

	$effect(() => {
		if (result && typeof result === 'object') {
			const resultSnap = $state.snapshot(result);

			untrack(() => {
				local.status = resultSnap.status || 'always';
				local.day = resultSnap.day || '';
			});
		}
	});

	$effect(() => {
		const snap = $state.snapshot(local);

		untrack(() => {
			if (result && typeof result === 'object') {
				result.status = snap.status;
				result.day = snap.day;
			}
		});
	});
</script>

{#if local}
	{#if view === 'detail'}
		<ui-txt
			size="sm"
			cls="text-black"
			txt={local.status === 'always' ? '상시운영' : local.status === 'period' ? `${local.day}` : ''}
		></ui-txt>
	{/if}

	{#if view === 'reg' || view === 'edit'}
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
						if (local.status === 'always' && re) local.day = '';
					}}
				/>
			</div>

			{#if local.status === 'period'}
				<InputPicker
					inputId={`${itemId}-picker`}
					dateType="range"
					placeholder={'날짜를 선택해 주세요'}
					bind:day={local.day}
				></InputPicker>
			{/if}
		</div>
	{/if}
{/if}
