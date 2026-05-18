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
			class="aria-[current=page]:text-primary aria-[current=page]:border-b-primary hover:text-90efd0 grid place-content-center px-4 aria-[current=page]:border-b-3 aria-[current=page]:font-bold"
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

<header class="border-t-primary box-shadow-[0_6px_10px_rgba(0,0,0,0.5)] bg-primary flex h-(--header-height) items-center justify-between border-t-8">
	<section class="grid h-full flex-1 grid-cols-[90px_1fr] items-center rounded-tl-md bg-white px-2 text-slate-300">
		<div class="min-w-21.5 flex-1 border-r border-r-slate-100">
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

	<div class="grid flex-[0_0_300px] items-center bg-white px-2 py-1.5">
		<select name="" id="" class="select h-10">
			<option class="max-w-66" value="">최대20자 최대20자 최대20자최대20자</option>
			<option class="max-w-66" value="">2025 용산어린이축제 4회</option>
			<option class="max-w-66" value="">2025 용산어린이축제 4회</option>
			<option class="max-w-66" value="">2025 용산어린이축제 4회</option>
			<option class="max-w-66" value="">2025 1용산어린이축제 4회2025 2용산어린이축제 4회2025 3용산어린이축제 4회2025 4용산어린이축제 4회</option>
		</select>
	</div>
</header>
