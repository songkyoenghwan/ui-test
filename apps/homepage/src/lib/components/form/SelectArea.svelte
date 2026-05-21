<script lang="ts">
	import Icons from '@/lib/components/icons/Icons.svelte';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	let { id = '', arr = ['전체'], text = $bindable('전체'), cls = '' } = $props();

	let items = $derived.by(() => {
		if (!arr) return;

		if (typeof arr === 'string') {
			return (arr as string).split(/\s*,\s*/);
		}

		return arr;
	});

	let open = $state(false);
	let container: HTMLElement | null = $state(null);
	const internalSelected = $derived(text);

	let displayValue = $derived(internalSelected || text);
	const handleSelect = (val: string) => {
		text = val;
		open = false;

		window.dispatchEvent(
			new CustomEvent('change', {
				detail: { id, value: val },
			}),
		);
	};

	const toggleOpen = () => (open = !open);

	function handleOptionClick(e: MouseEvent) {
		e.preventDefault();

		const currentTarget = e.currentTarget as HTMLButtonElement;
		const clickedVal = currentTarget.dataset.val;

		if (clickedVal) {
			handleSelect(clickedVal);
		}
	}

	$effect(() => {
		if (!open) return;
		const onClick = (e: MouseEvent) => {
			if (container && !container.contains(e.target as Node)) {
				open = false;
			}
		};
		window.addEventListener('click', onClick, { capture: true });
		return () => window.removeEventListener('click', onClick, { capture: true });
	});
</script>

<section {id} bind:this={container} class="relative flex min-w-50 flex-col gap-3 {cls}">
	<button
		type="button"
		class="h-input border-input text-999 hover:bg-option flex w-full items-center rounded-lg border px-4 transition-colors"
		class:border-primary={open}
		onclick={toggleOpen}
	>
		<span class="flex-1 text-left">{displayValue}</span>
		<Icons name="arrow-down" cls="stroke-svg size-6 fill-white transition-transform duration-300 {open ? 'rotate-180' : ''}" />
	</button>

	{#if open}
		<ul
			transition:fade={{ duration: 150 }}
			role="listbox"
			class="bg-bkg border-input text-999 border-line absolute top-full z-50 mt-3 grid max-h-68 w-full overflow-y-auto rounded-lg border shadow-lg"
		>
			{#each items as item (item)}
				<li role="none" class="border-input border-b last:border-none" animate:flip={{ duration: 400, easing: quintOut }}>
					<button
						role="option"
						aria-selected={internalSelected === item}
						class="hover:bg-option/50 h-input aria-selected:bg-option flex w-full items-center gap-2 px-4 text-sm transition-colors"
						onclick={handleOptionClick}
					>
						{#if internalSelected === item}
							<Icons name="arrow-check" cls="stroke-default flex size-5" />
						{/if}
						<span>{item}</span>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</section>
