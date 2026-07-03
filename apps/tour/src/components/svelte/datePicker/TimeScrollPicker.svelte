<script lang="ts">
	import { WheelPicker, WheelPickerWrapper } from '@uinstinct/svelte-wheel-picker';

	let { value = $bindable('00:00'), cls = '', onValueChange = $bindable() } = $props();

	const hourOptions = Array.from({ length: 24 }, (_, i) => ({
		value: String(i).padStart(2, '0'),
		label: String(i).padStart(2, '0'),
	}));

	const minuteOptions = Array.from({ length: 6 }, (_, i) => {
		const minute = i * 10;
		const value = String(minute).padStart(2, '0');

		return {
			value,
			label: value,
		};
	});

	let hour = $derived(value.split(':')[0] || '00');
	let minute = $derived(value.split(':')[1] || '00');

	let isExpanded = $state(false);
	let currentVisibleCount = $derived(isExpanded ? 5 : 1);
	let timeRef: HTMLElement | null = $state(null);

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			isExpanded = !isExpanded;
		}
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (!timeRef) return;
		if (timeRef.contains(event.target as Node)) return;
		if (!isExpanded) return;

		// 즉시 실행 대신 10ms 지연 (너무 민감한 반응을 살짝 완화)
		setTimeout(() => {
			isExpanded = false;
		}, 10);
	};
</script>

<svelte:window onclick={handleClickOutside} />

<div class="relative z-5" bind:this={timeRef}>
	<input
		type="text"
		class={['input-time m', cls ?? 'w-22']}
		onclick={() => (isExpanded = !isExpanded)}
		onkeydown={handleKeyDown}
		bind:value
	/>

	{#if isExpanded}
		<div
			class="absolute top-7.25 z-3 flex cursor-pointer items-center justify-center overflow-clip rounded border bg-white p-1 text-sm transition-all duration-200 {isExpanded
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
						value = `${v}:${minute}`;
					}}
				/>
				:
				<WheelPicker
					options={minuteOptions}
					infinite={true}
					dragSensitivity={1}
					scrollSensitivity={2}
					value={minute}
					visibleCount={currentVisibleCount}
					classNames={{
						wrapper: 'my-wheel',
						selection: 'my-selection',
						option: 'my-option',
					}}
					onValueChange={(v) => {
						value = `${hour}:${v}`;
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

	:global(.my-option) {
		min-width: 60px;
	}

	:global(.my-option[aria-selected='true']) {
		background: var(--color-cms-1);
	}
</style>
