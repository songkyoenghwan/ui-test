<svelte:options
	customElement={{
		tag: 'header-list',
		shadow: 'none',
		props: {
			current: { type: 'String', reflect: true },
			list: { type: 'Array' },
		},
	}}
/>

<script lang="ts">
	import type { LnbSubItem } from '$lib/types/Lnb';
	import { setCurrentId, currentItemFromPath, currentSubItem } from '$/lib/stores/navigation.svelte';

	let displayH3 = $derived($currentItemFromPath?.h3 ?? '');
	let displayId = $derived($currentItemFromPath?.id ?? '');
	let displaySub = $derived(($currentItemFromPath?.sub as LnbSubItem[]) ?? []);
	let currentSub = $derived($currentSubItem?.link || '');

	function handleNavClick(listId: string) {
		setCurrentId(displayId);
	}
</script>

{#snippet name({ link = '', text = '' })}
	<li class="flex h-full">
		<a
			class="aria-[current=page]:text-primary aria-[current=page]:border-b-primary hover:text-90efd0 grid place-content-center px-4 aria-[current=page]:border-b aria-[current=page]:font-bold"
			href={link}
			aria-current={currentSub === link ? 'page' : undefined}
			onclick={(e) => {
				e.stopPropagation();
				handleNavClick(list.id);
			}}
		>
			<p>{text}</p>
		</a>
	</li>
{/snippet}

<header class="bg-primary h-header-height pt-2">
	<section class="flex h-full items-center rounded-tl-md bg-white px-2 text-slate-300">
		<div class="min-w-21.5 border-r border-r-slate-100">
			<h2 class="text-121212 text-center text-xl font-semibold">
				{displayH3 || ''}
			</h2>
		</div>
		{#if displaySub && displayId !== 'CMS-LOC' && displayId !== 'CMS-CON'}
			<ul class="text-md flex h-full items-center gap-2 px-2 text-center opacity-100 starting:opacity-0">
				{#each displaySub as list (list.link)}
					{@render name({ link: list.link, text: list.h4 })}
				{/each}
			</ul>
		{/if}
	</section>
</header>
