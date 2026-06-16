<script lang="ts">
	import TimeScrollPicker from '$lib/components/datePicker/TimeScrollPicker.svelte';
	import UiBtn from '$lib/components/btn/UiBtn.svelte';

	// 🎯 수선 핵심 1: 개별 hour 데이터를 $bindable()로 받아 양방향 전선 개통
	let { hour = $bindable(), rest, groupId, toggleRestTime } = $props();

	// 🎯 수선 핵심 2: 이 로우(요소) 전용 독립 스냅샷 장부 개설
	let lastStart = hour.timeStart;
	let lastEnd = hour.timeEnd;

	$effect(() => {
		const currentStart = hour.timeStart;
		const currentEnd = hour.timeEnd;

		// 🚨 이 로우의 시간이 역전되는 유격 포착선
		if (currentStart >= currentEnd) {
			if (currentStart !== lastStart) {
				hour.timeEnd = currentStart; // 시작 시간이 밀리면 종료 시간도 같이 밀림
			} else if (currentEnd !== lastEnd) {
				hour.timeStart = currentEnd; // 종료 시간이 당겨지면 시작 시간도 같이 당겨짐
			}
		}

		// 스냅샷 최신화 (순정 let 변수이므로 무한 루프 차단)
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
						onclick={() => toggleRestTime(String(groupId), false)}
					/>
				</dd>
			</dl>
		{:else}
			<UiBtn tag="button" variant="ghost" txt="휴게 시간" cls="min-w-7 flex-[0_0_75px]" onclick={() => toggleRestTime(String(groupId), true)} />
		{/if}
	{/if}
</li>
