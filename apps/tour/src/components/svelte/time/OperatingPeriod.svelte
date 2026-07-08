<svelte:options
	customElement={{
		tag: 'operating-period',
		shadow: 'none',
		props: {
			isAlways: { type: 'Boolean', reflect: true, attribute: 'is-always' },
			startAt: { type: 'String', reflect: true, attribute: 'start-at' },
			endAt: { type: 'String', reflect: true, attribute: 'end-at' },
			view: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	import UiBtn from '@/svelte/btn/UiBtn.svelte';
	import InputPicker from '@/svelte/datePicker/InputPicker.svelte';
	import type { PagePropsInput } from '@/types/page/page.type';
	import { untrack } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	export interface Props {
		isAlways?: boolean;
		startAt?: string;
		endAt?: string;
		view?: PagePropsInput['view'];
	}

	let { isAlways = $bindable(true), startAt = $bindable(), endAt = $bindable(), view = 'reg' }: Props = $props();

	let itemId = uuidv4();
	const list = $state([
		{ id: `${itemId}-always`, name: 'always', txt: '상시 운영' },
		{ id: `${itemId}-period`, name: 'period', txt: '기간' },
	]);

	let localIsAlways = $state(isAlways);
	let localStartAt = $state(startAt ?? '');
	let localEndAt = $state(endAt ?? '');

	$effect(() => {
		const always = localIsAlways;
		const start = localStartAt ?? '';
		const end = localEndAt ?? '';

		untrack(() => {
			isAlways = always;
			startAt = start;
			endAt = end;
		});
	});

	$effect(() => {
		const always = isAlways;
		const start = startAt ?? '';
		const end = endAt ?? '';

		untrack(() => {
			localIsAlways = always;
			localStartAt = start;
			localEndAt = end;
		});
	});
</script>

{#if view === 'detail' || view === 'side'}
	{#if localIsAlways}
		<ui-txt size={view === 'side' ? 'xs' : 'sm'} cls="text-black" txt="상시 운영"></ui-txt>
	{:else}
		<div class={['flex', view === 'side' ? 'xs' : 'sm']}>
			<text-date dateTime={localStartAt}></text-date>
			<div class="flex">
				~
				<text-date dateTime={localEndAt}></text-date>
			</div>
		</div>
	{/if}
{/if}

{#if view === 'reg' || view === 'edit'}
	<div class="flex flex-wrap gap-2">
		<div class="flex w-32 gap-2">
			<UiBtn
				tag="label"
				variant="segmented"
				name={`${itemId}-operating-period`}
				arr={list}
				cls="flex-1"
				selected={localIsAlways ? 'always' : 'period'}
				change={(e: Event) => {
					const input = e.currentTarget as HTMLInputElement;
					localIsAlways = input.value === 'always';
				}}
			/>
		</div>

		{#if !localIsAlways}
			<InputPicker
				inputId={`${itemId}-picker`}
				dateType="range"
				placeholder="날짜를 선택해 주세요"
				bind:startAt={localStartAt}
				bind:endAt={localEndAt}
			/>
		{/if}
	</div>
{/if}
