<script lang="ts">
	import UiBtn from '@/svelte/btn/UiBtn.svelte';
	import TimeScrollPicker from '@/svelte/datePicker/TimeScrollPicker.svelte';

	let { hour = $bindable(), rest, groupId, toggleRestTime } = $props();

	let lastStart = hour.timeStart;
	let lastEnd = hour.timeEnd;

	$effect(() => {
		const currentStart = hour.timeStart;
		const currentEnd = hour.timeEnd;

		if (currentStart >= currentEnd) {
			if (currentStart !== lastStart) {
				hour.timeEnd = currentStart;
			} else if (currentEnd !== lastEnd) {
				hour.timeStart = currentEnd;
			}
		}

		lastStart = hour.timeStart;
		lastEnd = hour.timeEnd;
	});
</script>

<li class="relative z-1 flex flex-wrap gap-2">
	<div class="inline-flex items-center gap-2">
		<TimeScrollPicker bind:value={hour.timeStart} cls="" />
		<span>~</span>
		<TimeScrollPicker bind:value={hour.timeEnd} />
	</div>

	{#if rest === 'on'}
		{#if hour.rest}
			<dl>
				<dt></dt>
				<dd class="inline-flex items-center gap-2">
					<TimeScrollPicker bind:value={hour.restStart} />
					<span>~</span>
					<TimeScrollPicker bind:value={hour.restEnd} />
					<UiBtn
						tag="button"
						variant="icon"
						txt="삭제"
						iconName="btn-del"
						cls="size-7 flex-[0_0_28px] stroke-error fill-error"
						click={() => toggleRestTime(String(groupId), false)}
					/>
				</dd>
			</dl>
		{:else}
			<UiBtn
				tag="button"
				variant="ghost"
				txt="휴게 시간"
				cls="min-w-7 flex-[0_0_75px]"
				click={() => toggleRestTime(String(groupId), true)}
			/>
		{/if}
	{/if}
</li>
