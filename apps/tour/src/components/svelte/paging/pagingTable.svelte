<svelte:options
	customElement={{
		tag: 'paging-table',
		shadow: 'none',
		props: {
			page: { type: 'Number', reflect: true, attribute: 'data-page' },
			pageSize: { type: 'Number', reflect: true, attribute: 'data-page-size' },
			totalCount: { type: 'Number', reflect: true, attribute: 'data-total-count' },
			totalPages: { type: 'Number', reflect: true, attribute: 'data-total-pages' },
		},
	}}
/>

<script lang="ts">
	import UiBtn from '@/svelte/btn/UiBtn.svelte';

	let { page = $bindable(1), pageSize = $bindable(10), totalCount = $bindable(0), totalPages = $bindable(1) } = $props();

	const emit = (name: 'btn-prev' | 'btn-next' | 'btn-current', detail: Record<string, unknown> = {}) => {
		$host().dispatchEvent(
			new CustomEvent(name, {
				detail: {
					page,
					pageSize,
					totalCount,
					totalPages,
					...detail,
				},
				bubbles: true,
				composed: true,
			}),
		);
	};

	let pages = $derived.by(() => {
		const totalVisible = 8;
		let start = Math.max(1, page - Math.floor(totalVisible / 2));
		let end = start + totalVisible - 1;

		if (end > totalPages) {
			end = totalPages;
			start = Math.max(1, end - totalVisible + 1);
		}

		const range: number[] = [];
		for (let i = start; i <= end; i++) range.push(i);
		return range;
	});
</script>

{#if totalPages >= 1}
	<section class="inline-flex w-full items-center justify-center gap-3">
		<UiBtn
			variant="text"
			iconName="arrow-left"
			iconPos="lt"
			iconCls="size-4 stroke-black"
			txt="이전"
			cls="max-w-12.5"
			disabled={page === 1}
			click={() => emit('btn-prev')}
		/>

		<div class="inline-flex items-center justify-center gap-1.5">
			{#if pages[0] > 1}
				<button
					type="button"
					class="button text h-7 min-w-7 text-slate-500"
					onclick={() => emit('btn-current', { page: 1 })}
				>
					1
				</button>

				{#if pages[0] > 2}
					<span class="text-slate-400">...</span>
				{/if}
			{/if}

			{#each pages as p}
				{#if p === page}
					<strong class="button primary flex h-7 min-w-7 items-center justify-center text-white">
						{p}
					</strong>
				{:else}
					<button
						type="button"
						class="button text flex h-7 min-w-7 items-center justify-center px-0 text-slate-500"
						onclick={() => emit('btn-current', { page: p })}
					>
						{p}
					</button>
				{/if}
			{/each}

			{#if pages[pages.length - 1] < totalPages}
				{#if pages[pages.length - 1] < totalPages - 1}
					<span class="text-slate-400">...</span>
				{/if}

				<button
					type="button"
					class="button text h-7 min-w-7 px-0 text-slate-500"
					onclick={() => emit('btn-current', { page: totalPages })}
				>
					{totalPages}
				</button>
			{/if}
		</div>

		<UiBtn
			variant="text"
			iconName="arrow-left"
			iconPos="rt"
			iconCls="size-4 rotate-180 stroke-black"
			txt="다음"
			cls="max-w-12.5"
			disabled={page === totalPages}
			click={() => emit('btn-next')}
		/>
	</section>
{/if}
