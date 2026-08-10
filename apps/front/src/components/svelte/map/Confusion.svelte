<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState, mainViewState } from '@/stores/globalStore';
	import { sheetSnapPoint } from '@/stores/uxStore';
	import { confusionLists } from '@/utils/uxEvent.type';
	let toggleState = $state(false);

	function toggleHandler(e: Event) {
		e.preventDefault();
		toggleState = !toggleState;
	}
</script>

{#if $mainViewState === 'default' || $mainViewState === 'poi'}
	<div data-confusion="list" class={['flex items-center justify-end', $sheetSnapPoint > 72 ? 'opacity-0' : '']}>
		<div
			class={[
				'from-20b9fb to-2070fb absolute right-7.5 min-h-7.5 w-max translate-x-0 items-center gap-2 rounded-l-full bg-white bg-linear-90 py-0.5 pl-0.5 opacity-100 transition-all transition-discrete duration-300 starting:translate-x-3 starting:opacity-0',
				toggleState ? 'inline-flex' : 'hidden',
			]}
		>
			<ul class="relative flex items-center gap-2 rounded-l-full bg-white py-1.5 pr-5 pl-3.5">
				{#each confusionLists as list}
					<li class="inline-flex items-center gap-1">
						<i class={['inline-flex size-3.5 flex-none rounded-full', list.color]}></i>
						<span
							class={[
								'flex-none  leading-tight break-all',
								$langState === 'en' || $langState === 'ja' ? 'text-[.625rem]' : 'text-xs',
							]}
						>
							{list.name}
						</span>
					</li>
				{/each}
			</ul>
		</div>

		<button
			type="button"
			class={['shadow-1xs from-20b9fb to-2070fb grid size-10 place-content-center overflow-clip rounded-full bg-linear-90']}
			onclick={toggleHandler}
		>
			<strong
				class={[
					'grid size-8.75 place-items-center rounded-full transition-colors',
					toggleState ? 'from-20b9fb to-2070fb bg-linear-90 text-white' : 'bg-white',
				]}
			>
				<span
					class={[
						'leading-tight transition-colors duration-75',
						toggleState ? '' : 'from-20b9fb to-2070fb bg-linear-to-r bg-clip-text text-transparent',
						$langState === 'en' || $langState === 'ja' ? 'text-[.6875rem]' : 'text-sm',
					]}
				>
					{m.usr_map_001_06({ locale: $langState })}
				</span>
			</strong>
		</button>
	</div>
{/if}
