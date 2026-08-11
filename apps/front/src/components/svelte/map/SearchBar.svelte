<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState } from '@/stores/globalStore';
	import { layoutViewState, searchViewState, updateViewState } from '@/stores/uxStore';
	import Icons from '@/svelte/icons/Icons.svelte';

	let { name = '' } = $props();

	const onSearchHandler = () => {
		updateViewState({
			layout: 'search',
			search: 'result',
		});
	};

	const offSearchHandler = () => {
		if ($searchViewState === 'searchResult') {
			updateViewState({
				layout: 'ai',
				detail: 'ai',
				search: 'idle',
			});
		} else {
			updateViewState({
				layout: 'ai',
				detail: 'ai',
				search: 'idle',
			});
		}
	};
</script>

{#if $layoutViewState === 'default' || $layoutViewState === 'search' || $layoutViewState === 'ai'}
	<header
		class={[
			'fixed top-0 left-0 z-40 grid h-16 w-full max-w-dvw gap-1 py-3',
			$layoutViewState === 'default' &&
				'grid-cols-[minmax(120px,1fr)_40px] bg-linear-90 from-(--base-color) to-[#07235e] pr-1 pl-5',
			$layoutViewState === 'ai' &&
				'grid-cols-[minmax(120px,1fr)_40px] bg-linear-90 from-(--base-color) to-[#07235e] pr-1 pl-5',
			$layoutViewState === 'search' && 'bg-white pr-5 pl-2',
		]}
	>
		<div
			class={[
				'flex h-10 flex-1 items-center rounded-lg ',
				$layoutViewState === 'default' && 'bg-white/10 px-3',
				$layoutViewState === 'ai' && 'bg-white/10 px-3',
				$layoutViewState === 'search' && 'gap-1.5 bg-transparent',
			]}
		>
			{#if $layoutViewState === 'search'}
				<button
					type="button"
					class="relative grid size-10 place-content-center rounded-lg bg-white opacity-100 transition-all transition-discrete starting:opacity-0"
					onclick={offSearchHandler}
				>
					<Icons name="back" cls="size-6 stroke-black" />
				</button>
			{:else}
				<label for="searchMapInput" aria-label="search" class="flex-none">
					<Icons name="search" cls="size-5 fill-white" />
				</label>
			{/if}
			<input
				type="text"
				id="searchMapInput"
				class={[
					'h-full flex-1 px-2 outline-none placeholder:text-slate-400',
					$layoutViewState === 'search' ? 'rounded-sm border border-slate-200' : 'text-white',
				]}
				placeholder={m.usr_map_001_01({ locale: $langState, name: name })}
				onpointerdown={onSearchHandler}
				onfocusin={onSearchHandler}
			/>
		</div>

		<button type="button" class="grid h-10 w-9 place-content-center rounded-lg active:bg-white/10">
			<Icons name="menu" cls="size-5 stroke-white" />
		</button>
	</header>
{/if}
