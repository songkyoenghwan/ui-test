<script lang="ts">
	import Icons from '@/svelte/icons/Icons.svelte';
	import * as m from '@/paraglide/messages';
	import { langState, mainViewState } from '@/stores/globalStore';

	let { name = '' } = $props();
</script>

{#if $mainViewState === 'default' || $mainViewState === 'search'}
	<header
		class={[
			'fixed top-0 left-0 z-40 w-full max-w-dvw',
			$mainViewState === 'default' &&
				'grid h-16 grid-cols-[minmax(120px,1fr)_40px] gap-1 bg-linear-90 from-(--base-color) to-[#07235e] py-3 pr-1 pl-5',
			$mainViewState === 'poi' && 'hidden',
		]}
	>
		<div class="flex h-10 flex-1 items-center rounded-lg bg-white/10 px-3">
			<label for="searchMapInput" aria-label="search" class="flex-none">
				<Icons name="search" cls="size-5 fill-white" />
			</label>
			<input
				type="text"
				id="searchMapInput"
				class="h-full flex-1 px-2 text-white outline-none placeholder:text-slate-400"
				placeholder={m.usr_map_001_01({ locale: $langState, name: name })}
			/>
		</div>

		<button type="button" class="grid h-10 w-9 place-content-center rounded-lg active:bg-white/10">
			<Icons name="menu" cls="size-5 stroke-white" />
		</button>
	</header>
{/if}
