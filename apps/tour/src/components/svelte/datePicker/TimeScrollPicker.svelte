<script lang="ts">
	import { imask } from '@imask/svelte';
	import { WheelPicker, WheelPickerWrapper } from '@uinstinct/svelte-wheel-picker';

	let { value = $bindable('00:00'), title = '', cls = '', onValueChange = $bindable() } = $props();

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
	let currentVisibleCount = $derived(isExpanded ? 6 : 1);
	let timeRef: HTMLElement | null = $state(null);

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			isExpanded = !isExpanded;
		}
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (!timeRef) return;
		if (!isExpanded) return;
		if (timeRef.contains(event.target as Node)) return;

		setTimeout(() => {
			isExpanded = false;
		}, 120);
	};

	const timeMaskOptions = {
		mask: 'HH:mm',
		lazy: false,
		overwrite: true,
		blocks: {
			HH: {
				mask: IMask.MaskedRange,
				from: 0,
				to: 23,
				maxLength: 2,
			},
			mm: {
				mask: IMask.MaskedRange,
				from: 0,
				to: 59,
				maxLength: 2,
			},
		},
	};

	function roundTo10Minutes() {
		const match = value.match(/^(\d{2}):(\d{2})$/);
		if (!match) return;

		let hour = Number(match[1]);
		let minute = Number(match[2]);

		minute = Math.round(minute / 10) * 10;

		if (minute === 60) {
			hour += 1;
			minute = 0;
		}

		if (hour > 23) {
			hour = 23;
			minute = 50;
		}

		value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
		onValueChange?.(value);
	}
</script>

<svelte:window onpointerdown={handleClickOutside} />

<div class="relative z-5" {title} bind:this={timeRef}>
	<input
		type="text"
		inputmode="numeric"
		placeholder="00:00"
		pattern="^([01]\d|2[0-3]):[0-5]\d$"
		maxlength="5"
		use:imask={timeMaskOptions}
		class={['input-time m', cls ?? 'w-22']}
		onclick={() => (isExpanded = !isExpanded)}
		onkeydown={handleKeyDown}
		oninput={(event) => {
			let v = event.currentTarget.value.replace(/[^\d]/g, '').slice(0, 4);

			if (v.length > 2) {
				v = `${v.slice(0, 2)}:${v.slice(2)}`;
			}

			value = v;
			onValueChange?.(value);
		}}
		onblur={roundTo10Minutes}
		bind:value
	/>

	{#if isExpanded}
		<div
			class="absolute top-7.25 z-3 flex cursor-pointer items-center justify-center overflow-clip rounded border bg-white p-1 text-sm transition-all duration-200 {isExpanded
				? 'border-cms-3 h-45'
				: 'h-7 border-slate-300'}"
		>
			<WheelPickerWrapper classNames={{ group: 'time-picker' }}>
				<WheelPicker
					options={hourOptions}
					infinite={false}
					dragSensitivity={1}
					scrollSensitivity={1}
					value={hour}
					cylindrical={true}
					visibleCount={currentVisibleCount}
					classNames={{
						wrapper: 'my-wheel',
						selection: 'my-selection',
						option: 'my-option',
					}}
					onValueChange={(v) => {
						value = `${v}:${minute}`;
						onValueChange?.(value);
					}}
				/>
				:
				<WheelPicker
					options={minuteOptions}
					infinite={false}
					dragSensitivity={1}
					scrollSensitivity={1}
					value={minute}
					cylindrical={true}
					visibleCount={currentVisibleCount}
					classNames={{
						wrapper: 'my-wheel',
						selection: 'my-selection',
						option: 'my-option',
					}}
					onValueChange={(v) => {
						value = `${hour}:${v}`;
						onValueChange?.(value);
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
