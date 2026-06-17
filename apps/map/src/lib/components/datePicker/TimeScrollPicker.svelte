<script lang="ts">
	import { useClickOutside } from '@ariefsn/svelte-use';
	import { WheelPicker, WheelPickerWrapper } from '@uinstinct/svelte-wheel-picker';

	let { value = $bindable('00:00'), cls = '' } = $props();

	const hourOptions = Array.from({ length: 24 }, (_, i) => ({
		value: String(i).padStart(2, '0'),
		label: String(i).padStart(2, '0'),
	}));

	const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
		value: String(i).padStart(2, '0'),
		label: String(i).padStart(2, '0'),
	}));

	let hour = $state('00');
	let minute = $state('00');
	let isExpanded = $state(false);
	let currentVisibleCount = $derived(isExpanded ? 5 : 1);
	let val = $derived(hour + ':' + minute);
	let timeRef: HTMLElement | null = $state(null);
	useClickOutside(
		() => timeRef,
		() => {
			isExpanded = false;
		},
	);

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			isExpanded = !isExpanded;
		}
	}
</script>

<div class="relative z-5" bind:this={timeRef}>
	<input
		type="text"
		class={['input-time m w-22', { cls }]}
		onclick={() => (isExpanded = !isExpanded)}
		onkeydown={handleKeyDown}
		bind:value={val}
	/>

	{#if isExpanded}
		<div
			class="absolute top-7.25 z-3 flex cursor-pointer items-center justify-center overflow-clip rounded border bg-white p-5 text-sm transition-all duration-200 {isExpanded
				? 'border-cms-3 h-40'
				: 'h-7 border-slate-300'}"
		>
			<WheelPickerWrapper classNames={{ group: 'time-picker' }}>
				<WheelPicker
					options={hourOptions}
					infinite={true}
					dragSensitivity={2}
					scrollSensitivity={3}
					value={hour}
					cylindrical={false}
					visibleCount={currentVisibleCount}
					classNames={{
						wrapper: 'my-wheel',
						selection: 'my-selection',
						option: 'my-option',
					}}
					onValueChange={(v) => {
						hour = v;
					}}
				/>
				:
				<WheelPicker
					options={minuteOptions}
					infinite={true}
					dragSensitivity={2}
					scrollSensitivity={3}
					value={minute}
					visibleCount={currentVisibleCount}
					classNames={{
						wrapper: 'my-wheel',
						selection: 'my-selection',
						option: 'my-option',
					}}
					onValueChange={(v) => {
						minute = v;
					}}
				/>
			</WheelPickerWrapper>
		</div>
	{/if}
</div>

<style>
	:global([data-swp-group].time-picker) {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 4px;
	}

	:global(.my-option[aria-selected='true']) {
		background: var(--color-cms-1);
	}
</style>
