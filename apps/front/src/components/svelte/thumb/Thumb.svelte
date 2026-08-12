<script lang="ts">
	let { facilityFiles = [], variant = '' } = $props();

	let restFiles = $derived(facilityFiles ?? []);
</script>

{#if variant === 'guide'}
	<ul
		class="scrollbar-hide inline-flex w-full max-w-[clac(100dvw-40px)] snap-x snap-mandatory items-center gap-2 overflow-x-auto"
	>
		{#each restFiles as item (item.id)}
			<li class="size-25 flex-none snap-center rounded-lg">
				<picture class="grid size-full flex-none overflow-clip rounded-lg bg-slate-50">
					<img src={item.fileUrl} class="h-full object-cover" alt="" />
				</picture>
			</li>
		{/each}
	</ul>
{:else}
	{#each restFiles as item (item.id)}
		<picture class="size-17.5 flex-none overflow-clip rounded-sm bg-slate-50">
			<img src={item.fileUrl} alt="" />
		</picture>
	{/each}
{/if}
